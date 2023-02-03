import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchQuestions } from "../store/questionsListReducer";
import spinner from "../img/spinner.gif";

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;

const List = styled.ul`
  padding-left: 0;
`;
const Item = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  border-bottom: 1px solid lightgray;
  padding: 10px 5px;
  margin-bottom: 10px;
  transition: border 0.1s ease-in;
  cursor: pointer;
  &:hover {
    border: 1px solid #349f9f;
  }
`;
const Contents = styled.div`
  width: 80%;
`;
const Title = styled.p`
  margin-top: 0;
`;
const Details = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Detail = styled.div`
  width: 30%;
`;
const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DetailTitle = styled.p``;
const Score = styled.div<{ negative: boolean }>`
  color: ${(props) => props.negative && "red"};
  padding: 5px 20px;
`;
const Answers = styled.div<{ positive: boolean; accepted: boolean }>`
  border: ${(props) => props.positive && "1px solid green"};
  background-color: ${(props) => props.accepted && "green"};
  color: ${(props) => props.positive && "green"};
  color: ${(props) => props.accepted && "#fff"};
  padding: 5px 20px;
`;
const Viewed = styled.div`
  padding: 5px 20px;
`;
const Author = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;
`;
const Avatar = styled.img`
  width: 60px;
  border-radius: 50%;
  margin-bottom: 10px;
`;
const AuthorName = styled.p`
  margin: 0;
`;

function QuestionsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, questions } = useSelector(
    (state: RootState) => state.questionsList
  );
  const tag = useSelector((state: RootState) => state.trendingTags.selectedTag);

  useEffect(() => {
    dispatch(fetchQuestions(tag));
  }, [dispatch, tag]);
  console.log(questions);
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
    <List>
      {questions?.items?.map((question) => (
        <Item
          key={question.title}
          onClick={() => {
            window.open(question.link, "_blank", "noreferrer");
          }}
        >
          <Contents>
            <Title>{question.title}</Title>
            <Details>
              <Detail>
                <DetailItem>
                  <DetailTitle>Score</DetailTitle>
                  <Score negative={question.score < 0}>{question.score}</Score>
                </DetailItem>
              </Detail>
              <Detail>
                <DetailItem>
                  <DetailTitle>Answers</DetailTitle>
                  <Answers
                    positive={question.answer_count > 0}
                    accepted={question.is_answered}
                  >
                    {question.answer_count}
                  </Answers>
                </DetailItem>
              </Detail>
              <Detail>
                <DetailItem>
                  <DetailTitle>Viewed</DetailTitle>
                  <Viewed>{question.view_count}</Viewed>
                </DetailItem>
              </Detail>
            </Details>
          </Contents>
          <Author>
            <Avatar src={question.owner.profile_image} />
            <AuthorName>{question.owner.display_name}</AuthorName>
          </Author>
        </Item>
      ))}
    </List>
  );
}

export default QuestionsList;
