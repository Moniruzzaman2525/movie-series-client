/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { createComment } from "@/service/Comments";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PostComment = ({movieData}:{movieData:any}) => {
    const form = useForm({
        defaultValues: {
             content: "",
        }
   });

   const handleSubmitComment = async (data: any) => {
        const id = toast.loading('posting.....')
        try {
             const commentData = {
                  ...data,
                  videoId: movieData.id
             }
             const result = await createComment(commentData)
             console.log(result);
             if (result.success == true) {
                  toast.success("Comment Added Successfully", { id })
                  form.reset()
             } else {
                  toast.error(result.message, { id })
             }
        } catch (error) {
             toast.error((error as Error).message)
        }
        form.reset();
   };

    return (
        <div className="bg-gray-900 p-5 rounded-lg border border-gray-700">
                                             <h3 className="text-lg font-semibold text-white mb-3">Leave a comment</h3>
                                             <Form {...form}>
                                                  <form onSubmit={form.handleSubmit(handleSubmitComment)} className="space-y-3">
                                                       <FormField
                                                            control={form.control}
                                                            name="content"
                                                            render={({ field }) => (
                                                                 <FormItem>
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
                                                            <Button type="submit" className="bg-red-600 hover:bg-red-700 px-6">
                                                                 Post Comment
                                                            </Button>
                                                       </div>
                                                  </form>
                                             </Form>
                                        </div>
    );
};

export default PostComment;