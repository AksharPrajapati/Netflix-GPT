import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

function SecondaryContainer() {
  const { movies, popularMovies, upcomingMovies, topRatedMovies } = useSelector(
    (state: any) => state?.movies,
  );

  return (
    <div className="bg-black pb-16 relative z-10 -mt-[5%]">
      <MovieList title="Now Playing" movies={movies} />
      <MovieList title="Popular" movies={popularMovies} />
      <MovieList title="Upcoming" movies={upcomingMovies} />
      <MovieList title="Top Rated" movies={topRatedMovies} />
    </div>
  );
}

export default SecondaryContainer;
