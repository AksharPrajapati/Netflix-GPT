import { useEffect } from "react";
import TrailorContent from "./TrailorContent";
import { useMovieVideo } from "../utils/hooks/useMovieVideo";
import { useSelector } from "react-redux";

function MainContainer() {
  const { movies } = useSelector((state: any) => state?.movies);
  const featuredMovie = movies?.[0];
  const data: any = useMovieVideo(featuredMovie?.id);
  const trailerKey = data?.[0]?.key;

  // Repeatedly clear the browser's Media Session so Chrome never shows
  // its skip/pause overlay over the background video.
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    const clear = () => {
      navigator.mediaSession.metadata = null;
      navigator.mediaSession.playbackState = 'none';
    };
    clear();
    const id = setInterval(clear, 800);
    return () => clearInterval(id);
  }, [trailerKey]);

  return (
    <div className="relative w-screen aspect-video overflow-hidden bg-black">
      {/* Video / backdrop */}
      {trailerKey ? (
        <iframe
          tabIndex={-1}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-screen min-w-[177.78vh] pointer-events-none scale-[1.2] origin-center"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&loop=1&playlist=${trailerKey}&playsinline=1&fs=0`}
          title="Movie Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
          sandbox="allow-scripts allow-same-origin allow-presentation"
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

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      {/* Full-surface blocker — captures all pointer + keyboard events so Chrome never
          registers hover/focus on the iframe and won't show media-session controls */}
      <div
        className="absolute inset-0 z-20 cursor-default select-none"
        tabIndex={0}
        onKeyDown={(e) => e.preventDefault()}
      />

      <TrailorContent />
    </div>
  );
}

export default MainContainer;
