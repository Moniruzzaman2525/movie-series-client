/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";

const Footer: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string }>();

  const labels = [
    { name: "Movies", link: "" },
    { name: "Serires", link: "" },
    { name: "Top Rated", link: "" },
    { name: "Upcoming", link: "" },
  ];

  const onSubmit = (data: { email: string }) => {
    console.log("Email submitted:", data.email);
    reset();
  };

  return (
    <div className="bg-neutral-900 text-white">
      <div className="container mx-auto py-10 px-5">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
          <div className="flex gap-2 justify-center">
            <h1 className="text-5xl font-bold">
              SHOW<span className="text-red-700">FLIX</span>
            </h1>
          </div>

          <div className="flex flex-col justify-center items-start">
            <p className="text-xl font-semibold">Important Links</p>
            {labels.map((item, index) => (
              <Link href={item.link} key={index}>
                <button
                  className={`md:font-medium text-md py-1 md:text-lg ${
                    selected === index
                      ? "border-0 border-b-2 border-red-700"
                      : ""
                  }`}
                  onClick={() => setSelected(index)}
                >
                  {item.name}
                </button>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-5 justify-center items-start">
            <div>
              <h2 className="text-3xl">Newsletter</h2>
              <p>
                Want to know what we are up to? Sign up to the newsletter and
                join our tribe.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full flex flex-col gap-3 mt-3"
              >
                <Input
                  {...register("email", { required: "Email is required" })}
                  placeholder="Email"
                  className="rounded-md"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
                <button
                  type="submit"
                  className="bg-red-700 hover:bg-red-900 text-white py-2 px-4 rounded"
                >
                  Subscribe
                </button>
              </form>
            </div>

            <p>Follow us on</p>
            <div className="grid grid-cols-5 gap-10 justify-center">
              <FaFacebookF className="w-5 h-5 text-white hover:text-red-500" />
              <FaTwitter className="w-5 h-5 text-white hover:text-red-500" />
              <FaLinkedinIn className="w-5 h-5 text-white hover:text-red-500" />
              <FaPinterestP className="w-5 h-5 text-white hover:text-red-500" />
              <BsInstagram className="w-5 h-5 text-white hover:text-red-500" />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-neutral-700" />
      <p className="text-center my-5 text-white pb-5">
        Copyright © 2025 Showflix. All rights reserved
      </p>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Footer), {
  ssr: false,
});
