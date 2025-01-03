import React, { useState, useContext } from "react";
import { useNavigate, location } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../context/AuthContext";
import logo from "../assets/homepage/HeaderLogo.svg"
import searchicon from "../assets/homepage/search.svg"
import { useGoogleLogin } from "../pages/Login";
import userProfile from "../assets/profile.png";


const Header = () => {
  const { userInfo, handleLogout } = useContext(AuthContext);
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

  // recruitingPage 경로를 확인
  // const isRecruitingPage = location.pathname.including("/recruiting");

  return (
    <HeaderContainer>
      {/* 로고 클릭 시 홈으로 이동 */}
      <Logo src={logo} alt="Wecand Logo" onClick={() => navigate("/home")} />

      {/* 검색창 */}
      <SearchWrapper onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();

      }}>
        <SearchInput
          type="text"
          placeholder="검색어를 입력하세요"
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <SearchIcon src={searchicon} onClick={() => handleSubmit()} />
      </SearchWrapper>

      {/* 로그인/프로필 영역 */}
      <LoginWrapper>
        {!userInfo.isLoggedIn ? (
          // 로그인 안 된 경우
          <LoginButton onClick={handleLogin}>로그인</LoginButton>
        ) : (
          // 로그인 된 경우
          <>
            <UserNameP>{userInfo.userName} 님</UserNameP>
            <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
          </>
        )}
        <UserProfile
          src={userProfile}
          alt="userIcon"
          onClick={() => navigate("/mypage")}
        />
      </LoginWrapper>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  /* position: absolute; */
  width: 100%;

  background: transparent;
  color: white;
  padding: 30px 116px;
`;

const UserNameP = styled.p`
  font-size: 18px;
  color: #111;
  font-size: 24px,
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
  width: 116px;
  margin-right: auto;

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

  margin-right: 15px;
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 18px;
  color: white;

  &::placeholder {
    color:white;
  }
`;

export const SearchIcon = styled.span`
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
`;

export const UserProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;