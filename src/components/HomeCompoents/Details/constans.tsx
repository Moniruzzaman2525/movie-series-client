import { z } from "zod";
export const movieTags: string[] = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Thriller",
    "Science Fiction",
    "Romance",
    "Mystery",
    "Crime",
    "Animation",
    "Documentary",
    "Musical",
    "Historical",
    "Supernatural",
    "War",
    "Western",
  
    // Content-based tags
    "Family Friendly",
    "Teen",
    "Adult",
    "Violence",
    "Sexual Content",
    "Strong Language",
    "Nudity",
    "Drug Use",
  
    // Theme-based tags
    "Coming of Age",
    "Based on True Story",
    "Psychological",
    "Feel Good",
    "Inspirational",
    "Dark",
    "Satirical",
    "Cult Classic",
  ];
  



export const reviewSchema = z.object({
  rating: z
    .number({
      required_error: "Rating is required",
    })
    .min(1, "Rating must be at least 1")
    .max(10, "Rating cannot exceed 5"),
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(3, "Content must be at least 3 characters long"),
  tag: z
    .string({
      required_error: "Tag is required",
    })
    .min(1, "Please select a tag"),
});

export const CommentSkeleton = () => (
  <div className="space-y-4 animate-pulse">
      <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
              <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="flex items-center gap-4 mt-2">
                  <div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  <div className="h-3 w-14 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
          </div>
      </div>
  </div>
)