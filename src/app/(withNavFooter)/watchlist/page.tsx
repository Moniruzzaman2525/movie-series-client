import WatchList from '@/components/HomeCompoents/Content/WatchList';
import { getWatchList } from '@/service/WatchList';
import React from 'react';

const WatchListPage = async () => {
    const result = await getWatchList();

    return (
        <div>
            <WatchList data={result} />
        </div>
    );
};

export default WatchListPage;
