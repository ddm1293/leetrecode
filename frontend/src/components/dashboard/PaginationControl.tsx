import {
    Box,
    Button,
    ButtonGroup,
    HStack,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Text,
    Tooltip,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Card } from '../../models/Card';

interface PaginationControlProps {
    filteredData: Card[],
    page: number,
    rowCount: number,
    onRowCountChange: (n: number) => void,
    onPageChange: (n: number) => void,
}

const PaginationControl: React.FC<PaginationControlProps> = ({
                                                                 filteredData,
                                                                 page,
                                                                 rowCount,
                                                                 onRowCountChange,
                                                                 onPageChange
                                                             }) => {

    const isMobile = useBreakpointValue({ base: true, md: false });
    const buttonVariant = useColorModeValue("solid", "outline");
    const buttonColor = useColorModeValue("gray", "orange");

    return (
        <Box px={{ base: "4", md: "6" }} pb="5">
            <HStack spacing="3" justify="space-between">
                {!isMobile && (
                    <Text color="muted" fontSize="sm">
                        {`Showing ${
                            filteredData.length === 0 ? 0 : page * rowCount + 1
                        } to ${Math.min(
                            (page + 1) * rowCount,
                            filteredData.length
                        )} of ${filteredData.length} results`}
                    </Text>
                )}

                <ButtonGroup
                    spacing="3"
                    justifyContent="space-between"
                    width={{ base: "full", md: "auto" }}
                    variant="secondary"
                >
                    <Menu>
                        <Tooltip
                            label="Row per page"
                            placement="top"
                            hasArrow
                            rounded="md"
                        >
                            <MenuButton
                                as={Button}
                                variant="outline"
                                rightIcon={<ChevronDownIcon />}
                            >
                                {rowCount}
                            </MenuButton>
                        </Tooltip>
                        <MenuList>
                            {[5, 10, 25, 50, 100].map((count) => (
                                <MenuItem
                                    key={count}
                                    onClick={() => {
                                        onRowCountChange(count);
                                    }}
                                >
                                    {count}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Button
                        variant={buttonVariant}
                        colorScheme={buttonColor}
                        onClick={() => {
                            onPageChange(Math.max(0, page - 1));
                        }}
                    >
                        Previous
                    </Button>
                    <Button
                        variant={buttonVariant}
                        colorScheme={buttonColor}
                        onClick={() => {
                            onPageChange(
                                Math.min(
                                    Math.ceil(filteredData.length / rowCount) - 1,
                                    page + 1
                                )
                            );
                        }}
                    >
                        Next
                    </Button>
                </ButtonGroup>
            </HStack>
        </Box>
    );
};

export default PaginationControl;
