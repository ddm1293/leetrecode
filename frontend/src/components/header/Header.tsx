import React from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    LightMode,
    HStack,
    DarkMode,
    IconButton,
    Stack, Tooltip, useDisclosure, useColorMode,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { AiFillGithub } from 'react-icons/ai';
import logo from "../../assets/logo.png";
import { MdDarkMode, MdSettingsSuggest } from 'react-icons/md';
import { FaLanguage } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AuthButton from './AuthButton';

const links = [
    {
        name: "Dashboard",
        link: "/dashboard",
    },
    {
        name: "Daily Review",
        link: "/review",
    },
    // {
    //   name: 'Setting',
    //   link: '/setting',
    // },
    {
        name: "Tutorial",
        link: "/tutorial",
    },
];

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());
    const { toggleColorMode } = useColorMode();
    const navigate = useNavigate();

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            px="1rem"
            py={2}
            bg="pink.300"
            color="white"
            pos="sticky"
            top="0"
            minH="4rem"
            zIndex={1}
        >
            <Flex align="center" mr={5}>
                <Heading
                    as="button"
                    size="lg"
                    letterSpacing={"tighter"}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    <HStack>
                        <Image boxSize="2.2rem" borderRadius="full" src={logo} />
                        <Text>LeetReCode</Text>
                    </HStack>
                </Heading>
            </Flex>

            <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
                <DarkMode>
                    <IconButton icon={<HamburgerIcon />} aria-label={"icon"} />
                </DarkMode>
            </Box>

            <Stack
                direction={{ base: "column", md: "row" }}
                textAlign="center"
                display={{ base: isOpen ? "block" : "none", md: "flex" }}
                width={{ base: "full", md: "auto" }}
                alignItems="center"
                flexGrow={1}
                spacing={{ base: 2, md: 5 }}
                mt={{ base: 4, md: 0 }}
                fontSize="lg"
                fontWeight="semibold"
            >
                {links.map((link, index) => (
                    <Link to={link.link} key={`link=${index}`}>
                        <Box
                            _hover={{ bg: "pink.700", borderColor: "pink.700" }}
                            p={2}
                            rounded="md"
                        >
                            {link.name}
                        </Box>
                    </Link>
                ))}
            </Stack>

            <Box
                display={{ base: isOpen ? "block" : "none", md: "block" }}
                mt={{ base: 4, md: 0 }}
                w={{ base: "full", md: "auto" }}
                transition="all 0.5s"
            >
                <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={3}
                    align="center"
                >
                    <Tooltip hasArrow label="Github Repository" placement="auto-start">
                        <IconButton
                            as="a"
                            variant="ghost"
                            display={{ base: "none", lg: "inherit" }}
                            _hover={{ bg: "pink.700", borderColor: "pink.700" }}
                            aria-label="Repository"
                            icon={<AiFillGithub size={28} />}
                            href="https://github.com/ddm1293/leetrecode"
                            target="_blank"
                            rel="noopener noreferrer"
                        />
                    </Tooltip>

                    <Tooltip hasArrow label="Settings" placement="auto-start">
                        <IconButton
                            variant="ghost"
                            display={{ base: "none", lg: "inherit" }}
                            _hover={{ bg: "pink.700", borderColor: "pink.700" }}
                            aria-label="Settings"
                            icon={<MdSettingsSuggest size={28} />}
                            // onClick={onSettingsOpen}
                        />
                    </Tooltip>

                    <Tooltip
                        hasArrow
                        // label={
                        //     user.lang === "EN" ? "Switch to Chinese" : "Switch to English"
                        // }
                        label="Switch to Chinese"
                        placement="auto-start"
                    >
                        <IconButton
                            variant="ghost"
                            display={{ base: "none", lg: "inherit" }}
                            _hover={{ bg: "pink.700", borderColor: "pink.700" }}
                            aria-label="Switch language"
                            icon={<FaLanguage size={28} />}
                            // onClick={switchLang}
                        />
                    </Tooltip>

                    <Tooltip hasArrow label="Dark mode" placement="auto-start">
                        <IconButton
                            variant="ghost"
                            display={{ base: "none", lg: "inherit" }}
                            _hover={{ bg: "pink.700", borderColor: "pink.700" }}
                            aria-label="Switch language"
                            icon={<MdDarkMode size={28} />}
                            onClick={toggleColorMode}
                        />
                    </Tooltip>

                    <LightMode>
                        <AuthButton />
                    </LightMode>
                </Stack>
            </Box>
            {/*<Setting*/}
            {/*    isSettingsOpen={isSettingsOpen}*/}
            {/*    onSettingsOpen={onSettingsOpen}*/}
            {/*    onSettingsClose={onSettingsClose}*/}
            {/*/>*/}
        </Flex>
    );
};

export default Header;
