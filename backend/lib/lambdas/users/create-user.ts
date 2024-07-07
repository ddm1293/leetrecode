import 'reflect-metadata';
import { LambdaInterface } from '@aws-lambda-powertools/commons/lib/cjs/types';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Context,
} from 'aws-lambda';
import { ResponseManager } from '../../common/response-manager.js';
import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { User } from '../../models/user.js';
import { ErrorHandler } from '../../common/errors/error-handler.js';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../common/types.js';
import { container } from '../../common/inversify.config.js';
import { UserServiceImpl } from '../../services/user-service-impl.js';
import { EventParser } from '../../common/event-parser.js';

@injectable()
export class CreateUserHandler implements LambdaInterface {
    private userService: UserServiceImpl;

    public constructor(@inject(TYPES.UserService) userService: UserServiceImpl) {
        this.userService = userService;
    }

    public async handler(
        event: APIGatewayProxyEvent,
        context: Context,
    ): Promise<APIGatewayProxyResult> {
        try {
            const user: User = await EventParser.parse(User, event.body);

            await this.userService.add('userTable', user);

            return ResponseManager.success(200, {
                message: 'User created successfully',
                user,
            });
        } catch (error) {
            return ErrorHandler.handleError(error);
        }
    }
}

const handlerInstance: CreateUserHandler = container.resolve(CreateUserHandler)
const lambdaHandler = handlerInstance.handler.bind(handlerInstance);

export const createUserHandler = middy()
    .use(httpHeaderNormalizer())
    .use(httpJsonBodyParser())
    .use(httpErrorHandler())
    .handler(lambdaHandler);
