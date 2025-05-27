import { UserTableSkeleton } from '@/components/Shared/skeletons/user-table-skeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <UserTableSkeleton />
        </div>
    );
};

export default loading;

