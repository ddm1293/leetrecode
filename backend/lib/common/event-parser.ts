import { EmptyRequestBodyError, ParseJsonError } from './errors/general-errors.js';
import { ParseUserError } from './errors/user-errors.js';
import { ItemTransformer } from '../models/common/item-transformer.js';
import { Item } from '../models/common/item.js';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export class EventParser {
    public static async parse<T extends Item>(className: new (...args: any[]) => T,
                              body: string | null): Promise<T> {
        console.log('see body type', typeof body)
        if (!body) {
            throw new EmptyRequestBodyError(
                'Request body is empty.'
            );
        }

        let parsedBody: Record<string, unknown>;

        try {
            parsedBody = JSON.parse(body);
        } catch (error) {
            throw new ParseJsonError(`Failed to parse body: ${body}`);
        }

        try {
            return await ItemTransformer.deserialize(className, parsedBody);
        } catch (error) {
            if (error instanceof Error) {
                throw new ParseUserError(
                    "Failed to parse incoming event into the target object",
                    error
                );
            } else {
                throw new ParseUserError('Failed to parse incoming event into a User object');
            }
        }
    }

    public static async parseDTO<T extends object>(dto: new (...args: any[]) => T , body: string | null) {
        if (!body) {
            throw new EmptyRequestBodyError('Request body is empty');
        }

        let parsedBody: Record<string, unknown>;

        try {
            parsedBody = JSON.parse(body);
        } catch (error) {
            throw new ParseJsonError(`Failed to parse body: ${body}`);
        }

        try {
            const instance: T = plainToInstance(dto, parsedBody);
            await validateOrReject(instance);
            return instance;
        } catch (error) {
            if (error instanceof Error) {
                throw new ParseUserError(
                    "Failed to parse incoming event into the target object",
                    error
                );
            } else {
                throw new ParseUserError('Failed to parse incoming event into a DTO object');
            }
        }
    }

    public static parseSubmissionDetails(body: string | null) {
        console.log("see body", body);
        if (!body) {
            throw new EmptyRequestBodyError('Request body is empty');
        }

        let parsedBody: Record<string, unknown>;

        try {
            parsedBody = JSON.parse(body);
        } catch (error) {
            throw new ParseJsonError(`Failed to parse body: ${body}`);
        }

        try {
            return {
                email: parsedBody.email,
                questionId: (parsedBody.submissionDetails as SubmissionDetails).question.questionId,
                submissionTime: parsedBody.submissionTime
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new ParseUserError(
                    "Failed to parse incoming event into the target object",
                    error
                );
            } else {
                throw new ParseUserError('Failed to parse incoming event into an object');
            }
        }
    }
}

type Question = {
    questionId: string;
}

type SubmissionDetails = {
    question: Question
}
