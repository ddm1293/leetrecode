import 'reflect-metadata';
import { LambdaInterface } from '@aws-lambda-powertools/commons/lib/cjs/types';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Context,
} from 'aws-lambda';
import { ResponseManager } from '../../common/response-manager.js';
import { User } from '../../models/user.js';
import { ErrorHandler } from '../../common/errors/error-handler.js';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../common/types.js';
import { container } from '../../common/inversify.config.js';
import { UserServiceImpl } from '../../services/user-service.js';
import { EventParser } from '../../common/event-parser.js';
import { EmptyPathParamsError } from '../../common/errors/general-errors';

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
            console.log("see event", event)
            // TODO: what if the event.body is not a proper user?
            const user: User = await EventParser.parse(User, event.body);

            const tableName = process.env.TABLE_NAME;
            if (tableName == undefined) {
                return ErrorHandler.handleError(new EmptyTableNameError('Empty dynamoDB table name.'));
            }

            await this.userService.add(tableName, user);

            return ResponseManager.success(200, {
                message: 'User created successfully',
                user,
            });
        } catch (error) {
            return ErrorHandler.handleError(error);
        }
    }
}

const handlerInstance: CreateUserHandler = container.resolve(CreateUserHandler);
export const createUserHandler = handlerInstance.handler.bind(handlerInstance);
