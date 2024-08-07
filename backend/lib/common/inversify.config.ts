import { Container } from 'inversify';
import { Repository } from '../repositories/common/repository.js';
import { TYPES } from './types.js';
import { ItemRepository } from '../repositories/common/item-repository.js';
import { DynamoDBClientManager } from './dynamoDB-client/dynamoDB-client-manager.js';
import { UserService } from '../services/user-service.js';
import { UserServiceImpl } from '../services/user-service-impl.js';
import { UserRepository } from '../repositories/user-repository.js';


const container = new Container();
container.bind<DynamoDBClientManager>(DynamoDBClientManager).toSelf();
container.bind<Repository>(TYPES.Repository).to(ItemRepository).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl).inSingletonScope();
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();

export { container };
