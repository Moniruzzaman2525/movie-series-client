/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import Swal from "sweetalert2"
import { deleteReview } from "@/service/Reviews"

export function ReviewTable(payload: any) {
  const handleDelete = async (id: string) => {
 
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a",
    });
  
    if (result.isConfirmed) {
      try {
        const res = await deleteReview(id);
        if (res.success) {
          toast.success("Review Deleted Successfully");
  
          if (payload.onDeleteSuccess) {
            payload.onDeleteSuccess(id);
          }
        } else {
          toast.error("Failed to delete review" );
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    } else {
      toast.info("Delete cancelled");
    }
  };
  

  // Ensure payload has the expected structure
  const reviews = payload?.invoice?.data || []

  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableCaption className="text-slate-500 font-medium py-4">A list of your recent comments</TableCaption>
        <TableHeader className="bg-slate-50">
          <TableRow className="hover:bg-slate-50/80">
            <TableHead className="w-[80px] font-semibold text-slate-700">No.</TableHead>
            <TableHead className="font-semibold text-slate-700">Content</TableHead>
            <TableHead className="font-semibold text-slate-700">Rating</TableHead>
            <TableHead className="font-semibold text-slate-700">Like</TableHead>
            <TableHead className="font-semibold text-slate-700">Status</TableHead>
            <TableHead className="text-right font-semibold text-slate-700">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((invoice: any, index: number) => (
            <TableRow
              key={invoice.id || index}
              className={`
                ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"} 
                transition-colors hover:bg-slate-100
              `}
            >
              <TableCell className="font-medium text-slate-700">{index + 1}</TableCell>
              <TableCell className="max-w-[300px] truncate">{invoice?.content || "N/A"}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <span className="font-medium text-amber-600">{invoice?.rating || "N/A"}</span>
                  {invoice?.rating && (
                    <div className="ml-2 flex">
                      {[...Array(Math.min(5, Math.round(invoice.rating)))].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{String(invoice?.like) || "N/A"}</TableCell>
              <TableCell>
                {invoice?.status === "PENDING" ? (
                  <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-50">
                    Pending
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                  >
                    Approved
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => handleDelete(invoice?.id)}
                  className="inline-flex items-center justify-center rounded-md w-8 h-8 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                  aria-label="Delete review"
                >
                  <Trash2 size={16} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="text-right text-sm text-slate-500">
              Total Reviews: {reviews.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
