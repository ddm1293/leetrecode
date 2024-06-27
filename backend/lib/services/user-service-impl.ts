import 'reflect-metadata';
import { User } from '../models/user.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../common/types.js';
import { ItemRepository } from '../repositories/item-repository.js';
import { UserService } from './user-service.js';
import { EmptyRequestBodyError } from '../common/errors/general-errors.js';
import { ParseUserError } from '../common/errors/user-errors.js';

@injectable()
export class UserServiceImpl implements UserService {
    private repository: ItemRepository;

    public constructor(@inject(TYPES.Repository) repository: ItemRepository) {
        console.log("Initializing UserServiceImpl");
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
    async add(body: string | null): Promise<User> {
        const user: User = await this.parseEventIntoUser(body);

        await this.repository.save(user, 'userTable');

        return user;
    }
    async archive(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    private async parseEventIntoUser(body: string | null): Promise<User> {
        if (!body || typeof body !== 'object') {
            throw new EmptyRequestBodyError(
                'Request body is empty, potentially due to middy failing parsing incoming event'
            );
        }

        try {
            return await User.fromItem(body as Record<string, unknown>,);
        } catch (error) {
            if (error instanceof Error) {
                throw new ParseUserError(
                    "Failed to parse incoming event into a User object",
                    error
                );
            } else {
                throw new ParseUserError('Failed to parse incoming event into a User object');
            }
        }
    }
}
