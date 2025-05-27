import { Skeleton, SkeletonShimmer } from "./skeleton"

export function CategorySkeleton() {
  return (
    <section className="py-20 bg-[#020508]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <Skeleton className="h-12 w-80 mb-2" />
            <Skeleton className="h-6 w-64" />
          </div>
          <Skeleton className="hidden md:block h-6 w-40" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-gray-900 border border-gray-800 overflow-hidden">
              <SkeletonShimmer className="h-48 w-full" />
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Skeleton className="h-12 w-12 rounded-xl" />
                  <div className="text-right">
                    <Skeleton className="h-3 w-12 mb-1" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-8 w-16 mx-auto mb-1" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
