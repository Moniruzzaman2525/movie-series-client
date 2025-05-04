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
import { deleteReview } from "@/service/Reviews";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import Swal from "sweetalert2"

export function AllUserTable(payload: any) {

    const handleDelete=(id:string)=>{
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want delete this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            background:'#0f172a'
          }).then(async(result) => {
            if (result.isConfirmed) {
               const res= await deleteReview(id)
               console.log(res);
             toast.success("Review Deleted Successfully")
            }
          });
    }
    return (
      <Table>
        <TableCaption>A list of your user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm font-medium text-slate-700">
  {payload?.data?.data.map((user: any, index: number) => (
    <TableRow key={user.id || index}
    className={index % 2 === 0 ? "bg-white" : "bg-gray-300"}
    >
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{user?.name || 'N/A'}</TableCell>
      <TableCell>{user?.email || 'N/A'}</TableCell>
      <TableCell>{user?.role}</TableCell>
      <TableCell onClick={()=>handleDelete(user?.id)} className="flex justify-end cursor-pointer text-red-500"><Trash/></TableCell>
    </TableRow>
  ))}
</TableBody>

        <TableFooter>

        </TableFooter>
      </Table>
    )
  }
