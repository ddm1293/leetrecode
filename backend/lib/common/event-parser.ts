import { EmptyRequestBodyError, ParseJsonError } from './errors/general-errors.js';
import { ParseUserError } from './errors/user-errors.js';
import { ItemTransformer } from '../models/common/item-transformer.js';
import { Item } from '../models/common/item.js';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

import { AddSubmissionDto } from '../models/dto/add-submission-dto.js';

export class EventParser {
    public static async parse<T extends Item>(className: new (...args: any[]) => T,
                              body: string | null): Promise<T> {
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

    public static async parseDTOFromString<T extends object>(dto: new (...args: any[]) => T , body: string | null) {
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

    public static async parseDTOFromObj<T extends object>(dtoClass: new (...args: any[]) => T, body: unknown): Promise<T> {
        if (!body || typeof body !== 'object') {
            throw new EmptyRequestBodyError('Request body is empty or the request event is not an object');
        }

        const bodyObj: Record<string, unknown> = body as Record<string, unknown>

        try {
            const dto: T = plainToInstance(dtoClass, bodyObj.body, { excludeExtraneousValues: true });
            await validateOrReject(dto);
            return dto;
        } catch (error) {
            if (error instanceof Error) {
                throw new ParseUserError("Failed to parse incoming event into the target object", error);
            } else {
                throw new ParseUserError('Failed to parse incoming event into a DTO object');
            }
        }
    }

    public static async parseAddSubmissionDTO(event: unknown): Promise<AddSubmissionDto> {
        if (!event || typeof event !== 'object') {
            throw new EmptyRequestBodyError('Request body is empty or the request event is not an object');
        }

        const eventObj: Record<string, unknown> = event as Record<string, unknown>

        try {
            const body = eventObj.body as Record<string, unknown>;
            const checkRecordResult: CheckRecordResult = eventObj.checkRecordResult as CheckRecordResult;
            const createRecordResult = eventObj.createRecordResult as CreateRecordResult | undefined;
            const transformedObj = {
                ...body,
                recordExists: checkRecordResult.recordExists,
                record: checkRecordResult.record,
                recordCreated: createRecordResult?.recordCreated ?? null
            }

            const dto: AddSubmissionDto = plainToInstance(AddSubmissionDto, transformedObj, { excludeExtraneousValues: true });
            await validateOrReject(dto);
            return dto;
        } catch (error) {
            if (error instanceof Error) {
                throw new ParseUserError("Failed to parse incoming event into the target object", error);
            } else {
                throw new ParseUserError('Failed to parse incoming event into a DTO object');
            }
        }
    }
}

type CheckRecordResult = {
    recordExists: boolean;
    record: Record<string, unknown> | null
}

type CreateRecordResult = {
    recordCreated: Record<string, unknown> | null
}
