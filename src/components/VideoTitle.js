import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center">
      <div className="px-6 md:px-12 text-white max-w-lg md:max-w-xl lg:max-w-2xl z-20">
        {/* Title */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          {title}
        </h1>

        {/* Description */}
        <p className="text-sm md:text-lg text-gray-300 mb-6 leading-relaxed line-clamp-3">
          {overview}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="bg-white text-black font-semibold py-3 px-8 rounded flex items-center justify-center hover:bg-gray-200 transition-colors">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            Play
          </button>
          <button className="bg-gray-600 bg-opacity-70 text-white font-semibold py-3 px-8 rounded flex items-center justify-center hover:bg-gray-500 transition-colors">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
