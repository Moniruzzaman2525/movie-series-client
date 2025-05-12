import UpdateContentFrom from "@/components/DashboardComponetns/UserDashboard/Admin/UpdateContent";
import { getContentById } from "@/service/Content";

import { Suspense } from "react";


const page = async ({ params }: { params: Promise<{ id: string }> }) => {
     const contentId = (await params).id
     const result = await getContentById(contentId)
     return (
          <Suspense>
               <UpdateContentFrom existingData={result?.data}></UpdateContentFrom>
          </Suspense>
     );
};

export default page;
