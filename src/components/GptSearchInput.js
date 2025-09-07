import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setGptLoading } from "../utils/gptSlice";

const GptSearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    if (!searchText.trim()) return;
     dispatch({
       type: "gpt/clearGptResults",
     });
    dispatch(setGptLoading(true));
    setIsLoading(true);

    
    try {
      // OpenAI API call
      const gptQuery = `Act as a Movie Recommendation system and suggest some movies for the query: ${searchText}. Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya`;

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: gptQuery,
              },
            ],
            max_tokens: 100,
            temperature: 0.7,
          }),
        }
      );

      const gptResults = await response.json();
      console.log("GPT Results:", gptResults); // Debug log

      if (!gptResults.choices?.[0]?.message?.content) {
        throw new Error("No suggestions received");
      }

      const gptMovies = gptResults.choices[0].message.content.split(",");
      console.log("GPT Movies:", gptMovies); // Debug log

      // Search each movie in TMDB
      const promiseArray = gptMovies.map((movie) =>
        searchMovieTMDB(movie.trim())
      );
      const tmdbResults = await Promise.all(promiseArray);
     // console.log("TMDB Results:", tmdbResults); // Debug log

      // Dispatch results to Redux store
      dispatch({
        type: "gpt/setGptMovies",
        payload: {
          movieNames: gptMovies,
          movieResults: tmdbResults,
        },
      });
    } catch (error) {
      console.error("Error fetching GPT suggestions:", error);
      dispatch({
        type: "gpt/setGptError",
        payload: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleGptSearchClick();
    }
  };

  return (
    <div className="pt-[10%] flex justify-center">
      <form
        className="w-full md:w-1/2 bg-black/80 backdrop-blur-md grid grid-cols-12 rounded-2xl border border-gray-600 shadow-2xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="p-4 m-4 col-span-9 bg-gray-900/50 text-white placeholder-gray-400 rounded-xl border border-gray-600 focus:border-red-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
          placeholder="What would you like to watch today? (e.g., 'funny romantic comedies' or 'sci-fi movies like Inception')"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className={`
                        col-span-3 m-4 py-2 px-4 rounded-xl font-semibold text-white
                        transition-all duration-300 transform hover:scale-105
                        ${
                          isLoading
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-red-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl"
                        }
                        relative overflow-hidden group
                    `}
          disabled={isLoading}
          onClick={handleGptSearchClick}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>

          <div className="relative flex items-center justify-center space-x-2">
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span className="text-sm">Searching...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
                <span className="text-sm">Search</span>
              </>
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default GptSearchInput;
