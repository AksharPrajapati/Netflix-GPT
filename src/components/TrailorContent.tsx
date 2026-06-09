import React from "react";
import { useSelector } from "react-redux";

function TrailorContent() {
  const { movies } = useSelector((state: any) => state?.movies);
  const movie = movies?.[0];

  return (
    <div className="w-screen aspect-video py-60 px-12 absolute top-0 left-0 text-white bg-gradient-to-r from-black">
      <p className="text-4xl font-bold mb-4">{movie?.title}</p>
      <p className="text-xs mb-4 w-1/4">{movie?.overview}</p>
      <button className="bg-white px-6 py-2 mr-4 rounded text-black font-bold">
        ▶️ Play
      </button>
      <button className="bg-gray-300 bg-opacity-50 px-6 py-2 rounded text-white">
        ℹ︎ More Info
      </button>
    </div>
  );
}

export default TrailorContent;
