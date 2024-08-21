export interface TopicTag {
  name: string;

  translatedName?: string;
}

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

export interface Card {
  question: Question;

  next_rep_date: Date;

  stage: number;

  total_stages: number[];

  is_archived: boolean;

  last_rep_date: Date;

  created_at: Date;

  id: string;

  note?: string;

  code?: string;

  lang: string;

  rawMemory: number;

  runtime: number;
}

export const TopicTag_BinaryTree: TopicTag = {
  name: "BinaryTree",
  translatedName: "二叉树"
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

export const mockCard: Card = {
  question: Question98,
  next_rep_date: new Date(),
  stage: 0,
  total_stages: [0, 1, 2],
  is_archived: false,
  last_rep_date: new Date(),
  created_at: new Date(),
  id: "98_123",
  note: "note placeholder",
  code: "# Definition for a binary tree node.\n# class TreeNode(object):\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution(object):\n    def __init__(self):\n        self.list = []\n\n    def traverse(self, root):\n        if (root is None):\n            return\n        self.traverse(root.left)\n        self.list.append(root.val)\n        self.traverse(root.right)\n\n    def isValidBST(self, root):\n        \"\"\"\n        :type root: TreeNode\n        :rtype: bool\n        \"\"\"\n        self.traverse(root)\n        for i in range(1, len(self.list)):\n            if (self.list[i] <= self.list[i - 1]):\n                return False\n        return True\n        \n        \n",
  lang: "python",
  rawMemory: 16380000,
  runtime: 29
}
