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
  // const invoices = [
  //   {
  //     invoice: "INV001",
  //     paymentStatus: "Paid",
  //     totalAmount: "$250.00",
  //     paymentMethod: "Credit Card",
  //   },
  //   {
  //     invoice: "INV002",
  //     paymentStatus: "Pending",
  //     totalAmount: "$150.00",
  //     paymentMethod: "PayPal",
  //   },
  //   {
  //     invoice: "INV003",
  //     paymentStatus: "Unpaid",
  //     totalAmount: "$350.00",
  //     paymentMethod: "Bank Transfer",
  //   },
  //   {
  //     invoice: "INV004",
  //     paymentStatus: "Paid",
  //     totalAmount: "$450.00",
  //     paymentMethod: "Credit Card",
  //   },
  //   {
  //     invoice: "INV005",
  //     paymentStatus: "Paid",
  //     totalAmount: "$550.00",
  //     paymentMethod: "PayPal",
  //   },
  //   {
  //     invoice: "INV006",
  //     paymentStatus: "Pending",
  //     totalAmount: "$200.00",
  //     paymentMethod: "Bank Transfer",
  //   },
  //   {
  //     invoice: "INV007",
  //     paymentStatus: "Unpaid",
  //     totalAmount: "$300.00",
  //     paymentMethod: "Credit Card",
  //   },
  // ]
  export function ReviewTable(payload:any) {
    const handleDelete=(id:string)=>{
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
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
        <TableCaption>A list of your recent Comments</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Number</TableHead>
            <TableHead>Content</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Like</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right" >Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm font-medium text-slate-700">
  {payload.invoice.data.map((invoice: any, index: number) => (
    <TableRow key={invoice.id || index}
    className={index % 2 === 0 ? "bg-white" : "bg-gray-300"}
    >
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{invoice?.content || 'N/A'}</TableCell>
      <TableCell>{invoice?.rating || 'N/A'}</TableCell>
      <TableCell>{String(invoice?.like)|| 'N/A'}</TableCell>
      {invoice?.status === 'PENDING'||"REJECT" ? <TableCell className="text-red-500">{String(invoice?.status) || 'N/A'}</TableCell>:<TableCell className="text-green-500">{String(invoice?.status) || 'N/A'}</TableCell>
      }
      <TableCell onClick={()=>handleDelete(invoice?.id)} className="flex justify-end text-red-500"><Trash/></TableCell>
    </TableRow>
  ))}
</TableBody>

        <TableFooter>

        </TableFooter>
      </Table>
    )
  }
  