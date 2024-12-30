import React, { useContext } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";
import { useSearchParams } from "react-router-dom";
import logo from "../assets/homepage/HeaderLogo.svg"
import searchicon from "../assets/homepage/search.svg"

const Header = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [, setSearchParams] = useSearchParams(); 

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setSearchParams({ search: newSearchTerm }); // URL 파라미터 업데이트
};
  return (
    <HeaderContainer>
      {/* 로고 섹션 */}
      <LogoWrapper>
        <Link to="/">
          <Logo src={logo} alt="Logo" />
        </Link>
        
      </LogoWrapper>

      {/* 검색 섹션 */}
      <IconsWrapper>
        <SearchWrapper>
          <SearchInput
          type="text"
          placeholder="원하는 검색어를 입력하세요"
          value={searchTerm}
          onChange={handleSearchChange}// 검색 상태 업데이트
        />
          <SearchIcon ><SearchIcon2 src={searchicon} alt="Profile" /></SearchIcon>
        </SearchWrapper>

        <UserWrapper>
          <UserName>김규리님</UserName>
          <ProfileImage src="/profile/userprofile.svg" alt="Profile" />
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
  padding: 29px 120px 30px 114px;
  background-color: white;
  
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Logo = styled.img`
  width: 116px;
`;

const IconsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 360px;
  height: 54px;
  border: 1px solid #DBDBDB;
  border-radius: 8px;
  justify-content: space-between;
  padding: 15px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #6c6c6c;

  &::placeholder {
    color:#767676;
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
  margin-right: 12px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const SearchIcon2 = styled.img`
  width: 21.028px;
height: 21.026px;
flex-shrink: 0;
`;