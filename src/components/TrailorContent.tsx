import React from "react";
import { useSelector } from "react-redux";

function TrailorContent() {
  const { movies } = useSelector((state: any) => state?.movies);

  return (
    <div className="w-screen aspect-video py-60 px-12 absolute text-white bg-gradient-to-r from-black">
      <p className="text-4xl font-bold mb-4">Elemental</p>
      <p className="text-xs mb-4 w-1/4">{movies[0]?.overview}</p>
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
