import type React from "react"
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return <div className={cn("animate-pulse rounded-md bg-gray-800/50", className)} {...props} />
}

export function SkeletonShimmer({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-gray-800/50 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gray-700/20 before:to-transparent",
        className,
      )}
      {...props}
    />
  )
}
