import { Item } from './common/item';

export class List extends Item {
    public listId: string;
    public listName: string;
    public questions: Array<string>;

    constructor(listId: string, listName: string, questions: Array<string>) {
        super();
        this.listId = listId;
        this.listName = listName;
        this.questions = questions;
    }

    get pk(): string {
        throw new Error('Method not implemented.');
    }
    get sk(): string {
        throw new Error('Method not implemented.');
    }
}
