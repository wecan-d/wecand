import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import bgsvg from "../assets/homepage/home2.svg";
import whitelogo from "../assets/homepage/whitelogo.svg";
import userProfile from "../assets/profile.png";
import landsec from "../assets/homepage/landsec.svg";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "./Login";
import { PurpleText } from "../components/RegisterComponents";
import { TeamAllowStateBox } from "../components/homepage/TeamAllowStateBox";
import LandCard from "../components/homepage/LandCards";
import { AuthContext } from "../context/AuthContext";
import { SearchIcon, SearchInput, SearchWrapper } from "../components/Header";


function truncateString(str, maxLength) {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

const server = process.env.REACT_APP_SERVER;

const HomePage = () => {
  const { userInfo, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // 로그인, 로그아웃
  const handleGoogleLogin = useGoogleLogin();
  const handleLogin = async () => {
    try {
      await handleGoogleLogin();
    } catch (error) {
      console.log("로그인 처리 중 홈 와서 오류", error);
    }
  };
  

  // 신청 공모전 팀 모임 현황 필터링
  const [applyPosts, setApplyPosts] = useState([
    {
      id: 0,
      title: "새로운 공모전을 신청해보세요",
      status: "approved",
    }
  ]);

  const getApplyPosts = async (userId) => {
    const applyPostsData = await axios.get(`${server}/post/applied/${userId}`);
    

    const newApplyPosts = filteredApplyPosts(applyPostsData.data, userId);
    
    setApplyPosts(newApplyPosts);
  }

  const filteredApplyPosts = (data, userToken) => {
    return data.map((post) => {
        return {
          id: post.postId+1,
          title: post.title,
          status: post.status,
        }
      

    }).filter((item) => item != null);
  }


  const words = ['iscuss','etermine', 'evelop'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [words.length]);

  // 검색 로직
  const [last, setLast] = useState([
    {
      "category": "",
      "title": "",
      "postId": 0,
    }
  ]);

  const getLatestPosts = async () => {
    const allPosts = await axios.get(`${server}/post`);
    setLast(allPosts.data?.slice(-7));
  }


  const [landCardData, setLandCardData] = useState([
    {
      "landId": 0,
      "landName": "랜드이름",
      "role": "owner",
      "countMember": 1,
    }
  ]);
  const getLandCardData = async (userId) => {
    const allLandCard = await axios.get(`${server}/user/${userId}/lands`);
    setLandCardData(allLandCard.data?.slice(-4));
  }


  // const filteredlandCardData = landCardData.length < 4 ? [
  //   ...landCardData, ...new Array(4 - landCardData.length).fill(null)
  // ] : landCardData;


  const handleSubmit = () => {
    // 예: 검색 페이지 혹은 /recruiting으로 이동하면서 쿼리 파라미터로 searchword 넘기기
    navigate(`/recruiting?searchword=${searchWord}`);
  };

  const goToDetailPage = (postId) => {
    navigate(`/detail/${postId}`)
  };

  const [searchWord, setSearchWord] = useState("");
  

  useEffect(() => {
    if(userInfo.isLoggedIn) {
      getApplyPosts(userInfo.token);
      getLandCardData(userInfo.token);
    }

  }, [userInfo.isLoggedIn]); 

  useEffect(() => {
    getLatestPosts();
  }, []);

  return (
    <Container>
      {/* 헤더 */}
      <Header>
        <Logo src={whitelogo} alt="Wecand Logo" onClick={() => navigate('/home')}/>
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
            onSubmit={() => handleSubmit()}
            style={{"color": "white"}}
          />
          <SearchIcon 
            onClick={() => handleSubmit()} 
            style={{
              "position": "absolute",
              "zIndex": 1,

            }}
          />
        </SearchWrapper>
          <LoginWrapper>
          {!(userInfo.isLoggedIn) ? ( // 로그인 안한 경우
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          ) : (
            <>
              <UserNameP>{userInfo.userName}님</UserNameP>
              <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
            </>
          )} 
          <UserProfile src={userProfile} alt="userIcon" onClick={() => navigate('/mypage')}/>
        </LoginWrapper>
      </Header>

      {/* 메인 배너 */}
      <MainBanner>
        <SVGImage src={bgsvg} alt="Main Banner" />
        <MainText>
          <RotatingTextContainer>
            {/* <StaticText>D</StaticText> 이스터에그 */}
            <HighlightBox>
              <RotatingText>{words[currentWordIndex]}</RotatingText>
            </HighlightBox>
          </RotatingTextContainer>
        </MainText>
      </MainBanner>
      <HighlightBox><RotatingText>{words[currentWordIndex]}</RotatingText></HighlightBox>

      {/* 콘텐츠 섹션 */}
      <ContentSection>
        <Description>환상의 팀워크는 서로를 아는 데서 시작됩니다!</Description>
        <Description>
          팀원들의
           <PurpleText> 기본정보, 작업 스타일,  경력/경험을 한눈에 파악 후 최적의 팀  
          </PurpleText>
           을 찾아보세요.
        </Description>

        <CTAButtonWrapper>
          <CTAButton href="/recruiting">공모전을 찾아보세요</CTAButton>
          <CTAButton href="/maketeam">팀 모집을 위한 글 작성하기</CTAButton>
        </CTAButtonWrapper>

        
        <RowContainer>
            <RowContainerTitle>
              신청한 공모전 팀 모임 현황
            </RowContainerTitle>
            <RowContainerSubTitle>
              최근 신청 한 팀의 대기 중,수락 위주로 보여요
            </RowContainerSubTitle>
          <MoreText onClick={() => navigate('/mypage')}>수락 현황 더보기</MoreText>
        </RowContainer>

        <TeamAllowStateBoxWrapper>
          {applyPosts.map((post) => (
            <TeamAllowStateBox
              key={post.id}
              id={post.id}
              title={post.title}
              status={post.status}
            />
          ))}
        </TeamAllowStateBoxWrapper>


        <RowContainer>
          <RowContainerTitle>최근 사용한 내 아일랜드</RowContainerTitle>
          <MoreText onClick={() => navigate('/mypage')}>내 아일랜드 더보기</MoreText>
        </RowContainer>

        <RowContainer  style={{
          display:"flex",
          width: "100%",
          justifyContent: "flex-start",
          gap: '16px',
        }}>
          {landCardData.map((cardData, index) => {

             // 원하는 길이(예: 20자)만큼만 잘라내기
             const truncatedTitle = truncateString(cardData.landName, 15);
             return(

             
            <LandCard
              key={index}
              id={cardData ? cardData.landId : 0}
              title={cardData ? truncatedTitle : ''}
              role={cardData ? cardData.role : ''}
              mem={cardData ? cardData.countMember : 0}
              imageKey = {index+1}
            />
          );
})}
        </RowContainer>


      <RowContainer style={{marginTop: "100px"}}>
        <RowContainerTitle>새로운 공모전 모집 글</RowContainerTitle>
        <MoreText onClick={() => {
          navigate('/recruiting');
        }}>모집 글 더보기</MoreText>
      </RowContainer>
      
      <BoxWrapper>

      <LeftSection>
          <GridLeft>
            
          {last.map((post) => (
            <TagContainer>
            <Category>
              {post.category}
            </Category>
            <Title onClick={() => goToDetailPage(post.postId)}>
              {post.title}
            </Title>
          </TagContainer>
          ))}

          </GridLeft>
      </LeftSection>

      <RightSection>
        <ImageContainer src={landsec}/>
    
      </RightSection>
    </BoxWrapper>

      </ContentSection>
    </Container>
  );
};

export default HomePage;


const HighlightBox = styled.div`
  position: absolute;
  display: inline-flex;
  z-index: 1000;
  background: #eaf557;
  border-radius: 16px;
  padding: 0 20px;
  height: 60px;
  top: 452px;
  right: 247px;
`;

const RotatingTextContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RotatingText = styled.span`
  font-family: Roboto;
  font-size: 60px;
  font-weight: 800;
  color: #6c54f7;
  position: absolute;
  transform: translateX(-50%);
  white-space: nowrap;
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  margin-bottom: 325px;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: absolute;
  top: 0;
  width: 100%;
  z-index: 7;

  padding: 16px 32px;
  background: transparent;
  color: white;
  padding: 30px 116px;
`;

const Logo = styled.img`
  width: 119px;
  height: 30.311px;
  margin-right: auto;
`;

const LoginButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: white;
  font-weight: 600;
`;

const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 15px;
`;

const UserNameP = styled.p`
  font-size: 18px;
`;

const UserProfile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const MainBanner = styled.div`
  width: 100%;
  height: 1005px;
  background-color: #e0e7ff;
  overflow: hidden;
`;

const SVGImage = styled.img`
  width: 100%;
`;

const MainText = styled.div`
  position: relative;
  z-index: 3;
  text-align: right;
  padding-right: 120px;
`;

const CTAButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
  margin-top: 30px;
  margin-bottom: 200px;
  cursor: pointer;
`;

const CTAButton = styled.a`
  display: flex;
  width: 219px;
  height: 54px;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
  font-size: 19px;
  font-weight: 700;
  background: white;
  color: #6c54f7;
  text-decoration: none;
  letter-spacing: -0.4px;
  border: 1px solid #6C54F7;
  text-align: center;
  border-radius: 8px;
  font-weight: 600;
  
`;

const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: baseline;

  width: 1480px;
`;

const RowContainerTitle = styled.h3`
  font-size: 28px;
`;

const RowContainerSubTitle = styled.p`
  margin-left: 15px;
  font-size: 17px;
  color: #787878;
  font-weight: 500;
`;

const MoreText = styled.div`
  margin-left: auto;
  font-size: 18px;
  cursor: pointer;
`;


const ContentSection = styled.section`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1480px;
  
  letter-spacing: -0.56px;
  margin-top: 140px;
  position: relative;
`;


const Description = styled.p`
  font-size: 28px;
  font-weight: 600;
  color: #555;
  margin: 5px;
`;


const TeamAllowStateBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row; /* 가로로 배열 */
  justify-content: flex-start;
  overflow-x: auto; /* 가로 스크롤 가능 */
  gap: 16px;
  margin-bottom: 80px;

  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;


const BoxWrapper = styled.div`
  width: 1480px;
  height: 417px;
  display: flex;
  border: 1px solid #ddd;
  background:#F0F3FA;
  border-radius: 16px;
`;

const LeftSection = styled.div`
  /* width: 627px; */
  width: 700px;
  height: 100%;
  padding: 29px 30px;
  background-color: #f0f3fa;
  border-radius: 16px;
`;

const GridLeft = styled.div`
  display: flex;
  flex-direction: column;

`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%; /* 부모 요소의 너비를 채움 */
  height: 44px;
  border-radius: 8px;
  margin-bottom: 8px; /* 항목 간의 간격 추가 */
  flex-shrink: 0; /* 컨테이너 크기가 작아도 내부 요소 줄어들지 않음 */
`;

const Category = styled.div`
  color: #6c54f7; /* 텍스트 색상 */
  font-weight: 600;
  font-size: 22px;
  padding: 0 10px;
  width: 150px; /* 고정된 너비로 설정 */
  flex-shrink: 0; /* 크기가 줄어들지 않음 */
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: hidden; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 말줄임 표시 */
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 400;
  color: #000000; /* 텍스트 색상 */
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  flex-grow: 1; /* 나머지 공간을 차지 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  overflow: visible; /* 넘치는 텍스트 숨김 */
  text-overflow: ellipsis; /* 말줄임 표시 */
  max-width: calc(100% - 160px); /* Category 너비를 제외한 영역만 사용 */
  /* max-width: 500px; 최대 너비를 지정하여 레이아웃을 고정 */
`;



const RightSection = styled.div`
  width: 861px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background:#F0F3FA;
  border-radius: 16px;
`;

const ImageContainer = styled.img`
  width: 100%;  /* 이미지 크기를 조정할 수 있는 공간 */
  height: 100%;
  background-color: #F0F3FA;
  object-fit: cover;
  border-radius: 0 16px 16px 0;
`;







