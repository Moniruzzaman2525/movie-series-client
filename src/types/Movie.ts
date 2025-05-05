export interface MovieCardProps {
     id:string,
     title: string;
     genre: string;
     thumbnailImage: string;
     description: string;
     releaseYear: number;
     director: string;
     streamingPlatform: string;
     price: number;
     rating: number;
     category:string
     key?: number;
     liked?: boolean;
     like: number
}
