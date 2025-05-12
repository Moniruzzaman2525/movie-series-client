'use client'
import { CommentsTable } from '@/components/DashboardComponetns/UserDashboard/commentsTable';
import { useUser } from '@/context/userContext';
import { getCommentByUser } from '@/service/Comments';
import React, { useEffect, useState } from 'react';

const MyCommentPage = () => {
  const [data, setData] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    async function fetchComments() {
      if (user?.id) {
        try {
          const result = await getCommentByUser(user.id);
          setData(result.data || []);
        } catch (error) {
          console.error('Failed to fetch comments:', error);
        }
      }
    }

    fetchComments();
  }, [user?.id]);

  return (
    <div>
      <div className='h-10 w-full bg-gray-700 p-10 flex items-center justify-between text-white font-bold'>
        <h1>Total: {data.length}</h1>
      </div>
      <CommentsTable data={data} />
    </div>
  );
};

export default MyCommentPage;
