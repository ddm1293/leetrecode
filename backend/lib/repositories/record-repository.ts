import { inject, injectable } from 'inversify';
import { ItemRepository } from './common/item-repository.js';
import { DynamoDBClientManager } from '../common/dynamoDB-client/dynamoDB-client-manager.js';
import { QuestionRecord } from '../models/question-record.js';
import { QueryCommand } from '@aws-sdk/lib-dynamodb';
import { ItemTransformer } from '../models/common/item-transformer.js';
import { FindRecordError } from '../common/errors/record-errors.js';

@injectable()
export class RecordRepository extends ItemRepository<QuestionRecord> {
    constructor(@inject(DynamoDBClientManager) DBClient: DynamoDBClientManager) {
        super(DBClient);
    }

    async findRecordByEmail(tableName: string, email: string, questionId: string) {
        try {
            const res = await this.client.send(new QueryCommand({
                TableName: tableName,
                IndexName: 'GSI1',
                KeyConditionExpression: '#gsi1pk = :email AND #gsi1sk = :questionId',
                ExpressionAttributeNames: {
                    '#gsi1pk': 'GSI1_PK',
                    '#gsi1sk': 'GSI1_SK',
                },
                ExpressionAttributeValues: {
                    ':email': email,
                    ':questionId': questionId,
                },
                Limit: 1
            }))

            if (res.Items && res.Items.length > 0) {
                console.log("see record found in findRecordByEmail", JSON.stringify(res.Items[0], null, 2))
                return ItemTransformer.deserialize(QuestionRecord, res.Items[0]);
            }

            return null;
        } catch (error) {
            console.error(error);
            throw new FindRecordError(`Something wrong find record with ${email} in dynamoDB`);
        }
    }
}
