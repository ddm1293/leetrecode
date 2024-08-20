import React from 'react';
import SignIn from '../components/login/SignIn';
import { Container } from '@chakra-ui/react';
import SignUp from '../components/login/SignUp';
import ForgetPassword from '../components/login/ForgetPassword';

export type FormState = "ready" | "saving";

export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const LoginPage = () => {
    const [signUp, setSignUp] = React.useState<boolean>(false);
    const [forgetPassword, setForgetPassword] = React.useState<boolean>(false);

    const toggleSignUp = () => {
        setSignUp(!signUp);
    };

    const toggleForgetPassword = () => {
        setForgetPassword(!forgetPassword);
    };

    return (
        <>
            <Container h="100vh" maxW="container.sm" px={0} py={20}>
                {!forgetPassword && !signUp && (
                    <SignIn
                        toggleSignUp={toggleSignUp}
                        toggleForgetPassword={toggleForgetPassword}
                    />
                )}

                {!forgetPassword && signUp && (
                    <SignUp toggleSignUp={toggleSignUp} />
                )}

                {forgetPassword && (
                    <ForgetPassword toggleForgetPassword={toggleForgetPassword} />
                )}
            </Container>
        </>
    );
};

export default LoginPage;

