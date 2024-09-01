import React from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Link,
    GridItem,
    Heading, Input,
    ScaleFade,
    SimpleGrid,
    useColorModeValue,
    VStack, useToast,
} from '@chakra-ui/react';
import { FormState, validateEmail } from '../../pages/Login';

interface ForgetPasswordProps {
    toggleForgetPassword: () => void
}

const ForgetPassword: React.FC<ForgetPasswordProps> = ({ toggleForgetPassword }) => {
    const [email, setEmail] = React.useState<string>("");
    const [formState, setFormState] = React.useState<FormState>("ready");

    const toast = useToast();
    const onSubmit = () => {
        setFormState("saving");
        if (!validateEmail(email)) {
            toast({
                title: "Invalid Email",
                description: "Invalid email",
                status: "error",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        // dispatch(sendResetPasswordAsync(email));
        setTimeout(() => {
            setFormState("ready");
            toast({
                title: "Reset Password Request Sent",
                description: `If an email is found, we will send an reset password request to your inbox. Please check spam folder as well. Thank you!`,
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
            toast({
                title: "Reset Password Request Sent",
                description: `如果我们找到了您的邮箱，我们将向您的收件箱发送重置密码请求。 请检查垃圾邮件文件夹。 谢谢！`,
                status: "success",
                position: "top",
                duration: 3000,
                isClosable: true,
            });
        }, 5000);
    };

    return (
        <ScaleFade initialScale={0.95} in={true}>
            <VStack w="full" p={10} alignItems="flex-start" bg={useColorModeValue("green.50", "blackAlpha.200")}>
                <VStack spacing="3" alignItems="flex-start">
                    <Heading size="xl">Forgot Password?</Heading>
                </VStack>

                <SimpleGrid pt={3} columns={4} spacingX={2} spacingY={5} w="full">
                    <GridItem colSpan={4}>
                        <FormControl isRequired>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                placeholder="Enter your email here"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem colSpan={4}>
                        <Button
                            size="lg"
                            w="full"
                            variant="outline"
                            onClick={onSubmit}
                            isLoading={formState === "saving"}
                            loadingText="Submitting"
                        >
                            Send Password Reset Request
                        </Button>
                    </GridItem>
                    <GridItem colSpan={4} justifySelf="end">
                        <Link onClick={toggleForgetPassword} href="#">
                            Go to sign in
                        </Link>
                    </GridItem>
                </SimpleGrid>
            </VStack>
        </ScaleFade>
    );
};

export default ForgetPassword;
