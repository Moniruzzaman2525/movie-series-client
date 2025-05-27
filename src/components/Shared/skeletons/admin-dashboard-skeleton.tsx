import { AnalyticsSkeleton } from "./analytics-skeleton"
import { AddContentFormSkeleton } from "./add-content-form-skeleton"
import { UserTableSkeleton } from "./user-table-skeleton"

interface AdminDashboardSkeletonProps {
  variant?: "analytics" | "add-content" | "user-table"
}

export function AdminDashboardSkeleton({ variant = "analytics" }: AdminDashboardSkeletonProps) {
  switch (variant) {
    case "analytics":
      return <AnalyticsSkeleton />
    case "add-content":
      return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
          <AddContentFormSkeleton />
        </div>
      )
    case "user-table":
      return (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <UserTableSkeleton />
          </div>
        </div>
      )
    default:
      return <AnalyticsSkeleton />
  }
}
