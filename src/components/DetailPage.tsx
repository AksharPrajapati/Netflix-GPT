import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToList, removeFromList } from "../utils/redux/myList/myListSlice";
import MovieList from "./MovieList";

const options = {
  headers: { Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_TOKEN}` },
};
const fetch$ = (url: string) => fetch(url, options).then((r) => r.json());
const IMG = "https://image.tmdb.org/t/p";

function DetailPage() {
  const { type, id } = useParams<{ type: "movie" | "tv"; id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myItems = useSelector((state: any) => state.myList.items);

  const [detail, setDetail] = useState<any>(null);
  const [credits, setCredits] = useState<any[]>([]);
  const [similar, setSimilar] = useState<any[]>([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isInList = myItems.some((i: any) => i.id === Number(id));

  useEffect(() => {
    if (!id || !type) return;
    setLoading(true);
    setDetail(null);
    setSelectedSeason(1);

    Promise.all([
      fetch$(`https://api.themoviedb.org/3/${type}/${id}`),
      fetch$(`https://api.themoviedb.org/3/${type}/${id}/credits`),
      fetch$(`https://api.themoviedb.org/3/${type}/${id}/similar`),
      fetch$(`https://api.themoviedb.org/3/${type}/${id}/videos`),
    ]).then(([det, cred, sim, vids]) => {
      setDetail(det);
      setCredits(cred.cast?.slice(0, 12) ?? []);
      setSimilar(sim.results ?? []);
      const trailer = vids.results?.find(
        (v: any) => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailerKey(trailer?.key ?? null);
      if (type === "tv" && det.seasons) {
        const firstReal = det.seasons.find((s: any) => s.season_number > 0) ?? det.seasons[0];
        setSelectedSeason(firstReal?.season_number ?? 1);
      }
      setLoading(false);
    });
  }, [id, type]);

  // Fetch episodes when season changes (TV only)
  useEffect(() => {
    if (type !== "tv" || !id || !selectedSeason) return;
    fetch$(`https://api.themoviedb.org/3/tv/${id}/season/${selectedSeason}`).then((data) => {
      setEpisodes(data.episodes ?? []);
    });
  }, [id, type, selectedSeason]);

  const toggleList = () => {
    if (!detail) return;
    if (isInList) dispatch(removeFromList(Number(id)));
    else dispatch(addToList({ ...detail, mediaType: type }));
  };

  if (loading) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!detail) return null;

  const title = detail.title || detail.name;
  const year = (detail.release_date || detail.first_air_date || "").slice(0, 4);
  const rating = detail.vote_average?.toFixed(1);
  const genres = detail.genres?.map((g: any) => g.name).join(" • ");
  const runtime =
    type === "movie"
      ? detail.runtime
        ? `${Math.floor(detail.runtime / 60)}h ${detail.runtime % 60}m`
        : null
      : detail.number_of_seasons
      ? `${detail.number_of_seasons} Season${detail.number_of_seasons > 1 ? "s" : ""}`
      : null;

  const seasons = detail.seasons?.filter((s: any) => s.season_number > 0) ?? [];

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Hero backdrop */}
      <div className="relative w-full aspect-video max-h-[85vh] overflow-hidden">
        {detail.backdrop_path ? (
          <img
            className="w-full h-full object-cover"
            src={`${IMG}/original${detail.backdrop_path}`}
            alt={title}
          />
        ) : (
          <div className="w-full h-full bg-gray-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 z-20 bg-black/50 hover:bg-black/80 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors backdrop-blur-sm"
        >
          ←
        </button>
      </div>

      {/* Detail info */}
      <div className="px-4 md:px-10 lg:px-14 -mt-32 relative z-10">
        <div className="flex gap-6 items-start flex-col sm:flex-row">
          {/* Poster */}
          {detail.poster_path && (
            <img
              className="w-32 sm:w-40 md:w-48 rounded-lg shadow-2xl flex-shrink-0 hidden sm:block"
              src={`${IMG}/w342${detail.poster_path}`}
              alt={title}
            />
          )}

          {/* Info */}
          <div className="flex-1 pt-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 leading-tight">
              {title}
            </h1>
            {detail.tagline && (
              <p className="text-gray-400 italic text-sm mb-3">"{detail.tagline}"</p>
            )}
            <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
              {year && <span className="text-gray-300">{year}</span>}
              {rating && (
                <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-0.5 rounded text-xs font-semibold">
                  ★ {rating}
                </span>
              )}
              {runtime && <span className="text-gray-300">{runtime}</span>}
              {detail.status && (
                <span className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-xs">
                  {detail.status}
                </span>
              )}
            </div>
            {genres && <p className="text-gray-400 text-sm mb-4">{genres}</p>}
            <p className="text-gray-200 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
              {detail.overview}
            </p>

            {/* Action buttons */}
            <div className="flex gap-3 flex-wrap mb-6">
              {trailerKey && (
                <a
                  href={`https://www.youtube.com/watch?v=${trailerKey}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white hover:bg-white/80 text-black font-bold px-6 py-2.5 rounded text-sm transition-colors"
                >
                  ▶ Watch Trailer
                </a>
              )}
              <button
                onClick={toggleList}
                className="flex items-center gap-2 bg-gray-700/80 hover:bg-gray-600/80 text-white font-semibold px-6 py-2.5 rounded text-sm transition-colors"
              >
                {isInList ? "✓ In My List" : "+ My List"}
              </button>
            </div>
          </div>
        </div>

        {/* Cast */}
        {credits.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold mb-4">Cast</h2>
            <div
              className="flex gap-3 overflow-x-scroll pb-4"
              style={{ scrollbarWidth: "none" }}
            >
              {credits.map((actor: any) => (
                <div key={actor.id} className="flex-shrink-0 w-20 md:w-24 text-center">
                  <img
                    className="w-full aspect-square object-cover rounded-full mb-1 bg-gray-800"
                    src={
                      actor.profile_path
                        ? `${IMG}/w185${actor.profile_path}`
                        : "https://via.placeholder.com/185x185?text=?"
                    }
                    alt={actor.name}
                  />
                  <p className="text-white text-[11px] font-semibold line-clamp-1">{actor.name}</p>
                  <p className="text-gray-400 text-[10px] line-clamp-1">{actor.character}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Seasons & Episodes (TV only) */}
        {type === "tv" && seasons.length > 0 && (
          <section className="mt-10">
            <h2 className="text-xl font-bold mb-4">Episodes</h2>

            {/* Season tabs */}
            <div
              className="flex gap-2 overflow-x-scroll pb-3 mb-6"
              style={{ scrollbarWidth: "none" }}
            >
              {seasons.map((s: any) => (
                <button
                  key={s.season_number}
                  onClick={() => setSelectedSeason(s.season_number)}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedSeason === s.season_number
                      ? "bg-white text-black"
                      : "bg-gray-700/60 text-gray-300 hover:bg-gray-600/60"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            {/* Episodes list */}
            <div className="flex flex-col gap-3">
              {episodes.map((ep: any) => (
                <div
                  key={ep.id}
                  className="flex gap-3 bg-gray-900/60 rounded-lg p-3 hover:bg-gray-800/60 transition-colors"
                >
                  <div className="flex-shrink-0 w-28 sm:w-36 md:w-44">
                    <img
                      className="w-full aspect-video object-cover rounded-md bg-gray-800"
                      src={
                        ep.still_path
                          ? `${IMG}/w300${ep.still_path}`
                          : "https://via.placeholder.com/300x169?text=Episode"
                      }
                      alt={ep.name}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="text-white text-sm font-semibold line-clamp-1">
                        {ep.episode_number}. {ep.name}
                      </p>
                      <span className="text-gray-400 text-xs flex-shrink-0">
                        {ep.runtime ? `${ep.runtime}m` : ""}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {ep.overview || "No description available."}
                    </p>
                    {ep.vote_average > 0 && (
                      <span className="text-yellow-400 text-xs mt-1 inline-block">
                        ★ {ep.vote_average.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Similar */}
        {similar.length > 0 && (
          <div className="mt-10">
            <MovieList
              title={`More Like This`}
              movies={similar.slice(0, 15)}
              type={type as "movie" | "tv"}
            />
          </div>
        )}

        <div className="pb-8" />
      </div>
    </div>
  );
}

export default DetailPage;
