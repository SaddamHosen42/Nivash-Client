import React from 'react';
import useUserRole from '../hooks/useUserRole';
import AdminHome from './Admin/AdminHome';
import MemberHome from './Member/MemberHome';
import UserHome from './UserHome';
import PageTitle from '../components/shared/PageTitle';

const DashboardHome = () => {
    const {isAdmin, isMember} = useUserRole();
    if (isAdmin) {
        return (
            <>
                <PageTitle title="Admin Dashboard" />
                <AdminHome />
            </>
        );
    }
    else if (isMember) {
        return (
            <>
                <PageTitle title="Member Dashboard" />
                <MemberHome />
            </>
        );
    }
    else{
        return (
            <>
                <PageTitle title="User Dashboard" />
                <UserHome />
            </>
        );
    }
};

export default DashboardHome;