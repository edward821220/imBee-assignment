import styled from "styled-components";
import Header from "./components/Header";
import QuestionsList from "./components/QuestionsList";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
  }
`;

const Wrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Wrapper>
        <QuestionsList />
      </Wrapper>
    </>
  );
}

export default App;
