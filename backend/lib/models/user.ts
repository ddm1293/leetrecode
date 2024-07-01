import { Item } from './common/item.js';
import { IsEmail } from 'class-validator';

export class User extends Item {
    @IsEmail()
    public email: string;
    public password: string;

    constructor(email: string, password: string) {
        super();
        this.email = email;
        this.password = password;
    }

    get pk(): string {
        return `USER#${this.id}`;
    }
    get sk(): string {
        return `USER#METADATA`;
    }
}
