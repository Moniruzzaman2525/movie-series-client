/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createUser } from "@/service/Auth";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
     const {
          register,
          handleSubmit,
          reset,
          formState: { errors },
     } = useForm();

     const [showPassword, setShowPassword] = useState(false);
     const router = useRouter();

     const onSubmit: SubmitHandler<FieldValues> = async (data) => {
          const id = toast.loading("Loading...");

          try {
               const result = await createUser(data);
               if (result.success) {
                    toast.success(result.message, { id });
                    router.push("/login");
                    reset();
               } else {
                    toast.error(result.message, { id });
                    reset();
               }
          } catch (error: any) {
               toast.error(error.message || "Something went wrong", { id });
          }
     };

     return (
          <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center">

               {/* Left Image */}
               <div className="w-full lg:w-1/2 h-64 lg:h-screen relative">
                    <Image
                         src="https://i.postimg.cc/vBVQtwWM/13524.jpg" 
                         alt="Register Illustration"
                         fill
                         className="object-cover"
                    />
               </div>

               {/* Right Form */}
               <div className="w-full lg:w-1/2 flex justify-center p-8">
                    <div className=" w-full max-w-md p-8 space-y-6">
                         <h2 className="text-3xl font-bold text-center text-gray-800">
                              Create an Account on
                         </h2>
                         <h2 className="text-xl font-bold text-center text-red-800">
                             ShowFlix
                         </h2>
                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                              {/* Name Field */}
                              <div>
                                   <label className="block text-gray-700 font-medium mb-1">Name</label>
                                   <input
                                        type="text"
                                        {...register("name", { required: "Name is required" })}
                                        className={`w-full px-4 py-2 border ${errors.name ? "border-red-500" : "border-gray-300"
                                             } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                   />
                                   {errors.name && (
                                        <p className="text-red-500 text-sm mt-1">{errors.name.message?.toString()}</p>
                                   )}
                              </div>

                              {/* Email Field */}
                              <div>
                                   <label className="block text-gray-700 font-medium mb-1">Email</label>
                                   <input
                                        type="email"
                                        {...register("email", {
                                             required: "Email is required",
                                             pattern: {
                                                  value: /^\S+@\S+$/i,
                                                  message: "Enter a valid email",
                                             },
                                        })}
                                        className={`w-full px-4 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                             } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                   />
                                   {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">{errors.email.message?.toString()}</p>
                                   )}
                              </div>

                              {/* Password Field with toggle */}
                              <div>
                                   <label className="block text-gray-700 font-medium mb-1">Password</label>
                                   <div className="relative">
                                        <input
                                             type={showPassword ? "text" : "password"}
                                             {...register("password", {
                                                  required: "Password is required",
                                                  minLength: {
                                                       value: 6,
                                                       message: "Password must be at least 6 characters",
                                                  },
                                             })}
                                             className={`w-full px-4 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                                                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        />
                                        <button
                                             type="button"
                                             onClick={() => setShowPassword((prev) => !prev)}
                                             className="absolute right-3 top-2.5 text-xl text-gray-500"
                                        >
                                             {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                                        </button>
                                   </div>
                                   {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password.message?.toString()}</p>
                                   )}
                              </div>

                              {/* Submit Button */}
                              <button
                                   type="submit"
                                   className="w-full bg-red-600 text-white py-2 rounded-lg cursor-pointer transition duration-200"
                              >
                                   Register
                              </button>
                         </form>
                         <p className="text-center text-sm text-gray-500">
                              Already have an account?{" "}
                              <Link href="/login" className="text-blue-600 hover:underline">
                                   Log in
                              </Link>
                         </p>
                    </div>
               </div>
          </div>
     );
}
