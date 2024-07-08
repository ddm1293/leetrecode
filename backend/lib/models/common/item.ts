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

    public setId(id: string): void {
        this.id = id;
    }
}

interface Key {
    PK: string;
    SK: string;
}
