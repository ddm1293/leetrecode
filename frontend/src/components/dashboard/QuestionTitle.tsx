import React, { useState } from 'react';
import { Card } from '../../models/Card';
import {
    HStack,
    Link,
    Popover,
    PopoverArrow, PopoverBody,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    Text,
} from '@chakra-ui/react';
import MarkdownPreview from './MarkdownPreview';
import TurndownService from 'turndown';

interface QuestionTitleProps {
    card: Card,
    lang: string
}

const turnDownService = new TurndownService();

turnDownService.addRule('code', {
    filter: 'pre',
    replacement: (content: string) => {
        return `\`\`\` ${content} \`\`\``;
    },
});

const htmlToMarkdown = (html: string) => {
    return turnDownService.turndown(html);
};

const QuestionTitle: React.FC<QuestionTitleProps> = ({ card, lang }) => {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <HStack w={350}>
            <Text>{`${card.question.questionId}.`}</Text>
            <Popover
                placement="right"
                returnFocusOnClose={false}
                isOpen={isOpen}
                onClose={close}
            >
                <PopoverTrigger>
                    <Link
                        isExternal
                        href={
                            lang === "EN" ? card.question.url : card.question.translatedUrl
                        }
                        _focus={{}}
                        _hover={{
                            textColor: "blue.500",
                            textDecoration: "underline",
                        }}
                        onMouseEnter={open}
                        onMouseLeave={close}
                    >
                        <Text fontWeight="semibold" as={card.is_archived ? "del" : "p"}>
                            {lang === "EN"
                                ? card.question.title
                                : card.question.translatedTitle}
                        </Text>
                    </Link>
                </PopoverTrigger>
                <PopoverContent
                    display={isOpen ? "block" : "none"}
                    minW={"50rem"}
                    maxH={"50rem"}
                    overflow="hidden"
                >
                    <PopoverArrow />
                    <PopoverHeader fontWeight="semibold">Question Prompt</PopoverHeader>
                    <PopoverBody>
                        <MarkdownPreview
                            show={true}
                            markdown={htmlToMarkdown(
                                lang === "EN"
                                    ? card.question.content
                                    : card.question.translatedContent || ""
                            )}
                        />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </HStack>
    );
};

export default QuestionTitle;
