interface TableSkeletonProps {
    rows?: number
    columns?: number
    hasActions?: boolean
    hasBadge?: boolean
    className?: string
}

export function TableSkeleton({
    rows = 5,
    columns = 5,
    hasActions = true,
    hasBadge = true,
    className = "",
}: TableSkeletonProps) {
    // Generate column headers based on the number of columns
    const headerCells = Array.from({ length: columns }, (_, i) => (
        <th
            key={`header-${i}`}
            className={`px-4 py-3 ${i === 0 ? "w-[80px]" : ""} ${i === columns - 1 && hasActions ? "text-right" : ""}`}
        >
            <div className="h-4 bg-gray-200 rounded animate-pulse w-full max-w-[100px]"></div>
        </th>
    ))

    // If there are actions, add an actions header
    if (hasActions) {
        headerCells.push(
            <th key="header-actions" className="px-4 py-3 text-right w-[120px]">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16 ml-auto"></div>
            </th>,
        )
    }

    // Generate rows with cells
    const skeletonRows = Array.from({ length: rows }, (_, rowIndex) => {
        const rowCells = Array.from({ length: columns }, (_, colIndex) => {
            // First column is usually narrower (for numbers/IDs)
            if (colIndex === 0) {
                return (
                    <td key={`cell-${rowIndex}-${colIndex}`} className="px-4 py-3 font-medium">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-6"></div>
                    </td>
                )
            }

            // If this is a status column and hasBadge is true
            if (hasBadge && colIndex === columns - 1) {
                return (
                    <td key={`cell-${rowIndex}-${colIndex}`} className="px-4 py-3">
                        <div className="h-6 bg-gray-200 rounded-full animate-pulse w-16"></div>
                    </td>
                )
            }

            // Regular data cell with varying widths for visual interest
            const widths = ["w-32", "w-40", "w-24", "w-36", "w-28"]
            return (
                <td key={`cell-${rowIndex}-${colIndex}`} className="px-4 py-3">
                    <div className={`h-4 bg-gray-200 rounded animate-pulse ${widths[colIndex % widths.length]}`}></div>
                </td>
            )
        })

        // If there are actions, add action buttons
        if (hasActions) {
            rowCells.push(
                <td key={`cell-${rowIndex}-actions`} className="px-4 py-3 text-right">
                    <div className="flex justify-end space-x-1">
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </td>,
            )
        }

        return (
            <tr
                key={`row-${rowIndex}`}
                className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-300"} border-b border-gray-200`}
            >
                {rowCells}
            </tr>
        )
    })

    return (
        <div className={`w-full space-y-4 ${className}`}>
            <div className="rounded-md border bg-white shadow-sm overflow-hidden">
                <div className="min-w-full divide-y divide-gray-200">
                    {/* Table Caption */}
                    <div className="py-3 px-4 text-center">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mx-auto"></div>
                    </div>

                    {/* Table Header */}
                    <div className="bg-gray-100">
                        <div className="min-w-full">
                            <tr>{headerCells}</tr>
                        </div>
                    </div>

                    {/* Table Body */}
                    <div className="bg-white divide-y divide-gray-200">{skeletonRows}</div>
                </div>
            </div>

            {/* Pagination Skeleton */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-[70px]"></div>
                </div>
                <div className="flex items-center space-x-1">
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
            </div>
        </div>
    )
}
