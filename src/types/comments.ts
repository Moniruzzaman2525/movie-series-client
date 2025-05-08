// Assuming this is in your Movie.ts or related type file



export interface CommentProps {
  setShowCommentModal: (show: boolean) => void;
  movie: MovieCardProps | null;
}

export interface TReview {
  content: string;
  ratting: number;
  tag:string
}


export interface Reply {
  id: string;
  author: string;
  avatar: string;
  content: string;
  createdAt: string;
  likes: number;
  user: User;
  isLiked: boolean;
}

export interface IComment {
  id: string;
  userId: string;
  videoId: string;
  status: string;
  content: string;
  createdAt: string;
  reviewId?: string;
  parentCommentId?: string;
  likes: number;
  user: User;
  isLiked: boolean;
  replies: Reply[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createAt: string;
  updateAt: string;
  isDeleted: boolean;
}


export interface MovieCardProps {
  id: string;
  title: string;
  genre: string;
  thumbnailImage: string;
  director: string;
  releaseYear: number;
  cast: string;
  streamingPlatform: string;
  description: string;
  rating: number;
  price: number;
  review?: TReview[];
  Comment?: IComment[]; 
}
