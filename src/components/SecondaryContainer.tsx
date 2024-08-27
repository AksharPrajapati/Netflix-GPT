import React from "react";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";

function SecondaryContainer() {
  const { movies } = useSelector((state: any) => state?.movies);

  return (
    <div className="bg-black p-8 z-50 relative">
      <div className="mt-[-18rem]">
        <h1 className="text-white text-2xl font-bold mb-4">Now Playing</h1>
        <div className="flex overflow-scroll">
          {movies?.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <h1 className="text-white text-2xl font-bold mb-4 mt-12">
          Now Playing
        </h1>
        <div className="flex overflow-scroll">
          {movies?.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <h1 className="text-white text-2xl font-bold mb-4 mt-12">
          Now Playing
        </h1>
        <div className="flex overflow-scroll">
          {movies?.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        <h1 className="text-white text-2xl font-bold mb-4 mt-12">
          Now Playing
        </h1>
        <div className="flex overflow-scroll">
          {movies?.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SecondaryContainer;
