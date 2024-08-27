import React from "react";
import TrailorContent from "./TrailorContent";
import { useMovieVideo } from "../utils/hooks/useMovieVideo";
import { useSelector } from "react-redux";

function MainContainer() {
  const { movies } = useSelector((state: any) => state?.movies);
  const data: any = useMovieVideo(movies[0]?.id);

  return (
    <div className="">
      <TrailorContent />
      <iframe
        className="w-screen aspect-video"
        src={`https://www.youtube.com/embed/${data[0]?.key}?&autoplay=1&mute=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
}

export default MainContainer;
