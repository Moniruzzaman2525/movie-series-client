import Link from "next/link";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import Image from "next/image";

const TopRatedMovies = () => {
  const data = [
    {
      id: 1,
      name: "Spaceman",
      img: "https://i.ibb.co.com/z9Z19m6/MV5-BMTg0-NTIz-Mj-Q1-NV5-BMl5-Ban-Bn-Xk-Ft-ZTcw-NDc3-Mz-M5-OQ-V1.jpg",
      rating: 7,
      publishedYear: 2024,
      genre: "Comedy",
    },
    {
      id: 2,
      name: "Lunar Echo",
      img: "https://i.ibb.co.com/pjL1M7tk/images.jpg",
      rating: 8,
      publishedYear: 2023,
      genre: "Drama",
    },
    {
      id: 3,
      name: "Starborn",
      img: "https://i.ibb.co.com/JWxHSPYF/MV5-BNDFk-MTRk-Zm-Qt-M2-I0-NC00-Nj-Jj-LWJl-MDct-NTNi-ZWYx-Yzhj-ZDZi-Xk-Ey-Xk-Fqc-Gc-V1.jpg",
      rating: 6,
      publishedYear: 2022,
      genre: "Action",
    },
    {
      id: 4,
      name: "Orbit Zero",
      img: "https://i.ibb.co.com/q3r4F40x/099a9b43267653-57e99d9821599.jpg",
      rating: 9,
      publishedYear: 2021,
      genre: "Adventure",
    },
    {
      id: 5,
      name: "Cosmic Drift",
      img: "https://i.ibb.co.com/ycLjmxgF/The-Lord-of-the-Rings-The-Fellowship-of-the-Ring-744631610-large.jpg",
      rating: 5,
      publishedYear: 2020,
      genre: "Drama",
    },
    {
      id: 6,
      name: "Galactic Tide",
      img: "https://i.ibb.co.com/ycLjmxgF/The-Lord-of-the-Rings-The-Fellowship-of-the-Ring-744631610-large.jpg",
      rating: 8,
      publishedYear: 2019,
      genre: "Action",
    },
  ];

  return (
    <div className="container mx-auto px-2 md:px-0">
      <SectionTitle text={"Top Rated Movies"} subText={"Top Rated Movies"} />
      <div className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {data.map((item) => {
          return (
            <div
              key={item.id}
              className="w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 relative transform transition-all hover:scale-105 hover:shadow-lg"
            >
              <Link href="">
                <Image
                  className="rounded-t-lg h-96 w-full object-cover"
                  src={item?.img}
                  alt={item.name}
                  height={300}
                  width={300}
                />
              </Link>
              <div className="p-5  bg-gray-800 w-full ">
                <div className="flex justify-between items-center">
                  <h5 className="mb-2 text-sm   text-white">{item.name}</h5>
                  <p className="flex text-sm items-center gap-1 text-white">
                    {item.rating}/{item.rating}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <h5 className="mb-2 text-sm   text-white">
                    {item.publishedYear}
                  </h5>
                  <p className="flex text-sm  items-center gap-1 text-white">
                    {item?.genre}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopRatedMovies;
