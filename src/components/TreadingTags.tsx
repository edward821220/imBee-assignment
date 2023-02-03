import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { trendingTagsActions } from "../store/trendingTagsReducer";

const Title = styled.h3``;
const Tags = styled.div`
  display: flex;
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
  const dispatch = useDispatch();
  const allTags = useSelector((state: RootState) => state.trendingTags.allTags);
  const selectedTag = useSelector(
    (state: RootState) => state.trendingTags.selectedTag
  );
  useEffect(() => {
    const fetchTags = async () => {
      const res = await fetch(
        "https://api.stackexchange.com/2.3/tags?page=1&pagesize=10&order=desc&sort=popular&site=stackoverflow"
      );
      const tags = await res.json();
      dispatch(trendingTagsActions.setAllTags(tags));
      dispatch(trendingTagsActions.selectTag(tags.items[0].name));
    };
    fetchTags();
  }, [dispatch]);

  return (
    <>
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
    </>
  );
}

export default TreadingTags;
