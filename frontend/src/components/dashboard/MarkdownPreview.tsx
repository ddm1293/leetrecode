import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Markdown } from '../Markdown';

interface MarkdownPreviewProps {
    markdown: string;
    show: boolean;
}

const defaultMarkdownText = `
## 😃 You don't have note for this question! Keep going! (●'◡'●) 
`;

const MarkdownPreview: React.FC<MarkdownPreviewProps> = ({ markdown, show }) => {
    return (
        <Box position="relative" w="full">
            {!show && <Flex className="absolute inset-0 backdrop-blur-sm z-10" justify="center"></Flex>}
            <Markdown text={markdown === '' ? defaultMarkdownText : markdown} />
        </Box>
    );
};

export default MarkdownPreview;
