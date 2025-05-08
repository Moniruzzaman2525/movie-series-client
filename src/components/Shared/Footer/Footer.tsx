/* eslint-disable @typescript-eslint/no-unused-vars */


import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="bg-neutral-900 text-white">
      <div className="container mx-auto pt-10 px-5">
        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5">
          <div className="flex gap-2 justify-center">
            <h1 className="text-5xl font-bold">
              SHOW<span className="text-red-700">FLIX</span>
            </h1>
          </div>

          {/* Explore Section */}
          <div>
            <p className="text-base text-gray-500">Explore</p>
            <ul className="mt-8 space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  Series
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  Genres
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <p className="text-base text-gray-500">Support</p>
            <ul className="mt-8 space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <p className="text-base text-gray-500">Follow Us</p>
            <ul className="mt-8 space-y-4">
              <li>
                <Link
                  href="#"
                  className="text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  YouTube
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-800" />

        <div className=" items-center justify-between">
          
          <p className="text-center mt-5 text-white pb-5">
            Copyright © 2025 Showflix. All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
