import { IMG_URL } from "../utils/constants";
const MovieCard = ({ movie }) => {
  return (
    <div className="flex-shrink-0 w-32 md:w-48 lg:w-52 group cursor-pointer">
      <div className="relative overflow-hidden rounded-md">
        <img
          src={IMG_URL + movie.poster_path}
          alt={movie.title}
          className="w-full h-48 md:h-72 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white text-black rounded-full p-3 hover:bg-gray-200">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Movie Info */}
      <div className="mt-2">
        <h3 className="text-sm font-medium text-white truncate">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-400">
          {movie.release_date.split("-")[0]}
        </p>
      </div>
    </div>
  );
};
export default MovieCard;