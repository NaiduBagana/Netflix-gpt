import React from "react";
import Header from "./Header";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import { usePopularMovies } from "../hooks/usePopularMovies";
import { useTopRatedMovies } from "../hooks/useTopRatedMovies";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  
  return (
    <div className="min-h-screen bg-black">
     <Header/>
     <MainContainer/>
     <SecondaryContainer/>
     {/* 
      MainContainer
        -videoBackground
        -videoTitile
      SecondaryContainer
         -MovieList *n
            -cards * n
      */}
    </div>
  );
};

export default Browse;
