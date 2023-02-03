import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTagsAsync = createAsyncThunk(
  "trendingTags/fetchTagsAsync",
  async () => {
    const res = await fetch(
      "https://api.stackexchange.com/2.3/tags?page=1&pagesize=10&order=desc&sort=popular&site=stackoverflow"
    );
    if (!res.ok) {
      throw new Error("Fetch failed");
    }
    const data = await res.json();
    return data;
  }
);

interface ITagsState {
  selectedTag: string;
  allTags: {
    hasMore: boolean;
    items: { name: string; count: number }[];
  } | null;
  loading: boolean;
  error: boolean;
}

const initialTagsState: ITagsState = {
  selectedTag: "",
  allTags: null,
  loading: false,
  error: false,
};

const trendingTagsSlice = createSlice({
  name: "trendingTags",
  initialState: initialTagsState,
  reducers: {
    selectTag(state, action) {
      state.selectedTag = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTagsAsync.fulfilled, (state, action) => {
        state.allTags = action.payload;
        state.selectedTag = action.payload.items[0].name;
        state.loading = false;
      })
      .addCase(fetchTagsAsync.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const trendingTagsActions = trendingTagsSlice.actions;

export default trendingTagsSlice.reducer;
