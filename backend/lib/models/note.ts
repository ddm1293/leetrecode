import { Item } from './common/item';

export class Note extends Item {
    public noteId: string;
    public title?: string;
    public content: string;
    public createdAt: Date;
    public updatedAt: Date;
    public noteType: string;


    constructor(noteId: string,
                content: string,
                createdAt: Date,
                updatedAt: Date,
                noteType: string,
                title?: string) {
        super();
        this.noteId = noteId;
        this.title = title || '';
        this.content = content;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.noteType = noteType;
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
