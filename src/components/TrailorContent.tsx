import React from "react";
import { useSelector } from "react-redux";

function TrailorContent() {
  const { movies } = useSelector((state: any) => state?.movies);
  const movie = movies?.[0];

  if (!movie) return null;

  const overview =
    movie.overview?.length > 150
      ? movie.overview.slice(0, 150) + "…"
      : movie.overview;

  return (
    <div className="absolute bottom-[28%] left-0 z-30 px-14 max-w-2xl">
      <p className="text-5xl font-extrabold text-white mb-4 drop-shadow-2xl leading-tight">
        {movie.title}
      </p>
      <p className="text-sm text-gray-200 mb-6 leading-relaxed drop-shadow">
        {overview}
      </p>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 bg-white hover:bg-white/80 text-black font-bold px-7 py-2.5 rounded text-base transition-colors duration-200">
          <span className="text-lg">▶</span> Play
        </button>
        <button className="flex items-center gap-2 bg-gray-500/60 hover:bg-gray-500/40 text-white font-semibold px-7 py-2.5 rounded text-base backdrop-blur-sm transition-colors duration-200">
          <span className="text-lg">ⓘ</span> More Info
        </button>
      </div>
    </div>
  );
}

export default TrailorContent;
