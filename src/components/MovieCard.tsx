import React from "react";

function MovieCard({ movie }: any) {
  return (
    <div className="relative flex-shrink-0 w-36 mx-1 cursor-pointer group">
      <img
        className="w-full h-52 object-cover rounded-md transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.9)] group-hover:z-10 relative"
        src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
        alt={movie?.title ?? "Movie poster"}
      />
      <div className="absolute inset-0 rounded-md bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2 z-20">
        <p className="text-white text-xs font-semibold leading-tight line-clamp-2">
          {movie?.title}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
