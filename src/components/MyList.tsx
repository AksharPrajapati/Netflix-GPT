import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromList } from "../utils/redux/myList/myListSlice";

function MyList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.myList.items);

  return (
    <div className="bg-black min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-14">
      <h1 className="text-white text-2xl md:text-3xl font-bold mb-8">My List</h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-gray-400 text-lg mb-4">Your list is empty.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-white text-black font-bold px-6 py-2 rounded hover:bg-white/80 transition-colors"
          >
            Browse Content
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {items.map((item: any) => {
            const type = item.mediaType || item.media_type || "movie";
            const title = item.title || item.name;
            return (
              <div
                key={item.id}
                className="relative rounded-md overflow-hidden cursor-pointer group"
                onClick={() => navigate(`/detail/${type}/${item.id}`)}
              >
                <img
                  className="w-full aspect-[2/3] object-cover transition-transform duration-300 group-hover:scale-105"
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
                      : "https://via.placeholder.com/342x513?text=No+Image"
                  }
                  alt={title}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 p-2">
                  <p className="text-white text-xs font-semibold text-center line-clamp-2">
                    {title}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeFromList(item.id));
                    }}
                    className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyList;
