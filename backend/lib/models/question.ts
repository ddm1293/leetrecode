import { Item } from './common/item';

export class Question extends Item {
  public questionId: string;
  public questionFrontendId: string;
  public title: string;
  public titleSlug: string;
  public content: string;
  public translatedTitle: string;
  public translatedContent: string;
  public difficulty: string;
  public topicTags: Array<object>;

  constructor() {
    super();
  }

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
