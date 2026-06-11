import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPopularShows, setTopRatedShows, setAiringToday, setOnAir } from "../redux/tv/tvSlice";

const options = {
  headers: { Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}` },
};

const fetchTV = (endpoint: string) =>
  fetch(`https://api.themoviedb.org/3/tv/${endpoint}`, options).then((r) => r.json());

export const useTVData = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const [popular, topRated, airingToday, onAir] = await Promise.all([
        fetchTV("popular"),
        fetchTV("top_rated"),
        fetchTV("airing_today"),
        fetchTV("on_the_air"),
      ]);
      dispatch(setPopularShows(popular.results ?? []));
      dispatch(setTopRatedShows(topRated.results ?? []));
      dispatch(setAiringToday(airingToday.results ?? []));
      dispatch(setOnAir(onAir.results ?? []));
    };
    load();
  }, [dispatch]);
};
