import { EmptyRequestBodyError } from './errors/general-errors.js';
import { ParseUserError } from './errors/user-errors.js';
import { ItemTransformer } from '../models/common/item-transformer.js';
import { Item } from '../models/common/item.js';
import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';

export class EventParser {
    public static async parse<T extends Item>(className: new (...args: any[]) => T,
                              body: string | null): Promise<T> {
        if (!body || typeof body !== 'object') {
            throw new EmptyRequestBodyError(
                'Request body is empty, potentially due to middy failing parsing incoming event'
            );
        }

        try {
            return await ItemTransformer.deserialize(className, body as Record<string, unknown>);
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
        console.log('see body', body);
        if (!body || typeof body !== 'object') {
            throw new EmptyRequestBodyError(
                'Request body is empty, potentially due to middy failing parsing incoming event'
            );
        }

        try {
            const instance: T = plainToInstance(dto, body as Record<string, unknown>);
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
}
