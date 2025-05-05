"use server"

export const moviesServer = async (search: string, genre: string | undefined) => {
     const queryParams: string[] = [];

     if (search) {
          queryParams.push(`searchTerm=${encodeURIComponent(search)}`);
     }

     if (genre) {
          queryParams.push(`genre=${encodeURIComponent(genre.toUpperCase())}`);
     }

     const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

     const res = await fetch(`${process.env.SERVER_URL}/content${queryString}`, {
          method: "GET",
          next: {
               tags: ["movies"]
          },
          cache: "no-store"
     });

     const result = await res.json();
     return result.data;
}
