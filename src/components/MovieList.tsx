import React from "react";
import MovieCard from "./MovieCard";

interface MovieListProps {
  title: string;
  movies: any[];
}

function MovieList({ title, movies }: MovieListProps) {
  if (!movies?.length) return null;

  return (
    <div className="px-8 mt-6">
      <h2 className="text-white text-xl font-bold mb-3 tracking-wide">{title}</h2>
      <div
        className="movie-row flex overflow-x-scroll gap-2 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
