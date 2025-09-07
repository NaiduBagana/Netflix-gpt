import React from 'react';
import { useSelector } from 'react-redux';
import {MovieList} from './MovieList';
const SecondaryContainer = () => {
    const All = useSelector((store)=>store.movies);
    const nowPlayingMovies = All?.nowPlayingMovies;
    const popularMovies = All?.popularMovies;
    const topRatedMovies = All?.topRatedMovies;
    const upcomingMovies = All?.upcomingMovies;

    return (
      <div className="relative z-20 -mt-20 md:-mt-32 lg:-mt-52 pb-12">
        <div className="px-6 md:px-12 space-y-8">
          <MovieList title="Trending Now" movies={nowPlayingMovies} />
          <MovieList title="Popular" movies={popularMovies} />
          <MovieList title="Top Rated" movies={topRatedMovies} />
          <MovieList title="Upcoming Movies" movies={upcomingMovies} />
          <MovieList title="Comedy Movies" movies={nowPlayingMovies} />
          <MovieList title="Horror Movies" movies={nowPlayingMovies} />
          <MovieList title="Romance Movies" movies={nowPlayingMovies} />
          <MovieList title="Documentaries" movies={nowPlayingMovies} />
        </div>
      </div>
    );
}

export default SecondaryContainer;
