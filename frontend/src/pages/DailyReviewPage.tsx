import React, { useState } from 'react';
import { Box, Container, Divider, Flex, Heading, Stack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { Card } from '../models/Card';
import { MdFactCheck } from 'react-icons/md';

const DailyReviewPage = () => {
    const [questions, setQuestions] = useState<Card[]>([]);

    return (
        <Flex w="full">
            <Container maxW={questions.length > 0 ? "container.2xl" : "container.lg"}>
                <Stack spacing={2} py={6}>
                    <Heading size="lg" fontWeight="medium">
                        Daily Review
                    </Heading>
                    <Text>Review problems due today</Text>
                    <Divider bgColor={useColorModeValue("gray.300", "gray.700")} />
                </Stack>

                <Box
                    rounded="md"
                    boxShadow={useColorModeValue("lg", "lg-dark")}
                    bg={useColorModeValue("white", "gray.900")}
                    mb={10}
                >


                    {questions.length === 0 && (
                        <Flex justify="center" align="center" h={"40vh"}>
                            <VStack>
                                <MdFactCheck className="w-12 h-12 text-green-500" />
                                <Text fontSize="xl" fontWeight="semibold">
                                    🎉 There's no more problems needed to be reviewed. Good job 👏
                                </Text>
                            </VStack>
                        </Flex>
                    )}
                </Box>
            </Container>
        </Flex>
    );
};

export default DailyReviewPage;
