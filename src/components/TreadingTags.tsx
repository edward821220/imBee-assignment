import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  trendingTagsActions,
  fetchTagsAsync,
} from "../store/trendingTagsReducer";
import spinner from "../img/spinner.gif";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;
const TagsContainer = styled.div`
  position: sticky;
  top: 80px;
`;
const Title = styled.h3``;
const Tags = styled.div`
  display: flex;
  margin-bottom: 30px;
`;
const Tag = styled.div<{ selected: boolean }>`
  background-color: ${(props) => props.selected && "#b6d8e4"};
  border: 3px solid #b6d8e4;
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
  cursor: pointer;
`;

function TreadingTags() {
  const dispatch = useDispatch<AppDispatch>();
  const { allTags, selectedTag, loading, error } = useSelector(
    (state: RootState) => state.trendingTags
  );

  useEffect(() => {
    dispatch(fetchTagsAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <LoadingContainer>
        <img src={spinner} alt="loading" width="50px" />
      </LoadingContainer>
    );
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <TagsContainer>
      <Title>Treading</Title>
      <Tags>
        {allTags?.items?.map((tag) => (
          <Tag
            key={tag.name}
            selected={selectedTag === tag.name}
            onClick={() => {
              dispatch(trendingTagsActions.selectTag(tag.name));
            }}
          >
            {tag.name}
          </Tag>
        ))}
      </Tags>
    </TagsContainer>
  );
}

export default TreadingTags;
