import 'reflect-metadata';
import { User } from '../models/user.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../common/types.js';
import { ItemRepository } from '../repositories/common/item-repository.js';
import { UserService } from './user-service.js';

@injectable()
export class UserServiceImpl implements UserService {
    private repository: ItemRepository;

    public constructor(@inject(TYPES.Repository) repository: ItemRepository) {
        this.repository = repository;
    }

    async findOne(userId: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
    async findOneByEmail(email: string): Promise<User> {

        throw new Error('Method not implemented.');
    }
    async update(userId: string, data: User): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async add(user: User): Promise<User> {

        await this.repository.save(user, 'userTable');

        return user;
    }
    async archive(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
