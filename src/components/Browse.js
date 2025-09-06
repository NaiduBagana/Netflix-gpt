import React from "react";
import Header from "./Header";
import { useNowPlayingMovies } from "../hooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
const Browse = () => {
  useNowPlayingMovies();
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
