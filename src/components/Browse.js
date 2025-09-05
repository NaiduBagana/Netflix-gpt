import React from "react";
import Header from "./Header";

const Browse = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />

      {/* Main Content */}
      <div className="pt-20 md:pt-24 px-6 text-white">
        {/* Hero Section */}
        <div className="relative h-96 md:h-[70vh] flex items-center">
          <div className="absolute inset-0">
            <img
              src="https://assets.nflxext.com/ffe/siteui/vlv3/8d617e19-3c3c-4c28-8998-c9b14dbc7200/web/IN-en-20250901-TRIFECTA-perspective_48d84d4e-9558-46b8-a0f3-8b2dc8478431_medium.jpg"
              alt="Netflix Background"
              className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-md md:max-w-lg">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Welcome to Netflix
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-6">
              Discover thousands of movies, TV shows, and documentaries. Start
              watching now!
            </p>
            <div className="flex space-x-4">
              <button className="bg-white text-black font-semibold py-3 px-6 rounded hover:bg-gray-200 transition-colors">
                ▶ Play
              </button>
              <button className="bg-gray-600 bg-opacity-70 text-white font-semibold py-3 px-6 rounded hover:bg-gray-500 transition-colors">
                ℹ More Info
              </button>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-gray-800 rounded-lg aspect-[3/4] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <span className="text-gray-400">Movie {item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Popular on Netflix</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-gray-800 rounded-lg aspect-[3/4] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <span className="text-gray-400">Show {item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Continue Watching</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="bg-gray-800 rounded-lg aspect-[3/4] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <span className="text-gray-400">Episode {item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Browse;
