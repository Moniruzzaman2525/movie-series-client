import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"


export function MostReviewedTable({ data }) {
    if (!data || data.length === 0) {
        return <div className="py-8 text-center">No data available</div>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Reviews</TableHead>
                    <TableHead className="text-right">Rating</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((title) => (
                    <TableRow key={title.id}>
                        <TableCell className="font-medium">{title.title}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{title.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{title.reviewCount}</TableCell>
                        <TableCell className="text-right">
                            <div className="flex items-center justify-end">
                                <Star className="h-4 w-4 fill-primary text-primary mr-1" />
                                <span>{title.averageRating}</span>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
