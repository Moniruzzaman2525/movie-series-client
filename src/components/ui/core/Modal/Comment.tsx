/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { MessageSquare, Send, X, Heart, Check } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createComment, getVideoComments, deleteComment } from "@/service/Comments"
import type { IComment } from "@/types"
import { formatDistanceToNow } from "date-fns"
import { toast } from "sonner"
import { likeComment } from "@/service/Like"

const CommentModal: React.FC<any> = ({ setShowCommentModal, movie }) => {
    const [comments, setComments] = useState<IComment[]>([])
    const [newComment, setNewComment] = useState("")
    const [replyingTo, setReplyingTo] = useState<string | null>(null)
    const [replyContent, setReplyContent] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [likeLoading, setLikeLoading] = useState<string | null>(null)

    const [editingCommentId, setEditingCommentId] = useState<string | null>(null)
    const [editContent, setEditContent] = useState<string>("")

    const fetchComments = async () => {
        try {
            const response = await getVideoComments(movie?.id || "")
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
            content: newComment,
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
            parentCommentId: commentId,
        }
        const res = await createComment(data)
        if (res.success) {
            fetchComments()
            setReplyingTo(null)
            setReplyContent("")
        }
    }

    const handleLikeComment = async (commentId: string) => {
        setLikeLoading(commentId)
        try {
            const data = { commentId }
            const res = await likeComment(data)
            if (res.success) {
                fetchComments()
            }
        } catch (err) {
            toast.error("Failed to like comment")
        } finally {
            setLikeLoading(null)
        }
    }

    const handleUpdateComment = async (commentId: string) => {
        try {
            console.log(commentId)
            // const res = await updateComment(commentId, { content: editContent })
            // if (res.success) {
            //     toast.success("Comment updated.")
            //     setEditingCommentId(null)
            //     fetchComments()
            // }
        } catch (err) {
            toast.error("Failed to update comment.")
        }
    }

    const handleDeleteComment = async (commentId: string) => {
        try {
            const res = await deleteComment(commentId)
            if (res.success) {
                toast.success("Comment deleted.")
                fetchComments()
            }
        } catch (err) {
            toast.error("Failed to delete comment.")
        }
    }

    const inputFieldClass =
        "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"

    const CommentSkeleton = () => (
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

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 w-full max-w-2xl max-h-[70vh] overflow-hidden flex flex-col relative">
                <button
                    onClick={() => setShowCommentModal(false)}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <X className="h-5 w-5" />
                </button>

                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Comments for {movie?.title}
                </h3>

                <form onSubmit={handleSubmitComment} className="mb-6">
                    <Textarea
                        className={`${inputFieldClass} mb-4 min-h-[80px]`}
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
                    <div className="overflow-y-auto flex-1 pr-2">
                        <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
                        <div className="space-y-6">
                            <CommentSkeleton />
                            <CommentSkeleton />
                            <CommentSkeleton />
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <div className="overflow-y-auto flex-1 pr-2">
                        <h4 className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-4">{comments?.length} Comments</h4>
                        <div className="space-y-6">
                            {comments?.map((comment) => (
                                <div key={comment.id} className="space-y-4">
                                    <div className="flex gap-3">
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h5 className="font-medium text-gray-900 dark:text-white">{comment.user.name}</h5>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                                                </span>
                                            </div>

                                            {comment.status === "PENDING" ? (
                                                editingCommentId === comment.id ? (
                                                    <div className="flex gap-2">
                                                        <Textarea
                                                            className={`flex-1 text-sm ${inputFieldClass}`}
                                                            value={editContent}
                                                            onChange={(e) => setEditContent(e.target.value)}
                                                        />
                                                        <div className="flex flex-col gap-2">
                                                            <Button
                                                                size="sm"
                                                                className="bg-green-500 hover:bg-green-600 text-white"
                                                                onClick={() => handleUpdateComment(comment.id)}
                                                            >
                                                                <Check className="h-4 w-4 mr-1" />
                                                                Save
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                className="bg-gray-500 hover:bg-gray-600 text-white"
                                                                onClick={() => setEditingCommentId(null)}
                                                            >
                                                                <X className="h-4 w-4 mr-1" />
                                                                Cancel
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-between">
                                                        <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                className="bg-blue-500 hover:bg-blue-600 text-white"
                                                                onClick={() => {
                                                                    setEditContent(comment.content)
                                                                    setEditingCommentId(comment.id)
                                                                }}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                className="bg-red-500 hover:bg-red-600 text-white"
                                                                onClick={() => handleDeleteComment(comment.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </div>
                                                )
                                            ) : (
                                                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
                                            )}

                                            <div className="flex items-center gap-4 mt-2">
                                                <button
                                                    className="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                                                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                                >
                                                    Reply
                                                </button>
                                                <button
                                                    onClick={() => handleLikeComment(comment.id)}
                                                    disabled={likeLoading === comment.id}
                                                    className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                                                >
                                                    <Heart
                                                        className={`h-3 w-3 ${comment.isLiked ? "fill-red-500 text-red-500" : ""} ${likeLoading === comment.id ? "opacity-50" : ""
                                                            }`}
                                                    />
                                                    <span>{comment.likes} likes</span>
                                                </button>
                                            </div>

                                            {replyingTo === comment.id && (
                                                <div className="mt-3 flex gap-2">
                                                    <Textarea
                                                        className={`flex-1 text-sm ${inputFieldClass}`}
                                                        placeholder="Write your reply..."
                                                        value={replyContent}
                                                        onChange={(e) => setReplyContent(e.target.value)}
                                                    />
                                                    <div className="flex flex-col gap-2">
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            className="bg-green-500 hover:bg-green-600 text-white"
                                                            onClick={() => handleSubmitReply(comment.id)}
                                                        >
                                                            <Send className="h-4 w-4 mr-1" />
                                                            Reply
                                                        </Button>
                                                        <Button
                                                            type="button"
                                                            size="sm"
                                                            className="bg-gray-500 hover:bg-gray-600 text-white"
                                                            onClick={() => setReplyingTo(null)}
                                                        >
                                                            <X className="h-4 w-4 mr-1" />
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="ml-12 space-y-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className="flex gap-3">
                                                    <Avatar>
                                                        <AvatarImage src="https://github.com/shadcn.png" />
                                                        <AvatarFallback>CN</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h5 className="font-medium text-gray-900 dark:text-white">{reply.user.name}</h5>
                                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                                                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-700 dark:text-gray-300 text-sm">{reply.content}</p>
                                                        <div className="flex items-center gap-4 mt-2">
                                                            <button
                                                                onClick={() => handleLikeComment(reply.id)}
                                                                disabled={likeLoading === reply.id}
                                                                className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400"
                                                            >
                                                                <Heart
                                                                    className={`h-3 w-3 ${reply.isLiked ? "fill-red-500 text-red-500" : ""} ${likeLoading === reply.id ? "opacity-50" : ""
                                                                        }`}
                                                                />
                                                                <span>{reply.likes} likes</span>
                                                            </button>
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
