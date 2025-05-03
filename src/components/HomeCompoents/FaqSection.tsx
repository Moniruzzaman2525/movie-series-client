"use client";

import React, { useRef, useState } from "react";
import SectionTitleTwo from "../Shared/SectionTitle/SectionTitleTwo";

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "To create an account, click the “Sign Up” button on the homepage, enter your email address, choose a password, and follow the on-screen instructions to complete the registration process.",
  },
  {
    question: "How can I make a payment using SSLCommerz?",
    answer:
      "During checkout, select SSLCommerz as your payment method. You’ll be redirected to SSLCommerz to securely complete your transaction before returning to the site.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. You will continue to have access to the service until the end of your current billing cycle.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact our support team via the “Help Center” or by emailing support@streamflix.com. We aim to respond to all inquiries within 24 hours.",
  },
  {
    question: "Can I stream movies and series on multiple devices?",
    answer:
      "Absolutely. Depending on your subscription plan, you can stream content on up to 4 devices simultaneously. Our Basic plan allows 1 stream, Standard allows 2, and Premium supports 4 concurrent streams. All plans support HD, while Premium includes 4K Ultra HD where available.",
  },
];

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <SectionTitleTwo
          text="Frequently Asked Questions"
          subText="Do you have any questions?"
        />

        <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                >
                  <span className="flex text-lg font-semibold text-black">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{
                    maxHeight: isOpen
                      ? `${contentRefs.current[index]?.scrollHeight}px`
                      : "0px",
                  }}
                >
                  <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                    <p>
                      {faq.answer}{" "}
                      {/* <a
                        href="#"
                        className="text-blue-600 transition-all duration-200 hover:underline"
                      >
                        aliqua dolor
                      </a> */}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-gray-600 text-base mt-9">
          Didn’t find the answer you are looking for?{" "}
          <a
            href="#"
            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline"
          >
            Contact our support
          </a>
        </p>
      </div>
    </section>
  );
};

export default FaqSection;
