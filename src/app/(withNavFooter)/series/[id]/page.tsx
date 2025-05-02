import Details from "@/common/details/Details";

const movieData = {
     title: "Interstellar",
     genre: "Sci-Fi",
     thumbnailImage:
          "https://res.cloudinary.com/da1t0c7he/image/upload/v1746012989/vqtedjwkjwwnsh0extxr.jpg",
     director: "Christopher Nolan",
     releaseYear: 2014,
     cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
     streamingPlatform: "Netflix",
     description:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
     rating: 8.6,
     price: 12.99,
     id: "3590575945490573495495"
};

const page = () => {
     return (
          <div>
               <Details movieData={movieData} ></Details>
          </div>
     );
};

export default page;