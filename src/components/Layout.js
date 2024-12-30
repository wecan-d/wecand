import React from "react";
import { Outlet,useLocation } from "react-router-dom";
import styled from "styled-components";
import Header from './Header';
import Footer from "./Footer";



const Layout = () => {
  const location = useLocation();
  
  const isHomePage = location.pathname === '/' || location.pathname === '/home';
  

  return (
    <LayoutContainer>
      {!isHomePage && <Header/>}

      <MainContent>
        <Outlet />
      </MainContent>

     <Footer />
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
  
`;