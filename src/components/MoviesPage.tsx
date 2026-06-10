import { useSelector } from "react-redux";
import PageHero from "./PageHero";
import MovieList from "./MovieList";

function MoviesPage() {
  const { movies, popularMovies, upcomingMovies, topRatedMovies } = useSelector(
    (state: any) => state.movies
  );

  return (
    <div className="bg-black min-h-screen">
      <PageHero item={popularMovies?.[0]} type="movie" />
      <div className="-mt-[4%] relative z-10 pb-16">
        <MovieList title="Popular Movies" movies={popularMovies} type="movie" />
        <MovieList title="Top Rated" movies={topRatedMovies} type="movie" />
        <MovieList title="Upcoming" movies={upcomingMovies} type="movie" />
        <MovieList title="Now Playing" movies={movies} type="movie" />
      </div>
    </div>
  );
}

export default MoviesPage;
