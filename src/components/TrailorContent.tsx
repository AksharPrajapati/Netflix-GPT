import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "../utils/redux/myList/myListSlice";

function TrailorContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { movies } = useSelector((state: any) => state?.movies);
  const myItems = useSelector((state: any) => state.myList.items);
  const movie = movies?.[0];
  const isInList = myItems.some((i: any) => i.id === movie?.id);

  if (!movie) return null;

  const overview =
    movie.overview?.length > 150 ? movie.overview.slice(0, 150) + "…" : movie.overview;

  const toggleList = () => {
    if (isInList) dispatch(removeFromList(movie.id));
    else dispatch(addToList({ ...movie, mediaType: "movie" }));
  };

  return (
    <div className="absolute bottom-[28%] left-0 z-30 px-6 md:px-14 max-w-xl md:max-w-2xl">
      <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 md:mb-4 drop-shadow-2xl leading-tight">
        {movie.title}
      </p>
      <p className="hidden sm:block text-xs md:text-sm text-gray-200 mb-4 md:mb-6 leading-relaxed drop-shadow">
        {overview}
      </p>
      <div className="flex items-center gap-2 md:gap-3 flex-wrap">
        <button
          onClick={() => navigate(`/detail/movie/${movie.id}`)}
          className="flex items-center gap-2 bg-white hover:bg-white/80 text-black font-bold px-4 md:px-7 py-2 md:py-2.5 rounded text-sm md:text-base transition-colors duration-200"
        >
          <span>▶</span> Play
        </button>
        <button
          onClick={toggleList}
          className="flex items-center gap-2 bg-gray-500/60 hover:bg-gray-400/60 text-white font-semibold px-4 md:px-6 py-2 md:py-2.5 rounded text-sm md:text-base backdrop-blur-sm transition-colors duration-200"
        >
          {isInList ? "✓ My List" : "+ My List"}
        </button>
        <button
          onClick={() => navigate(`/detail/movie/${movie.id}`)}
          className="flex items-center gap-2 bg-gray-500/60 hover:bg-gray-400/60 text-white font-semibold px-4 md:px-6 py-2 md:py-2.5 rounded text-sm md:text-base backdrop-blur-sm transition-colors duration-200"
        >
          <span>ⓘ</span> More Info
        </button>
      </div>
    </div>
  );
}

export default TrailorContent;
