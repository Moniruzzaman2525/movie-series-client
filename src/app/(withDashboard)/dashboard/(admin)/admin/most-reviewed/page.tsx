import ReviewDashboard from '@/components/DashboardComponetns/UserDashboard/Admin/Review/ReviewDashboard';
import { getMostReview } from '@/service/Admin';


const MostReviewDashboard = async () => {

    const result = await getMostReview();

    return (
        <div>
            <ReviewDashboard demoData={result.data} />
        </div>
    );
};

export default MostReviewDashboard;
