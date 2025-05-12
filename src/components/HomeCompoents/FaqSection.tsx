"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const faqs = [
  {
    question: "How do I create a StreamVista account?",
    answer:
      "To start your cinematic journey, click the 'Join Now' button on our homepage. Enter your details, choose your preferred subscription plan, and you'll be ready to explore our vast library of movies and TV series in minutes!",
  },
  {
    question: "What payment methods are accepted for subscriptions?",
    answer:
      "We accept all major credit cards, PayPal, and cryptocurrency. For our users in supported regions, you can also pay via SSLCommerz for secure, hassle-free transactions. Your payment information is always encrypted for maximum security.",
  },
  {
    question: "Can I download movies and series for offline viewing?",
    answer:
      "Absolutely! Our Premium plan allows you to download up to 100 titles across 5 devices. Watch your favorite blockbusters and binge-worthy series anywhere, anytime - perfect for flights or commutes!",
  },
  {
    question: "How does the 4K Ultra HD streaming work?",
    answer:
      "Our Premium plan delivers stunning 4K HDR quality with Dolby Atmos sound (where available). You'll need a 4K-capable device, at least 25Mbps internet connection, and our latest app version for the ultimate home theater experience.",
  },
  {
    question: "What's the difference between Basic and Premium plans?",
    answer:
      "Basic gives you HD streaming on 1 screen. Standard upgrades to 2 screens with Full HD. Premium unlocks 4 screens, 4K Ultra HD, offline downloads, and exclusive early access to new releases. All plans include our entire catalog of 20,000+ titles!",
  },
  {
    question: "Are new movie releases available immediately?",
    answer:
      "We add new theatrical releases as soon as they're available for streaming (typically 45-60 days after cinema debut). Premium members get exclusive 48-hour early access to select blockbusters - follow our 'Coming Soon' section for updates!",
  },
];

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="py-16 bg-black sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Glowing background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-900 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-pulse"></div>
        <div className="absolute -bottom-40 -right-20 w-96 h-96 bg-blue-900 rounded-full filter blur-3xl opacity-20 mix-blend-multiply animate-pulse delay-1000"></div>
      </div>

      <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl z-10">
        <SectionTitle
          text="StreamVista Help Center"
          subText="Your Questions, Answered"
       
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mt-12 space-y-6 md:mt-20"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="overflow-hidden rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 shadow-2xl transition-all duration-300 hover:shadow-purple-500/20"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full px-6 py-5 sm:p-7 group"
                >
                  <span className="flex text-xl font-bold text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 group-hover:from-purple-300 group-hover:to-blue-300 transition-colors duration-300">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 ml-4">
                    <svg
                      className={`w-7 h-7 text-purple-400 transform transition-all duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
                  style={{
                    maxHeight: isOpen
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                  }}
                >
                  <div className="px-6 pb-7 sm:px-7">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-xl text-gray-400">
            Need more help with your streaming experience?
          </p>
          <a
            href="#"
            className="inline-flex items-center mt-4 text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 hover:from-purple-300 hover:to-blue-300 transition-colors duration-300 group"
          >
            Contact Our Binge-Watching Support Team
            <svg
              className="w-5 h-5 ml-2 text-purple-400 group-hover:text-blue-300 transition-colors duration-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default FaqSection;