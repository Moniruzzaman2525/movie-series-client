/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUser } from "@/context/userContext"
import { CreditCard, CheckCircle2, XCircle, DollarSign, Calendar } from "lucide-react"
import Link from "next/link"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { rejectPayment, updateAdminStatus } from "@/service/Payments"
import { toast } from "sonner"

export function PaymentTable(payload: any) {
  const user = useUser()
  // Calculate total amount
  const totalAmount = payload.invoice.reduce((sum: number, invoice: any) => {
    const amount = Number.parseFloat(invoice?.total_amount || 0)
    return sum + (isNaN(amount) ? 0 : amount)
  }, 0)

  const handleAdminPaymentApproved = async(invoiceId: string) => {
    const id=toast.loading('Approving Payment')
    const result=await updateAdminStatus(invoiceId)
    if(result.success===true){
      toast.success('Payment Approved',{id})
    }else{
      toast.error('Payment Not Approved',{id})
    }
  }
  const handleAdminPaymentRejected = async (invoiceId: string) => {
    const id=toast.loading('Rejecting Payment')
    const result = await rejectPayment(invoiceId)
    console.log(result);
    if(result.success===true){
      toast.success('Payment Rejected',{id})
    }else{
      toast.error('Payment Not Rejected',{id})
    }
  }
  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
      <div className="p-6 flex items-center justify-between border-b border-slate-100">
        <div>
          <h3 className="text-xl font-semibold text-slate-800">Payment History</h3>
          <p className="text-sm text-slate-500 mt-1">Your recent transactions</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full">
          <DollarSign className="h-5 w-5 text-emerald-500" />
          <span className="font-semibold text-slate-700">${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="px-6 py-4">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-slate-200">
              <TableHead className="w-[60px] font-bold text-slate-700">#</TableHead>
              <TableHead className="font-bold text-slate-700">Title</TableHead>
              <TableHead className="font-bold text-slate-700">Video</TableHead>
              <TableHead className="font-bold text-slate-700">Transaction</TableHead>
              <TableHead className="font-bold text-slate-700">Status</TableHead>
              <TableHead className="font-bold text-slate-700">Admin Status</TableHead>
              <TableHead className="font-bold text-slate-700">Streaming On</TableHead>
              <TableHead className="text-right font-bold text-slate-700">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payload.invoice.map((invoice: any, index: number) => (
              console.log(invoice),
              <TableRow
                key={invoice.id || index}
                className="border-b border-slate-100 hover:bg-slate-50/80 transition-colors"
              >
                <TableCell className="font-medium text-slate-500 py-4">{index + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-800 truncate max-w-[200px]">
                      {invoice?.video?.title || "Untitled Video"}
                    </span>
                    <span className="text-xs text-slate-500 mt-1 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                {user.user?.role === 'USER' ?
                  <TableCell>
                    {invoice?.adminStatus === false ?
                      <div>
                        <div className="flex flex-col">
                          <span className="font-medium text-red-500 truncate max-w-[200px]">
                            Pending..
                          </span>
                        </div>
                      </div> : <div>
                        <div className="flex flex-col">
                          <span className="font-medium  truncate max-w-[200px] text-emerald-500 bg-emerald-200 rounded-full text-center">
                            <Link href={`/player?id=${invoice?.video?.id}`}> Watch Now</Link>
                          </span>
                        </div>
                      </div>
                    }
                  </TableCell> : <TableCell>
                    {invoice?.adminStatus === false ?
                      <div>
                        <div className="flex flex-col">
                          <span className="font-medium text-red-500 truncate max-w-[200px]">
                            Pending..
                          </span>
                        </div>
                      </div> : <div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span className="font-medium  truncate max-w-[200px] text-emerald-500   rounded-full text-center">
                            Approved
                          </span>
                        </div>
                      </div>
                    }
                  </TableCell>

                }
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center mr-2">
                      <CreditCard className="h-4 w-4 text-slate-600" />
                    </div>
                    <span className="font-mono text-xs text-slate-600">{invoice?.tran_id || "N/A"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {invoice?.paymentStatus === false ? (
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-red-50 flex items-center justify-center mr-2">
                        <XCircle className="h-4 w-4 text-red-500" />

                      </div>
                      <span className="text-red-500 font-medium">Unpaid</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center mr-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      </div>
                      <span className="text-emerald-500 font-medium">Paid</span>
                    </div>
                  )}
                </TableCell>
                {user?.user?.role === 'USER' ?
                  <TableCell>
                    {invoice?.
                      adminStatus === false ? (
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-red-50 flex items-center justify-center mr-2">
                          <XCircle className="h-4 w-4 text-red-500" />
                        </div>
                        <span className="text-red-500 font-medium">Pending</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center mr-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </div>
                        <span className="text-emerald-500 font-medium p-4">Approved</span>
                      </div>
                    )}
                  </TableCell> : <TableCell>
                    {invoice?.
                      adminStatus === false ? (
                      <div className="flex items-center justify-center">
                        <div className="h-6 w-6 rounded-full bg-red-50 flex items-center justify-center mr-2">


                          <AlertDialog>
                            <AlertDialogTrigger>
                              <XCircle  className="h-5 w-5 text-red-500 cursor-pointer hover:scale-105" />
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your account
                                  and remove your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="bg-red-500 text-white cursor-pointer">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleAdminPaymentRejected(invoice?.id)} className="bg-emerald-600 text-white cursor-pointer">Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                        </div>
                        <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center mr-2">

                          <AlertDialog>
                            <AlertDialogTrigger>
                              <CheckCircle2 className="h-5 w-6 text-emerald-500 cursor-pointer hover:scale-105" />
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete your account
                                  and remove your data from our servers.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="bg-red-500 text-white cursor-pointer">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleAdminPaymentApproved(invoice?.id)}  className="bg-emerald-600 text-white cursor-pointer">Continue</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                        </div>

                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <div className="h-6 w-6 rounded-full bg-emerald-50 flex items-center justify-center mr-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        </div>
                        <span className="text-emerald-500 font-medium">Approved</span>
                      </div>
                    )}
                  </TableCell>

                }

                <TableCell className="text-right">
                  <div className="bg-slate-100 px-3 py-1 rounded-full inline-block">
                    <span className="font-semibold text-slate-800 flex justify-self-start">
                      {invoice?.video?.streamingPlatform
                      }
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="bg-slate-100 px-3 py-1 rounded-full inline-block">
                    <span className="font-semibold text-slate-800">
                      ${Number.parseFloat(invoice?.total_amount || 0).toFixed(2)}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="bg-slate-50 p-6 border-t border-slate-200">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-500">Showing {payload.invoice.length} transactions</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-slate-700">Total Amount:</span>
            <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
              <span className="font-bold text-slate-800">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
