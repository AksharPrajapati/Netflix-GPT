import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import moviesSlice from "./movies/moviesSlice";
import tvSlice from "./tv/tvSlice";
import trendingSlice from "./trending/trendingSlice";
import myListSlice from "./myList/myListSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    movies: moviesSlice,
    tv: tvSlice,
    trending: trendingSlice,
    myList: myListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
