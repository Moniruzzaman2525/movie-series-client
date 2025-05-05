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
import { deleteComment } from "@/service/Comments";
import { Trash } from "lucide-react"
import { toast } from "sonner";
import Swal from "sweetalert2";
  
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
                 const res= await deleteComment(id)
                 console.log(res);
               toast.success("Review Deleted Successfully")
              }
            });
      }
  export function CommentsTable(payload:any) {
    console.log(payload);
    return (
      <Table>
        <TableCaption>A list of your recent Comments</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-semibold">Number</TableHead>
            <TableHead className=" font-semibold">Comments</TableHead>
            <TableHead className=" font-semibold">Status</TableHead>
            <TableHead className="text-right  font-semibold">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm font-medium text-slate-700">
          {payload.data.map((invoice:any,key:number) => (
            <TableRow key={invoice.id|| key}
            className={key % 2 === 0 ? "bg-white" : "bg-gray-300"}
            >
              <TableCell className="font-medium">{key+1}</TableCell>
              <TableCell>{invoice.content}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell onClick={()=>handleDelete(invoice.id)} className="flex justify-end text-red-500 cursor-pointer"><Trash/></TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>

        </TableFooter>
      </Table>
    )
  }
  