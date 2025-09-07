import React from "react";
import GptSearchInput from "./GptSearchInput";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BG_URL } from "../utils/constants";

const GptSearch = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black"
      style={{
        backgroundImage: `url(${BG_URL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10">
        {/* Search Input */}
        <GptSearchInput />

        {/* Movie Suggestions */}
        <div className="mt-8">
          <GptMovieSuggestions />
        </div>

        {/* Footer */}
        <div className="mt-16 pb-8 text-center text-gray-500 text-sm">
          <p>Experience the future of movie discovery</p>
        </div>
      </div>
    </div>
  );
};

export default GptSearch;
