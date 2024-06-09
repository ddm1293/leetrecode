import { Item } from './common/item.js';

export class List extends Item {
    public listId: string;
    public listName: string;
    public questions: string[];

    constructor(listId: string, listName: string, questions: string[]) {
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
