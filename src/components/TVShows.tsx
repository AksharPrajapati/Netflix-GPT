import { useSelector } from "react-redux";
import { useTVData } from "../utils/hooks/useTVData";
import PageHero from "./PageHero";
import MovieList from "./MovieList";

function TVShows() {
  useTVData();
  const { popularShows, topRatedShows, airingToday, onAir } = useSelector(
    (state: any) => state.tv
  );

  return (
    <div className="bg-black min-h-screen">
      <PageHero item={popularShows?.[0]} type="tv" />
      <div className="-mt-[4%] relative z-10 pb-16">
        <MovieList title="Popular Shows" movies={popularShows} type="tv" />
        <MovieList title="Top Rated" movies={topRatedShows} type="tv" />
        <MovieList title="Airing Today" movies={airingToday} type="tv" />
        <MovieList title="Currently On Air" movies={onAir} type="tv" />
      </div>
    </div>
  );
}

export default TVShows;
