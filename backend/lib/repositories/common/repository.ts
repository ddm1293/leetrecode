import { Item, Key } from '../../models/common/item.js';

export interface Repository<T extends Item> {
    save(item: Item, tableName: string): Promise<void>;
    get(tableName: string, className: new (...args: any[]) => T, pk: string, sk?: string): Promise<T | null>;
    delete(pk: string, tableName: string, sk?: string): Promise<void>;
    archive(tableName: string, key: Key): Promise<void>;
    update(tableName: string, pk: string, expressionConfig: Record<string, any>, sk?: string,): Promise<void>;
}
