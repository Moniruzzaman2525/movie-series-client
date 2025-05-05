import React from 'react';
import { TableSkeleton } from '@/app/(withNavFooter)/movies/table-skeleton';

const loading = () => {
    return (
        <div>
            <TableSkeleton />
        </div>
    );
};

export default loading;
