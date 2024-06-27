import { Service } from './common/service.js';
import { User } from '../models/user.js';

export interface UserService extends Service<User> {}
