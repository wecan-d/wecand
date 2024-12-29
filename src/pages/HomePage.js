
import React from 'react';
import styled from 'styled-components';
import bgsvg from "../assets/LandPage/background.svg";
import mon from "../assets/LandPage/human.svg";

const HomePage = () => {
  return (
    <Container>


      {/* 헤더 */}
      <Header>
        <Logo>Wecand:</Logo>
        <LoginButton>로그인</LoginButton>
      </Header>

      {/* 배경 색상 */}
      {/* 메인 배너 */}
      <MainBanner>
      <Background />
        <SVGImage src={bgsvg} alt="Main Banner" />
        <MonImage src={mon} alt="Foreground Layer" />
        <MainText>
          <Title>
            We can 
          </Title><br/>

          <Title2>D <Highlight>
          <TextDiscuss>iscuss
          </TextDiscuss></Highlight></Title2>
          <Subtitle>화합이 시작되는 공간</Subtitle>
          <CTAButton href="/create">내 아일랜드 생성하기 '{'>'}'</CTAButton>
        </MainText>
      </MainBanner>

      {/* 콘텐츠 섹션 */}
      <ContentSection>
        <ContentTitle>환상의 팀워크는 서로를 아는 데서 시작됩니다!</ContentTitle>
        <ContentDescription>
          팀원들의 역할, 작업 스타일, 커뮤니케이션 방식을 한눈에 파악 후 최적의 팀을 찾아보세요.
        </ContentDescription>
        <SearchBar type="text" placeholder="찾고자 하는 공모전을 입력해 주세요" />
      </ContentSection>

      {/* 공모전 및 아일랜드 섹션 */}
      <CompetitionSection>
        <SectionTitle>신청 공모전 팀 모임 현황</SectionTitle>
        <CardContainer>
          <Card>카드 1</Card>
          <Card>카드 2</Card>
          <Card>카드 3</Card>
          <Card>카드 4</Card>
        </CardContainer>
      </CompetitionSection>
    </Container>
  );
};

export default HomePage;

// Styled Components
const Container = styled.div`
  width: 100%;
  position: relative; /* 위치 기준 설정 */
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  
  height: 1005px;
  background: #6C54F7; /* 고정된 배경 색상 */
  z-index: 1; /* 배경이 가장 뒤에 위치 */
`;


const Header = styled.header`
  position: absolute;
  top: 0;
  width: inherit;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: #6C54F7;
  color: white;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const LoginButton = styled.div`
  font-size: 1rem;
  cursor: pointer;
`;

const MainBanner = styled.section`
  position: relative;
  width: 100%;
  height: 1005px;
  background-color: #e0e7ff;
  overflow: hidden;
`;

const SVGImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* object-fit: cover; */
  transform: translate(-35%, 10%) scale(1.6); /* 이미지 확대 */
  z-index: 5;
`;
const MonImage = styled.img`
  position: absolute;
  top: 300px; /* bgsvg 위에서의 위치 */
  left: 880px; /* bgsvg 위에서의 위치 */
  width: 112px; /* 크기 */
  height: 271px;
  z-index: 6; /* bgsvg(5)보다 높은 레이어에 위치 */
`;

const MainText = styled.div`
  position: relative;
  z-index: 6;
  text-align: right;
  padding-right: 120px;
  /* transform: translateX(50px); */
`;

const Title = styled.h1`
  color: #FFF;
font-family: Roboto;
font-size: 85px;
font-style: normal;
font-weight: 700;
transform: translate(-350px,215px);

`;
const Title2 = styled.h1`

  color: #FFF;
font-family: Roboto;
font-size: 85px;
font-style: normal;
font-weight: 700;
transform: translate(-106px,35px);


`;

const Highlight = styled.span`
  display: inline-block; 
  background: #EAF557;
  border-radius: 16px;
  padding: 0 15px; /* 텍스트와 배경 사이 간격 */
  color: #6C54F7;
  font-family: Roboto;
  font-size: 60px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 줄 간격 설정 */
  vertical-align: middle; /* 텍스트 중앙 정렬 */
  gap: 10px;
  width: 235px;
  height: 70px;
`;


const Subtitle = styled.p`
color: #FFF;
text-align: right;
font-family: Pretendard;
font-size: 40px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 56px */
padding-right: 120px;
transform: translate(20px,-30px);
`;

const CTAButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  color: #FFF;
text-align: right;
font-family: Pretendard;
font-size: 20px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 28px */
letter-spacing: -0.4px;
  color: white;
  text-decoration: none;
  border-radius: 4px;
`;

const ContentSection = styled.section`
  padding: 40px 20px;
  text-align: center;
`;

const ContentTitle = styled.h2`
  font-size: 2rem;
  color: #333;
`;

const ContentDescription = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

const SearchBar = styled.input`
  margin-top: 20px;
  padding: 10px;
  width: 60%;
  font-size: 1rem;
`;

const CompetitionSection = styled.section`
  padding: 40px 20px;
`;

const SectionTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  text-align: center;
`;

