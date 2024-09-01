import { signIn, getCurrentUser, fetchAuthSession, } from 'aws-amplify/auth';


type SignInDTO = {
    email: string;
    password: string;
}

export const signInCognito = async (user: SignInDTO) => {
    try {
        const { isSignedIn, nextStep } = await signIn({
            username: user.email,
            password: user.password,
        })

        if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
            throw new Error(`User has not confirmed the email: ${user.email}.`);
        }

        // if (isSignedIn) {
        //     const { username, userId, signInDetails } = await getCurrentUser();
        //     console.log("see current user info: ", username, userId, signInDetails);
        //     const session = await fetchAuthSession();
        //     console.log("see session: ", session);
        // }

        return nextStep.signInStep === 'DONE';

    } catch (error) {
        console.error(error)
        throw error
    }
}
