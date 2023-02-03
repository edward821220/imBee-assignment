import styled from "styled-components";
import Searching from "./Searching";
import TreadingTags from "./TreadingTags";

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: #abc2c4;
  padding: 20px 0;
  margin: 0;
  box-shadow: 0 0 5px #00000098;
`;
const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`;
function Header() {
  return (
    <Wrapper>
      <Container>
        <Searching />
        <TreadingTags />
      </Container>
    </Wrapper>
  );
}

export default Header;
