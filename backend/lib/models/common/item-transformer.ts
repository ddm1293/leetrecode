import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Item } from './item.js';
import { ulid } from 'ulid';
import { validateOrReject } from 'class-validator';

export class ItemTransformer {
    public static serialize<T extends Item>(item: T): Record<string, unknown> {
        const itemRecord = {
            ...instanceToPlain(item),
            ...item.keys(),
        };
        // console.log("see item generated in serialize: ", itemRecord);
        return itemRecord;
    }

    public static async deserialize<T extends Item>(className: new (...args: any[]) => T,
                                              item: Record<string, unknown>): Promise<T> {
        const instance: T = plainToInstance(className, item, { excludeExtraneousValues: true });
        if (!instance.id) {
            instance.setId(ulid());
        }
        await validateOrReject(instance);
        // console.log("see item generated in fromItem: ", instance);
        return instance;
    }
}
