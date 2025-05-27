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
import { Menu, BookmarkIcon, User, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState, useRef, useEffect } from "react"
import { logOut } from "@/service/Auth"
import { useUser } from "@/context/userContext"
import { toast } from "sonner"


const Navbar = () => {
  const router = useRouter()
  const pathName = usePathname()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const { user, setUser } = useUser()
  // Replace with your actual user conte

  const path = pathName

  const handleLogout = async () => {
    await logOut()
    setUser(null)

    router.push("/")
    toast.success("logout successful")
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setShowProfileMenu(true)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowProfileMenu(false)
    }, 150) // Small delay before closing
  }

  const handleMenuItemClick = () => {
    setShowProfileMenu(false)
  }

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const movieCategories = [
    { title: "Genres", items: ["Action", "Adventure", "Animation", "Comedy", "Crime"], query: "category" },
    {
      title: "Collections",
      items: ["Netflix", "Amazon", "Disney", "HBO", "Apple", "Youtube", "Spotify"],
      query: "platform",
    },
    { title: "Release Years", items: ["2025", "2023", "2024", "2022", "2020"], query: "year" },
  ]

  const seriesCategories = [
    { title: "Genres", items: ["Action", "Adventure", "Animation", "Comedy", "Crime"], query: "category" },
    {
      title: "Collections",
      items: ["Netflix", "Amazon", "Disney", "HBO", "Apple", "Youtube", "Spotify"],
      query: "platform",
    },
    { title: "Release Years", items: ["2025", "2023", "2024", "2022", "2020"], query: "year" },
  ]
  console.log(user)
  return (
    <header className="w-full px-4 py-4 shadow-md bg-black/90 text-white fixed top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-red-600">
          SHOWFlix
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "font-medium transition-colors hover:text-red-500",
              path === "/" ? "text-red-500" : "text-white",
            )}
          >
            Home
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent h-auto p-0 font-medium transition-colors",
                    path.startsWith("/movies") ? "text-red-500" : "text-white hover:text-red-500",
                  )}
                >
                  Movies
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-6 bg-white text-black">
                    <div className="grid grid-cols-3 gap-6">
                      {movieCategories.map((category, index) => (
                        <div key={index} className="space-y-3">
                          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
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
                    <div className="mt-6 pt-4 border-t border-gray-200">
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
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[600px] p-6 bg-white text-black">
                    <div className="grid grid-cols-3 gap-6">
                      {seriesCategories.map((category, index) => (
                        <div key={index} className="space-y-3">
                          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
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
                    <div className="mt-6 pt-4 border-t border-gray-200">
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
            className={cn(
              "font-medium transition-colors hover:text-red-500",
              path === "/about" ? "text-red-500" : "text-white",
            )}
          >
            About
          </Link>

          <Link
            href="/support"
            className={cn(
              "font-medium transition-colors hover:text-red-500",
              path === "/support" ? "text-red-500" : "text-white",
            )}
          >
            Support
          </Link>

          {user && (
            <Link
              href="/watchlist"
              className={cn(
                "font-medium transition-colors hover:text-red-500 flex items-center gap-2",
                path === "/watchlist" ? "text-red-500" : "text-white",
              )}
            >
              <BookmarkIcon className="h-4 w-4" />
              Watchlist
            </Link>
          )}
        </div>

        {/* User Profile or Login */}
        {user ? (
          <div className="hidden md:block relative">
            <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-white/10">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-red-600 text-white">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>

              {/* Profile Dropdown */}
              <div
                ref={profileMenuRef}
                className={cn(
                  "absolute right-0 top-full mt-2 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 transition-all duration-200",
                  showProfileMenu
                    ? "opacity-100 visible transform translate-y-0"
                    : "opacity-0 invisible transform -translate-y-2 pointer-events-none",
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm text-gray-500 truncate">{user.email}</p>
                </div>

                <Link
                  href="/dashboard/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={handleMenuItemClick}
                >
                  <User className="mr-3 h-4 w-4" />
                  Profile
                </Link>

                <div className="border-t border-gray-100 mt-1">
                  <button
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden md:block">
            <Button variant="ghost" asChild className="hover:text-red-500 transition-colors">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="p-6 space-y-4 bg-white text-black max-h-[80vh] overflow-y-auto">
              <Link
                href="/"
                className={cn(
                  "block font-medium py-2",
                  path === "/" ? "text-red-500" : "text-gray-900 hover:text-red-500",
                )}
              >
                Home
              </Link>

              <div className="space-y-3">
                <div className="font-semibold text-gray-900">Movies</div>
                <div className="pl-4 space-y-2">
                  <Link href="/movies/action" className="block text-gray-600 hover:text-red-500 py-1">
                    Action
                  </Link>
                  <Link href="/movies/comedy" className="block text-gray-600 hover:text-red-500 py-1">
                    Comedy
                  </Link>
                  <Link href="/movies" className="block font-medium text-red-600 hover:text-red-700 py-1">
                    Browse All Movies
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <div className="font-semibold text-gray-900">Series</div>
                <div className="pl-4 space-y-2">
                  <Link href="/series/action" className="block text-gray-600 hover:text-red-500 py-1">
                    Action
                  </Link>
                  <Link href="/series/comedy" className="block text-gray-600 hover:text-red-500 py-1">
                    Comedy
                  </Link>
                  <Link href="/series" className="block font-medium text-red-600 hover:text-red-700 py-1">
                    Browse All Series
                  </Link>
                </div>
              </div>

              <Link
                href="/about"
                className={cn(
                  "block font-medium py-2",
                  path === "/about" ? "text-red-500" : "text-gray-900 hover:text-red-500",
                )}
              >
                About
              </Link>

              <Link
                href="/support"
                className={cn(
                  "block font-medium py-2",
                  path === "/support" ? "text-red-500" : "text-gray-900 hover:text-red-500",
                )}
              >
                Support
              </Link>

              {user && (
                <>
                  <Link
                    href="/watchlist"
                    className={cn(
                      "flex items-center gap-2 font-medium py-2",
                      path === "/watchlist" ? "text-red-500" : "text-gray-900 hover:text-red-500",
                    )}
                  >
                    <BookmarkIcon className="h-4 w-4" />
                    Watchlist
                  </Link>

                  <div className="border-t pt-4 mt-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-red-600 text-white">
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>

                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-2 font-medium py-2 text-gray-900 hover:text-red-500"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>

                    <Button
                      variant="outline"
                      className="w-full cursor-pointer mt-3 text-red-600 border-red-600 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </>
              )}

              {!user && (
                <div className="border-t pt-4 mt-4">
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
