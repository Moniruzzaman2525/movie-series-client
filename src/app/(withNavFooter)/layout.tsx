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
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
