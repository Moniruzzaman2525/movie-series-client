import { Skeleton } from "./skeleton"

export function HeaderSkeleton() {
  return (
    <header className="bg-[#020508]/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Skeleton className="h-8 w-32" />
            <div className="hidden md:flex space-x-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-16" />
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Skeleton className="hidden md:block h-10 w-64" />
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </header>
  )
}
