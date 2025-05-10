/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Menu, BookmarkIcon } from 'lucide-react';
import Link from "next/link";
import { useUser } from "@/context/userContext";
import { logOut } from "@/service/Auth";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const { user, setUser, handleUser, } = useUser();


  const path = pathName;

  useEffect(() => {
    const fetchUser = async () => {
      handleUser();
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logOut();
    setUser(null)

    router.push("/");
    toast.success("logout successful");
  };

  return (
    <header className="w-full px-4 py-5 shadow-md bg-black/60 text-white fixed top-0 z-[100]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-red-600">
          SHOWFlix
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={
              path === "/"
                ? "font-medium text-red-500"
                : "font-medium hover:text-red-500"
            }
          >
            Home
          </Link>
          <Link
            href="/movies"
            className={
              path === "/movies"
                ? "font-medium text-red-500"
                : "font-medium hover:text-red-500"
            }
          >
            Movies
          </Link>
          <Link
            href="/series"
            className={
              path === "/series"
                ? "font-medium text-red-500"
                : "font-medium hover:text-red-500"
            }
          >
            Series
          </Link>
          <Link
            href="/about"
            className={
              path === "/about"
                ? "font-medium text-red-500"
                : "font-medium hover:text-red-500"
            }
          >
            About Us
          </Link>
          <Link
            href="/support"
            className={
              path === "/support"
                ? "font-medium text-red-500"
                : "font-medium hover:text-red-500"
            }
          >
            Support
          </Link>

          {user && (
            <Link
              href="/watchlist"
              className={
                path === "/watchlist"
                  ? "font-medium text-red-500 flex items-center gap-1"
                  : "font-medium hover:text-red-500 flex items-center gap-1"
              }
            >
              <BookmarkIcon className="h-4 w-4" />
              Watchlist
            </Link>
          )}

          <div>
            {
              user?.role === "USER" && <Link href={'/dashboard/user/payment'}>Dashboard</Link>
            }
          </div>
          <div>
            {
              user?.role === "ADMIN" && <Link href={'/dashboard/admin/analytics'}>Dashboard</Link>
            }
          </div>
        </div>


        {user ? (
          <div className="hidden md:block">
            <Button variant="ghost" className="cursor-pointer" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="hidden md:block">
            <Button variant="ghost" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}

        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-4 space-y-4 bg-white text-black">
              <Link
                href="/"
                className={
                  path === "/"
                    ? "font-medium text-red-500"
                    : "font-medium hover:text-red-500"
                }
              >
                Home
              </Link>
              <Link
                href="/movies"
                className={
                  path === "/movies"
                    ? "font-medium text-red-500"
                    : "font-medium hover:text-red-500"
                }
              >
                Movies
              </Link>
              <Link
                href="/series"
                className={
                  path === "/series"
                    ? "font-medium text-red-500"
                    : "font-medium hover:text-red-500"
                }
              >
                Series
              </Link>
              <Link
                href="/about"
                className={
                  path === "/about"
                    ? "font-medium text-red-500"
                    : "font-medium hover:text-red-500"
                }
              >
                About Us
              </Link>
              <Link
                href="/support"
                className={
                  path === "/support"
                    ? "font-medium text-red-500"
                    : "font-medium hover:text-red-500"
                }
              >
                Support
              </Link>

              {user && (
                <Link
                  href="/watchlist"
                  className={
                    path === "/watchlist"
                      ? "font-medium text-red-500 flex items-center gap-1"
                      : "font-medium hover:text-red-500 flex items-center gap-1"
                  }
                >
                  <BookmarkIcon className="h-4 w-4" />
                  Watchlist
                </Link>
              )}

              <div>
                {
                  user?.role === "USER" && <Link href={'/dashboard/user/payment'}>Dashboard</Link>
                }
              </div>
              <div>
                {
                  user?.role === "ADMIN" && <Link href={'/dashboard/admin/analytics'}>Dashboard</Link>
                }
              </div>
              {user ? (
                <div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
