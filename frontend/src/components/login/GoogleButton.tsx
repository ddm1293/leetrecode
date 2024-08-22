import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from '@leecheuk/react-google-login';
import { Button } from '@chakra-ui/react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import * as dotenv from 'dotenv';

dotenv.config();

const clientId: string = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

const GoogleButton = () => {

    const handleSuccess = async (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        if ("accessToken" in response) {
            const accessToken = response.accessToken;

            // await sendGoogleLogin(accessToken);

            //  dispatch(checkProfileAsync());

        }
    };

    const handleFailure = (
        response: GoogleLoginResponse | GoogleLoginResponseOffline
    ) => {
        console.log(response);
    };

    return (
        <GoogleLogin
            clientId={clientId}
            buttonText="Google"
            onSuccess={handleSuccess}
            onFailure={handleFailure}
            render={(renderProps) => (
                <Button
                    size="md"
                    w="full"
                    onClick={renderProps.onClick}
                    // disabled={renderProps.disabled}
                    disabled={true}
                    colorScheme="teal"
                    variant="outline"
                    leftIcon={<AiFillGoogleCircle />}
                >
                    Google
                </Button>
            )}
        />
    );
};

export default GoogleButton;
