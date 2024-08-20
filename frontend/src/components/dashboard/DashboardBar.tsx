import React, { useEffect } from 'react';
import {
    Box,
    Button,
    Flex,
    HStack, Icon,
    IconButton, Input,
    InputGroup, InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Tooltip, Text,
    useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { FiSearch } from 'react-icons/fi';
import { TableAction } from '../../pages/Dashboard';

export interface DashboardBarProps {
    action: TableAction,
    onlyActive: boolean,
    onOpenChange: () => void,
    onActionChange: (action: TableAction) => void,
    onSearchChange: (searchContent: string) => void,
    onSelectedChange: (selected: string[]) => void,
    onOnlyActiveChange: (flag: boolean) => void,
}

const DashboardBar: React.FC<DashboardBarProps> = ({ action, onlyActive, onOpenChange, onActionChange, onSearchChange, onSelectedChange, onOnlyActiveChange }) => {
    const buttonVariant = useColorModeValue("solid", "outline");
    const buttonColor = useColorModeValue("gray", "orange");

    useEffect(() => {
        console.log("see action: ", action)
    }, [])

    const getQuestionText = () => {
        if (action === TableAction.NORMAL) {
            if (onlyActive) {
                return "Only Active";
            } else {
                return "All";
            }
        } else if (action === TableAction.ARCHIVE) {
            return "Only Active";
        } else if (action === TableAction.ACTIVATE) {
            return "Only Archived";
        } else if (action === TableAction.DELETE) {
            return "All";
        } else if (action === TableAction.RESET) {
            return "All";
        }
    };

    return (
        <Box px={{ base: "4", md: "6" }} pt="5">
            <Flex
                direction={{ base: "column", md: "row" }}
                justify="space-between"
                gap={{ md: "none", base: 3 }}
            >
                <Box>
                    <Text fontSize="lg" fontWeight="medium">
                        Leetcode Questions
                    </Text>
                    <Text fontSize="sm" fontWeight="light">
                        Currently Showing: {getQuestionText()} Questions
                    </Text>
                </Box>

                <HStack>
                    {action === TableAction.ARCHIVE && (
                        <Button
                            variant={buttonVariant}
                            colorScheme="red"
                            onClick={() => {
                                onOpenChange();
                                //  TODO
                            }}
                        >
                            Archive
                        </Button>
                    )}

                    {action === TableAction.ACTIVATE && (
                        <Button
                            variant={buttonVariant}
                            colorScheme="green"
                            onClick={() => {
                                onOpenChange();
                            }}
                        >
                            Activate
                        </Button>
                    )}

                    {action === TableAction.DELETE && (
                        <Button
                            variant={buttonVariant}
                            colorScheme="red"
                            onClick={() => {
                                onOpenChange();
                            }}
                        >
                            Delete
                        </Button>
                    )}

                    {action === TableAction.RESET && (
                        <Button
                            variant={buttonVariant}
                            colorScheme="red"
                            onClick={() => {
                                onOpenChange();
                            }}
                        >
                            Reset
                        </Button>
                    )}

                    {action !== TableAction.NORMAL && (
                        <Button
                            variant={buttonVariant}
                            colorScheme={buttonColor}
                            onClick={() => {
                                onActionChange(TableAction.NORMAL);
                                onSelectedChange([]);
                            }}
                        >
                            Cancel
                        </Button>
                    )}

                    {action === TableAction.NORMAL && (
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                aria-label="Options"
                                icon={<HamburgerIcon />}
                                variant="outline"
                            />
                            <MenuList>
                                <MenuItem
                                    onClick={() => {
                                        onOnlyActiveChange(!onlyActive);
                                    }}
                                >
                                    {onlyActive
                                        ? "Show Archived Questions"
                                        : "Only Show Active Questions"}
                                </MenuItem>
                                <Tooltip
                                    placement="right"
                                    label="Archive multiple questions at once"
                                >
                                    <MenuItem
                                        onClick={() => {
                                            onActionChange(TableAction.ARCHIVE);
                                        }}
                                    >
                                        Multi Archive
                                    </MenuItem>
                                </Tooltip>
                                <Tooltip
                                    placement="right"
                                    label="Activate multiple archived questions to active state"
                                >
                                    <MenuItem
                                        onClick={() => {
                                            onActionChange(TableAction.ACTIVATE);
                                        }}
                                    >
                                        Multi Activate
                                    </MenuItem>
                                </Tooltip>
                                <Tooltip
                                    placement="right"
                                    label="Reset multiple questions to stage 1. If the question is archived, it will be reset to active"
                                >
                                    <MenuItem
                                        onClick={() => {
                                            onActionChange(TableAction.RESET);
                                        }}
                                    >
                                        Multi Reset
                                    </MenuItem>
                                </Tooltip>
                                <Tooltip
                                    placement="right"
                                    label="Delete multiple questions at once"
                                >
                                    <MenuItem
                                        onClick={() => {
                                            onActionChange(TableAction.DELETE);
                                        }}
                                    >
                                        Multi Delete
                                    </MenuItem>
                                </Tooltip>
                            </MenuList>
                        </Menu>
                    )}

                    <InputGroup maxW={{ base: "full", md: "xs" }}>
                        <InputLeftElement pointerEvents="none">
                            <Icon as={FiSearch} color="muted" boxSize="5" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search"
                            onChange={(e) => {
                                onSearchChange(e.target.value);
                            }}
                        />
                    </InputGroup>
                </HStack>
            </Flex>
        </Box>
    );
};

export default DashboardBar;
