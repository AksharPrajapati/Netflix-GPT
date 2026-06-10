import MovieCard from "./MovieCard";

interface MovieListProps {
  title: string;
  movies: any[];
  type?: "movie" | "tv";
}

function MovieList({ title, movies, type = "movie" }: MovieListProps) {
  if (!movies?.length) return null;

  return (
    <div className="px-4 md:px-8 mt-4 md:mt-6">
      <h2 className="text-white text-lg md:text-xl font-bold mb-2 md:mb-3 tracking-wide">
        {title}
      </h2>
      <div
        className="movie-row flex overflow-x-scroll gap-2 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} type={movie.media_type || type} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
