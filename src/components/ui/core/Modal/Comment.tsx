"use client"

import React, { useState, useEffect } from "react"
import { MessageSquare, Send, X } from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createComment, getVideoComments } from "@/service/Comments"
import { Comment, CommentProps } from "@/types"
import { formatDistanceToNow } from 'date-fns'  // Importing the function from date-fns

const CommentModal: React.FC<CommentProps> = ({ setShowCommentModal, movie }) => {
    const [comments, setComments] = useState<Comment[]>([])
    const [newComment, setNewComment] = useState("")
    const [replyingTo, setReplyingTo] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchComments = async () => {
        try {
            const response = await getVideoComments(movie?.id || "")
            console.log(response)
            setComments(response?.data)
            setLoading(false)
        } catch (err) {
            setError("Failed to load comments.")
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchComments()
    }, [])

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newComment.trim()) return

        const data = {
            videoId: movie?.id || "",
            content: newComment
        }
        const res = await createComment(data)
        if (res.success) {
            fetchComments()
            setNewComment("")
        }
    }

    const handleSubmitReply = async (commentId: string) => {
        if (!replyContent.trim()) return

        const data = {
            videoId: movie?.id || "",
            content: replyContent,
            parentCommentId: commentId
        }
        const res = await createComment(data)
        if (res.success) {
            fetchComments()
            setReplyingTo(null)
            setReplyContent("")
        }


    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 w-full max-w-2xl max-h-[70vh] overflow-hidden flex flex-col relative">
                <button
                    onClick={() => setShowCommentModal(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    aria-label="Close"
                >
                    <X className="h-5 w-5" />
                </button>

                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Comments for {movie?.title}
                </h3>

                <form onSubmit={handleSubmitComment} className="mb-6">
                    <Textarea
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white mb-4 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Add your comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        required
                    />

                    <div className="flex justify-end">
                        <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">
                            Post Comment
                        </Button>
                    </div>
                </form>

                {loading ? (
                    <div>Loading comments...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <div className="overflow-y-auto flex-1 pr-2">
                        <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-4">{comments?.length} Comments</h4>

                        <div className="space-y-6">
                            {comments.map((comment) => (
                                <div key={comment.id} className="space-y-4">
                                    <div className="flex gap-3">
                                        <Avatar className="h-10 w-10 rounded-full">
                                            <img src={comment.avatar || "/placeholder.svg"} alt={comment.author} />
                                        </Avatar>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h5 className="font-medium text-gray-900 dark:text-white">{comment.author}</h5>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                                </span>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                                            <div className="flex items-center gap-4 mt-2">
                                                <button
                                                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                                                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                                >
                                                    Reply
                                                </button>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{comment.likes} likes</span>
                                            </div>

                                            {replyingTo === comment.id && (
                                                <div className="mt-3 flex gap-2">
                                                    <Textarea
                                                        className="flex-1 p-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        placeholder="Write your reply..."
                                                        value={replyContent}
                                                        onChange={(e) => setReplyContent(e.target.value)}
                                                    />
                                                    <Button
                                                        type="button"
                                                        size="sm"
                                                        className="bg-red-500 hover:bg-red-600 text-white"
                                                        onClick={() => handleSubmitReply(comment.id)}
                                                    >
                                                        <Send className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Replies */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="ml-12 space-y-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className="flex gap-3">
                                                    <Avatar className="h-8 w-8 rounded-full">
                                                        <img src={reply.avatar || "/placeholder.svg"} alt={reply.author} />
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h5 className="font-medium text-gray-900 dark:text-white">{reply.author}</h5>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-700 dark:text-gray-300 text-sm">{reply.content}</p>
                                                        <div className="flex items-center gap-4 mt-2">
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">{reply.likes} likes</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CommentModal
