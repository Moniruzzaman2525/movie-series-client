import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Review } from "./ReviewDashboard"



interface RecentReviewsProps {
    data: Review[]
}

export function RecentReviews({ data }: RecentReviewsProps) {

    if (!data || data.length === 0) {
        return <div className="py-8 text-center">No recent reviews available</div>
    }
    const renderStarRating = (rating: number) => {
        const maxVisibleStars = 5

        const normalizedRating = rating / 2

        return (
            <div className="flex items-center">
                {Array.from({ length: maxVisibleStars }).map((_, index) => {

                    const isHalfStar = index < normalizedRating && index + 1 > normalizedRating

                    const isFullStar = index + 1 <= normalizedRating

                    return (
                        <div key={index} className="relative">
                            {isHalfStar ? (

                                <div className="relative">
                                    <Star className="h-4 w-4 text-yellow-500" />
                                    <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    </div>
                                </div>
                            ) : (

                                <Star className={`h-4 w-4 ${isFullStar ? "text-yellow-500 fill-yellow-500" : "text-yellow-500"}`} />
                            )}
                        </div>
                    )
                })}
                <span className="ml-2 text-sm font-medium">{rating}/10</span>
            </div>
        )
    }
    return (
        <div className="space-y-4">
            {data.map((review) => (
                <Card key={review.id}>
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                                <AvatarFallback>{review.user.name}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="font-semibold">{review.title}</div>
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {renderStarRating(review?.rating || 0)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        by {review.user.name} • {review.date}
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground">{review.comment}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}
