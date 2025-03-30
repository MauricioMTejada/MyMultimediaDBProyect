// frontend/src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoutes;
