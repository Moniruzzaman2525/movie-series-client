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
import { approvedUserReview, deleteUser } from "@/service/Admin";
import { CircleCheck, Trash, X } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2"

export function UserReview(payload: any) {

  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want delete this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: '#0f172a'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteUser(id)
        console.log(res)
        if (res.success) {
          toast.success("Review Deleted Successfully")
        }

      }
    });
  }
  const handleApproved = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want approved this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: '#0f172a'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          status: "APPROVED"
        }
        const res = await approvedUserReview(id, data)
        console.log(res)
        if (res.success) {
          toast.success("Review Approved Successfully")
        }

      }
    });
  }
  const handleReject = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want reject this review!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: '#0f172a'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const data = {
          status: "REJECTED"
        }
        const res = await approvedUserReview(id, data)
        console.log(res)
        if (res.success) {
          toast.success("Review Reject Successfully")
        }

      }
    });
  }
  return (
    <Table>
      <TableCaption>A list of user review</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Number</TableHead>
          <TableHead>User Name</TableHead>
          <TableHead>content</TableHead>
          <TableHead>Ratting</TableHead>
          <TableHead>Like</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-sm font-medium text-slate-700">
        {payload?.data?.data.map((user: any, index: number) => (
          <TableRow key={user.id || index}
            className={index % 2 === 0 ? "bg-white" : "bg-gray-300"}
          >
            <TableCell className="font-medium">{index + 1}</TableCell>
            <TableCell>{user?.user.name || 'N/A'}</TableCell>
            <TableCell>{user?.content || 'N/A'}</TableCell>
            <TableCell>{user?.rating}</TableCell>
            <TableCell>{user?.like}</TableCell>
            <TableCell>{user?.status}</TableCell>
            <div className="flex justify-end">
              <TableCell onClick={() => handleDelete(user?.id)} className="flex justify-end cursor-pointer text-red-500"><Trash /></TableCell>
              <TableCell onClick={() => handleApproved(user?.id)} className="flex justify-end cursor-pointer text-green-500"><CircleCheck /></TableCell>
              <TableCell onClick={() => handleReject(user?.id)} className="flex justify-end cursor-pointer text-green-500"><X /></TableCell>
            </div>
          </TableRow>
        ))}
      </TableBody>

      <TableFooter>

      </TableFooter>
    </Table>
  )
}
