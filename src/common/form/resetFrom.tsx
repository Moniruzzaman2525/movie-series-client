"use client";

import { resetPass } from "@/service/Auth";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "sonner";

interface FormValues {
     password: string;
}

export default function ResetPasswordPage() {
     const searchParams = useSearchParams();
     const ids = searchParams.get("id");
     const token = searchParams.get("token");
     const router = useRouter();

     const { register, reset, handleSubmit, formState: { errors } } = useForm<FormValues>();
     const [showPassword, setShowPassword] = useState(false);

     const onSubmit: SubmitHandler<FormValues> = async (data) => {
          const id = toast.loading("Loading...");

          try {
               const result = await resetPass(token!, { id: ids, password: data.password });
               if (result.success) {
                    toast.success(result.message, { id });
                    router.push("/login");
                    reset();
               } else {
                    toast.error(result.message, { id });
                    reset();
               }
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
               toast.error(error.message || "Something went wrong", { id });
          }
     };

     return (
          <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
               <div className="bg-white rounded-lg shadow-md w-full max-w-5xl flex flex-col lg:flex-row overflow-hidden">
                    {/* Left Side Image */}
                    <div className="lg:w-1/2 hidden lg:block">
                         <Image
                              height={200}
                              width={400}
                              src="https://i.postimg.cc/Vk8DYq7F/53.jpg"
                              alt="Reset Password"
                              className=" object-cover"
                         />
                    </div>

                    {/* Right Side Form */}
                    <div className="w-full lg:w-1/2 p-8 space-y-6">
                         <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                              {/* Password Field */}
                              <div>
                                   <label className="block text-gray-700 font-medium mb-1">New Password</label>
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
                                             {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                        </button>
                                   </div>
                                   {errors.password && (
                                        <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                   )}
                              </div>

                              {/* Submit Button */}
                              <button
                                   type="submit"
                                   className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                              >
                                   Reset Password
                              </button>
                         </form>
                    </div>
               </div>
          </div>
     );
}
