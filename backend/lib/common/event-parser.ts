import { EmptyRequestBodyError } from './errors/general-errors.js';
import { ParseUserError } from './errors/user-errors.js';
import { ItemTransformer } from '../models/common/item-transformer.js';
import { Item } from '../models/common/item.js';

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
                    "Failed to parse incoming event into a User object",
                    error
                );
            } else {
                throw new ParseUserError('Failed to parse incoming event into a User object');
            }
        }
    }
}
