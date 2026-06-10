import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTrendingData } from "../utils/hooks/useTrendingData";

const TABS = ["All", "Movies", "TV Shows"] as const;
type Tab = (typeof TABS)[number];

function NewPopular() {
  useTrendingData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("All");
  const { allTrending, movieTrending, tvTrending } = useSelector(
    (state: any) => state.trending
  );

  const list =
    activeTab === "Movies"
      ? movieTrending
      : activeTab === "TV Shows"
      ? tvTrending
      : allTrending;

  return (
    <div className="bg-black min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-14">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h1 className="text-white text-2xl md:text-3xl font-bold">New &amp; Popular</h1>
        <div className="flex gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "bg-gray-700/60 text-gray-300 hover:bg-gray-600/60"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
        {list.map((item: any) => {
          const type = item.media_type === "tv" ? "tv" : "movie";
          const title = item.title || item.name;
          return (
            <div
              key={item.id}
              className="cursor-pointer group relative rounded-md overflow-hidden"
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                <div>
                  <p className="text-white text-xs font-semibold line-clamp-2">{title}</p>
                  <span className="text-gray-400 text-[10px] capitalize">{type}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default NewPopular;
