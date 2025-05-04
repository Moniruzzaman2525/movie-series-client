import { CommentsTable } from '@/components/DashboardComponetns/UserDashboard/commentsTable';
import { getComments } from '@/service/Comments';
import React from 'react';

const myCommentPage = async() => {
    const data = await getComments();
    return (
        <div className='-ms-0 -mt-0 md:-ms-10 md:-mt-2 lg:-ms-10 lg:-mt-2'>
            <div className='h-10 w-full bg-gray-700 p-10 flex items-center justify-between text-white font-bold'>
            <h1>Total:{data.data.length}</h1>
            </div>
            <CommentsTable invoice={data.data} />
        </div>
    );
};

export default myCommentPage;