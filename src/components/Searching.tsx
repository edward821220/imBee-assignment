import { useRef } from "react";
import styled from "styled-components";
import { searchActions } from "../store/searchReducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { questionsListActions } from "../store/questionsListReducer";
import { trendingTagsActions } from "../store/trendingTagsReducer";

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  border: 3px solid #b6d8e4;
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
`;
const SearchInput = styled.input`
  display: block;
  height: 30px;
  width: 90%;
  border: none;
  outline: none;
  padding-left: 10px;
  border-radius: 5px;
`;
const SearchButton = styled.button`
  display: block;
  width: 10%;
  background-color: #b6d8e4;
  border: none;
  cursor: pointer;
`;

function Searching() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dispatch = useDispatch();
  const keywords = useSelector((state: RootState) => state.search);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    dispatch(searchActions.changeKeywords(e.target.value));
    timerRef.current = setTimeout(() => {
      dispatch(questionsListActions.resetPage());
      dispatch(trendingTagsActions.setTag(e.target.value.toLowerCase()));
    }, 500);
  };

  return (
    <SearchBar>
      <SearchInput value={keywords} onChange={handleChange} placeholder="Tag" />
      <SearchButton>Search</SearchButton>
    </SearchBar>
  );
}

export default Searching;
