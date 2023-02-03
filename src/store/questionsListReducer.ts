import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchQuestions = createAsyncThunk(
  "questionsList/fetchQuestions",
  async (query: { page: number; tag: string }) => {
    const { page, tag } = query;
    const res = await fetch(
      `https://api.stackexchange.com/2.3/questions?page=${page}&pagesize=20&order=desc&sort=activity&tagged=${tag}&site=stackoverflow`
    );
    if (!res.ok) throw new Error("Fetch failed!");
    const data = await res.json();
    return data;
  }
);

interface IQuestionsListState {
  loading: boolean;
  error: boolean;
  page: number;
  hasMore: boolean;
  questions: {
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
}
const initialQuestionsListState: IQuestionsListState = {
  loading: false,
  error: false,
  questions: [],
  page: 1,
  hasMore: false,
};

const questionsListSlice = createSlice({
  name: "questionsList",
  initialState: initialQuestionsListState,
  reducers: {
    addPage(state) {
      state.page++;
    },
    resetPage(state) {
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        if (state.page === 1) {
          state.loading = true;
        }
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        if (state.page === 1) {
          state.questions = action.payload.items;
          state.loading = false;
        } else {
          state.questions.push(...action.payload.items);
        }
        state.hasMore = action.payload.has_more;
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const questionsListActions = questionsListSlice.actions;

export default questionsListSlice.reducer;
