import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled from "styled-components";
import bgsvg from "../assets/homepage/home2.svg";
import whitelogo from "../assets/homepage/whitelogo.svg";
import userProfile from "../assets/profile.png";
import landsec from "../assets/homepage/landsec.svg";
import { useNavigate, useSearchParams } from "react-router-dom";
// import landcard1 from "../assets/homepage/landcard1.svg";
// import landcard2 from "../assets/homepage/landcard2.svg";
// import landcard3 from "../assets/homepage/landcard3.svg";
// import landcard4 from "../assets/homepage/landcard4.svg";
import { useGoogleLogin } from "./Login";

import { PurpleText } from "../components/RegisterComponents";
import { TeamAllowStateBox } from "../components/homepage/TeamAllowStateBox";
import LandCard from "../components/homepage/LandCards";
import { AuthContext } from "../context/AuthContext";
import { SearchIcon, SearchInput, SearchWrapper } from "../components/Header";



// const server = process.env.REACT_APP_SERVER;

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
  
  console.log(userInfo);
  // 신청 공모전 팀 모임 현황 필터링
  const [applyPosts, setApplyPosts] = useState([
    {
      id: 0,
      title: "새로운 공모전을 신청해보세요",
      status: "approved",
    },
    {
      id: 1,
      title: "공모전을 신청",
      status: "pending",
    },
    {
      id: 2,
      title: "공모전을 신청하지마",
      status: "pending",
    },
    {
      id: 3,
      title: "공모전을 신청해",
      status: "pending",
    },
    {
      id: 4,
      title: "공모전을 신청ㄴㄴㄴ",
      status: "pending",
    },
    {
      id: 5,
      title: "공모전을 신청하던지",
      status: "pending",
    }
  ]);
  const filteredApplyPosts = (data, userToken) => {
    return data.map((post) => {
      const matchingApplicant = post.applicants.find(
        (applicant) => applicant.userId === userToken
      );

      if(matchingApplicant) {
        return {
          id: post.postId,
          title: post.title,
          status: matchingApplicant.status,
        }
      }

      return null;
    }).filter((item) => item != null);

  }

  /*
  useEffect(() => {
    // 주어진 데이터를 기반으로 userId에 해당하는 게시글 필터링
    const filteredApplyPosts2 = applied.filter(post =>post.applicants.some(applicant => applicant.userId === userId));

    setApplyPosts(filteredApplyPosts2);
  }, [userId]);

  const ApplyProjects = applyPosts.reduce((acc, apply) => {
    const { category } = apply;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(apply);
    return acc;
  }, {});

  */

  // 최신순 정렬 함수
  const sortByLatest = (posts) => {
    return posts.slice(0,7).sort((a, b) => new Date(b.createTime) - new Date(a.createTime));
  };

  const words = ['iscuss','etermine', 'evelop'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [words.length]);

  // 검색 로직
  // const [filteredUsers, setFilteredUsers] = useState([]); // 필터링된 데이터
  const [last, setLast] = useState([
    {
      "category": "농구",
      "title": "눙구할사람 구해요"
    }
  ]);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await axios.get("https://676e83a3df5d7dac1ccae100.mockapi.io/post");
  //       console.log(response.data);
  //       setUsers(response.data);

  //       setFilteredUsers(response.data); // 초기 데이터 설정

  //       const sortedPosts = sortByLatest(response.data);
  //       setLast(sortedPosts);
  //       console.log("Sorted Posts:", sortedPosts); 
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  /*
  useEffect(() => {
    if (searchTerm === "") {
      // setFilteredUsers(users); // 검색어가 없으면 전체 데이터 표시
    } else {
      const filtered = users.filter((user) =>
        user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);
  */

  const landCardData = [
    {
      "landId": 1,
      "landName": "랜드이름1",
      "role": "king",
      "countMember": 3
    },
    {
      "landId": 1,
      "landName": "롯데월드",
      "role": "string",
      "countMember": 5
    },
    {
      "landId": 5,
      "landName": "기나긴김치찌개",
      "role": "string",
      "countMember": 7
    },

  ];

  const filteredlandCardData = landCardData.length < 4 ? [...landCardData, ...new Array(4 - landCardData.length).fill(null)] : landCardData;


  const handleSubmit = () => {
    // 예: 검색 페이지 혹은 /recruiting으로 이동하면서 쿼리 파라미터로 searchword 넘기기
    navigate(`/recruiting?searchword=${searchWord}`);
  };

  const [searchWord, setSearchWord] = useState("");
  

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
          />
          <SearchIcon onClick={() => handleSubmit()} />
        </SearchWrapper>
          <LoginWrapper>
          {!(userInfo.isLoggedIn) ? ( // 로그인 안한 경우
            <LoginButton onClick={handleLogin}>로그인</LoginButton>
          ) : (
            <>
              <UserNameP>{userInfo.userName} 님</UserNameP>
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
            {/* <StaticText>D</StaticText> */}
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
              신청 공모전 팀 모임 현황
            </RowContainerTitle>
            <RowContainerSubTitle>
              최근 신청 한 팀의 대기 중,수락 위주로 보여요
            </RowContainerSubTitle>
          <MoreText>수락 현황 더보기</MoreText>
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
          <MoreText>내 아일랜드 더보기</MoreText>
        </RowContainer>

        <RowContainer  style={{
          display:"flex",
          width: "100%",
          justifyContent: "space-between",
        }}>
          {filteredlandCardData.map((cardData, index) => (
            <LandCard
              key={index+1}
              id={cardData ? cardData.landId : 0}
              title={cardData ? cardData.landName : ''}
              role={cardData ? cardData.role : ''}
              mem={cardData ? cardData.countMember : 0}
              imageKey = {index+1}
            />
          ))}
        </RowContainer>


{/*
        <CardsWrapper>
        <LandCards lands={landCardData} />
        <ItemCard>
          <ImageWrapper>
            <Img src={landcard1} alt="Card Image" />
          </ImageWrapper>
          <TextOverlay>
            <div style={({position:'absolute', whiteSpace:'nowrap',left:'260px',top:"20px",color:'white',fontSize:'18px',fontWeight:'500'})}>진행 중</div>
              <div>
                <Title2>나는야 파드 공모전</Title2>
                  
                  <UserName>박경민 팀장</UserName> 
                  
              </div>
          </TextOverlay>
        </ItemCard>

        <ItemCard>
          <ImageWrapper>
            <Img src={landcard2} alt="Card Image" />
          </ImageWrapper>
          <TextWrapper>
          <TextOverlay>
            <div style={({position:'absolute', whiteSpace:'nowrap',left:'260px',top:"20px",color:'white',fontSize:'18px',fontWeight:'500'})}>진행 중</div>
              <div>
                <Title2>나는야 파드 공모전</Title2>
                  
                  <UserName>박경민 팀장</UserName> 
                  
              </div>
          </TextOverlay>
          </TextWrapper>
        </ItemCard>

        <ItemCard>
          <ImageWrapper>
            <Img src={landcard3} alt="Card Image" />
          </ImageWrapper>
          <TextWrapper>
          <TextOverlay>
            <div style={({position:'absolute', whiteSpace:'nowrap',left:'260px',top:"20px",color:'white',fontSize:'18px',fontWeight:'500'})}>진행 중</div>
              <div>
                <Title2>나는야 파드 공모전</Title2>
                  
                  <UserName>박경민 팀장</UserName> 
                  
              </div>
          </TextOverlay>
          </TextWrapper>
        </ItemCard>
        
        <ItemCard>
          <ImageWrapper>
            <Img src={landcard4} alt="Card Image" />
          </ImageWrapper>
          <TextOverlay>
            <div style={({position:'absolute', whiteSpace:'nowrap',left:'260px',top:"20px",color:'white',fontSize:'18px',fontWeight:'500'})}>진행 중</div>
              <div>
                <Title2>나는야 파드 공모전</Title2>
                  
                  <UserName>박경민 팀장</UserName> 
                  
              </div>
          </TextOverlay>
          <TextWrapper>
            <CardTitle>카드 제목</CardTitle>
            <CardDescription>이곳에 카드 설명이 들어갑니다. 간단한 설명을 넣어주세요.</CardDescription>
          </TextWrapper>
        </ItemCard>
        
      </CardsWrapper>
      */}

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
            <Title>
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

        {/* 검색 결과 표시 */}
        {/* {searchTerm && (
          <ResultContainer>
            {filteredUsers.length > 0 ? (
              filteredUsers.slice(0, 6).map((user) => (
                <ResultCard key={user.id}>
                  <ResultBox>
                    <PostTitle>{user.title}</PostTitle>
                  </ResultBox>
                </ResultCard>
              ))
            ) : (
              <NoResults>검색 결과가 없습니다.</NoResults>
            )}
          </ResultContainer>
        )} */}
      </ContentSection>
    </Container>
  );
};

