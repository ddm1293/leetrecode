import { Item } from './common/item';

export class Submission extends Item {
  public submissionId: string;
  public runtime: number;
  public memory: string;
  public code: string;
  public userId: string;
  public lang: string;
  public questionId: string;
  readonly metaData: string;


  constructor(submissionId: string, runtime: number, memory: string, code: string, userId: string, lang: string, questionId: string, metaData: string) {
    super();
    this.submissionId = submissionId;
    this.runtime = runtime;
    this.memory = memory;
    this.code = code;
    this.userId = userId;
    this.lang = lang;
    this.questionId = questionId;
    this.metaData = metaData;
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
