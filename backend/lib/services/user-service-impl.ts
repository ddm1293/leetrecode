import 'reflect-metadata';
import { User } from '../models/user.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../common/types.js';
import { UserService } from './user-service.js';
import { UserRepository } from '../repositories/user-repository.js';
import {
    ArchiveUserError, DeleteNonExistentUserError,
    PersistUserError,
    UserAlreadyExistsError,
    UserNotFoundError,
} from '../common/errors/user-errors.js';
import { Key } from '../models/common/item.js';

@injectable()
export class UserServiceImpl implements UserService {
    private readonly repository: UserRepository;

    public constructor(@inject(TYPES.UserRepository) repository: UserRepository) {
        this.repository = repository;
    }

    async findOne(userId: string): Promise<User> {
        throw new Error('Method not implemented.');
    }

    async findOneByEmail(tableName:string, email: string): Promise<User | null> {
        return this.repository.findUserByEmail(tableName, email);
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
}
