import { LambdaInterface } from '@aws-lambda-powertools/commons/lib/cjs/types';
import { UserServiceImpl } from '../../services/user-service.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../common/types.js';
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { ErrorHandler } from '../../common/errors/error-handler.js';
import { ResponseManager } from '../../common/response-manager.js';
import { EmptyPathParamsError } from '../../common/errors/general-errors.js';
import { container } from '../../common/inversify.config';
import middy from '@middy/core';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpErrorHandler from '@middy/http-error-handler';

@injectable()
export class ArchiveUserHandler implements LambdaInterface {
    private userService: UserServiceImpl;

    public constructor(@inject(TYPES.UserService) userService: UserServiceImpl) {
        this.userService = userService;
    }

    public async handler(
        event: APIGatewayProxyEvent,
        context: Context,
    ): Promise<APIGatewayProxyResult> {
        try {
            const email: string | undefined = event.pathParameters?.email;
            if (email === undefined) {
                return ErrorHandler.handleError(new EmptyPathParamsError('No email path parameter in the request.'));
            }

            await this.userService.archive('userTable', email);
            return ResponseManager.success(200, {
                message: `User with email deleted successfully`,
            });
        } catch (error) {
            return ErrorHandler.handleError(error);
        }
    }
}

const handlerInstance: ArchiveUserHandler = container.resolve(ArchiveUserHandler);
const lambdaHandler = handlerInstance.handler.bind(handlerInstance);

export const archiveUserHandler = middy()
    .use(httpHeaderNormalizer())
    .use(httpErrorHandler())
    .handler(lambdaHandler);
