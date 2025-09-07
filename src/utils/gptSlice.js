import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    movieNames: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    setGptMovies: (state, action) => {
      const { movieNames, movieResults } = action.payload;
      state.movieNames = movieNames;
      state.movieResults = movieResults;
      state.isLoading = false;
      state.error = null;
    },
    setGptLoading: (state, action) => {
      state.isLoading = true;
    },
    setGptError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearGptResults: (state) => {
      state.movieNames = null;
      state.movieResults = null;
      state.error = null;
    },
  },
});

export const {
  toggleGptSearch,
  setGptMovies,
  setGptLoading,
  setGptError,
  clearGptResults,
} = gptSlice.actions;

export default gptSlice.reducer;
