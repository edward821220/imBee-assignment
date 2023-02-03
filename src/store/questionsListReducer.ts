import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchQuestions = createAsyncThunk(
  "questionsList/fetchQuestions",
  async (tag: string) => {
    const res = await fetch(
      `https://api.stackexchange.com/2.3/questions?page=1&pagesize=20&order=desc&sort=activity&tagged=${tag}&site=stackoverflow`
    );
    if (!res.ok) throw new Error("Fetch failed!");
    const data = await res.json();
    return data;
  }
);

interface IQuestionsListState {
  loading: boolean;
  error: boolean;
  questions: {
    items: {
      title: string;
      score: number;
      view_count: number;
      answer_count: number;
      is_answered: boolean;
      link: string;
      owner: {
        profile_image: string;
        display_name: string;
      };
    }[];
    hasMore: boolean;
  } | null;
}
const initialQuestionsListState: IQuestionsListState = {
  loading: false,
  error: false,
  questions: null,
};

const questionsListSlice = createSlice({
  name: "questionsList",
  initialState: initialQuestionsListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const questionsListActions = questionsListSlice.actions;

export default questionsListSlice.reducer;
