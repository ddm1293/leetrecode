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
import { UpdateUserEmailDto } from '../../models/dto/update-user-email-dto.js';

@injectable()
export class UpdateUserEmailHandler implements LambdaInterface {
    private userService: UserServiceImpl;

    public constructor(@inject(TYPES.UserService) userService: UserServiceImpl) {
        this.userService = userService;
    }

    public async handler(
        event: APIGatewayProxyEvent,
        context: Context,
    ): Promise<APIGatewayProxyResult> {
        try {
            const updateDTO = await EventParser.parseDTO(UpdateUserEmailDto, event.body);

            await this.userService.updateEmail('userTable', updateDTO);

            return ResponseManager.success(200, {
                message: 'User email updated successfully',
            });
        } catch (error) {
            return ErrorHandler.handleError(error);
        }
    }
}

const handlerInstance: UpdateUserEmailHandler = container.resolve(UpdateUserEmailHandler)
export const updateUserEmailHandler = handlerInstance.handler.bind(handlerInstance);
