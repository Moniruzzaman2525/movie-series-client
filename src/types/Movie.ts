export interface MovieCardProps {
     rating:number;
     id: string,
     title: string;
     genre: string;
     thumbnailImage: string;
     description: string;
     releaseYear: number;
     director: string;
     streamingPlatform: string;
     price: number;
     overallRating: number;
     category: string
     key?: number;
     liked?: boolean;
     like: number;
     inWatchList: boolean;
     totalComments: number;
}
