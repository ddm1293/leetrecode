import { Item } from './common/item';
import { Tag } from './tag';
import { Difficulty } from './common/difficulty';

export class Question extends Item {
    public questionId: string;
    public title: string;
    public titleSlug: string;
    public content: string;
    public translatedTitle: string;
    public translatedContent: string;
    public difficulty: Difficulty;
    public topicTags: Array<Tag>;

    constructor(
        questionId: string,
        title: string,
        titleSlug: string,
        content: string,
        difficulty: string,
        topicTags: Array<Tag>,
        translatedTitle?: string,
        translatedContent?: string,
    ) {
        super();
        this.questionId = questionId;
        this.title = title;
        this.titleSlug = titleSlug;
        this.content = content;
        this.translatedTitle = translatedTitle || '';
        this.translatedContent = translatedContent || '';
        this.difficulty = Difficulty[difficulty as keyof typeof Difficulty];
        this.topicTags = topicTags;
    }

    get pk(): string {
        throw new Error('Method not implemented.');
    }
    get sk(): string {
        throw new Error('Method not implemented.');
    }
}
