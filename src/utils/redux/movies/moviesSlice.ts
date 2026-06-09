import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [] as any[],
    popularMovies: [] as any[],
    upcomingMovies: [] as any[],
    topRatedMovies: [] as any[],
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
  },
});

export const { setMovies, setPopularMovies, setUpcomingMovies, setTopRatedMovies } =
  MovieSlice.actions;

export default MovieSlice.reducer;
