/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { approvedUserReview, deleteUser } from "@/service/Admin"
import { CircleCheck, Trash, X } from "lucide-react"
import { toast } from "sonner"
import Swal from "sweetalert2"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"

interface UserReviewProps {
  data: {
    data: any[]
  }
  isLoading?: boolean
}

export function UserReview({ data, isLoading = false }: UserReviewProps) {
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want delete this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUser(id)
        if (res.success) {
          toast.success("Review Deleted Successfully")
        }
      }
    })
  }

  const handleApproved = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want approved this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
      background: "#0f172a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          status: "APPROVED",
        }
        const res = await approvedUserReview(id, data)
        console.log(res)
        if (res.success) {
          toast.success("Review Approved Successfully")
        }
      }
    })
  }

  const handleReject = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want reject this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
      background: "#0f172a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          status: "REJECTED",
        }
        const res = await approvedUserReview(id, data)
        console.log(res)
        if (res.success) {
          toast.success("Review Reject Successfully")
        }
      }
    })
  }

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableCaption>
            {isLoading ? <Skeleton className="h-4 w-64 mx-auto" /> : "A list of user reviews"}
          </TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[80px]">Number</TableHead>
              <TableHead>User Name</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Like</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm font-medium text-slate-700">
            {isLoading ? (
              // Skeleton rows
              Array.from({ length: 5 }, (_, index) => (
                <TableRow
                  key={`skeleton-${index}`}
                  className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-300 hover:bg-gray-200"}
                >
                  <TableCell className="font-medium">
                    <Skeleton className="h-4 w-6" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-48" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-8" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : data?.data?.length > 0 ? (
              data.data.map((user: any, index: number) => (
                <TableRow
                  key={user.id || index}
                  className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-300 hover:bg-gray-200"}
                >
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{user?.user?.name || "N/A"}</TableCell>
                  <TableCell>{user?.content || "N/A"}</TableCell>
                  <TableCell>{user?.rating}</TableCell>
                  <TableCell>{user?.like}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${user?.status === "APPROVED"
                          ? "bg-green-100 text-green-800"
                          : user?.status === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {user?.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(user?.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                        aria-label={`Delete review`}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleApproved(user?.id)}
                        className="h-8 w-8 p-0 text-green-500 hover:bg-green-50"
                        aria-label={`Approve review`}
                      >
                        <CircleCheck className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReject(user?.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                        aria-label={`Reject review`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No reviews found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
