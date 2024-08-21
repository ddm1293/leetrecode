import { TopicTag, TopicTag_BinaryTree } from './TopigTag';

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

export const Question98: Question = {
    questionId: "98",
    title: "validate binary search tree",
    translatedTitle: "验证二分搜索树",
    difficulty: "Medium",
    url: "https://leetcode.com/problems/validate-binary-search-tree/",
    translatedUrl: "",
    topicTags: [
        TopicTag_BinaryTree
    ],
    content: "PlaceHolder",
    translatedContent: "PlaceHolder"
}
