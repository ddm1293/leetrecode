import { TopicTag } from "./TopigTag";

export interface Question {
    questionId: string;
    title: string;
    translatedTitle?: string;
    difficulty: 'Easy' | 'Hard' | 'Medium';
    url: string;
    translatedUrl: string;
    topicTags?: TopicTag[];
    content: string;
    translatedContent?: string;
}
