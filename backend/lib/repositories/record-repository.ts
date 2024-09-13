import { inject, injectable } from 'inversify';
import { ItemRepository } from './common/item-repository.js';
import { DynamoDBClientManager } from '../common/dynamoDB-client/dynamoDB-client-manager.js';
import { QuestionRecord } from '../models/question-record.js';
import { QueryCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { ItemTransformer } from '../models/common/item-transformer.js';
import { FindRecordError, UpdateRecordError } from '../common/errors/record-errors.js';
import { UpdateRecordDto } from '../models/dto/update-record-dto.js';

@injectable()
export class RecordRepository extends ItemRepository<QuestionRecord> {
    constructor(@inject(DynamoDBClientManager) DBClient: DynamoDBClientManager) {
        super(DBClient);
    }

    async updateRecordWithNewSubmission(tableName: string, dto: UpdateRecordDto, nextReviewDate: number): Promise<Record<string, any> | undefined> {
        try {
            const res = await this.client.send(new UpdateCommand({
                TableName: tableName,
                Key: {
                    PK: `USER#${dto.userId}`,
                    SK: `RECORD#${dto.questionId}`
                },
                UpdateExpression: `
                    SET
                        lastReviewDate = :lastReviewDate,
                        nextReviewDate = :nextReviewDate,
                        submissionCount = submissionCount + :incrementCount,
                        updatedAt = :updatedAt,
                        notes = list_append(if_not_exists(notes, :emptyList), :newNotes)
                `,
                ExpressionAttributeValues: {
                    ":lastReviewDate": dto.submissionDate,
                    ":nextReviewDate": nextReviewDate,
                    ":incrementCount": 1,
                    ":updatedAt": new Date().getTime(),
                    ":newNotes": dto.notes ? [dto.notes] : [],
                    ":emptyList": [],
                },
                ReturnValues: "ALL_NEW"
            }));
            console.log("see updated record: ", res.Attributes);
            return res.Attributes;
        } catch (error) {
            console.error(error);
            throw new UpdateRecordError(`Something wrong updating record with ${dto.questionId} in dynamoDB`);
        }
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
