import Footer from "@/components/Shared/Footer/Footer";
import Navbar from "@/components/Shared/Navbar/Navbar";
import React, { ReactNode } from "react";
import { Toaster } from "sonner";
interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Navbar />
      <Toaster richColors position="top-center"/>
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
