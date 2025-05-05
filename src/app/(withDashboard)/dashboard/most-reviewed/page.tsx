import ReviewDashboard from '@/components/DashboardComponetns/UserDashboard/Admin/Review/ReviewDashboard';
import { getMostReview } from '@/service/Admin';
import React from 'react';

const MostReviewDashboard = async () => {

    const result = await getMostReview();

    return (
        <div>
            <ReviewDashboard demoData={result.data} />
        </div>
    );
};

export default MostReviewDashboard;
