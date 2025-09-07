import MovieCard from "./MovieCard";
export const MovieList = ({ title, movies }) => {
  return (
    <div className="text-white">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>
      <div className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4">
        {movies?.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
