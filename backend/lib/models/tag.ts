import { Item } from './common/item';

export class Tag extends Item {
    public tagId: string;
    public name: string;
    public slug: string;
    public description: string;
    public questions: Array<string>;

    constructor(
        tagId: string,
        name: string,
        slug: string,
        description?: string,
    ) {
        super();
        this.tagId = tagId;
        this.name = name;
        this.slug = slug;
        this.description = description || '';
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
