import React from 'react';
import {
    ScaleFade,
    VStack,
    Text,
    Heading,
    SimpleGrid,
    GridItem,
    Button,
    FormControl,
    FormLabel, Input, FormErrorMessage,
    Link, useColorModeValue,
} from '@chakra-ui/react';
import GoogleButton from './GoogleButton';
import { BsGithub } from 'react-icons/bs';
import { AiFillWechat } from 'react-icons/ai';
import { onClickGitHubHandler } from './GitHubLogin';
import { onClickWeChatHandler } from './WechatLogin';
import { FormState, validateEmail } from '../../pages/Login';
import { useQueryClient } from '@tanstack/react-query';
import { signInCognito } from '../../hooks/signInAction';
import { useNavigate } from 'react-router-dom';

interface SignInProps {
    toggleSignUp: () => void,
    toggleForgetPassword: () => void
}

const SignIn: React.FC<SignInProps> = ({ toggleSignUp, toggleForgetPassword }) => {
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [errors, setErrors] = React.useState<string[]>([]);
    const [formState, setFormState] = React.useState<FormState>("ready");

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setFormState("saving");

        if (!validateEmail(email)) {
            setFormState("error");
            setErrors(state => {
                state.push("Invalid Email")
                return state
            });
            return
        }

        try {
            const res = await signInCognito({ email, password });
            await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
            navigate("/dashboard");
        } catch (error) {
            console.error(error)
            setFormState("error");
        }
    };

    return (
        <ScaleFade initialScale={0.95} in={true}>
            <VStack w="full" p={10} alignItems="flex-start" bg={useColorModeValue("blue.50", "blackAlpha.200")}>
                <VStack spacing="3" alignItems="flex-start">
                    <Heading size="xl">Sign in LeetReCode</Heading>
                    <Text>Already have an account?</Text>
                </VStack>

                <SimpleGrid pt={3} columns={4} spacingX={2} spacingY={5} w="full">
                    <GridItem colSpan={1}>
                        <GoogleButton />
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button
                            disabled
                            size="md"
                            w="full"
                            onClick={onClickGitHubHandler}
                            colorScheme="teal"
                            variant="outline"
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
                        <FormControl isRequired isInvalid={errors.length !== 0}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                placeholder="Enter your email here"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <FormControl isRequired isInvalid={errors.length !== 0}>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input
                                placeholder="Enter your password here"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {errors.map((error) => (
                                <FormErrorMessage key={error}>{error}</FormErrorMessage>
                            ))}
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
                            Sign in
                        </Button>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Link onClick={toggleSignUp} href="#">
                            No account? Sign up here!
                        </Link>
                    </GridItem>
                    <GridItem colSpan={2} justifySelf="end">
                        <Link onClick={toggleForgetPassword} href="#">
                            Forgot Password?
                        </Link>
                    </GridItem>
                </SimpleGrid>
            </VStack>
        </ScaleFade>
    );
};

export default SignIn;
