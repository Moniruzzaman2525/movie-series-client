/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, BookmarkIcon } from "lucide-react"
import Link from "next/link"
import { useUser } from "@/context/userContext"
import { logOut } from "@/service/Auth"
import { toast } from "sonner"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const Navbar = () => {
  const router = useRouter()
  const pathName = usePathname()
  const { user, setUser } = useUser()

  const path = pathName




  const handleLogout = async () => {
    await logOut()
    setUser(null)
    
    router.push("/")
    toast.success("logout successful")
  }

  const movieCategories = [
    { title: "Genres", items: ["Action", "Adventure", "Animation", "Comedy", "Crime",], query: "category" },
    { title: "Collections", items: ["Netflix", "Amazon", "Disney", "HBO", "Apple", 'Youtube', 'Spotify'], query: 'platform' },
    { title: "releaseYears", items: ["2025", "2023", "2024", "2022", "2020",], query: 'year' },
  ]

  const seriesCategories = [
    { title: "Genres", items: ["Action", "Adventure", "Animation", "Comedy", "Crime",], query: "category" },
    { title: "Collections", items: ["Netflix", "Amazon", "Disney", "HBO", "Apple", 'Youtube', 'Spotify'], query: 'platform' },
    { title: "releaseYears", items: ["2025", "2023", "2024", "2022", "2020",], query: 'year' },
  ]

  return (
    <header className="w-full px-4 py-5 shadow-md bg-black/60 text-white fixed top-0 z-[100]">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-red-600">
          SHOWFlix
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className={path === "/" ? "font-medium text-red-500" : "font-medium hover:text-red-500 transition-colors"}
          >
            Home
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent hover:bg-transparent focus:bg-transparent mr-4 data-[active]:bg-transparent data-[state=open]:bg-transparent h-auto p-0 font-medium transition-colors",
                    path.startsWith("/movies") ? "text-red-500" : "text-white hover:text-red-500",
                  )}
                >
                  Movies
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[800px] p-6 bg-white">
                    <div className="grid grid-cols-3 gap-8">
                      {movieCategories.map((category, index) => (
                        <div key={index} className="space-y-4">
                          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                            {category.title}
                          </h3>
                          <ul className="space-y-3">
                            {category.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={`/movies?${category.query}=${item.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="block text-gray-600 hover:text-red-600 transition-colors text-sm py-1"
                                  >
                                    {item}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/movies"
                          className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                        >
                          Browse All Movies →
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent h-auto p-0 font-medium transition-colors",
                    path.startsWith("/series") ? "text-red-500" : "text-white hover:text-red-500",
                  )}
                >
                  Series
                  {/* <ChevronDown className="ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" /> */}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[800px] p-6 bg-white">
                    <div className="grid grid-cols-3 gap-8">
                      {seriesCategories.map((category, index) => (
                        <div key={index} className="space-y-4">
                          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                            {category.title}
                          </h3>
                          <ul className="space-y-3">
                            {category.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={`/series?${category.query}=${item.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="block text-gray-600 hover:text-red-600 transition-colors text-sm py-1"
                                  >
                                    {item}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/series"
                          className="inline-flex items-center text-red-600 hover:text-red-700 font-medium text-sm transition-colors"
                        >
                          Browse All Series →
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link
            href="/about"
            className={
              path === "/about" ? "font-medium text-red-500" : "font-medium hover:text-red-500 transition-colors"
            }
          >
            About Us
          </Link>
          <Link
            href="/support"
            className={
              path === "/support" ? "font-medium text-red-500" : "font-medium hover:text-red-500 transition-colors"
            }
          >
            Support
          </Link>

          {user && (
            <Link
              href="/watchlist"
              className={
                path === "/watchlist"
                  ? "font-medium text-red-500 flex items-center gap-2"
                  : "font-medium hover:text-red-500 flex items-center gap-2 transition-colors"
              }
            >
              <BookmarkIcon className="h-4 w-4" />
              Watchlist
            </Link>
          )}

          {user?.role === "USER" && (
            <Link href="/dashboard/user/payment" className="font-medium hover:text-red-500 transition-colors">
              Dashboard
            </Link>
          )}
          {user?.role === "ADMIN" && (
            <Link href="/dashboard/admin/analytics" className="font-medium hover:text-red-500 transition-colors">
              Dashboard
            </Link>
          )}
        </div>

        {user ? (
          <div className="hidden md:block">
            <Button
              variant="ghost"
              className="cursor-pointer hover:text-red-500 transition-colors"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="hidden md:block">
            <Button variant="ghost" asChild className="hover:text-red-500 transition-colors">
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
            <DrawerContent className="p-6 space-y-6 bg-white text-black">
              <Link href="/" className={path === "/" ? "font-medium text-red-500" : "font-medium hover:text-red-500"}>
                Home
              </Link>

              <div className="space-y-4">
                <div className="font-semibold text-gray-900">Movies</div>
                <div className="pl-4 space-y-3">
                  <Link href="/movies/trending-now" className="block text-gray-600 hover:text-red-500">
                    Trending Now
                  </Link>
                  <Link href="/movies/top-rated" className="block text-gray-600 hover:text-red-500">
                    Top Rated
                  </Link>
                  <Link href="/movies/action" className="block text-gray-600 hover:text-red-500">
                    Action
                  </Link>
                  <Link href="/movies" className="block font-medium text-red-600 hover:text-red-700">
                    Browse All Movies
                  </Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="font-semibold text-gray-900">Series</div>
                <div className="pl-4 space-y-3">
                  <Link href="/series/trending-shows" className="block text-gray-600 hover:text-red-500">
                    Trending Shows
                  </Link>
                  <Link href="/series/top-rated" className="block text-gray-600 hover:text-red-500">
                    Top Rated
                  </Link>
                  <Link href="/series/crime" className="block text-gray-600 hover:text-red-500">
                    Crime
                  </Link>
                  <Link href="/series" className="block font-medium text-red-600 hover:text-red-700">
                    Browse All Series
                  </Link>
                </div>
              </div>

              <Link
                href="/about"
                className={path === "/about" ? "font-medium text-red-500" : "font-medium hover:text-red-500"}
              >
                About Us
              </Link>
              <Link
                href="/support"
                className={path === "/support" ? "font-medium text-red-500" : "font-medium hover:text-red-500"}
              >
                Support
              </Link>

              {user && (
                <Link
                  href="/watchlist"
                  className={
                    path === "/watchlist"
                      ? "font-medium text-red-500 flex items-center gap-2"
                      : "font-medium hover:text-red-500 flex items-center gap-2"
                  }
                >
                  <BookmarkIcon className="h-4 w-4" />
                  Watchlist
                </Link>
              )}

              {user?.role === "USER" && (
                <Link href="/dashboard/user/payment" className="font-medium hover:text-red-500">
                  Dashboard
                </Link>
              )}
              {user?.role === "ADMIN" && (
                <Link href="/dashboard/admin/analytics" className="font-medium hover:text-red-500">
                  Dashboard
                </Link>
              )}

              {user ? (
                <div className="pt-4">
                  <Button variant="outline" className="w-full" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="pt-4">
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                </div>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  )
}

export default Navbar
