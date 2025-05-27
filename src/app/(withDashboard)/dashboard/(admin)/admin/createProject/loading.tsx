import { AddContentFormSkeleton } from '@/components/Shared/skeletons/add-content-form-skeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <AddContentFormSkeleton />
        </div>
    );
};

export default loading;
