"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MostReviewedTable } from "./most-reviewed-table"
import { RatingsSummary } from "./ratings-summary"
import { RecentReviews } from "./recent-reviews"


export interface Review {
    id: string
    title: string
    user: User
    rating: number
    comment: string
    date: string
}

export interface User {
    name: string
    avatar: string
}


export interface Title {
    id: string
    title: string
    category: string
    reviewCount: number
    averageRating: string
}

export interface RatingSummary {
    rating: number;
    count: number;
    percentage: number | string;
}


interface DemoData {
    stats: {
        totalReviews: number;
        averageRating: number;
        titlesReviewed: number;
        activeReviewers: number;
    };
    titles: Title[];
    ratingSummary: RatingSummary[]
    reviews: Review[];
}

interface ReviewDashboardProps {
    demoData: DemoData;
}

export default function ReviewDashboard({ demoData }: ReviewDashboardProps) {

    const [category, setCategory] = useState<string>("all")
    const [limit, setLimit] = useState<string>("10")


    const filteredMostReviewed = demoData.titles
        .filter((title) => category === "all" || title.category === category)
        .sort((a, b) => b.reviewCount - a.reviewCount)
        .slice(0, Number.parseInt(limit))

    const handleCategoryChange = (value: string) => {
        setCategory(value)
    }

    const handleLimitChange = (value: string) => {
        setLimit(value)
    }

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{demoData.stats.totalReviews.toLocaleString()}</div>
                            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{demoData.stats.averageRating}</div>
                            <p className="text-xs text-muted-foreground">+0.3 from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Titles Reviewed</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{demoData.stats.titlesReviewed}</div>
                            <p className="text-xs text-muted-foreground">+18 from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Reviewers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{demoData.stats.activeReviewers}</div>
                            <p className="text-xs text-muted-foreground">+6.1% from last month</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <h2 className="text-xl md:text-2xl font-bold">Reports</h2>
                    <div className="flex flex-wrap gap-4 sm:ml-auto">
                        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                            <label htmlFor="category-select" className="text-sm font-medium">
                                Category
                            </label>
                            <Select value={category} onValueChange={handleCategoryChange}>
                                <SelectTrigger id="category-select" className="w-full sm:w-[180px] cursor-pointer">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#fafafa]">
                                    <SelectItem value="all">All Categories</SelectItem>
                                    <SelectItem value="Adventure">Movie</SelectItem>
                                    <SelectItem value="Fantasy">Series</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col gap-1.5 w-full sm:w-auto">
                            <label htmlFor="limit-select" className="text-sm font-medium">
                                Show
                            </label>
                            <Select value={limit} onValueChange={handleLimitChange}>
                                <SelectTrigger id="limit-select" className="w-full sm:w-[100px] cursor-pointer">
                                    <SelectValue placeholder="Limit" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#fafafa]">
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>

                {/* Scrollable tabs for mobile */}
                <div className="w-full overflow-auto">
                    <Tabs defaultValue="most-reviewed" className="w-full">
                        <TabsList className="w-full sm:w-auto flex flex-nowrap min-w-max sm:min-w-0">
                            <TabsTrigger className="data-[state=active]:text-green-500 cursor-pointer data-[state=active]:shadow" value="most-reviewed">Most Reviewed</TabsTrigger>
                            <TabsTrigger className="data-[state=active]:text-green-500 cursor-pointer data-[state=active]:shadow" value="ratings-summary">Ratings Summary</TabsTrigger>
                            <TabsTrigger className="data-[state=active]:text-green-500 cursor-pointer data-[state=active]:shadow" value="recent-reviews">Recent Reviews</TabsTrigger>
                            <TabsTrigger className="data-[state=active]:text-green-500 cursor-pointer data-[state=active]:shadow" value="preview">Data Preview</TabsTrigger>
                        </TabsList>
                        <TabsContent value="most-reviewed" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Most Reviewed Titles</CardTitle>
                                    <CardDescription>
                                        {category === "all"
                                            ? "The most frequently reviewed titles across all categories."
                                            : `The most frequently reviewed titles in the ${category} category.`}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-auto">
                                        <MostReviewedTable data={filteredMostReviewed} />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="ratings-summary" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ratings Distribution</CardTitle>
                                    <CardDescription>Overview of ratings distribution across all titles.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RatingsSummary data={demoData.ratingSummary} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="recent-reviews" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Reviews</CardTitle>
                                    <CardDescription>The most recent reviews submitted by users.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentReviews data={demoData.reviews.slice(0, 5)} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="preview" className="space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Data Preview</CardTitle>
                                    <CardDescription>Preview of the demo data structure used in this dashboard.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="overflow-auto">
                                        <pre className="text-xs bg-muted p-4 rounded-md">{JSON.stringify(demoData, null, 2)}</pre>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    )
}
