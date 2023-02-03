import { createSlice } from "@reduxjs/toolkit";

interface TagsStateInterface {
  selectedTag: string;
  allTags: {
    hasMore: boolean;
    items: { name: string; count: number }[];
  } | null;
}
const initialTagsState: TagsStateInterface = {
  selectedTag: "",
  allTags: null,
};

const trendingTagsSlice = createSlice({
  name: "trendingTags",
  initialState: initialTagsState,
  reducers: {
    selectTag(state, action) {
      state.selectedTag = action.payload;
    },
    setAllTags(state, action) {
      state.allTags = action.payload;
    },
  },
});

export const trendingTagsActions = trendingTagsSlice.actions;

export default trendingTagsSlice.reducer;
