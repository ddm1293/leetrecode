import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import { Card, mockCard } from '../models/Card';
import QuestionTable from '../components/dashboard/QuestionTable';
import PaginationControl from '../components/dashboard/PaginationControl';
import { useNavigate } from 'react-router-dom';
import { useCurrentUserHook } from '../hooks/currentUserHook';

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
    const [order, setOrder] = useState(0);
    const [orderCol, setOrderCol] = useState(4);
    const [page, setPage] = useState<number>(0);
    const [rowCount, setRowCount] = useState<number>(10);
    const [questions, setQuestions] = useState<Card[]>([]);

    const compareFn = useRef<(a: Card, b: Card) => number>((a, b) => 0);

    const containerBg = useColorModeValue("white", "gray.900");

    const filteredData: Card[] = [ mockCard ];

    const paginatedData: Card[] = useMemo(() => {
        return filteredData.slice(page * rowCount, (page + 1) * rowCount);
    }, [filteredData, page, rowCount]);

    const handleSortTable = (col: number, order: number, compare: any) => {
        compareFn.current = compare;
        setOrderCol(col);
        setOrder(order);
    };

    const updateCard = (id: string, newCard: Card) => {
        console.log(id);
        setQuestions(
            questions.map((card) => {
                if (card.id === id) {
                    return newCard;
                }
                return card;
            })
        );
    };

    const appendSelected = (id: string) => {
        setSelected((prevSelected) => [...prevSelected, id]);
        console.log(`appending ${id}`);
    };

    const removeSelected = (id: string) => {
        setSelected((prevSelected) => prevSelected.filter((s) => s !== id));
        console.log(`removing ${id}`);
    };

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

                        <Box overflowX="auto">
                            <QuestionTable
                                order={order}
                                orderCol={orderCol}
                                cards={paginatedData}
                                onSort={handleSortTable}
                                setCard={updateCard}
                                appendSelected={appendSelected}
                                removeSelected={removeSelected}
                                tableAction={action}
                                selected={selected}
                            />
                        </Box>

                        <PaginationControl
                            filteredData={filteredData}
                            page={page}
                            rowCount={rowCount}
                            onRowCountChange={(n) => setRowCount(n)}
                            onPageChange={(n: number) => setPage(n)}
                        />
                    </Stack>
                </Box>
            </Container>
        </Flex>
    );
};

export default Dashboard;
