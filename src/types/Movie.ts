<<<<<<< HEAD
export interface MovieCardProps {
     rating:number;
=======
export interface overallRating {
>>>>>>> 8e0c271aa71b53e1a102a5877367d9f34a6457f6
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
     EditorsPick: []
}
