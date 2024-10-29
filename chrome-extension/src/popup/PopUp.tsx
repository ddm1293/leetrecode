import React from 'react';
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    IconButton,
    LinkBox,
    LinkOverlay, Tab,
    TabList, TabPanel, TabPanels,
    Tabs,
    Tooltip,
} from '@chakra-ui/react';
import { IoSettings } from "react-icons/io5";

function PopUp() {
    return (
        <Flex
            flexDirection='column'
            bg='pink'
            h='100vh'
            w='100vw'
            justify="center"
            align="center"
        >
            <Grid
                templateColumns='repeat(5, 1fr)'
                gap={4}
                w='100%'
                alignItems='center'
            >
                <GridItem colStart={1} colEnd={2}>
                    <LinkBox>
                        <Heading
                            as='h4'
                            size='md'
                            p={4}
                            color='white'
                            textAlign='left'
                        >
                            <LinkOverlay href='http://localhost:3000/'  _hover={{ color: 'pink.300' }}>
                                LeetReCode
                            </LinkOverlay>
                        </Heading>
                    </LinkBox>
                </GridItem>
                <GridItem colStart={5} colEnd={5}>
                    <IconButton
                        p={-2}
                        variant='ghost'
                        color='white'
                        _hover={{ color: 'pink.300' }}
                        aria-label='Settings'
                        size='lg'
                        icon={<IoSettings />}
                    />
                </GridItem>
            </Grid>

            <Box w='95%' pb='6'>
                <Tabs
                    size='sm'
                    colorScheme='pink'
                    isFitted
                >
                    <TabList>
                        <Tab>
                            Today's AC
                        </Tab>
                        <Tab>
                            Today's Review
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            AC
                        </TabPanel>
                        <TabPanel>
                            Review
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Flex>
    )
}

export default PopUp
