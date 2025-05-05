import { ReviewTable } from "@/components/DashboardComponetns/UserDashboard/reviewsTable";
import { getReviews } from "@/service/Reviews";
const ReviewPage =async () => {
    const review=await getReviews()
    return (
        <div className="">
             <div className='h-10 w-full bg-gray-700 p-10 flex items-center justify-between text-white font-bold'>
            <h1>Total:0</h1>
            </div>
           <ReviewTable invoice={review}/>
        </div>
    );
};
export default ReviewPage;