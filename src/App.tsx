import styled from "styled-components";
import Searching from "./components/Searching";

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

function App() {
  return (
    <Wrapper>
      <Searching />
    </Wrapper>
  );
}

export default App;
