import { Progress } from "@/components/ui/progress"
import { RatingSummary } from "./ReviewDashboard"




interface RatingsSummaryProps {
    data: RatingSummary[]
}

export function RatingsSummary({ data }: RatingsSummaryProps) {
    console.log(data)
    if (!data || data.length === 0) {
        return <div className="py-8 text-center">No data available</div>
    }

    return (
        <div className="space-y-4">
            {data.map((item) => (
                <div key={item.rating} className="flex items-center gap-4">
                    <div className="w-12 text-right font-medium">{item.rating} ★</div>
                    <Progress value={Number(item.percentage)} className="h-3" />
                    <div className="w-12 text-muted-foreground text-sm">{item.count}</div>
                </div>
            ))}
        </div>
    )
}
