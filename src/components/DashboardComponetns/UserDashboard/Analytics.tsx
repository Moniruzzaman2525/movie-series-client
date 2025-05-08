"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";
import { ArrowUpRight, Film, Tv } from "lucide-react";

const fadeIn = {
     hidden: { opacity: 0, y: 20 },
     visible: { opacity: 1, y: 0 },
};

export function SellAnalyticsDashboard({
     data,
}: {
     data: {
          totalSell: number;
          total_Profit: number;
          total_movie_sell: number;
          total_movie_sell_count: number;
          total_series_sell: number | null;
          total_series_sell_count: number;
     };
}) {
     // Data for charts
     const barChartData = [
          {
               name: "Movies",
               sales: data.total_movie_sell,
               count: data.total_movie_sell_count,
          },
          {
               name: "Series",
               sales: data.total_series_sell || 0,
               count: data.total_series_sell_count,
          },
     ];

     const pieChartData = [
          { name: "Movies", value: data.total_movie_sell_count },
          { name: "Series", value: data.total_series_sell_count },
     ];

     const COLORS = ["#6366f1", "#f59e0b"];

     return (
          <div className="p-6 space-y-6 bg-gradient-to-br from-gray-950 to-gray-900 text-white">
               <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    transition={{ duration: 0.5 }}
               >
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-amber-300 bg-clip-text text-transparent">
                         Sales Analytics
                    </h1>
                    <p className="text-gray-400 mt-2">Performance metrics and insights</p>
               </motion.div>

               {/* Summary Cards */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div variants={fadeIn} transition={{ delay: 0.1 }}>
                         <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:border-purple-500 transition-all duration-300">
                              <CardHeader className="flex flex-row items-center justify-between">
                                   <CardTitle className="text-gray-300 text-sm font-medium">Total Sales</CardTitle>
                                   <div className="p-2 rounded-lg bg-purple-500/10">
                                        <ArrowUpRight className="h-4 w-4 text-purple-400" />
                                   </div>
                              </CardHeader>
                              <CardContent>
                                   <p className="text-3xl font-bold text-white">{data.totalSell.toLocaleString()}</p>
                                   <p className="text-sm text-gray-400 mt-1">All-time transactions</p>
                              </CardContent>
                         </Card>
                    </motion.div>

                    <motion.div variants={fadeIn} transition={{ delay: 0.2 }}>
                         <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:border-amber-500 transition-all duration-300">
                              <CardHeader className="flex flex-row items-center justify-between">
                                   <CardTitle className="text-gray-300 text-sm font-medium">Total Profit</CardTitle>
                                   <div className="p-2 rounded-lg bg-amber-500/10">
                                        <ArrowUpRight className="h-4 w-4 text-amber-400" />
                                   </div>
                              </CardHeader>
                              <CardContent>
                                   <p className="text-3xl font-bold text-white">
                                        ${data?.total_Profit?.toLocaleString()}
                                   </p>
                                   <p className="text-sm text-gray-400 mt-1">Gross revenue</p>
                              </CardContent>
                         </Card>
                    </motion.div>

                    <motion.div variants={fadeIn} transition={{ delay: 0.3 }}>
                         <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:border-emerald-500 transition-all duration-300">
                              <CardHeader className="flex flex-row items-center justify-between">
                                   <CardTitle className="text-gray-300 text-sm font-medium">Product Mix</CardTitle>
                                   <div className="flex space-x-2">
                                        <div className="p-2 rounded-lg bg-blue-500/10">
                                             <Film className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <div className="p-2 rounded-lg bg-amber-500/10">
                                             <Tv className="h-4 w-4 text-amber-400" />
                                        </div>
                                   </div>
                              </CardHeader>
                              <CardContent>
                                   <div className="flex space-x-4">
                                        <div>
                                             <p className="text-2xl font-bold text-white">
                                                  {data?.total_movie_sell_count}
                                             </p>
                                             <p className="text-xs text-gray-400">Movies</p>
                                        </div>
                                        <div>
                                             <p className="text-2xl font-bold text-white">
                                                  {data?.total_series_sell_count}
                                             </p>
                                             <p className="text-xs text-gray-400">Series</p>
                                        </div>
                                   </div>
                              </CardContent>
                         </Card>
                    </motion.div>
               </div>

               {/* Charts Section */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bar Chart */}
                    <motion.div variants={fadeIn} transition={{ delay: 0.4 }}>
                         <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                              <CardHeader>
                                   <CardTitle className="text-gray-300 text-lg">
                                        Sales by Product Type
                                   </CardTitle>
                              </CardHeader>
                              <CardContent>
                                   <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                             <BarChart data={barChartData}>
                                                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                                                  <XAxis
                                                       dataKey="name"
                                                       stroke="#9CA3AF"
                                                       tick={{ fontSize: 12 }}
                                                  />
                                                  <YAxis
                                                       stroke="#9CA3AF"
                                                       tick={{ fontSize: 12 }}
                                                  />
                                                  <Tooltip
                                                       contentStyle={{
                                                            backgroundColor: "#1f2937",
                                                            borderColor: "#374151",
                                                            borderRadius: "0.5rem",
                                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                                       }}
                                                       itemStyle={{ color: "#fff" }}
                                                       labelStyle={{ fontWeight: 600, color: "#9CA3AF" }}
                                                  />
                                                  <Legend
                                                       wrapperStyle={{ paddingTop: "20px" }}
                                                  />
                                                  <Bar
                                                       dataKey="sales"
                                                       name="Revenue ($)"
                                                       fill="#6366f1"
                                                       radius={[4, 4, 0, 0]}
                                                       animationDuration={1500}
                                                  />
                                                  <Bar
                                                       dataKey="count"
                                                       name="Units Sold"
                                                       fill="#f59e0b"
                                                       radius={[4, 4, 0, 0]}
                                                       animationDuration={1500}
                                                  />
                                             </BarChart>
                                        </ResponsiveContainer>
                                   </div>
                              </CardContent>
                         </Card>
                    </motion.div>

                    {/* Pie Chart */}
                    <motion.div variants={fadeIn} transition={{ delay: 0.5 }}>
                         <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                              <CardHeader>
                                   <CardTitle className="text-gray-300 text-lg">Sales Distribution</CardTitle>
                              </CardHeader>
                              <CardContent>
                                   <div className="h-[300px]">
                                        <ResponsiveContainer width="100%" height="100%">
                                             <PieChart>
                                                  <Pie
                                                       data={pieChartData}
                                                       cx="50%"
                                                       cy="50%"
                                                       labelLine={false}
                                                       outerRadius={80}
                                                       innerRadius={50}
                                                       paddingAngle={5}
                                                       dataKey="value"
                                                       label={({ name, percent }) =>
                                                            `${name}: ${(percent * 100).toFixed(0)}%`
                                                       }
                                                       animationBegin={100}
                                                       animationDuration={1000}
                                                       animationEasing="ease-out"
                                                  >
                                                       {pieChartData.map((entry, index) => (
                                                            <Cell
                                                                 key={`cell-${index}`}
                                                                 fill={COLORS[index % COLORS.length]}
                                                                 stroke="#1f2937"
                                                                 strokeWidth={2}
                                                            />
                                                       ))}
                                                  </Pie>
                                                  <Tooltip
                                                       contentStyle={{
                                                            backgroundColor: "#1f2937",
                                                            borderColor: "#374151",
                                                            borderRadius: "0.5rem",
                                                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                                                       }}
                                                       itemStyle={{ color: "#fff" }}
                                                       formatter={(value) => [`${value} units`, "Count"]}
                                                  />
                                                  <Legend
                                                       wrapperStyle={{ paddingTop: "20px" }}
                                                       formatter={(value) => <span className="text-gray-300 text-sm">{value}</span>}
                                                  />
                                             </PieChart>
                                        </ResponsiveContainer>
                                   </div>
                              </CardContent>
                         </Card>
                    </motion.div>
               </div>

               {/* Recent Transactions */}
               <motion.div variants={fadeIn} transition={{ delay: 0.6 }}>
                    <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                         <CardHeader>
                              <CardTitle className="text-gray-300 text-lg">Recent Activity</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="space-y-3">
                                   {[...Array(3)]?.map((_, i) => (
                                        <motion.div
                                             key={i}
                                             whileHover={{ scale: 1.01 }}
                                             className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700 hover:border-purple-500/30 transition-colors duration-200"
                                        >
                                             <div className="flex items-center space-x-4">
                                                  <div className="p-3 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                                                       <Film className="h-5 w-5 text-purple-400" />
                                                  </div>
                                                  <div>
                                                       <p className="font-medium text-white">Movie Purchase</p>
                                                       <p className="text-sm text-gray-400">2 hours ago</p>
                                                  </div>
                                             </div>
                                             <div className="flex items-center space-x-2">
                                                  <p className="font-bold text-green-400">+$29.99</p>
                                                  <ArrowUpRight className="h-4 w-4 text-green-400" />
                                             </div>
                                        </motion.div>
                                   ))}
                              </div>
                         </CardContent>
                    </Card>
               </motion.div>
          </div>
     );
}