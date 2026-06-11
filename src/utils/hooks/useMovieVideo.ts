import { useEffect, useState } from "react";

export const useMovieVideo = (id: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!id) return;
    const getVideo = async () => {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/" + id + "/videos",
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}`,
          },
        }
      );
      const response = await res.json();
      setData(response?.results?.filter((v: any) => v.type === "Trailer"));
    };
    getVideo();
  }, [id]);

  return data;
};
