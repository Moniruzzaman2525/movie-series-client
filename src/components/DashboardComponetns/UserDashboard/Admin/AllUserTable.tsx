"use client"

import { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Trash, User, Mail, CircleCheck } from "lucide-react"
import { activeUser, deleteUser } from "@/service/Admin"
import { toast } from "sonner"
import Swal from "sweetalert2"
import { Skeleton } from "@/components/ui/skeleton"

interface User {
  id: string
  name: string
  email: string
  role: string
  isDeleted: boolean
}

interface AllUserTableProps {
  data: {
    data: User[]
  }
  isLoading?: boolean
}

export function AllUserTable({ data, isLoading = false }: AllUserTableProps) {

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)


  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentUsers = data?.data.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(data?.data.length / itemsPerPage)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value))
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  const handleDelete = async (id: string) => {
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
        try {
          const res = await deleteUser(id)

          if (res.success) {

            toast.success("User deleted successfully")
          } else {
            toast.error("Failed to delete user")
          }
        } catch (error) {
          console.error("Error deleting user:", error)
          toast.error("An error occurred while deleting the user")
        }
      }
    })
  }
  const handleUserActive = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want active this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#0f172a",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await activeUser(id)

          if (res.success) {
            toast.success("User active successfully")
          } else {
            toast.error("Failed to delete user")
          }
        } catch (error) {
          console.error("Error deleting user:", error)
          toast.error("An error occurred while deleting the user")
        }
      }
    })
  }

  // Generate page numbers for pagination
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="w-full space-y-4">
      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableCaption>
            {isLoading ? (
              <Skeleton className="h-4 w-64 mx-auto" />
            ) : (
              `Showing ${indexOfFirstItem + 1} to ${Math.min(indexOfLastItem, data?.data.length)} of ${data?.data.length} users`
            )}
          </TableCaption>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[80px]">Number</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
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
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-40" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                  </TableCell>
                </TableRow>
              ))
            ) : currentUsers.length > 0 ? (
              currentUsers.map((user, index) => (
                <TableRow
                  key={user.id || index}
                  className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-300 hover:bg-gray-200"}
                >
                  <TableCell className="font-medium">{indexOfFirstItem + index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      {user?.name || "N/A"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      {user?.email || "N/A"}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${user?.role === "admin" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                        }`}
                    >
                      {user?.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium
                          ${user?.isDeleted === false ? "bg-green-100 text-green-800"
                          : user?.isDeleted === true ? "bg-red-100 text-red-800"
                            : ""}`}
                    >
                      {user?.isDeleted === false ? "Active" : user?.isDeleted === true ? "Inactive" : ""}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(user?.id)}
                        className="h-8 w-8 p-0 text-red-500 cursor-pointer hover:bg-red-50"
                        aria-label={`Delete ${user?.name}`}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleUserActive(user?.id)}
                        className="h-8 w-8 p-0 text-green-500 cursor-pointer hover:bg-green-50"
                        aria-label={`Approve review`}
                      >
                        <CircleCheck className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>

                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between px-2">
        {isLoading ? (
          <>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-[70px]" />
            </div>
            <div className="flex items-center space-x-1">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-700">Rows per page:</p>
              <Select value={String(itemsPerPage)} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={itemsPerPage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {pageNumbers.map((number) => (
                <Button
                  key={number}
                  variant={currentPage === number ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(number)}
                  className="h-8 w-8 p-0"
                >
                  {number}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="h-8 w-8 p-0"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
