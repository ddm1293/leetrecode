import { Container } from 'inversify';
import { Repository } from '../repositories/common/repository.js';
import { TYPES } from './types.js';
import { ItemRepository } from '../repositories/common/item-repository.js';
import { DynamoDBClientManager } from './dynamoDB-client/dynamoDB-client-manager.js';
import { UserService } from '../services/user-service.js';
import { UserServiceImpl } from '../services/user-service.js';
import { UserRepository } from '../repositories/user-repository.js';
import { RecordService, RecordServiceImpl } from '../services/record-service.js';
import { RecordRepository } from '../repositories/record-repository.js';
import { SubmissionService, SubmissionServiceImpl } from '../services/submission-service.js';
import { SubmissionRepository } from '../repositories/submission-repository.js';

const container = new Container();
container.bind<DynamoDBClientManager>(DynamoDBClientManager).toSelf();
container.bind<Repository>(TYPES.Repository).to(ItemRepository).inSingletonScope();
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl).inSingletonScope();
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();
container.bind<RecordService>(TYPES.RecordService).to(RecordServiceImpl).inSingletonScope();
container.bind<RecordRepository>(TYPES.RecordRepository).to(RecordRepository).inSingletonScope();
container.bind<SubmissionService>(TYPES.SubmissionService).to(SubmissionServiceImpl).inSingletonScope();
container.bind<SubmissionRepository>(TYPES.SubmissionRepository).to(SubmissionRepository).inSingletonScope();

export { container };
