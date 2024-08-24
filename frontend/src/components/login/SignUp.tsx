import React from 'react';
import {
    Button,
    FormControl, FormErrorMessage, FormLabel,
    Link,
    GridItem,
    Heading, Input,
    ScaleFade,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack,
} from '@chakra-ui/react';
import GoogleButton from './GoogleButton';
import { FormState, validateEmail } from '../../pages/Login';
import { onClickGitHubHandler } from './GitHubLogin';
import { BsGithub } from 'react-icons/bs';
import { AiFillWechat } from 'react-icons/ai';
import { onClickWeChatHandler } from './WechatLogin';
import { signUp } from 'aws-amplify/auth'

interface SignUpProps {
    toggleSignUp: () => void
}

const SignUp: React.FC<SignUpProps> = ({ toggleSignUp }) => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = React.useState<string>("");
    const [emailErrors, setEmailErrors] = React.useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = React.useState<string[]>([]);
    const [formState, setFormState] = React.useState<FormState>("ready");

    const onSubmit = async () => {
        setFormState("saving");
        const emailErrors = [];
        const passwordErrors = [];
        if (!validateEmail(email)) {
            emailErrors.push("Invalid email");
        }
        if (password.length < 6) {
            passwordErrors.push("Password must be at least 6 characters");
        }

        if (password !== passwordConfirm) {
            passwordErrors.push("Password does not match");
        }

        setEmailErrors(emailErrors);
        setPasswordErrors(passwordErrors);

        if (emailErrors.length === 0 && passwordErrors.length === 0) {
            console.log("calling signup amplify")
            // dispatch(signUpUserAsync({ email, password }));
            const output = await signUp({
                username: email,
                password: password
            })
            console.log("see output: ", output)
        }
        setTimeout(() => {
            setFormState("ready");
        }, 1000);
    };

    return (
        <ScaleFade initialScale={0.95} in={true}>
            <VStack w="full" p={10} alignItems="flex-start" bg={useColorModeValue("pink.50", "whiteAlpha.50")}>
                <VStack spacing="3" alignItems="flex-start">
                    <Heading size="xl">Sign up LeetReCode</Heading>
                    <Text>
                        Sign up LeetFlash today to review your LeetCode problem like a
                        flash!
                    </Text>
                </VStack>
                <SimpleGrid pt={3} columns={4} spacingX={2} spacingY={5} w="full">
                    <GridItem colSpan={1}>
                        <GoogleButton />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button
                            size="md"
                            w="full"
                            onClick={onClickGitHubHandler}
                            colorScheme="teal"
                            variant="outline"
                            disabled
                            leftIcon={<BsGithub />}
                        >
                            GitHub
                        </Button>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button
                            disabled
                            size="md"
                            w="full"
                            onClick={onClickWeChatHandler}
                            colorScheme="teal"
                            variant="outline"
                            leftIcon={<AiFillWechat />}
                        >
                            WeChat
                        </Button>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired isInvalid={emailErrors.length !== 0}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                placeholder="Enter your email here"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailErrors.map((error) => (
                                <FormErrorMessage key={error}>{error}</FormErrorMessage>
                            ))}
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired isInvalid={passwordErrors.length !== 0}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                placeholder="Enter your password here"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordErrors.map((error) => (
                                <FormErrorMessage key={error}>{error}</FormErrorMessage>
                            ))}
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired isInvalid={password !== passwordConfirm}>
                            <FormLabel htmlFor="password-again">Confirm Password</FormLabel>
                            <Input
                                placeholder="Enter your password here"
                                type="password"
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                            />
                            <FormErrorMessage>Password does not match</FormErrorMessage>
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Button
                            size="lg"
                            w="full"
                            onClick={onSubmit}
                            isLoading={formState === "saving"}
                            loadingText="Submitting"
                            colorScheme="teal"
                            variant="outline"
                        >
                            Sign Up
                        </Button>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Link onClick={toggleSignUp} href="#">
                            Already have account?
                        </Link>
                    </GridItem>
                </SimpleGrid>
            </VStack>
        </ScaleFade>
    );
};

export default SignUp;
