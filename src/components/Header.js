import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HeaderContainer>
      {/* Logo Section */}
      <LogoWrapper>
        <Link to="/">
          <Logo src="/logo/logosymbol.svg" alt="Logo" />
        </Link>
        
      </LogoWrapper>

      {/* Search and Profile Section */}
      <IconsWrapper>
        <SearchWrapper>
          <SearchInput placeholder="원하는 검색어를 입력하세요" />
          <SearchIcon>🔍</SearchIcon>
        </SearchWrapper>

        <UserWrapper>
          <UserName>김규리님</UserName>
          <ProfileImage src="/profile-image.svg" alt="Profile" />
        </UserWrapper>
      </IconsWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 11%;
  background-color: white;
  
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Logo = styled.img`
  width: 150px;
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  background-color: #f0f3fa;
  border-radius: 32px;
  padding: 0.5rem 1rem;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #6c6c6c;

  &::placeholder {
    color: #b0b0b0;
  }
`;

const SearchIcon = styled.span`
  font-size: 1.2rem;
  color: #6c6c6c;
  cursor: pointer;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const UserName = styled.span`
  font-size: 1rem;
  color: #6c6c6c;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;