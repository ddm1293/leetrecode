import { Item } from '../../models/common/item.js';

// TODO: rest params type could be reduced
export interface Service<T extends Item> {
    findOne(userId: string, ...params: string[]): Promise<T>;
    update(userId: string, data: T): Promise<void>;
    add(tableName:string, item: T): Promise<T>;
    archive(tableName: string, key: string): Promise<void>;
}
