import { useQuery } from '@tanstack/react-query';
import { AuthUser, fetchAuthSession, getCurrentUser } from 'aws-amplify/auth';

const TOKEN_DURATION_MS = 1000 * 60 * 60;

const currentUser = async () => {
    try {
        const authUser = await getCurrentUser();
        console.log("see current user info: ", authUser);
        const session = await fetchAuthSession();
        console.log("see current session: ", session);
        return authUser
    } catch (error) {
        if (error instanceof Error && error.name === 'UserUnAuthenticatedException') {
            return null;
        }
        console.error(error);
        throw error;
    }
}

export const useCurrentUserHook = () => {
    return useQuery<AuthUser | null>({
        queryKey: ['currentUser'],
        queryFn: currentUser,
        staleTime: TOKEN_DURATION_MS,
        gcTime: TOKEN_DURATION_MS,
        retry: false,
    })
}
