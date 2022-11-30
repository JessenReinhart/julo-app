import styled from "@emotion/styled";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";

const OutletContainer = styled.div`
  margin-top: 72px;
`;

const Layout = () => (
  <>
    <Navbar />
    <OutletContainer>
      <Outlet />
    </OutletContainer>
  </>
);

export default Layout;
