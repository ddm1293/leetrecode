import { Item } from './common/item';

export class User extends Item {
  get pk(): string {
    throw new Error('Method not implemented.');
  }
  get sk(): string {
    throw new Error('Method not implemented.');
  }
  toItem(): Record<any, unknown> {
    throw new Error('Method not implemented.');
  }
}
