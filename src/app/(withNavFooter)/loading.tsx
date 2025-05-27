import { HeroSkeleton } from '@/components/Shared/skeletons/hero-skeleton';
import React from 'react';

const loading = () => {
    return (
        <div>
            <HeroSkeleton />
        </div>
    );
};

export default loading;
