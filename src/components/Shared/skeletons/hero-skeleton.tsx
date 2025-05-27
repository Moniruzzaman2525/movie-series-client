import { Skeleton, SkeletonShimmer } from "./skeleton"

export function HeroSkeleton() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <SkeletonShimmer className="absolute inset-0" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-16 w-96" />
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-12 w-32" />
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      </div>
    </section>
  )
}
