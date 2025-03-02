import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useGoogleLogin } from "../pages/Login";
import logo from "../assets/homepage/HeaderLogo.svg"
import searchicon from "../assets/homepage/search.svg"
import userProfile from "../assets/profile.png";

const Header = () => {
  const { userInfo, handleLogout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const googleLogin = useGoogleLogin();
  const [searchWord, setSearchWord] = useState("");

  const handleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.log("로그인 처리 중 에러:", error);
    }
  };

  const handleSubmit = () => {
    // 예: 검색 페이지 혹은 /recruiting으로 이동하면서 쿼리 파라미터로 searchword 넘기기
    navigate(`/recruiting?searchword=${searchWord}`);
  };

  return (
    <HeaderContainer>
      <Logo src={logo} alt="Wecand Logo" onClick={() => navigate("/home")} />

      {/* 검색창 */}
      {location.pathname.includes("/recruiting") && 
      <SearchContainer>
        <SearchBox isLoggedIn={userInfo.isLoggedIn}>
          <SearchWrapper onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <SearchInput
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
            />
            <SearchIcon src={searchicon} onClick={handleSubmit} />
          </SearchWrapper>
        </SearchBox>
      </SearchContainer>
      }

      {/* 로그인/프로필 영역 */}
      <LoginWrapper>
        {!userInfo.isLoggedIn ? ( <LoginButton onClick={handleLogin}>로그인</LoginButton>)
        : (
        <>
          <UserNameP>{userInfo.userName}님</UserNameP>
          <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
        </>
        )}
        <UserProfile src={userProfile} alt="userIcon" onClick={() => navigate("/mypage")} />
      </LoginWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  width: 100%;
  background: transparent;
  color: white;
  padding: 30px 164px 30px 116px;
`;

const UserNameP = styled.p`
  font-size: 18px;
  color: #111;
  font-weight: 600;
`;

export const LoginButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: black;
  font-weight: 600;
`;

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
`;

export const Logo = styled.img`
  cursor: pointer;
  width: 116px;
  margin-right: auto;
`;

const SearchContainer = styled.div`
  position: relative;
`;

const SearchBox = styled.div`
  position: absolute;
  top: ${({ isLoggedIn }) => (isLoggedIn ? "316px" : "313px")};
  right: ${({ isLoggedIn }) => (isLoggedIn ? "-80px" : "20px")};
`;

export const SearchWrapper = styled.form`
  display: flex;
  align-items: center;
  width: 360px;
  height: 54px;
  border: 1px solid #DBDBDB;
  border-radius: 8px;
  justify-content: space-between;
  padding: 15px;
  margin-right: 25px;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 18px;
  color: #111;

  &::placeholder {
    color:white;
  }
`;

export const SearchIcon = styled.img`
  font-size: 15px;
  color: white;
  cursor: pointer;
  z-index: 10;
`;

export const UserProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;