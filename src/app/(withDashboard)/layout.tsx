import Sidebar from "@/common/dashboardSidebar/Sidebar";
import type { Metadata } from "next";


export const metadata: Metadata = {
     title: "ShowFLIX | Dashboard",
     description: "Generated by create next app",
};

export default function DashboardLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <div className="relative min-h-screen">
               {/* Sidebar — fixed positioned */}
                    <Sidebar />
          
               {/* Main content with left margin to avoid overlapping */}
               <div className="md:ml-[257px] ">
                    {children}
               </div>
          </div>
     );
}
