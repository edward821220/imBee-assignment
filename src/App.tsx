import styled from "styled-components";
import Searching from "./components/Searching";
import TreadingTags from "./components/TreadingTags";
import QuestionsList from "./components/QuestionsList";

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

function App() {
  return (
    <Wrapper>
      <Searching />
      <TreadingTags />
      <QuestionsList />
    </Wrapper>
  );
}

export default App;
