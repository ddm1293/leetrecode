import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUserHook } from '../../hooks/currentUserHook';
import SignOut from './SignOut';

const AuthButton= () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());
    const navigate = useNavigate();
    const { isSuccess, data } = useCurrentUserHook();
    const isLoggedIn: boolean = isSuccess && data !== null;

    const handleClick = async () => {
        if (isLoggedIn) {
            try {
                handleToggle();
            } catch (error) {
                console.error('Error trying to log out:', error);
            }
        } else {
            try {
                navigate("/login");
            } catch (error) {
                console.error('Error trying to log in:', error);
            }
        }
    };
    return (
        <>
            <Button
                variant="solid"
                w={{ base: "full", md: "auto" }}
                colorScheme="green"
                onClick={handleClick}
            >
                {isLoggedIn ? 'Logout' : 'Login'}
            </Button>

            { isLoggedIn &&
                <SignOut isOpen={isOpen} handleToggle={handleToggle}/>
            }
        </>
    );
}

export default AuthButton;
