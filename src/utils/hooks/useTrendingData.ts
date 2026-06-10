import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAllTrending, setMovieTrending, setTvTrending } from "../redux/trending/trendingSlice";

const options = {
  headers: { Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}` },
};

const fetchTrending = (path: string) =>
  fetch(`https://api.themoviedb.org/3/trending/${path}`, options).then((r) => r.json());

export const useTrendingData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const [all, movies, tv] = await Promise.all([
        fetchTrending("all/week"),
        fetchTrending("movie/week"),
        fetchTrending("tv/week"),
      ]);
      dispatch(setAllTrending(all.results ?? []));
      dispatch(setMovieTrending(movies.results ?? []));
      dispatch(setTvTrending(tv.results ?? []));
    };
    load();
  }, []);
};
