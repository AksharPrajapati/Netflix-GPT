import { useEffect, useState } from "react";

export const useMovieVideo = (id: string) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    id && getVideo();
  }, [id]);

  const getVideo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + id + "/videos",
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}`,
        },
      }
    );
    const response = await data.json();
    setData(response?.results?.filter((v: any) => v.type === "Trailer"));
  };

  return data;
};
