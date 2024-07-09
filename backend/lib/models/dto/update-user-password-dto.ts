import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserPasswordDto {
    @IsOptional() @IsEmail() currentEmail: string;
    @IsOptional() @IsString() newPassword: string;
}
