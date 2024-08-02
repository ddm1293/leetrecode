import { Item } from './common/item.js';
import { IsEmail } from 'class-validator';
import { Expose } from 'class-transformer';
import { Gsi1 } from './common/gsi.js';

export class User extends Item implements Gsi1 {
    @IsEmail() @Expose() public email: string;
    @Expose() public password: string;

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

    public gsi1_pk(): string {
        return this.email;
    }

    public gsi1_sk(): string {
        return this.email;
    }
}
