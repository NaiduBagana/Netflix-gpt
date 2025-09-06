import React from "react";
import { useSelector } from "react-redux";
import UseMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  UseMovieTrailer(movieId);
  if (!trailerVideo?.key) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <iframe
          className="w-full h-full scale-150"
          src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1&iv_load_policy=3&rel=0&disablekb=1&fs=0&vq=hd1080&hd=1&quality=hd1080`}
        //  src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&controls=0&showinfo=0&loop=1&playlist=${trailerVideo.key}&modestbranding=1&iv_load_policy=3&rel=0&disablekb=1&fs=0&vq=hd1080&hd=1&quality=hd1080`}
          title="Movie Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />

        {/* Netflix-style Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
      </div>
    </div>
  );
};

export default VideoBackground;
