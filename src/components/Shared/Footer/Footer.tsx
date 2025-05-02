import Image from 'next/image';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <section className="py-10 bg-gray-900 sm:pt-16 lg:pt-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4 md:gap-x-12">
          {/* About Section */}
          <div>
            <p className="text-base text-gray-500">About</p>
            <ul className="mt-8 space-y-4">
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Our Story</a></li>
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Team</a></li>
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Careers</a></li>
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Press</a></li>
            </ul>
          </div>

          {/* Explore Section */}
          <div>
            <p className="text-base text-gray-500">Explore</p>
            <ul className="mt-8 space-y-4">
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Series</a></li>
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Movies</a></li>
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Genres</a></li>
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">New Releases</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <p className="text-base text-gray-500">Support</p>
            <ul className="mt-8 space-y-4">
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Help Center</a></li>
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Contact Us</a></li>
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Terms of Service</a></li>
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div>
            <p className="text-base text-gray-500">Follow Us</p>
            <ul className="mt-8 space-y-4">
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Instagram</a></li>
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Facebook</a></li>
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">Twitter</a></li>
              <li><a href="#" className="text-base text-white transition-all duration-200 hover:text-opacity-80">YouTube</a></li>
            </ul>
          </div>
        </div>

        <hr className="mt-16 mb-10 border-gray-800" />

        <div className="flex flex-wrap items-center justify-between">
          <Image
            className="h-8 auto md:order-1"
            src="/logo-white.svg"
            alt="Movie Series Logo"
            height={150}
            width={150}
          />
          <ul className="flex items-center space-x-3 md:order-3">
            {["twitter", "facebook", "instagram"].map((platform) => (
              <li key={platform}>
                <a
                  href="#"
                  className="flex items-center justify-center text-white transition-all duration-200 bg-transparent border border-gray-700 rounded-full w-7 h-7 hover:bg-blue-600 hover:border-blue-600"
                  aria-label={platform}
                >
                  <i className={`fab fa-${platform}`}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
