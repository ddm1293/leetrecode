import { Item } from '../../models/common/item.js';

// TODO: rest params type could be reduced
export interface Service<T extends Item> {
    findOne(tableName: string, userId: string, ...params: string[]): Promise<T | null>;
    update(userId: string, data: T): Promise<void>;
    add(tableName:string, item: T): Promise<T>;
    archive(tableName: string, key: string): Promise<void>;
}
