import Link from "next/link";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
     return (
          <div className="min-h-screen bg-black flex items-center justify-center px-4">
               <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-red-600">
                    <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4 animate-bounce" />
                    <h1 className="text-3xl font-bold text-red-500 mb-2">Payment Successful!</h1>
                    <p className="text-gray-300 mb-4">
                         Thank you for your purchase. Your transaction has been completed, and a confirmation email has been sent.
                    </p>
                    <Link href={'/'} className="mt-4 bg-red-600 hover:bg-red-700 transition-all px-6 py-2 rounded-lg text-white font-semibold">
                        Home
                    </Link>
               </div>
          </div>
     );
};

export default PaymentSuccess;
