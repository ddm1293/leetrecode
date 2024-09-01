import 'reflect-metadata';
import { LambdaInterface } from '@aws-lambda-powertools/commons/lib/cjs/types';
import { Context, } from 'aws-lambda';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../common/types.js';
import { container } from '../../common/inversify.config.js';
import { RecordServiceImpl } from '../../services/record-service.js';

@injectable()
export class UpdateRecordLambda implements LambdaInterface {
    private recordService: RecordServiceImpl;

    public constructor(@inject(TYPES.RecordService) recordService: RecordServiceImpl) {
        this.recordService = recordService;
    }

    public async handler(
        event: unknown,
        context: Context,
    ): Promise<Record<string, unknown>> {
        try {
            console.log('update record, see event', event);
            return  {
                recordCreated: 'for now'
            };
        } catch (error) {
            console.error(error);
            return { error: error }
        }
    }
}

const handlerInstance: UpdateRecordLambda = container.resolve(UpdateRecordLambda)
export const updateRecordHandler = handlerInstance.handler.bind(handlerInstance);
