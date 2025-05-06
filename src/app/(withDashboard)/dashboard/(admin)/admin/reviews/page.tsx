import { UserReview } from "@/components/DashboardComponetns/UserDashboard/Admin/UserReview";
import { getAllUserReview } from "@/service/Admin";

const UserReviews = async () => {
    const userData = await getAllUserReview()
    return (
       <div className="-ms-0 -mt-0 md:-ms-10 md:-mt-2 lg:-ms-10 lg:-mt-2">
                   <div className='h-10 w-full bg-gray-700 p-10 flex items-center justify-between text-white font-bold'>
                      <h1>Total: {userData?.data?.length}</h1>
                  </div>
                 <UserReview data={userData}/>
        </div>
    );
};

export default UserReviews;
