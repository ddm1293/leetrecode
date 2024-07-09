import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserEmailDto {
    @IsOptional() @IsEmail() currentEmail: string;
    @IsOptional() @IsEmail() newEmail: string;
}
