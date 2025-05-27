import { Skeleton, SkeletonShimmer } from "./skeleton"

export function BlogSkeleton() {
  return (
    <section className="py-16 bg-[#020508]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <Skeleton className="h-10 w-80" />
          <Skeleton className="h-6 w-32" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <article key={i}>
              <SkeletonShimmer className="aspect-video rounded-lg mb-4" />
              <div className="space-y-3">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
