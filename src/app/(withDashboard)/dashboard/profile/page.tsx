import ProfilePage from '@/components/DashboardComponetns/Profile/ProfilePage';
import { getUser } from '@/service/Auth';
import React from 'react';

const Profile = async () => {

    const user = await getUser()

    return (
        <div>
            <ProfilePage user={user?.data} />
        </div>
    );
};

export default Profile;
