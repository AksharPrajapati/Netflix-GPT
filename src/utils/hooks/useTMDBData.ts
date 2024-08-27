import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMovies } from "../redux/movies/moviesSlice";

export const useTMDBData = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    now_playing();
  }, []);

  const now_playing = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/now_playing", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}`,
      },
    });
    const response = await data.json();
    dispatch(setMovies(response.results));
    setData(response);
  };

  return data;
};
