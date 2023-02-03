import React from "react";
import styled from "styled-components";
import { searchActions } from "../store/searchReducer";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  border: 3px solid #b6d8e4;
  border-radius: 10px;
  margin-bottom: 20px;
`;
const SearchInput = styled.input`
  display: block;
  height: 30px;
  width: 90%;
  border: none;
  outline: none;
  padding-left: 10px;
  border-radius: 10px;
`;
const SearchButton = styled.button`
  display: block;
  width: 10%;
  background-color: #b6d8e4;
  border: none;
  cursor: pointer;
`;

function Searching() {
  const dispatch = useDispatch();
  const keywords = useSelector((state: RootState) => state.search);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchActions.changeKeywords(e.target.value));
  };

  return (
    <SearchBar>
      <SearchInput value={keywords} onChange={handleChange} placeholder="Tag" />
      <SearchButton>Search</SearchButton>
    </SearchBar>
  );
}

export default Searching;
