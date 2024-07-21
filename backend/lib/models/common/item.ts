import { Expose } from 'class-transformer';
import { ulid } from 'ulid';

export abstract class Item {
    @Expose() public id: string;
    abstract get pk(): string;
    abstract get sk(): string;

    protected constructor() {
        this.id = ulid();
    }

    public keys(): Key {
        return {
            PK: this.pk,
            SK: this.sk,
        };
    }

    public setId(id: string): void {
        this.id = id;
    }
}

export interface Key {
    PK: string;
    SK: string;
}
