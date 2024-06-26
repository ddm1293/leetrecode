import { instanceToPlain, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ulid } from 'ulid';

export abstract class Item {
    public id: string;
    abstract get pk(): string;
    abstract get sk(): string;

    public keys(): Key {
        return {
            PK: this.pk,
            SK: this.sk,
        };
    }

    private setId(id: string): void {
        this.id = id;
    }

    public toItem(): Record<string, unknown> {
        const item = {
            ...instanceToPlain(this),
            ...this.keys()
        };
        console.log("see item generated in toItem: ", item);
        return item;
    }

    public static async fromItem<T extends Item>(
        this: new (...args: any[]) => T,
        item: Record<string, unknown>,
    ): Promise<T> {
        const instance: T = plainToInstance(this, item);
        if (!instance.id) {
            instance.setId(ulid());
        }
        await validateOrReject(instance);
        console.log("see item generated in fromItem: ", instance);
        return instance;
    }
}

interface Key {
    PK: string;
    SK: string;
}
