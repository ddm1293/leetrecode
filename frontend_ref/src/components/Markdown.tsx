import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { Checkbox, Code, Link, useColorModeValue } from '@chakra-ui/react';
import { Box, Divider, Heading, Text } from '@chakra-ui/react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

type MarkdownProps = {
    text: string;
};

type CodeComponentProps = {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
};

type AnchorComponentProps = {
    href?: string;
    title?: string;
    children?: React.ReactNode;
};

export const Markdown: React.FC<MarkdownProps> = ({ text }) => {
    const codeColor = useColorModeValue('#171923', '#F7FAFC');
    const codeBlockBg = useColorModeValue('gray.100', 'gray.800');
    const blockquoteColor = useColorModeValue('gray.400', 'gray.500');
    let textHack = text;
    if (text.includes('**Output')) {
        textHack = textHack
            .replaceAll('```', '')
            .replaceAll('**Output', '\n**Output')
            .replaceAll('**Explanation', '\n**Explanation');
        textHack = textHack
            .replaceAll('**输入：**', '\n**输入**：')
            .replaceAll('**输出：**', '\n**输出**：')
            .replaceAll('**解释：**', '\n**解释**：');
    }


    return (
        <Box px={3} py={2}>
            <ReactMarkdown
                children={textHack}
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
                urlTransform={(uri: string) => (uri.startsWith('http') ? uri : '')}
                components={{
                    h1: ({ children, ...props }) => (
                        <Box py={2}>
                            <Heading as="h1" pb={2}>
                                {children}
                            </Heading>
                            <Divider />
                        </Box>
                    ),
                    h2: ({ children, ...props }) => (
                        <Box py={2}>
                            <Heading as="h2" size="lg" pb={2}>
                                {children}
                            </Heading>
                            <Divider />
                        </Box>
                    ),
                    h3: ({ children, ...props }) => (
                        <Box py={2}>
                            <Heading as="h3" size="md" pb={2}>
                                {children}
                            </Heading>
                            <Divider />
                        </Box>
                    ),
                    h4: ({ children, ...props }) => (
                        <Box py={2}>
                            <Heading as="h4" size="sm" pb={2}>
                                {children}
                            </Heading>
                            <Divider />
                        </Box>
                    ),
                    h5: ({ children, ...props }) => (
                        <Box py={2}>
                            <Heading as="h5" size="xs" pb={2}>
                                {children}
                            </Heading>
                            <Divider />
                        </Box>
                    ),
                    h6: ({ children, ...props }) => (
                        <Box py={2}>
                            <Heading as="h6" size="xs" pb={2}>
                                {children}
                            </Heading>
                            <Divider />
                        </Box>
                    ),
                    p: ({ children, ...props }) => <Text>{children}</Text>,
                    a: ({ children, href, ...props }: AnchorComponentProps) => (
                        <Link color="orange.400" href={href} target="_blank">
                            {children}
                        </Link>
                    ),
                    code: ({ inline, className, children, ...props }: CodeComponentProps) => {
                        const language = className?.replace('language-', '') || 'plaintext';

                        return inline ? (
                            <Code>{children}</Code>
                        ) : (
                            <SyntaxHighlighter
                                language={language}
                                style={docco}
                                customStyle={{
                                    color: codeColor,
                                    fontSize: '0.9rem',
                                }}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        );
                    },
                    pre: ({ children, ...props }) => (
                        <Box as="pre" w="full" bg={codeBlockBg} p={3}>
                            {children}
                        </Box>
                    ),
                    ul: ({ children, ...props }) => (
                        <Box className="list-inside list-disc" as="ul" py={2}>
                            {children}
                        </Box>
                    ),
                    ol: ({ children, ...props }) => (
                        <Box className="list-decimal indent-2 pl-4" as="ol" py={2}>
                            {children}
                        </Box>
                    ),
                    input: ({ children, checked, ...props }) => (
                        <Checkbox isChecked={checked} pt={1} pr={1}>
                            {children}
                        </Checkbox>
                    ),
                    blockquote: ({ children, ...props }) => (
                        <Box
                            as="blockquote"
                            my={2}
                            p={3}
                            borderLeftWidth={3}
                            borderLeftColor={blockquoteColor}
                        >
                            {children}
                        </Box>
                    ),
                }}
            />
        </Box>
    );
};
