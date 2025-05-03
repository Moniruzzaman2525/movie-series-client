/* eslint-disable @typescript-eslint/no-explicit-any */
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
  
  export function PaymentTable(payload:any) {
    return (
      <Table>
        <TableCaption>A list of your recent Comments</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Number</TableHead>
            <TableHead>Video Name</TableHead>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right" >Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm font-medium text-slate-700">
  {payload.invoice.map((invoice: any, index: number) => (
    <TableRow key={invoice.id || index}
    className={index % 2 === 0 ? "bg-white" : "bg-gray-300"}
    >
      <TableCell className="font-medium">{index + 1}</TableCell>
      <TableCell>{invoice?.video?.title || 'N/A'}</TableCell>
      <TableCell>{invoice?.tran_id || 'N/A'}</TableCell>
      {invoice?.paymentStatus==false?<TableCell className="text-red-500">{String(invoice?.paymentStatus) || 'N/A'}</TableCell>:<TableCell className="text-red-500">{String(invoice?.paymentStatus) || 'N/A'}</TableCell>
      }
      <TableCell className="text-right">{invoice?.total_amount || '0'}</TableCell>
    </TableRow>
  ))}
</TableBody>

        <TableFooter>

        </TableFooter>
      </Table>
    )
  }
  