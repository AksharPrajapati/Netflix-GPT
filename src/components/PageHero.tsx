import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "../utils/redux/myList/myListSlice";

interface PageHeroProps {
  item: any;
  type?: "movie" | "tv";
}

function PageHero({ item, type = "movie" }: PageHeroProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myItems = useSelector((state: any) => state.myList.items);
  const isInList = myItems.some((i: any) => i.id === item?.id);

  if (!item) return null;

  const title = item.title || item.name;
  const overview =
    item.overview?.length > 160 ? item.overview.slice(0, 160) + "…" : item.overview;

  const toggleList = () => {
    if (isInList) dispatch(removeFromList(item.id));
    else dispatch(addToList({ ...item, mediaType: type }));
  };

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-black">
      {item.backdrop_path && (
        <img
          className="w-full h-full object-cover"
          src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
          alt={title}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black/80 to-transparent" />

      <div className="absolute bottom-[25%] left-0 z-10 px-6 md:px-14 max-w-xl md:max-w-2xl">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white mb-2 md:mb-4 drop-shadow-2xl leading-tight">
          {title}
        </h1>
        <p className="hidden sm:block text-xs md:text-sm text-gray-200 mb-4 md:mb-6 leading-relaxed">
          {overview}
        </p>
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <button
            onClick={() => navigate(`/detail/${type}/${item.id}`)}
            className="flex items-center gap-2 bg-white hover:bg-white/80 text-black font-bold px-4 md:px-7 py-2 md:py-2.5 rounded text-sm md:text-base transition-colors"
          >
            ▶ Play
          </button>
          <button
            onClick={toggleList}
            className="flex items-center gap-2 bg-gray-500/60 hover:bg-gray-400/60 text-white font-semibold px-4 md:px-6 py-2 md:py-2.5 rounded text-sm md:text-base backdrop-blur-sm transition-colors"
          >
            {isInList ? "✓ My List" : "+ My List"}
          </button>
          <button
            onClick={() => navigate(`/detail/${type}/${item.id}`)}
            className="flex items-center gap-2 bg-gray-500/60 hover:bg-gray-400/60 text-white font-semibold px-4 md:px-6 py-2 md:py-2.5 rounded text-sm md:text-base backdrop-blur-sm transition-colors"
          >
            ⓘ More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default PageHero;
