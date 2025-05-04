import React from "react";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailed = () => {
     return (
          <div className="min-h-screen bg-black flex items-center justify-center px-4">
               <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-red-700">
                    <FaTimesCircle className="text-red-600 text-6xl mx-auto mb-4 animate-pulse" />
                    <h1 className="text-3xl font-bold text-red-500 mb-2">Payment Failed</h1>
                    <p className="text-gray-300 mb-4">
                         Oops! Something went wrong during the transaction. Please try again or use a different payment method.
                    </p>
                    <div className="flex justify-center gap-4 mt-6">
                         <button className="bg-red-600 hover:bg-red-700 transition-all px-5 py-2 rounded-lg font-semibold">
                              Try Again
                         </button>
                         <button className="bg-gray-700 hover:bg-gray-800 transition-all px-5 py-2 rounded-lg font-semibold">
                              Contact Support
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default PaymentFailed;
