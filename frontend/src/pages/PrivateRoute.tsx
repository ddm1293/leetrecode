import React from 'react';
import { useCurrentUserHook } from '../hooks/currentUserHook';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const { isSuccess, data } = useCurrentUserHook();
    const isLoggedIn: boolean = isSuccess && data !== null;

    return isLoggedIn ? element : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
