import React from "react";

function MovieCard({ movie }: any) {
  return (
    <div className="mx-1">
      <img
        className="w-40 max-w-40 rounded"
        src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
        alt="Movie Card"
      />
    </div>
  );
}

export default MovieCard;
