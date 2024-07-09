import { Expose } from 'class-transformer';

export abstract class Item {
    @Expose() public id: string;
    abstract get pk(): string;
    abstract get sk(): string;

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
