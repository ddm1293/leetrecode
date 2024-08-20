import React, { useState } from 'react';
import {
    Box,
    Container,
    Divider,
    Flex,
    Heading,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue, useDisclosure,
} from '@chakra-ui/react';
import DashboardBar from '../components/dashboard/DashboardBar';

export enum TableAction {
    NORMAL,
    DELETE,
    ARCHIVE,
    ACTIVATE,
    RESET,
}

const Dashboard = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [action, setAction] = useState<TableAction>(TableAction.NORMAL);
    const [onlyActive, setOnlyActive] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [selected, setSelected] = useState<string[]>([]);

    const containerBg = useColorModeValue("white", "gray.900");

    return (
        <Flex direction="row" justify="center" pb={4} >
            <Container maxW="container.xl" >
                <Stack spacing={2} py={6}>
                    <Heading size="lg" fontWeight="medium" >
                        Dashboard
                    </Heading>
                    <Text>View problems you have submitted</Text>
                    <Divider bgColor={useColorModeValue("gray.300", "gray.700")} />
                </Stack>

                <Box
                    bg={containerBg}
                    boxShadow={useColorModeValue("md", "md-dark")}
                    borderRadius={useBreakpointValue({ base: "none", md: "lg" })}
                >
                    <Stack spacing="5">
                        <DashboardBar
                            action={action}
                            onlyActive={onlyActive}
                            onOpenChange={onOpen}
                            onActionChange={(newAction) => setAction(newAction)}
                            onSearchChange={(search) => setSearch(search)}
                            onSelectedChange={(selected) => setSelected(selected)}
                            onOnlyActiveChange={(onlyActive) => setOnlyActive(onlyActive)}
                        />




                    </Stack>
                </Box>
            </Container>
        </Flex>
    );
};

export default Dashboard;
