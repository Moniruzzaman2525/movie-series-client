import { ReviewTable } from "@/components/DashboardComponetns/UserDashboard/reviewsTable";
import { getReviews } from "@/service/Reviews";
const ReviewPage =async () => {
    const review=await getReviews()
    return (
        <div className="-ms-0 -mt-0 md:-ms-10 md:-mt-2 lg:-ms-10 lg:-mt-2">
             <div className='h-10 w-full bg-gray-700 p-10 flex items-center justify-between text-white font-bold'>
            <h1>Total:0</h1>
            </div>
           <ReviewTable invoice={review}/>
        </div>
    );
};
export default ReviewPage;