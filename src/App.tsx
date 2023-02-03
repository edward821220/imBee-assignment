import styled from "styled-components";
import Searching from "./components/Searching";
import TreadingTags from "./components/TreadingTags";

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

function App() {
  return (
    <Wrapper>
      <Searching />
      <TreadingTags />
    </Wrapper>
  );
}

export default App;
