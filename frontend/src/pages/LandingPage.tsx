import React from 'react';
import { Box, Button, Flex, Heading, Text, Image, LightMode } from '@chakra-ui/react';
import LangPageIllustration from '../assets/LandingPageIllustration.png'


const LandingPage = () => {
    return (
        <Box minH="calc(100vh - 4rem)" bg="pink.300" px="2rem">
            <Flex
                direction={{ base: "column", xl: "row" }}
                pt={{ base: "8rem" }}
                align="center"
                justify={{ lg: "space-between" }}
                gap={{ base: 14, xl: 0 }}
            >
                <Flex
                    textAlign={{ base: "center", xl: "left" }}
                    direction="column"
                    flexGrow={5}
                    align={{ base: "center", xl: "flex-start" }}
                    gap={6}
                >
                    <Heading
                        fontSize={{ base: "4xl", md: "5xl" }}
                        color="white"
                        maxW={{ base: "35rem", lg: "45rem", xl: "50rem" }}
                    >
                        LeetReCode: A reliable flashcard app for reviewing LeetCode
                    </Heading>
                    <Text
                        color="white"
                        fontSize={{ base: "sm", md: "md", xl: "lg" }}
                        maxW={{ base: "32rem", md: "36rem", xl: "45rem" }}
                        fontWeight="semibold"
                    >
                        Submitted a solution that takes you half an hour to craft, only to forget it the next week?
                        Try LeetReCode to keep your memory fresh!
                    </Text>
                    <LightMode>
                        <Button
                            // onClick={handleClick}
                            variant="solid"
                            colorScheme="green"
                            h={{ base: "3.5rem", xl: "4rem" }}
                            w={{ base: "14rem", xl: "16rem" }}
                            fontSize="md"
                        >
                            It's free for everyone :)
                        </Button>
                    </LightMode>
                </Flex>
                <Box
                    w={{ base: "36rem", xl: "100%" }}
                    maxW="39rem"
                    flexGrow={1}
                    flexShrink={3}
                    p={2}
                >
                    <Image
                        src={LangPageIllustration}
                        alt=""
                    />
                </Box>
            </Flex>
        </Box>
    );
};

export default LandingPage;
