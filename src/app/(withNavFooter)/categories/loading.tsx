import { CategorySkeleton } from '@/components/Shared/skeletons/category-skeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <CategorySkeleton></CategorySkeleton>
        </div>
    );
};

export default loading;
