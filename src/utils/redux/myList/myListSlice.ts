import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = (): any[] => {
  try { return JSON.parse(localStorage.getItem("myList") || "[]"); }
  catch { return []; }
};

const myListSlice = createSlice({
  name: "myList",
  initialState: { items: loadFromStorage() },
  reducers: {
    addToList: (state, action) => {
      if (!state.items.some((i: any) => i.id === action.payload.id)) {
        state.items.push(action.payload);
        localStorage.setItem("myList", JSON.stringify(state.items));
      }
    },
    removeFromList: (state, action) => {
      state.items = state.items.filter((i: any) => i.id !== action.payload);
      localStorage.setItem("myList", JSON.stringify(state.items));
    },
  },
});

export const { addToList, removeFromList } = myListSlice.actions;
export default myListSlice.reducer;