const TextDiscuss = styled.span`
  font-family: Roboto;
  font-size: 60px;
  font-weight: 700;
  color: #6C54F7;
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

























// <ResultsContainer>
//       {filteredUsers.length > 0 ? (
//         filteredUsers.map((user) => (
//           <ResultCard key={user.id}>
//             <Tag>{user.category}</Tag>
//             <PostTitle>{user.title}</PostTitle>
//           </ResultCard>
//         ))
//       ) : (
//         <NoResults>검색 결과가 없습니다.</NoResults>
//       )}
//     </ResultsContainer>



//             {/* 홈 배경 이미지 */}
//             <LandContainer>
//                 <Overlay>
//                     <LandButton>내 공모전 랜드 들어가기</LandButton>
//                 </Overlay>
//             </LandContainer>

//             {/* 카테고리 , 모집 신청 현황 */}
//             <CategoryAndStatus>
//                 <CategoryContainer>
//                     <CategoryWrapper>
//                         {
//                             categories.map((category) => (
//                                 <CategoryCard key={category.id}>
//                                     <CardContent onClick={() => categoryHandler(category.id)}></CardContent>
//                                     <CategoryText>{category.name}</CategoryText>
//                                 </CategoryCard>
//                             ))
//                         }
//                     </CategoryWrapper>
//                 </CategoryContainer>

//                 <StatusWrapper>
//                     <StatusHeader>
//                         <StatusTitle>모집 신청 현황</StatusTitle>
//                         <MoreButton>더보기</MoreButton>
//                     </StatusHeader>
//                     <StatusContent>
//                         <StatusList>
//                             {
//                                 Array
//                                     .from({length: 6})
//                                     .map((_, index) => (
//                                         <StatusItem key={index}>
//                                             아이아이아아
//                                             <StatusButton>{
//                                                     index === 5
//                                                         ? "거절"
//                                                         : "수락"
//                                                 }</StatusButton>
//                                         </StatusItem>
//                                     ))
//                             }
//                         </StatusList>
//                     </StatusContent>
//                 </StatusWrapper>
//             </CategoryAndStatus>

//             {/* 새로 올라온 공모전 모집 글 */}
//             <NewPostsSection>
//                 <SectionTitle>새로 올라온 공모전 모집 글</SectionTitle>
//                 <PostsWrapper>
//                     {
//                         visibleUsers.map((users) => (
//                             <PostCard key={users.postId} onClick={newFeedHandler}>
//                                 <Tag>{users.category}</Tag>
//                                 <PostTitle>{users.title}
//                                     날짜{users.date}</PostTitle>
//                             </PostCard>
//                         ))
//                     }
//                 </PostsWrapper>
//             </NewPostsSection>
//         </PageContainer>
//     );
// };

// export default HomePage;

// // Styled Components

// const PageContainer = styled.div `
//   padding: 4rem;
// `;

// const LandContainer = styled.div `
//   position: relative;
//   width: 100%;
//   height: 300px;
//   background-image: url("/assets/land.png");
//   background-size: cover;
//   background-position: center;
// `;

// const Overlay = styled.div `
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const LandButton = styled.button `
//   padding: 10px 20px;
//   background-color: white;
//   border: none;
//   cursor: pointer;
//   font-weight: bold;

//   &:hover {
//     background-color: #eee;
//   }
// `;

// const CategoryAndStatus = styled.div `
//   display: flex;
//   gap: 2rem;
//   margin: 2rem 6rem;
// `;

// const CategoryContainer = styled.div `
//   flex: 7;
//   display: flex;
//   flex-direction: column;
//   background: #EEE;
//   justify-content: center;
// `;

// const CategoryWrapper = styled.div `
//   display: grid;
//   grid-template-columns: repeat(5, minmax(120px, 1fr));
//   gap: 2rem;
// `;

// const CategoryCard = styled.div `
//   display: flex;
//   flex-direction: column;
//   align-items: center;
  
// `;
// const CardContent = styled.div `
//   width: 120px;
//   height: 120px;
//   background-color: #BFBFBF;
//   border-radius: 8px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   overflow: hidden;
//   cursor: pointer;
//   border: none;
  

//   &:hover {
//     border: 1px solid black;
//   }
// `;

// const CategoryText = styled.div `
//   font-size: 0.9rem;
//   color: #333;
// `;

// const StatusWrapper = styled.div `
//   flex: 3;
//   background: #7b7b7b;
// `;

// const StatusHeader = styled.div `
//   height: 12%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   background: #555555;
//   color: white;
//   padding: 0.5rem 1rem;
// `;

// const StatusTitle = styled.h3 `
//   margin: 0;
// `;

// const MoreButton = styled.button `
//   background: #888;
//   color: white;
//   border: none;
//   padding: 0.3rem 0.8rem;
//   cursor: pointer;

//   &:hover {
//     background: #666;
//   }
// `;

// const StatusContent = styled.div `
//   background: #d9d9d9;
//   padding: 1rem;
// `;

// const StatusList = styled.div `
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// const StatusItem = styled.div `
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   padding: 10px;
//   background: #d9d9d9;
// `;

// const StatusButton = styled.button `
//   background: white;
//   color: black;
//   border: none;
//   padding: 0.5rem 1rem;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const NewPostsSection = styled.section `
//   margin: 4rem 6rem;
// `;

// const SectionTitle = styled.h2 `
//   margin-bottom: 1rem;
// `;

// const PostsWrapper = styled.div `
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 1rem;
//   background: #EEE;
  
// `;

// const PostCard = styled.div `
//   background-color: white;
//   padding: 1rem;
// `;

// const Tag = styled.div `
//   background: #c4c4c4;
//   color: black;
//   font-size: 0.8rem;
//   padding: 0.2rem 0.5rem;
//   margin-bottom: 0.5rem;
//   width: 4rem;
// `;

// const PostTitle = styled.h3 `
//   font-size: 1rem;
//   color: #333;
// `;














// const ResultsContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   gap: 1rem;
//   margin-top: 1rem;
// `;

// const ResultCard = styled.div`
//   background: #fff;
//   padding: 1rem;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
// `;

// const NoResults = styled.div`
//   text-align: center;
//   color: #999;
// `;