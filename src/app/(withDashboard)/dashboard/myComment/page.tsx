import { CommentsTable } from '@/components/DashboardComponetns/UserDashboard/commentsTable';
import { getComments } from '@/service/Comments';
import React from 'react';

const myCommentPage = async() => {
    const data = await getComments();
    return (
        <div>
            <div className='h-10 w-full bg-gray-800 p-10 flex items-center justify-between text-white font-bold'>
            <h1>Total:{data.data.length}</h1>
            </div>
            <CommentsTable invoice={data.data} />
        </div>
    );
};

export default myCommentPage;