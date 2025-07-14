import React from 'react';
import useUserRole from '../hooks/useUserRole';
import AdminHome from './Admin/AdminHome';
import MemberHome from './Member/MemberHome';
import UserHome from './UserHome';

const DashboardHome = () => {
    const {isAdmin, isMember} = useUserRole();
    if (isAdmin) {
        return <AdminHome />;
    }
    else if (isMember) {
        return <MemberHome />;
    }
    else{
        return <UserHome />;
    }
};

export default DashboardHome;