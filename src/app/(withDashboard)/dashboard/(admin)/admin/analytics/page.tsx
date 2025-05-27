import { SellAnalyticsDashboard } from "@/components/DashboardComponetns/UserDashboard/Analytics";
import { AnalyticsSkeleton } from "@/components/Shared/skeletons/analytics-skeleton";
import { getSellInfo } from "@/service/Admin";
import { Suspense } from "react";


const Analytics = async () => {
     const sellInfo = await getSellInfo()


     return (
          <Suspense fallback={<AnalyticsSkeleton />}>
               <SellAnalyticsDashboard data={sellInfo?.data}></SellAnalyticsDashboard>
          </Suspense>
     );
};

export default Analytics;
