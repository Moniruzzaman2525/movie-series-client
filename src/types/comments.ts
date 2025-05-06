import { MovieCardProps } from "./Movie"

export const TComment = {
        id: String,
        userId: String,
        videoId: String,
        comment: String,
      status: String,
      reviewId: String,
      parentCommentId: String,
        createdAt: String,
}
export interface CommentProps {
  setShowCommentModal: (show: boolean) => void
  movie: MovieCardProps | null
}
export interface Reply {
  id: string
  author: string
  avatar: string
  content: string
  createdAt: string
  likes: number
}


export interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  createdAt: string
  likes: number
  replies: Reply[]
}
