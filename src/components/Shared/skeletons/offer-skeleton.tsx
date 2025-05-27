import { Skeleton, SkeletonShimmer } from "./skeleton"

export function OfferSkeleton() {
  return (
    <section className="py-16 bg-[#020508]">
      <div className="container mx-auto px-4">
        {/* Special Offers Skeleton */}
        <div className="mb-16">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Skeleton className="h-6 w-16 mb-2" />
                    <Skeleton className="h-8 w-48 mb-1" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-full mb-6" />
                <Skeleton className="h-10 w-32" />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Content Skeleton */}
        <div>
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i}>
                <SkeletonShimmer className="aspect-[2/3] rounded-lg mb-3" />
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
