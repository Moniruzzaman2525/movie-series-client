"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu, User } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import { logOut } from "@/service/Auth";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router =useRouter()
  const pathName=usePathname()
  const {user,setIsLoading,handleUser} = useUser()
   useEffect(()=>{
    if(user===undefined){
      console.log("calling")
      handleUser()
    }
   })

  const handleLogout = async()=>{
    await logOut()
    if(pathName !=='/'){
      router.push("/")
    }
    setIsLoading(true)
    toast.success("logout successful")
  }


  return (
    <header className="w-full px-4 py-5 shadow-md  bg-black/60   text-white fixed top-0 z-[100]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-red-600">
          SHOWFlix
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className=" font-medium hover:text-red-500">
            Home
          </Link>
          <Link href="/movies" className=" font-medium hover:text-red-500">
            Movies
          </Link>
          <Link href="/series" className=" font-medium hover:text-red-500">
            Series
          </Link>
          <Link href="/" className=" font-medium hover:text-red-500">
            Top Rated
          </Link>
        </div>

       
        {user ? <div onClick={handleLogout} className="hidden md:block ">
          <Button className="cursor-pointer" variant="ghost">logout</Button>
        </div> : <div className="hidden md:block">
          <Button variant="ghost"><Link href={"/login"}>Login</Link></Button>
        </div> }

        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4 space-y-4">
              <Link href="/" className=" font-medium hover:text-red-500">
                Home
              </Link>
              <Link href="/movies" className=" font-medium hover:text-red-500">
                Movies
              </Link>
              <Link href="/series" className=" font-medium hover:text-red-500">
                Series
              </Link>
              <Link href="/" className=" font-medium hover:text-red-500">
                Top Rated
              </Link>
              <Button variant="outline" className="w-full">
                <User className="w-4 h-4 mr-2" />
                {user ? <div onClick={handleLogout} className="hidden md:block cursor-pointer">
                  <Button className="cursor-pointer" variant="ghost">logout</Button>
                </div> : <div className="hidden md:block">
                  <Button variant="ghost"><Link href={"/login"}>Login</Link></Button>
                </div>}
              </Button>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
