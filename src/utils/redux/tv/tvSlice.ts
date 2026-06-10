import { createSlice } from "@reduxjs/toolkit";

const tvSlice = createSlice({
  name: "tv",
  initialState: {
    popularShows: [] as any[],
    topRatedShows: [] as any[],
    airingToday: [] as any[],
    onAir: [] as any[],
  },
  reducers: {
    setPopularShows: (state, action) => { state.popularShows = action.payload; },
    setTopRatedShows: (state, action) => { state.topRatedShows = action.payload; },
    setAiringToday: (state, action) => { state.airingToday = action.payload; },
    setOnAir: (state, action) => { state.onAir = action.payload; },
  },
});

export const { setPopularShows, setTopRatedShows, setAiringToday, setOnAir } = tvSlice.actions;
export default tvSlice.reducer;
