import { createSlice } from "@reduxjs/toolkit";

const trendingSlice = createSlice({
  name: "trending",
  initialState: {
    allTrending: [] as any[],
    movieTrending: [] as any[],
    tvTrending: [] as any[],
  },
  reducers: {
    setAllTrending: (state, action) => { state.allTrending = action.payload; },
    setMovieTrending: (state, action) => { state.movieTrending = action.payload; },
    setTvTrending: (state, action) => { state.tvTrending = action.payload; },
  },
});

export const { setAllTrending, setMovieTrending, setTvTrending } = trendingSlice.actions;
export default trendingSlice.reducer;
