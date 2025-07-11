import React from 'react';
import NivashLogo from '../components/shared/NivashLogo';
import { Outlet } from 'react-router';

const AuthLayOut = () => {
    return (
        <div>
            <NivashLogo />
            <Outlet />
        </div>
    );
};

export default AuthLayOut;