import React from "react";
import TrailorContent from "./TrailorContent";
import { useMovieVideo } from "../utils/hooks/useMovieVideo";
import { useSelector } from "react-redux";

function MainContainer() {
  const { movies } = useSelector((state: any) => state?.movies);
  const featuredMovie = movies?.[0];
  const data: any = useMovieVideo(featuredMovie?.id);
  const trailerKey = data?.[0]?.key;

  return (
    <div className="relative w-screen aspect-video">
      {trailerKey ? (
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      ) : (
        featuredMovie?.backdrop_path && (
          <img
            className="w-full h-full object-cover"
            src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`}
            alt={featuredMovie.title}
          />
        )
      )}
      <TrailorContent />
    </div>
  );
}

export default MainContainer;
