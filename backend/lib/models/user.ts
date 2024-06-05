import { Item } from './common/item';

export class User extends Item {
    public userId: string;
    public email: string;
    public password: string;

    constructor(userId: string, email: string, password: string) {
        super();
        this.userId = userId;
        this.email = email;
        this.password = password;
    }

    get pk(): string {
        throw new Error('Method not implemented.');
    }
    get sk(): string {
        throw new Error('Method not implemented.');
    }
    toItem(): Record<any, unknown> {
        throw new Error('Method not implemented.');
    }
}
