import React from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay, Button,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'aws-amplify/auth';
import { useQueryClient } from '@tanstack/react-query';

interface SignOutProps {
    isOpen: boolean,
    handleToggle: () => void
}

const SignOut: React.FC<SignOutProps> = ({ isOpen, handleToggle }) => {
    const cancelRef = React.useRef(null);
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const onLogout = async () => {
        console.log("trying to log out");
        handleToggle();
        await signOut();
        await queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        navigate("/");
    };

    const onClose = () => {
        handleToggle();
    };

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Logout
                        </AlertDialogHeader>

                        <AlertDialogBody>Are you sure?</AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onLogout} ml={3}>
                                Logout
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default SignOut;
