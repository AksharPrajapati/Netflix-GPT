import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "../utils/redux/myList/myListSlice";

interface MovieCardProps {
  movie: any;
  type?: "movie" | "tv";
}

function MovieCard({ movie, type = "movie" }: MovieCardProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myItems = useSelector((state: any) => state.myList.items);
  const isInList = myItems.some((i: any) => i.id === movie?.id);

  const title = movie?.title || movie?.name;
  const mediaType = movie?.media_type || type;

  const toggleList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInList) dispatch(removeFromList(movie.id));
    else dispatch(addToList({ ...movie, mediaType }));
  };

  return (
    <div
      className="relative flex-shrink-0 w-28 sm:w-32 md:w-36 mx-1 cursor-pointer group"
      onClick={() => navigate(`/detail/${mediaType === "tv" ? "tv" : "movie"}/${movie?.id}`)}
    >
      <img
        className="w-full h-40 sm:h-44 md:h-52 object-cover rounded-md transition-transform duration-300 ease-out group-hover:scale-110 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.9)] relative z-0"
        src={
          movie?.poster_path
            ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
            : "https://via.placeholder.com/342x513?text=No+Image"
        }
        alt={title ?? "Poster"}
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 z-10">
        <p className="text-white text-xs font-semibold leading-tight line-clamp-2 mb-1">
          {title}
        </p>
        <button
          onClick={toggleList}
          className="text-[10px] text-white bg-white/20 hover:bg-white/40 rounded px-1.5 py-0.5 w-fit transition-colors"
        >
          {isInList ? "✓ Listed" : "+ List"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
