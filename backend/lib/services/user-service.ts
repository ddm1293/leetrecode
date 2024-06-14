import { Service } from './common/service.js';
import { User } from '../models/user.js';

export class UserService implements Service<User> {
    async findOne(userId: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
    async findOneByEmail(email: string): Promise<User> {
        throw new Error('Method not implemented.');
    }
    async update(userId: string, data: User): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async add(item: User): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async archive(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
