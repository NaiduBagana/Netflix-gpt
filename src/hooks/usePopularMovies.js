import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export const usePopularMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    movie_call();
  }, []);
  const movie_call = async () => {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      API_OPTIONS
    );

    const data = await res.json();
    const movies = data?.results;

    dispatch(addPopularMovies(movies));
  };
};
