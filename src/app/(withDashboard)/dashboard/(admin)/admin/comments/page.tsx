import { UserComments } from "@/components/DashboardComponetns/UserDashboard/Admin/UserComments";
import { getAllUserComments } from "@/service/Admin";


const AllUserComment = async () => {
    const comments = await getAllUserComments()

    return (
        <div className="">
            <div className='h-10 w-full bg-gray-700 p-10 flex items-center justify-between text-white font-bold'>
                <h1>Total: {comments?.data?.length}</h1>
            </div>
            <UserComments data={comments} />
        </div>
    );
};

export default AllUserComment;
