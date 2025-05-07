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
  user: User;
  isLiked: boolean
}

export interface IComment {
  id: string
  userId: string
  videoId: string
  status: string
  content: string
  createdAt: string
  reviewId?: string
  parentCommentId?: string;
  likes: number
  user: User;
  isLiked: boolean
  replies: Reply[]
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  createAt: string
  updateAt: string
  isDeleted: boolean
}
