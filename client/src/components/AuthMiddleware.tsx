import React from 'react'
import { useSelector } from 'react-redux';
import { iUserState } from '../redux/features/userSlice';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RootState } from '../redux/store';

interface IAuthMiddlewareProps {
    allowedUser: string[]
}

const AuthMiddleware:React.FC<IAuthMiddlewareProps> = ({allowedUser}) => {
    const {isAuthenticated, user} = useSelector((state: RootState) => state.userState);

    const location = useLocation()

    return (
        (isAuthenticated && user) && allowedUser.includes(user?.role as string) ? (
            <Outlet />
        ) : (isAuthenticated && user) ? (
            <Navigate to='/unauthorized' state={{ from: location}} replace/>
        ) : (
            <Navigate to='/signin' state={{ from: location}} replace/>
        )
    )
}

export default AuthMiddleware