"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Menu, User } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full px-4 py-5 shadow-md bg-white fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-red-600">
          MFlex
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:text-red-500">
            Home
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-red-500">
            Browse
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-red-500">
            Newly Added
          </Link>
          <Link href="/" className="text-sm font-medium hover:text-red-500">
            Top Rated
          </Link>

          <Input
            type="text"
            placeholder="Search..."
            className="w-64 bg-gray-100"
          />
        </div>

        <div className="hidden md:block">
          <Button variant="ghost">
            <User className="w-5 h-5" />
          </Button>
        </div>

        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4 space-y-4">
              <Link href="/" className="text-sm font-medium hover:text-red-500">
                Home
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-red-500">
                Browse
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-red-500">
                Newly Added
              </Link>
              <Link href="/" className="text-sm font-medium hover:text-red-500">
                Top Rated
              </Link>
              <Input
                type="text"
                placeholder="Search..."
                className="bg-gray-100"
              />
              <Button variant="outline" className="w-full">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
