import { useContext } from "react";
import styled from "@emotion/styled";

import { MovieContext } from "App";

const Nav = styled.nav`
  width: 100vw;
  height: 64px;
  background: whitesmoke;
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: space-between;
  top: 0;
  left: 0;
  padding: 1em 32px;
  box-sizing: border-box;
  color: gray;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.3);
  margin-bottom: 1em;
`;

const Button = styled.button`
  padding: 0.5em 1em;
  box-sizing: border-box;
  background: gray;
  border: 0;
  color: white;
  border-radius: 0.3em;
`;

const Navbar = () => {
  const { state } = useContext(MovieContext);

  return (
    <Nav>
      <h3>MyMovieApp</h3>
      <Button>
        <small>Saved Movies: {state.length}</small>
      </Button>
    </Nav>
  );
};

export default Navbar;
