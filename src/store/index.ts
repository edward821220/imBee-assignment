import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import searchReducer from "./searchReducer";
import trendingTagsReducer from "./trendingTagsReducer";
import questionsListReducer from "./questionsListReducer";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    trendingTags: trendingTagsReducer,
    questionsList: questionsListReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
