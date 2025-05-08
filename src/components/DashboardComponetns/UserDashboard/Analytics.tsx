"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


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

     const COLORS = ["#0088FE", "#FF8042"];

     return (
          <div className="p-6 space-y-6 bg-black text-white">
               <h1 className="text-3xl font-bold">Sales Analytics</h1>

               {/* Summary Cards */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gray-900 border-gray-800">
                         <CardHeader>
                              <CardTitle className="text-gray-300">Total Sales</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <p className="text-3xl font-bold text-white">{data.totalSell}</p>
                              <p className="text-sm text-gray-400">All-time transactions</p>
                         </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                         <CardHeader>
                              <CardTitle className="text-gray-300">Total Profit</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <p className="text-3xl font-bold text-white">
                                   ${data.total_Profit.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-400">Gross revenue</p>
                         </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                         <CardHeader>
                              <CardTitle className="text-gray-300">Product Mix</CardTitle>
                         </CardHeader>
                         <CardContent>
                              <p className="text-3xl font-bold text-white">
                                   {data.total_movie_sell_count} Movies
                              </p>
                              <p className="text-sm text-gray-400">
                                   {data.total_series_sell_count} Series
                              </p>
                         </CardContent>
                    </Card>
               </div>

               {/* Charts Section */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Bar Chart */}
                    <Card className="bg-gray-900 border-gray-800">
                         <CardHeader>
                              <CardTitle className="text-gray-300">
                                   Sales by Product Type
                              </CardTitle>
                         </CardHeader>
                         <CardContent>
                              <div className="h-[300px]">
                                   <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={barChartData}>
                                             <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                             <XAxis dataKey="name" stroke="#9CA3AF" />
                                             <YAxis stroke="#9CA3AF" />
                                             <Tooltip
                                                  contentStyle={{
                                                       backgroundColor: "#111827",
                                                       borderColor: "#374151",
                                                       borderRadius: "0.5rem",
                                                  }}
                                             />
                                             <Legend />
                                             <Bar
                                                  dataKey="sales"
                                                  name="Revenue ($)"
                                                  fill="#3B82F6"
                                                  radius={[4, 4, 0, 0]}
                                             />
                                             <Bar
                                                  dataKey="count"
                                                  name="Units Sold"
                                                  fill="#10B981"
                                                  radius={[4, 4, 0, 0]}
                                             />
                                        </BarChart>
                                   </ResponsiveContainer>
                              </div>
                         </CardContent>
                    </Card>

                    {/* Pie Chart */}
                    <Card className="bg-gray-900 border-gray-800">
                         <CardHeader>
                              <CardTitle className="text-gray-300">Sales Distribution</CardTitle>
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
                                                  fill="#8884d8"
                                                  dataKey="value"
                                                  label={({ name, percent }) =>
                                                       `${name}: ${(percent * 100).toFixed(0)}%`
                                                  }
                                             >
                                                  {pieChartData.map((entry, index) => (
                                                       <Cell
                                                            key={`cell-${index}`}
                                                            fill={COLORS[index % COLORS.length]}
                                                       />
                                                  ))}
                                             </Pie>
                                             <Tooltip
                                                  contentStyle={{
                                                       backgroundColor: "",
                                                       borderColor: "#374151",
                                                       borderRadius: "0.5rem",
                                                  }}
                                             />
                                        </PieChart>
                                   </ResponsiveContainer>
                              </div>
                         </CardContent>
                    </Card>
               </div>

               {/* Recent Transactions */}
               <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                         <CardTitle className="text-gray-300">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <div className="space-y-4">
                              {[...Array(3)].map((_, i) => (
                                   <div
                                        key={i}
                                        className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                                   >
                                        <div className="flex items-center space-x-4">
                                             <div className="p-3 rounded-full bg-blue-500/20">
                                                  <svg
                                                       xmlns="http://www.w3.org/2000/svg"
                                                       className="h-6 w-6 text-blue-400"
                                                       fill="none"
                                                       viewBox="0 0 24 24"
                                                       stroke="currentColor"
                                                  >
                                                       <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                       />
                                                  </svg>
                                             </div>
                                             <div>
                                                  <p className="font-medium text-white">Movie Purchase</p>
                                                  <p className="text-sm text-gray-400">2 hours ago</p>
                                             </div>
                                        </div>
                                        <p className="font-bold text-green-400">+$29.99</p>
                                   </div>
                              ))}
                         </div>
                    </CardContent>
               </Card>
          </div>
     );
}