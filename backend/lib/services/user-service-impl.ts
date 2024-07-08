import 'reflect-metadata';
import { User } from '../models/user.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../common/types.js';
import { UserService } from './user-service.js';
import { UserRepository } from '../repositories/user-repository.js';
import {
    ArchiveUserError, DeleteNonExistentUserError, EmailHasBeenRegisteredError, IdenticalPasswordError,
    PersistUserError, UpdateUserError,
    UserAlreadyExistsError,
    UserNotFoundError,
} from '../common/errors/user-errors.js';
import { Key } from '../models/common/item.js';
import { UpdateUserEmailDto } from '../models/dto/update-user-email-dto.js';
import { UpdateUserPasswordDto } from '../models/dto/update-user-password-dto';

@injectable()
export class UserServiceImpl implements UserService {
    private readonly repository: UserRepository;

    public constructor(@inject(TYPES.UserRepository) repository: UserRepository) {
        this.repository = repository;
    }

    async findOne(userId: string): Promise<User> {
        throw new Error('Method not implemented.');
    }

    async findOneByEmail(tableName:string, email: string): Promise<User> {
        const user: User | null = await this.repository.findUserByEmail(tableName, email);
        if (!user) {
            throw new UserNotFoundError(`User with ${email} not found`);
        }
        return user;
    }

    async update(userId: string, data: User): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async add(tableName: string, user: User): Promise<User> {
        const checkUser = await this.repository.findUserByEmail(tableName, user.email);
        if (checkUser) {
            throw new UserAlreadyExistsError(`This user with email: ${user.email} already exists`);
        }

        try {
            await this.repository.save(user, tableName);
            return user;
        } catch (error) {
            console.error(error);
            throw new PersistUserError('Failed to save the user into DB')
        }

    }

    async archive(tableName: string, email: string): Promise<void> {
        const user: User | null = await this.repository.findUserByEmail(tableName, email);
        if (!user) {
            throw new DeleteNonExistentUserError(`User with email ${email} does not exist, cannot be deleted`);
        }

        try {
            const key: Key = user.keys();
            await this.repository.archive(tableName, key);
        } catch (error) {
            console.error(error);
            throw new ArchiveUserError('Failed to archive the user into DB')
        }
    }

    async updateEmail(tableName: string, updateDTO: UpdateUserEmailDto) {
        const user: User | null = await this.repository.findUserByEmail(tableName, updateDTO.currentEmail);
        if (!user) {
            throw new UserNotFoundError(`User with email ${updateDTO.currentEmail} does not exist, cannot be updated`);
        }

        const checkEmailExistence = await this.repository.findUserByEmail(tableName, updateDTO.newEmail);
        if (checkEmailExistence) {
            throw new EmailHasBeenRegisteredError(`Email ${updateDTO.newEmail} is already registered`);
        }

        try {
            const key: Key = user.keys();
            await this.repository.updateEmail(tableName, key, updateDTO.newEmail);
        } catch (error) {
            console.error(error);
            throw new UpdateUserError('Failed to update the user email')
        }
    }


    async updatePassword(tableName: string, updateDTO: UpdateUserPasswordDto) {
        const user: User | null = await this.repository.findUserByEmail(tableName, updateDTO.currentEmail);
        if (!user) {
            throw new UserNotFoundError(`User with email ${updateDTO.currentEmail} does not exist, cannot be updated.`);
        }

        const currentPassword = user.password;
        if (currentPassword == updateDTO.newPassword) {
            throw new IdenticalPasswordError('The new password input is identical with the current password.')
        }

        try {
            const key: Key = user.keys();
            await this.repository.updatePassword(tableName, key, updateDTO.newPassword);
        } catch (error) {
            console.error(error);
            throw new UpdateUserError('Failed to update the user password')
        }
    }
}
