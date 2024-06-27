import { Item } from '../../models/common/item.js';
import { PutCommandOutput } from '@aws-sdk/lib-dynamodb';

// TODO: rest params type could be reduced
export interface Service<T extends Item> {
    findOne(userId: string, ...params: string[]): Promise<T>;
    update(userId: string, data: T): Promise<void>;
    add(body: string | null): Promise<T>;
    archive(id: string): Promise<void>;
}
