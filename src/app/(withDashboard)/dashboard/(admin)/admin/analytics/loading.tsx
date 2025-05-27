import { AnalyticsSkeleton } from '@/components/Shared/skeletons/analytics-skeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <AnalyticsSkeleton />
        </div>
    );
};

export default loading;
