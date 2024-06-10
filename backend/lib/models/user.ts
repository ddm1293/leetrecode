import { Item } from './common/item.js';
import { IsEmail } from 'class-validator';

export class User extends Item {
    public userId: string;
    @IsEmail()
    public email: string;
    public password: string;

    constructor(userId: string, email: string, password: string) {
        super();
        this.userId = userId;
        this.email = email;
        this.password = password;
    }

    get pk(): string {
        return `USER#${this.userId}`;
    }
    get sk(): string {
        return `USER#METADATA`;
    }
}
