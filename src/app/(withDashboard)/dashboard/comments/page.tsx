import { UserComments } from "@/components/DashboardComponetns/UserDashboard/Admin/UserComments";
import { getAllUserComments } from "@/service/Admin";


const AllUserComment = async () => {
    const comments = await getAllUserComments()

    return (
        <div className="-ms-0 -mt-0 md:-ms-10 md:-mt-2 lg:-ms-10 lg:-mt-2">
            <div className='h-10 w-full bg-gray-700 p-10 flex items-center justify-between text-white font-bold'>
                <h1>Total: {comments?.data?.length}</h1>
            </div>
            <UserComments data={comments} />
        </div>
    );
};

export default AllUserComment;
