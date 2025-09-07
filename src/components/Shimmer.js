import React from "react";

const Shimmer = () => {
  return (
    <div className="p-4 m-4 bg-black/50 backdrop-blur-md rounded-2xl border border-gray-700 animate-pulse">
      {/* Header shimmer */}
      <div className="mb-6">
        <div className="h-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg mb-2 w-64 bg-[length:200%_100%] animate-shimmer"></div>
        <div className="h-4 bg-gray-700 rounded w-96"></div>
      </div>

      {/* Movie lists shimmer */}
      <div className="space-y-8">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="mb-8">
            {/* Movie list title shimmer */}
            <div className="h-6 bg-gray-700 rounded mb-4 w-48"></div>

            {/* Movie cards shimmer */}
            <div className="flex space-x-4 overflow-hidden">
              {[1, 2, 3, 4, 5, 6].map((card) => (
                <div key={card} className="flex-shrink-0">
                  {/* Movie poster shimmer */}
                  <div className="w-40 h-60 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-lg bg-[length:200%_100%] animate-shimmer"></div>
                  {/* Movie title shimmer */}
                  <div className="mt-2 h-4 bg-gray-700 rounded w-32"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* AI Badge shimmer */}
      <div className="flex items-center justify-center mt-8 space-x-2">
        <div className="w-4 h-4 bg-gray-700 rounded"></div>
        <div className="h-4 bg-gray-700 rounded w-32"></div>
        <div className="w-4 h-4 bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default Shimmer;
