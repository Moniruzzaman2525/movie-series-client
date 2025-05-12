/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { deleteComment } from "@/service/Comments"
import { MessageSquare, Trash2, CheckCircle2, Clock, AlertCircle, MessageCircle } from "lucide-react"
import { toast } from "sonner"
import Swal from "sweetalert2"

export function CommentsTable(payload: any) {
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteComment(id)
        if (res.success) {
          toast.success("Comment Deleted Successfully")
        }
      }
    })
  }

  // Get status icon based on status value
  const getStatusIcon = (status: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
      case "PENDING":
        return <Clock className="h-4 w-4 text-amber-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-slate-400" />
    }
  }

  // Get status color based on status value
  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "APPROVED":
        return "bg-emerald-50 text-emerald-700 border-emerald-100"
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-100"
      default:
        return "bg-slate-50 text-slate-700 border-slate-100"
    }
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="p-6 flex items-center justify-between border-b border-slate-100">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Comments</h3>
          <p className="text-sm text-slate-500 mt-1">Manage your recent comments</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
          <MessageCircle className="h-5 w-5 text-slate-600" />
          <span className="font-semibold text-slate-700">{payload.data.length} Comments</span>
        </div>
      </div>

      <div className="px-6 py-4">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-200">
              <TableHead className="w-[60px] font-bold text-slate-700">#</TableHead>
              <TableHead className="font-bold text-slate-700">Comment</TableHead>
              <TableHead className="w-[120px] font-bold text-slate-700">Status</TableHead>
              <TableHead className="w-[80px] text-right font-bold text-slate-700">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payload.data.map((comment: any, index: number) => (
              <TableRow
                key={comment.id || index}
                className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors"
              >
                <TableCell className="font-medium text-slate-500 py-4">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 mt-1">
                      <MessageSquare className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-slate-800 line-clamp-2">{comment.content}</p>
                      <span className="text-xs text-slate-500 mt-1">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center px-2.5 py-1 rounded-full border ${getStatusColor(
                      comment.status,
                    )}`}
                  >
                    {getStatusIcon(comment.status)}
                    <span className="ml-1.5 text-xs font-medium">{comment.status || "Unknown"}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="inline-flex items-center justify-center rounded-full w-8 h-8 bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                    aria-label="Delete comment"
                  >
                    <Trash2 size={16} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-slate-50 p-6 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">Showing {payload.data.length} comments</span>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs font-medium bg-white rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
              Previous
            </button>
            <button className="px-3 py-1.5 text-xs font-medium bg-white rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
