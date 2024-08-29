import { useMutation, useQueryClient } from '@tanstack/react-query';
import { post } from 'aws-amplify/api';
import { signUp } from 'aws-amplify/auth';

interface CreateUserDTO {
    email: string;
    password: string;
}

const signUpInCognito = async (user: CreateUserDTO) => {
    try {
        console.log("calling signup amplify")
        const output = await signUp({
            username: user.email,
            password: user.password,
        })
        console.log("see output: ", output);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const createUserInBackend = async (user: CreateUserDTO) => {
    try {
        const { body } = await post({
            apiName: "createUser",
            path: "/user",
            options: {
                body: {
                    email: user.email,
                    password: user.password,
                }
            }
        }).response;

        return body.json()
    } catch (error) {
        console.error("Error calling createUser lambda", error);
        throw error;
    }
}

const createUser = async (user: CreateUserDTO) => {
    const cognitoUser = await signUpInCognito(user);
    const backendUser = await createUserInBackend(user);
    return { cognitoUser, backendUser };
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["users"]
            })
            console.log('User created successfully:', data);
        }
    });
}
