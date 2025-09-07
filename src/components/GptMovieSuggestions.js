import React from "react";
import { useSelector } from "react-redux";
import { MovieList } from "./MovieList";
import Shimmer from "./Shimmer";

const GptMovieSuggestions = () => {
  const { movieResults, movieNames, isLoading, error } = useSelector(
    (store) => store.gpt
  );

  // Show shimmer loading state
  if (isLoading) {
    return <Shimmer />;
  }

  // Show error state
  if (error) {
    return (
      <div className="p-4 m-4 bg-red-900/20 backdrop-blur-md rounded-2xl border border-red-700">
        <div className="text-center py-8">
          <p className="text-red-400 text-lg">❌ Oops! Something went wrong</p>
          <p className="text-gray-400 text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  // Don't render if no data
  if (!movieNames || !movieResults) {
    return null;
  }

  return (
    <div className="p-4 m-4 bg-black/50 backdrop-blur-md rounded-2xl border border-gray-700">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Our Recommendations
        </h2>
        <p className="text-gray-300 text-sm">
          Here are some personalized movie suggestions based on your search
        </p>
      </div>

      <div className="space-y-8">
        {movieNames.map((movieName, index) => {
          const movies = movieResults[index];

          // Only render if we have movies for this category
          if (!movies || movies.length === 0) {
            return (
              <div
                key={movieName}
                className="mb-8 p-4 bg-gray-800/30 rounded-lg"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {movieName.trim()}
                </h3>
                <p className="text-gray-400 text-sm">
                  No movies found for this suggestion
                </p>
              </div>
            );
          }

          return (
            <div key={movieName} className="mb-8">
              <MovieList title={movieName.trim()} movies={movies} />
            </div>
          );
        })}
      </div>

      {/* AI Powered Badge */}
      <div className="flex items-center justify-center mt-8 space-x-2 text-gray-400 text-sm">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span>Powered by OpenAI GPT</span>
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
    </div>
  );
};

export default GptMovieSuggestions;
