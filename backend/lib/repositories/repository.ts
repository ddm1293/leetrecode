import { Item } from '../models/common/item.js';

export interface Repository {
    save(item: Item, tableName: string): Promise<void>;
    get(pk: string, tableName: string, sk?: string): Promise<Record<string, unknown> | null>;
    delete(pk: string, tableName: string, sk?: string): Promise<void>;
    update(tableName: string, pk: string, expressionConfig: Record<string, any>, sk?: string,): Promise<void>;
}
