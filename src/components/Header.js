import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>

      <LogoWrapper>
      <Link to="/">
        <Logo src="/logo/logosymbol.svg" alt="Logo" />
      </Link>
      </LogoWrapper>
      

        <SearchBar/>
      
      <IconsWrapper>
        <SquareIcon>로그인</SquareIcon>
        <CircleIcon />
      </IconsWrapper>

    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1% 2%;
  margin: 0 8rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 0.8rem;
`;

const Logo = styled.img`
  width: 250px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const SquareIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6rem;
  height: 2.5rem;
  color: white;
  background-color: #888;
  border-radius: 4px;
`;

const CircleIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #888;
  border-radius: 50%;
`;

const SearchBar = styled.input`
  width: 50%;
  height: 3rem;
  padding: 0.5rem;
  border-radius: 32px;
  background-color: #F5F5F5;
  border: none;
`;
