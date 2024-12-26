import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from './Header';

const Layout = () => {
  return (
    <LayoutContainer>

      <Header/>

      <MainContent>
        <Outlet />
      </MainContent>

      <Footer>
        <p>© 2024 Wecand. All rights reserved.</p>
      </Footer>
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  background-color: #f9f9f9;
`;

const Footer = styled.footer`
  background-color: white;
`;