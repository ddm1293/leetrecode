import { Item } from './common/item.js';

export class Note extends Item {
    public noteId: string;
    public title?: string;
    public content: string;
    public noteType: string;

    constructor(
        noteId: string,
        content: string,
        createdAt: Date,
        updatedAt: Date,
        noteType: string,
        title?: string,
    ) {
        super();
        this.noteId = noteId;
        this.title = title || '';
        this.content = content;
        this.noteType = noteType;
    }

    get pk(): string {
        throw new Error('Method not implemented.');
    }
    get sk(): string {
        throw new Error('Method not implemented.');
    }
}
