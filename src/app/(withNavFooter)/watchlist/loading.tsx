import { CategorySkeleton } from '@/components/Shared/skeletons/category-skeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <CategorySkeleton />
        </div>
    );
};

export default loading;
