

import { AllUserTable } from "@/components/DashboardComponetns/UserDashboard/Admin/AllUserTable";
import { getAllUser } from "@/service/Admin";

const AllUser = async () => {
    const review = await getAllUser()

    return (
        <div className="">
             <div className='h-10 w-full bg-gray-700 p-10 flex items-center justify-between text-white font-bold'>
                <h1>Total: {review?.data?.length}</h1>
            </div>
           <AllUserTable data={review}/>
        </div>
    );
};

export default AllUser;
