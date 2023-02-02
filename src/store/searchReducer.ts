import { createSlice } from "@reduxjs/toolkit";

const initialSearchState = "";

const searchSlice = createSlice({
  name: "search",
  initialState: initialSearchState,
  reducers: {
    changeKeywords(state, action) {
      return action.payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
