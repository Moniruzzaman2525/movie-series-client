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
