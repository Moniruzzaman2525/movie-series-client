"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle, FaCrown, FaStar, FaGem } from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";

const SubscriptionPage = () => {
     const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
     const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
     const [isClient, setIsClient] = useState(false); // State to track if it is client-side

     useEffect(() => {
          // Set isClient to true when the component is mounted (client-side)
          setIsClient(true);
     }, []);

     const plans = [
          {
               name: "Starter",
               price: "$9.99",
               period: "month",
               features: [
                    "HD streaming",
                    "1 device at a time",
                    "Limited content library",
                    "Basic support",
               ],
               icon: <FaStar className="text-yellow-400" />,
               popular: false,
          },
          {
               name: "Premium",
               price: "$19.99",
               period: "month",
               features: [
                    "4K Ultra HD",
                    "4 devices simultaneously",
                    "Full content library",
                    "Priority support",
                    "Download for offline",
               ],
               icon: <FaCrown className="text-purple-400" />,
               popular: true,
          },
          {
               name: "Ultimate",
               price: "$29.99",
               period: "month",
               features: [
                    "4K HDR + Dolby Atmos",
                    "Unlimited devices",
                    "All Premium features",
                    "VIP customer service",
                    "Exclusive content",
                    "Early access",
               ],
               icon: <FaGem className="text-blue-400" />,
               popular: false,
          },
     ];

     return (
          <div className="min-h-screen bg-black text-white">
               {/* Animated background elements */}
               {isClient && (
                    <div className="absolute inset-0 overflow-hidden">
                         {[...Array(10)].map((_, i) => (
                              <motion.div
                                   key={i}
                                   className="absolute rounded-full bg-white/5"
                                   initial={{
                                        x: Math.random() * window.innerWidth,
                                        y: Math.random() * window.innerHeight,
                                        width: Math.random() * 300 + 100,
                                        height: Math.random() * 300 + 100,
                                   }}
                                   animate={{
                                        x: [null, Math.random() * window.innerWidth],
                                        y: [null, Math.random() * window.innerHeight],
                                   }}
                                   transition={{
                                        duration: Math.random() * 30 + 20,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "linear",
                                   }}
                              />
                         ))}
                    </div>
               )}

               <div className="container mx-auto px-4 py-16 relative z-10">
                    <motion.div
                         className="text-center mb-16"
                         initial={{ opacity: 0, y: -20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ duration: 0.6 }}
                    >
                         <motion.h1
                              className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                         >
                              Choose Your Plan
                         </motion.h1>
                         <motion.p
                              className="text-xl text-gray-300 max-w-2xl mx-auto"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4 }}
                         >
                              Upgrade your experience with our premium subscription plans. Cancel anytime.
                         </motion.p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                         {plans.map((plan) => (
                              <motion.div
                                   key={plan.name}
                                   className={`relative rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10 transition-all duration-300 ${selectedPlan === plan.name
                                        ? "ring-2 ring-purple-500 shadow-lg shadow-purple-500/20"
                                        : "hover:shadow-lg hover:shadow-purple-500/10"
                                        } ${plan.popular ? "bg-gradient-to-br from-purple-900/50 to-pink-900/50" : "bg-gray-900/50"} h-full flex flex-col`}
                                   whileHover={{ y: -10 }}
                                   initial={{ opacity: 0, y: 20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{ duration: 0.5 }}
                                   onClick={() => setSelectedPlan(plan.name)}
                                   onMouseEnter={() => setHoveredPlan(plan.name)}
                                   onMouseLeave={() => setHoveredPlan(null)}
                              >
                                   {plan.popular && (
                                        <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold px-4 py-1 rounded-bl-lg">
                                             MOST POPULAR
                                        </div>
                                   )}

                                   <div className="p-8 flex flex-col justify-between h-full">
                                        <div className="flex items-center justify-between mb-6">
                                             <div>
                                                  <h3 className="text-2xl font-bold flex items-center gap-2">
                                                       {plan.icon}
                                                       {plan.name}
                                                  </h3>
                                                  <div className="flex items-end mt-2">
                                                       <span className="text-4xl font-bold">{plan.price}</span>
                                                       <span className="text-gray-400 ml-1">/{plan.period}</span>
                                                  </div>
                                             </div>
                                             <motion.div
                                                  animate={{
                                                       scale: hoveredPlan === plan.name ? 1.1 : 1,
                                                       rotate: hoveredPlan === plan.name ? 10 : 0,
                                                  }}
                                             >
                                                  <IoMdRocket className="text-3xl text-purple-400" />
                                             </motion.div>
                                        </div>

                                        <ul className="space-y-3 mb-8">
                                             {plan.features.map((feature, index) => (
                                                  <li key={index} className="flex items-start gap-3">
                                                       <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                                                       <span>{feature}</span>
                                                  </li>
                                             ))}
                                        </ul>

                                        <motion.button
                                             className={`w-full py-3 rounded-lg font-medium transition-all ${selectedPlan === plan.name
                                                  ? "bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg"
                                                  : "bg-white/10 hover:bg-white/20"
                                                  }`}
                                             whileHover={{ scale: 1.02 }}
                                             whileTap={{ scale: 0.98 }}
                                        >
                                             {selectedPlan === plan.name ? "Selected" : "Choose Plan"}
                                        </motion.button>
                                   </div>
                              </motion.div>
                         ))}
                    </div>

                    {selectedPlan && (
                         <motion.div
                              className="mt-16 max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 backdrop-blur-sm border border-white/10 shadow-xl"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                         >
                              <div className="text-center">
                                   <h3 className="text-2xl font-bold mb-2">
                                        You selected: <span className="text-purple-400">{selectedPlan}</span>
                                   </h3>
                                   <p className="text-gray-300 mb-6">
                                        Ready to upgrade your experience? Complete your subscription now.
                                   </p>
                                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <motion.button
                                             className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-medium shadow-lg"
                                             whileHover={{ scale: 1.03 }}
                                             whileTap={{ scale: 0.97 }}
                                        >
                                             Proceed to Payment
                                        </motion.button>
                                        <motion.button
                                             className="px-8 py-3 bg-gray-800 rounded-lg font-medium"
                                             whileHover={{ scale: 1.03 }}
                                             whileTap={{ scale: 0.97 }}
                                             onClick={() => setSelectedPlan(null)}
                                        >
                                             Change Plan
                                        </motion.button>
                                   </div>
                              </div>
                         </motion.div>
                    )}

                    <motion.div
                         className="mt-16 text-center text-gray-400 text-sm"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.8 }}
                    >
                         <p>All plans come with a 14-day money-back guarantee</p>
                         <p className="mt-2">Cancel anytime • No hidden fees</p>
                    </motion.div>
               </div>
          </div>
     );
};

export default SubscriptionPage;
