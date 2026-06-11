import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setMovies,
  setPopularMovies,
  setTopRatedMovies,
  setUpcomingMovies,
} from "../redux/movies/moviesSlice";

const TMDB_OPTIONS = {
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}`,
  },
};

const fetchMovies = (endpoint: string) =>
  fetch(`https://api.themoviedb.org/3/movie/${endpoint}`, TMDB_OPTIONS).then(
    (r) => r.json()
  );

export const useTMDBData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAll = async () => {
      const [nowPlaying, popular, upcoming, topRated] = await Promise.all([
        fetchMovies("now_playing"),
        fetchMovies("popular"),
        fetchMovies("upcoming"),
        fetchMovies("top_rated"),
      ]);
      dispatch(setMovies(nowPlaying.results ?? []));
      dispatch(setPopularMovies(popular.results ?? []));
      dispatch(setUpcomingMovies(upcoming.results ?? []));
      dispatch(setTopRatedMovies(topRated.results ?? []));
    };

    loadAll();
  }, [dispatch]);
};
