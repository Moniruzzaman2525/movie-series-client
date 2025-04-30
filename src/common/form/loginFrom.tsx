"use client";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Image from "next/image"; // Assuming you're using Next.js
import Link from "next/link";
import { toast } from "sonner";
import { forgotPass, loginUser } from "@/service/Auth";
import { useRouter } from "next/navigation";

export default function LoginForm() {
     const {
          register,
          handleSubmit,
          reset,
          formState: { errors },
     } = useForm();

     const [showPassword, setShowPassword] = useState(false);
     const router = useRouter()
     const [forgot,setForgot]=useState(false)

     const onSubmit: SubmitHandler<FieldValues> =async (data) => {
          const id = toast.loading("Loading...");

          try {
              if(!forgot){
                   const result = await loginUser(data);
                   if (result.success) {
                        toast.success(result.message, { id });
                        router.push("/");
                        reset();
                   } else {
                        toast.error(result.message, { id });
                        reset();
                   }
              }else{
                   const result = await forgotPass({email:data.email});
                   console.log(result)
                   if (result.success) {
                        toast.success(result.message, { id });
                        reset();
                   } else {
                        toast.error(result.message || "something wrong", { id });
                        reset();
                   }
              }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
               toast.error(error.message || "Something went wrong", { id });
          }
     };

     return (
          <div className="min-h-screen flex flex-col lg:flex-row">
               {/* Left Side Image */}
               <div className="w-full lg:w-1/2 h-64 lg:h-auto relative">
                    <Image
                         src="https://i.postimg.cc/1XFfXNWG/view-3d-film-reel.jpg" 
                         alt="Login Illustration"
                         fill
                         className="object-cover"
                    />
               </div>

               {/* Right Side Form */}
               <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
                    <div className="w-full max-w-md space-y-6">
                         <h2 className="text-3xl font-bold text-center text-gray-800">Welcome Back</h2>
                         <h6 className="text-xl font-bold text-center text-red-800">ShowFlix</h6>

                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                              {/* Email Field */}
                            {
                              !forgot ? <div>
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
                                                       onClick={() => setShowPassword(!showPassword)}
                                                       className="absolute right-3 top-2.5 text-xl text-gray-500"
                                                  >
                                                       {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                                  </button>
                                             </div>
                                             {errors.password && (
                                                  <p className="text-red-500 text-sm mt-1">{errors.password.message?.toString()}</p>
                                             )}
                                             <div className="text-right mt-2">
                                                  <p onClick={()=>setForgot(true)} className="text-sm cursor-pointer text-blue-600 hover:underline">
                                                       Forgot Password?
                                                  </p>
                                             </div>
                                        </div></div> : <div>
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
                                                  <div className="text-right mt-2">
                                                       <p onClick={() => setForgot(false)} className="text-sm cursor-pointer text-blue-600 hover:underline">
                                                            back to  login?
                                                       </p>
                                                  </div>
                                             </div>
                                        </div>
                            }

                              {/* Submit Button */}
                              <button
                                   type="submit"
                                   className="w-full bg-red-600 text-white py-2 rounded-lg cursor-pointer transition duration-200"
                              >
                                   {!forgot ? " Login" :"send"}
                              </button>
                         </form>

                         <p className="text-center text-sm text-gray-600">
                              Don&apos;t have an account?{" "}
                              <Link href="/register" className="text-blue-600 hover:underline">
                                   Register here
                              </Link>
                         </p>
                    </div>
               </div>
          </div>
     );
}
