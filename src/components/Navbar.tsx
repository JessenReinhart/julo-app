import { useNavigate } from "react-router";
import { useContext } from "react";
import styled from "@emotion/styled";

import { MovieContext } from "App";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  width: 100vw;
  height: 64px;
  background: #a80038;
  display: flex;
  align-items: center;
  position: fixed;
  justify-content: space-between;
  top: 0;
  left: 0;
  padding: 1em 32px;
  box-sizing: border-box;
  color: #fbf9fa;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.3);
  margin-bottom: 1em;
  z-index: 100;
`;

const Button = styled.button`
  padding: 0.5em 1em;
  box-sizing: border-box;
  background: #2b2024;
  border: 0;
  color: white;
  border-radius: 0.3em;
  cursor: pointer;
`;

const Navbar = () => {
  const { state } = useContext(MovieContext);
  const navigate = useNavigate();

  return (
    <Nav>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h3>MyMovieApp</h3>
      </Link>
      <Button onClick={() => navigate("/my-list")}>
        <small>Saved Movies: {state.length}</small>
      </Button>
    </Nav>
  );
};

export default Navbar;
