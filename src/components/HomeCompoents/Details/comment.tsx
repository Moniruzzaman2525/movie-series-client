/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle,} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaHeart, FaReply, FaThumbsDown } from "react-icons/fa6";

const CommentComponent = ({data,index}:{data:any,index:number}) => {
    const [activeReplyIndex, setActiveReplyIndex] = useState<null | number>(null);

    const replyForm = useForm({
        defaultValues: {
             reply: "",
        }
   })


const handleSubmitReply = async (data: any) => {
  console.log(data);
}
    return (
        <div className="bg-gray-900 p-5 rounded-lg border border-gray-700 shadow-lg">

        <div className="flex items-center gap-3 mb-3">
             <Avatar className="h-10 w-10">
                  <AvatarImage src={data.user.image || "https://github.com/shadcn.png"} />
                  <AvatarFallback>{data.user.name.charAt(0)}</AvatarFallback>
             </Avatar>
             <div>
                  <h3 className="font-semibold text-white">{data.user.name}</h3>
                  <p className="text-xs text-gray-400">
                       {new Date(data.createdAt).toLocaleDateString()}
                  </p>
             </div>
        </div>


        <div className="pl-2 mb-4">
             <div className="flex items-start gap-2">
                  <MessageCircle className="mt-1 flex-shrink-0 text-gray-400" />
                  <p className="text-gray-200 whitespace-pre-line">{data.content}</p>
             </div>
        </div>


        <div className="flex items-center gap-4 text-sm border-t border-gray-700 pt-3">
             <button className="flex items-center gap-1 text-gray-300 hover:text-red-500 transition-colors">
                  <FaHeart className="h-4 w-4 cursor-pointer" />
                  <span>{data.likes} Likes</span>
             </button>
             <button className="flex items-center gap-1 text-gray-300 hover:text-blue-500 transition-colors">
                  <FaThumbsDown className="h-4 w-4 cursor-pointer" />
                  <span>Dislike</span>
             </button>
             <button
                  onClick={() => setActiveReplyIndex(activeReplyIndex === index ? null : index)}
                  className="flex items-center gap-1 text-gray-300 hover:text-green-500 transition-colors"
             >
                  <FaReply className="h-4 w-4 cursor-pointer" />
                  <span>Reply</span>
             </button>
        </div>


        {activeReplyIndex === index && (
             <div className="mt-4 pl-12">
                  <Form {...replyForm}>
                       <form onSubmit={replyForm.handleSubmit(handleSubmitReply)} className="space-y-3">
                            <FormField
                                 control={replyForm.control}
                                 name="reply"
                                 render={({ field }) => (
                                      <FormItem>
                                           <FormControl>
                                                <Textarea
                                                     rows={2}
                                                     className="bg-gray-800 border-gray-700 text-white focus:border-red-500 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none "
                                                     placeholder="Write your reply..."
                                                     {...field}
                                                />
                                           </FormControl>
                                           <FormMessage />
                                      </FormItem>
                                 )}
                            />
                            <div className="flex justify-end gap-2">
                                 <Button
                                      variant="ghost"
                                      onClick={() => setActiveReplyIndex(null)}
                                      className="text-gray-300 hover:bg-gray-800"
                                 >
                                      Cancel
                                 </Button>
                                 <Button type="submit" className="bg-red-600 hover:bg-red-700">
                                      Post Reply
                                 </Button>
                            </div>
                       </form>
                  </Form>
             </div>
        )}
   </div>
    );
};

export default CommentComponent;