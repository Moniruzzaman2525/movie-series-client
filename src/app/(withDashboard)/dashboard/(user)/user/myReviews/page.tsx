/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useEffect, useState } from "react";
import { ReviewTable } from "@/components/DashboardComponetns/UserDashboard/reviewsTable";
import { useUser } from "@/context/userContext";
import { getReviewsByUser } from "@/service/Reviews";

const ReviewPage = () => {
  const user = useUser();
  const [reviews, setReviews] = useState<{ data: any[] } | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      if (user?.user?.id) {
        const data = await getReviewsByUser(user.user.id);
        setReviews(data);
      }
    };
    fetchReviews();
  }, [user?.user?.id]);

  const handleDeleteSuccess = (deletedId: string) => {
    if (!reviews) return;
    const filtered = reviews.data.filter((review) => review.id !== deletedId);
    setReviews({ data: filtered });
  };

  return (
    <div>
      <div className='h-10 w-full bg-gray-700 p-10 flex items-center justify-between text-white font-bold'>
        <h1>Total: {reviews?.data?.length || 0}</h1>
      </div>
      <ReviewTable invoice={reviews} onDeleteSuccess={handleDeleteSuccess} />
    </div>
  );
};

export default ReviewPage;