export default HomePage;

// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }
//   body {
//     font-family: Pretendard, sans-serif;
//     line-height: 1.4;
//     overflow-x: hidden; /* 좌우 스크롤 방지 */
//   }
// `;

const StaticText = styled.span`
  font-size: 85px;
  font-weight: 700;
  color: #6c54f7;
  margin-right: 10px;
`;

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

const flexCenter = `
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

const TeamAllowStateBoxRow = styled.div`
  width: 1480px;
  display: flex;
  margin: 0;
  justify-content: flex-start;
`

// const TeamAllowStateBox = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px 14px;
//   min-width: 300px;
//   height: 54px;
//   background-color: #F0F3FA;
//   margin: 0;
//   border-radius: 16px;


// `;

const TeamAllowStateBoxState = styled.div`
  width: 100px;
  height: 100%;

  background-color: white;
  margin-left: auto;

  display: flex;
  justify-content: space-between;
  align-items: center;
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

const SectionTitle = styled.h2`
color: #111;
text-align: center;
font-family: Pretendard;
font-size: 28px;
font-style: normal;
font-weight: 600;
line-height: 140%;
margin-top: 130px;
display: flex;
width: 100%;
margin-left: 260px;
margin-bottom: 30px;
`;

const Description = styled.p`
  font-size: 28px;
  font-weight: 600;
  color: #555;
  margin: 5px;
