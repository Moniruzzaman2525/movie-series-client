'use client';

import { useState } from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoCreateOutline } from 'react-icons/io5';
import { SiCreatereactapp } from 'react-icons/si';
import { MdCreateNewFolder } from 'react-icons/md';
import { FaBloggerB } from 'react-icons/fa6';
import { LuMessageCircle } from 'react-icons/lu';
import { useUser } from '@/context/userContext';

const Sidebar = () => {
     const [isActive, setActive] = useState(false);
     const { user } = useUser()


     const pathname = usePathname();


     // Toggle Sidebar
     const handleToggle = () => {
          setActive(!isActive);
     };

     // Check active link
     const isActiveLink = (path: string) => (pathname === path ? 'text-green-500' : 'text-white');

     return (
          <>
               {/* Small Screen Navbar */}
               <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden p-4 '>
                    <Link href='/'>
                         <div className="flex items-center gap-2 cursor-pointer">
                              <p className="text-[#0ecdb9] font-bold text-2xl">ShowFlix</p>
                         </div>
                    </Link>

                    <button onClick={handleToggle} className='focus:outline-none'>
                         <AiOutlineBars className='h-7 w-7 text-[#0ecdb9]' />
                    </button>
               </div>

               {/* Sidebar */}
               <div className={`fixed inset-y-0 left-0 z-20 flex flex-col justify-between w-64 bg-[#212529] text-white p-4
                transform ${isActive ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0 transition-transform duration-300 ease-in-out`}>

                    {/* Sidebar Header */}
                    <div className="hidden md:flex justify-center">
                         <Link href='/'>
                              <p className="text-red-500 font-bold text-2xl">ShowFlix</p>
                         </Link>
                    </div>

                    <h1 className='capitalize text-center mt-4'>{user?.role}</h1>

                    {/* Navigation Items */}
                    <nav className='mt-6'>
                         {user?.role === 'ADMIN' && (
                              <div>
                                   <Link
                                        href='/dashboard/admin/createProject'
                                        className={`flex items-center px-4 py-2 transition duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActiveLink('/dashboard/admin/createProject')}`}
                                   >
                                        <IoCreateOutline className='text-green-500' />
                                        <span className='mx-4 font-medium'>Create movies and series</span>
                                   </Link>
                                   <Link
                                        href='/dashboard/admin/createmoviesSeries'
                                        className={`flex items-center px-4 py-2 transition duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActiveLink('/dashboard/admin/createdProject')}`}
                                   >
                                        <SiCreatereactapp className='text-green-500' />
                                        <span className='mx-4 font-medium'>Create movies</span>
                                   </Link>
                                   <Link
                                        href='/dashboard/admin/alluser'
                                        className={`flex items-center px-4 py-2 transition duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActiveLink('/dashboard/admin/alluser')}`}
                                   >
                                        <MdCreateNewFolder className='text-green-500' />
                                        <span className='mx-4 font-medium'>All user</span>
                                   </Link>
                                   <Link
                                        href='/dashboard/admin/movie-series'
                                        className={`flex items-center px-4 py-2 transition duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActiveLink('/dashboard/admin/movie-series')}`}
                                   >
                                        <MdCreateNewFolder className='text-green-500' />
                                        <span className='mx-4 font-medium'>Get All Movies and Series</span>
                                   </Link>
                                   <Link
                                        href='/dashboard/admin/most-reviewed'
                                        className={`flex items-center px-4 py-2 transition duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActiveLink('/dashboard/admin/most-reviewed')}`}
                                   >
                                        <MdCreateNewFolder className='text-green-500' />
                                        <span className='mx-4 font-medium'>Most Reviewed</span>
                                   </Link>
                                   <Link
                                        href='/dashboard/admin/payment'
                                        className={`flex items-center px-4 py-2 transition duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActiveLink('/dashboard/admin/payment')}`}
                                   >
                                        <FaBloggerB className='text-green-500' />
                                        <span className='mx-4 font-medium'>Payment</span>
                                   </Link>
                                   <Link
                                        href='/dashboard/admin/reviews'
                                        className={`flex items-center px-4 py-2 transition duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActiveLink('/dashboard/admin/reviews')}`}
                                   >
                                        <LuMessageCircle className='text-green-500' />
                                        <span className='mx-4 font-medium'>Reviews</span>
                                   </Link>
                                   <Link
                                        href='/dashboard/admin/comments'
                                        className={`flex items-center px-4 py-2 transition duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActiveLink('/dashboard/admin/comments')}`}
                                   >
                                        <LuMessageCircle className='text-green-500' />
                                        <span className='mx-4 font-medium'>Comments</span>
                                   </Link>
                              </div>

                         )}
                         {user?.role === 'USER' && (
                              <div>
                                   <Link
                                        href='/dashboard/user/payment'
                                        className={`flex items-center px-4 py-2 transition duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActiveLink('/dashboard/user/payment')}`}
                                   >
                                        <IoCreateOutline className='text-green-500' />
                                        <span className='mx-4 font-medium'>Payment</span>
                                   </Link>
                                   <Link
                                        href='/dashboard/user/myComment'
                                        className={`flex items-center px-4 py-2 transition duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActiveLink('/dashboard/user/myComment')}`}
                                   >

                                        <SiCreatereactapp className='text-green-500' />
                                        <span className='mx-4 font-medium'>MyComment</span>
                                   </Link>
                                   <Link
                                        href='/dashboard/user/myReviews'
                                        className={`flex items-center px-4 py-2 transition duration-300 transform hover:bg-gray-300 hover:text-gray-700 ${isActiveLink('/dashboard/user/myReviews')}`}
                                   >
                                        <MdCreateNewFolder className='text-green-500' />
                                        <span className='mx-4 font-medium'>my Reviews</span>
                                   </Link>
                              </div>

                         )}
                    </nav>

                    {/* Profile & Footer */}
                    <div className="border-t border-gray-600 mt-auto pt-4">
                         {/* Add profile-related items here */}
                    </div>
               </div>

               {/* Overlay for small screens */}
               {isActive && (
                    <div
                         className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
                         onClick={handleToggle}
                    ></div>
               )}
          </>
     );
};

export default Sidebar;
