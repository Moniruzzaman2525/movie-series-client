/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createReview } from "@/service/Reviews";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { movieTags, reviewSchema } from "./constans";
import { zodResolver } from "@hookform/resolvers/zod";

const PostReview = ({ movieData }: { movieData: any }) => {
  const reviewForm = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      content: "",
      tag: ""
    }
  });

  const handleSubmitReview = async (data: any) => {
    try {
      const reviewData = {
        content: data.content,
        rating: Number(data.rating),
        videoId: movieData.id
      };
      const result = await createReview(reviewData);
      if (result.success === true) {
        toast.success("Review Added Successfully");
        reviewForm.reset();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <Form {...reviewForm}>
      <form
        onSubmit={reviewForm.handleSubmit(handleSubmitReview)}
        className="space-y-3"
      >
        {/* Rating Field */}
        <FormField
          control={reviewForm.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                defaultValue={String(field.value)}
              >
                <FormControl>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:ring-0 focus:ring-offset-0 focus:border-red-500 w-full">
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <SelectItem
                      key={num}
                      value={String(num)}
                      className="hover:bg-gray-700 focus:bg-gray-700"
                    >
                      {num}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tag Field */}
        <FormField
          control={reviewForm.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Give A Tag</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white focus:ring-0 focus:ring-offset-0 focus:border-red-500 w-full">
                    <SelectValue placeholder="Select a tag" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-gray-800 border-gray-700 text-white">
                  {movieTags.map((tag) => (
                    <SelectItem
                      key={tag}
                      value={tag.toString()}
                      className="hover:bg-gray-700 focus:bg-gray-700"
                    >
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Review Content */}
        <FormField
          control={reviewForm.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Review</FormLabel>
              <FormControl>
                <Textarea
                  rows={4}
                  className="bg-gray-800 border-gray-700 text-white focus:border-red-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                  placeholder="Share your thoughts about this movie..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-6 cursor-pointer"
          >
            Submit Review
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostReview;
