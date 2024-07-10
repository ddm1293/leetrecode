import 'reflect-metadata';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Item } from './item.js';
import { ulid } from 'ulid';
import { validateOrReject } from 'class-validator';
import { hasGSI1 } from './gsi.js';

export class ItemTransformer {
    public static serialize<T extends Item>(item: T): Record<string, unknown> {
        // console.log('Own properties:', Object.keys(item));
        // console.log('Prototype properties:', Object.getOwnPropertyNames(Object.getPrototypeOf(item)));
        const body = Object.fromEntries(
            Object.entries(instanceToPlain(item))
            .filter(value => value[1] !== undefined)
        );
        let itemRecord: Record<string, unknown> = {
            ...body,
            ...item.keys(),
            entityType: item.constructor.name
        };

        if (hasGSI1(item)) {
            itemRecord = {
                ...itemRecord,
                GSI1_PK: item.gsi1_pk(),
                GSI1_SK: item.gsi1_sk(),
            }

        }
        // console.log('see item has GSI1', hasGSI1(item));
        console.log("see item generated in serialize: ", itemRecord);
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
