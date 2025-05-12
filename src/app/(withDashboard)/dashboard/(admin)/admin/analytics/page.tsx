import { SellAnalyticsDashboard } from "@/components/DashboardComponetns/UserDashboard/Analytics";
import { getSellInfo } from "@/service/Admin";
import { Suspense } from "react";


const Analytics = async() => {
     const sellInfo = await getSellInfo()
     console.log(sellInfo,"sell info")
   
     
     return (
          <Suspense fallback={<p>loading.........</p>}>
               <SellAnalyticsDashboard data={sellInfo?.data}></SellAnalyticsDashboard>
          </Suspense>
     );
};

export default Analytics;