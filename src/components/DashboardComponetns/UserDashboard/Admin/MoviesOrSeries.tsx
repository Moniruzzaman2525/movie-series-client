
"use client"

import { useState } from "react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Trash, CircleCheck, Star, Pen, X } from "lucide-react"
import { approvedUserReview, deleteUserReview } from "@/service/Admin"
import { toast } from "sonner"
import Swal from "sweetalert2"
import { Skeleton } from "@/components/ui/skeleton"

import { addEditorPick, removeEditorPick } from "@/service/EditorPick"
import { IMovie } from "@/types/Movie"
import { MdSystemUpdateAlt } from "react-icons/md"
import Link from "next/link"





interface AllUserTableProps {
    data: {
        data: IMovie[]
    }
    isLoading?: boolean
}

export function MoviesOrSeries({ data, isLoading = false }: AllUserTableProps) {
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)

    console.log(data)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentUsers = data?.data.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(data?.data.length / itemsPerPage)

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(Number(value))
        setCurrentPage(1)
    }

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want delete this review!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            background: "#0f172a",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await deleteUserReview(id)

                    if (res.success) {
                        toast.success("Review Deleted Successfully")
                    } else {
                        toast.error("Review Not Deleted")
                    }
                } catch (error) {
                    toast.error("Review Not Deleted")
                }
            }
        })
    }

    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    const handleAddEditorPick = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want add this video as editor pick!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!",
            background: "#0f172a",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const data = {
                    videoId: id
                }
                const res = await addEditorPick(data)
                if (res.success) {
                    toast.success("Video add to editor pick successfully")
                }
            }
        })
    }
    const removeEditorPickFn = (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure you want add this video as editor pick!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, approve it!",
            background: "#0f172a",
        }).then(async (result) => {
            if (result.isConfirmed) {

                const res = await removeEditorPick(id)
                console.log(res)
                if (res.success) {
                    toast.success("Video add to editor pick successfully")
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
                if (res.success) {
                    toast.success("Review Reject Successfully")
                }
            }
        })
    }



    const renderStarRating = (rating: number) => {
        const maxVisibleStars = 5

        const normalizedRating = rating / 2

        return (
            <div className="flex items-center">
                {Array.from({ length: maxVisibleStars }).map((_, index) => {

                    const isHalfStar = index < normalizedRating && index + 1 > normalizedRating

                    const isFullStar = index + 1 <= normalizedRating

                    return (
                        <div key={index} className="relative">
                            {isHalfStar ? (

                                <div className="relative">
                                    <Star className="h-4 w-4 text-[#516c93]" />
                                    <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    </div>
                                </div>
                            ) : (

                                <Star className={`h-4 w-4 ${isFullStar ? "text-yellow-500 fill-yellow-500" : "text-[#516c93]"}`} />
                            )}
                        </div>
                    )
                })}
                <span className="ml-2 text-sm font-medium">{rating}/10</span>
            </div>
        )
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
                            <TableHead>Title</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Release year</TableHead>
                            <TableHead>Genre</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead className="w-[80px] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-sm font-medium text-slate-700">
                        {isLoading ? (
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
                                    <TableCell>
                                        <Skeleton className="h-4 w-20" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-4 w-24" />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Skeleton className="h-8 w-8 rounded-md ml-auto" />
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : currentUsers?.length > 0 ? (
                            currentUsers.map((movie, index) => (
                                <TableRow
                                    key={movie.id || index}
                                    className={index % 2 === 0 ? "bg-white hover:bg-gray-50" : "bg-gray-300 hover:bg-gray-200"}
                                >
                                    <TableCell className="font-medium">{indexOfFirstItem + index + 1}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {movie?.title || "N/A"}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {movie?.price || "N/A"}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {movie?.releaseYear || "N/A"}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {movie?.genre || "N/A"}
                                        </div>
                                    </TableCell>

                                    <TableCell className="min-w-[150px]">{renderStarRating(movie?.overallRating || 0)}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end space-x-1">

                                            {movie.EditorsPick.length === 0 ? <Button
                                                title="Add to Editor Pick"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleAddEditorPick(movie?.id)}
                                                className="h-8 w-8 p-0 text-green-500 hover:bg-green-50"
                                                aria-label={`Approve review`}
                                            >
                                                <CircleCheck className="h-4 w-4" />
                                            </Button> :
                                                <Button
                                                    title="Remove to Editor Pick"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeEditorPickFn(movie?.id)}
                                                    className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                                                    aria-label={`Approve review`}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            }
                                            <Button
                                                title="Edit Movie or Series"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleReject(movie?.id)}
                                                className="h-8 w-8 p-0 text-green-500 hover:bg-green-50"
                                                aria-label={`Reject review`}
                                            >
                                                <Pen className="h-4 w-4" />
                                            </Button>
                                            <Link href={`/dashboard/admin/movie-series/${movie?.id}`}>
                                                <Button
                                                    title="update"
                                                    variant="ghost"
                                                    size="sm"

                                                    className="h-8 w-8 p-0 text-green-500 cursor-pointer hover:bg-green-50"
                                                    aria-label={`Reject review`}
                                                >
                                                    <MdSystemUpdateAlt className="h-4 w-4" />
                                                </Button>
                                          </Link>
                                            <Button
                                                title="Delete Movie or Series"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(movie?.id)}
                                                className="h-8 w-8 p-0 text-red-500 hover:bg-red-50"
                                                aria-label={`Delete review`}
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No users found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

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
