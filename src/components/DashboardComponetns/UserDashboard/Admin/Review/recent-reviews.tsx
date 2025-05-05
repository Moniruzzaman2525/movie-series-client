import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import { Review } from "./ReviewDashboard"



interface RecentReviewsProps {
    data: Review[]
}

export function RecentReviews({ data }: RecentReviewsProps) {
    console.log(data)
    if (!data || data.length === 0) {
        return <div className="py-8 text-center">No recent reviews available</div>
    }

    return (
        <div className="space-y-4">
            {data.map((review) => (
                <Card key={review.id}>
                    <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                            <Avatar>
                                <AvatarImage src={review.user.avatar || "/placeholder.svg"} alt={review.user.name} />
                                <AvatarFallback>{review.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <div className="font-semibold">{review.title}</div>
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                                            />
                                        ))}
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
