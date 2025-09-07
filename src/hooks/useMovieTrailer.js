import React from 'react';
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../utils/movieSlice";

const UseMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const getMovieVideos = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        const data = await res.json();
        const filteredData =
          data.results?.filter((v) => v.type === "Trailer") || [];
        const trailer = filteredData.length
          ? filteredData[0]
          : data.results?.[0];

        if (trailer) {
          //console.log(trailer);
          dispatch(addTrailerVideo(trailer));
        }
      } catch (error) {
        console.error("Error fetching movie videos:", error);
      }
    };

    React.useEffect(() => {
      if (movieId) {
        getMovieVideos();
      }
    }, [movieId]);

  
}

export default UseMovieTrailer;
