import 'reflect-metadata';
import { LambdaInterface } from '@aws-lambda-powertools/commons/lib/cjs/types';
import {
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Context,
} from 'aws-lambda';
import { ResponseManager } from '../../common/response-manager.js';
import { ErrorHandler } from '../../common/errors/error-handler.js';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../common/types.js';
import { container } from '../../common/inversify.config.js';
import { UserServiceImpl } from '../../services/user-service.js';
import { EventParser } from '../../common/event-parser.js';
import { UpdateUserPasswordDto } from '../../models/dto/update-user-password-dto.js';
import { EmptyTableNameError } from '../../common/errors/general-errors.js';

@injectable()
export class UpdateUserPasswordHandler implements LambdaInterface {
    private userService: UserServiceImpl;

    public constructor(@inject(TYPES.UserService) userService: UserServiceImpl) {
        this.userService = userService;
    }

    public async handler(
        event: APIGatewayProxyEvent,
        context: Context,
    ): Promise<APIGatewayProxyResult> {
        try {
            const updateDTO = await EventParser.parseDTOFromString(UpdateUserPasswordDto, event.body);

            const tableName = process.env.TABLE_NAME;
            if (tableName == undefined) {
                return ErrorHandler.handleError(new EmptyTableNameError('Empty dynamoDB table name.'));
            }

            await this.userService.updatePassword(tableName, updateDTO);

            return ResponseManager.success(200, {
                message: 'User password updated successfully',
            });
        } catch (error) {
            return ErrorHandler.handleError(error);
        }
    }
}

const handlerInstance: UpdateUserPasswordHandler = container.resolve(UpdateUserPasswordHandler)
export const updateUserPasswordHandler = handlerInstance.handler.bind(handlerInstance);