`;

const ResultContainer = styled.div`
  border: 1px solid #DBDBDB;
  overflow: hidden; 
  padding: 10px;
`;

const TeamAllowStateBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row; /* 가로로 배열 */
  justify-content: flex-start;
  overflow-x: auto; /* 가로 스크롤 가능 */
  gap: 16px;
  
  /* 스크롤바 숨기기 */
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  margin-bottom: 80px;
`;

const Item = styled.div`
  padding: 10px 20px;
  background: #f0f3fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 150px; /* 각 항목의 최소 너비 설정 */
  height: 50px;
  color: black;
  font-weight: 500;
  font-size: 18px;
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
  width: 627px;
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
  width: 457px;
  height: 50px;
  
  border-radius: 8px;
  
`;

const Category = styled.div`
  color: #6c54f7; /* 텍스트 색상 */
  font-weight: 600;
  font-size: 22px;
  padding: 0 10px;
  width: 123px;
  white-space: nowrap;
  margin-right: 22px;
`;



const Title = styled.div`
  font-size: 22px;
  font-weight: 400;
  color: #000000; /* 텍스트 색상 */
  white-space: nowrap;
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

const SectionTitle2 = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #111;
  margin-bottom: 20px;
`;


const TextOverlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 18px;
  font-weight: bold;
`;


const Title2 = styled.div`
  color: #FFF;
font-family: Pretendard;
font-size: 28px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 39.2px */
letter-spacing: -0.56px;
position: absolute;
white-space: nowrap;
top: 90px;
`;

const UserName = styled.span`
  color: #FFF;
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 400;
line-height: 140%; /* 30.8px */
letter-spacing: -0.44px;
position: absolute;
top: 130px;
left: 0;
white-space: nowrap;
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 16px;
  overflow-x: auto; /* 가로 스크롤 활성화 */
  padding-bottom: 10px;
  ::-webkit-scrollbar {
    display: none; /* 스크롤바 숨기기 */
  }
`;

const ItemCard = styled.div`
  width: 360px;
  height: 457px;
  background-color: #f0f3fa;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ddd; /* 이미지가 삽입될 부분 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  width: 100%;
  height: 30%;
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #777;
`;



// import React, {useState, useEffect, useContext} from "react";
// import styled from "styled-components";
// import {useNavigate} from "react-router-dom";
// import axios from "axios";
// import { SearchContext } from '../context/SearchContext';

// const HomePage = () => {

//     // 임시 목업데이터 확인용 hook
//     const [users, setUsers] = useState([]);

//     const [filteredUsers, setFilteredUsers] = useState([]); // 필터링된 데이터
//     const { searchTerm } = useContext(SearchContext); // 전역 검색 상태 가져오기

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get(
//                     "https://676e83a3df5d7dac1ccae100.mockapi.io/post"
//                 );
//                 setUsers(response.data);
//                 setFilteredUsers(response.data); // 초기 데이터 설정
//             } catch (err) {
//                 console.error(err);
//             }
//         };
//         fetchUsers();
//     }, []);
//     //

   
//   useEffect(() => {
//     if (searchTerm === "") {
//       setFilteredUsers(users); // 검색어가 없으면 전체 데이터 표시
//     } else {
//       const filtered = users.filter((user) =>
//         user.title.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       setFilteredUsers(filtered);
//     }
//   }, [searchTerm, users]);

//     // 한 화면에 6개만 표시
//     const visibleUsers = users.slice(0, 6);

//     const navigate = useNavigate();

//     const categoryHandler = (category) => {
//         navigate(`/recruiting/${category}?sort=latest`);
//     };

//     const newFeedHandler = (postId) => {
//         navigate(`/detail/${postId}`)
//     }

//     const categories = [
//         {
//             id: "art",
//             name: "미술"
//         }, {
//             id: "design",
//             name: "디자인"
//         }, {
//             id: "media",
//             name: "영상/미디어"
//         }, {
//             id: "programming",
//             name: "프로그래밍"
//         }, {
//             id: "business",
//             name: "창업/비즈니스"
//         }, {
//             id: "photography",
//             name: "사진"
//         }, {
//             id: "literature",
//             name: "문학/에세이"
//         }, {
//             id: "music",
//             name: "음악/공연"
//         }, {
//             id: "volunteering",
//             name: "사회공헌/봉사"
//         }, {
//             id: "idea",
//             name: "기획/아이디어"
//         }
//     ];

//     return (
//         <PageContainer>











