import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import { SearchContext } from '../context/SearchContext';
import bgsvg from "../assets/homepage/homeLand.svg";
import whitelogo from "../assets/homepage/whitelogo.svg"; 
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  // 단어 로테이션 로직 및 기존 코드 유지

  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handlePostSubmit = async () => {
    try {
      const response = await axios.post("http://172.30.1.79:8080/post", {
        title: newTitle,
        category: newCategory,
      });
      console.log("Post success:", response.data);

      // 새 데이터 추가 후 목록 갱신
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setFilteredUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (err) {
      console.error("Error posting data:", err);
    }
  };









  //단어 로테이션 로직
  const words = ['etermine','ream', 'iscover', 'evelop', 'iscuss', 'esign']; 
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000); 
    return () => clearInterval(interval);
  }, [words.length]);

  // 검색 로직
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); // 필터링된 데이터
  const { searchTerm, setSearchTerm } = useContext(SearchContext); // 전역 검색 상태 가져오기

  const [, setSearchParams] = useSearchParams(); 

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    setSearchParams({ search: newSearchTerm }); // URL 파라미터 업데이트
};

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            // const response = await axios.get(
            //     "https://676e83a3df5d7dac1ccae100.mockapi.io/post"
            // );
            const response = await axios.get("http://172.30.1.79:8080/post");
            console.log(response.data);
            setUsers(response.data);
            setFilteredUsers(response.data); // 초기 데이터 설정
        } catch (err) {
            console.error(err);
        }
    };
    fetchUsers();
}, []);

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





  return (

    
    <Container>
     
       <GlobalStyle />
      {/* 헤더 */}
      <Header>
        <Logo src={whitelogo} alt="Wecand Logo"/>
        <LoginButton>로그인</LoginButton>
      </Header>

      {/* 메인 배너 */}
      <MainBanner>
        <SVGImage src={bgsvg} alt="Main Banner" />
        <MainText>
          <RotatingTextContainer>
            <StaticText>D</StaticText>
            <HighlightBox>
              <RotatingText>{words[currentWordIndex]}</RotatingText>
            </HighlightBox>
          </RotatingTextContainer>
          <CTAButton href="/create">내 아일랜드 생성하기 {'>'}</CTAButton>
        </MainText>
      </MainBanner>
      <HighlightBox><RotatingText>{words[currentWordIndex]}</RotatingText></HighlightBox>

      {/* 콘텐츠 섹션 */}
      <ContentSection>
        <SectionTitle>환상의 팀워크는 서로를 아는 데서 시작됩니다!</SectionTitle>
        <Description>
          팀원들의 역할, 작업 스타일, 커뮤니케이션 방식을 한눈에 파악 후 최적의 팀을 찾아보세요.
          
        </Description>
        <SearchBar 
        type="text" 
        placeholder="찾고자 하는 공모전을 입력해 주세요" 
        onChange={handleSearchChange}/>


      {searchTerm && (
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
        <></>
      )}
    </ResultContainer>
  )}
</ContentSection>

      {/* 공모전 및 아일랜드 섹션 */}
      <CompetitionSection>
        <SectionTitle>신청 공모전 팀 모임 현황</SectionTitle>
        <CardContainer>
          <Card>카드 1</Card>
          <Card>카드 2</Card>
          <Card>카드 3</Card>
          <Card>카드 4</Card>
           {/* 데이터 입력 폼 */}
      <FormContainer>
        <Input
          type="text"
          placeholder="Enter title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Enter category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <SubmitButton onClick={handlePostSubmit}>Submit</SubmitButton>
      </FormContainer>
        </CardContainer>
      </CompetitionSection>
    </Container>
  );
};

export default HomePage;

const ResultBox = styled.div`

  display: flex;
  justify-content:flex-start;

`;

const ResultContainer = styled.div`
  border: 1px solid #DBDBDB;
  overflow: hidden; 
  padding: 10px;
`;

// 전역 스타일
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: Pretendard, sans-serif;
    line-height: 1.4;
    overflow-x: hidden; /* 좌우 스크롤 방지 */
  }
`;

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
  /* display: flex;
  align-items: center;
  justify-content: center; */
  top: 370px;
  right: 245px;
   
  
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

// 공통 스타일 변수
const flexCenter = `
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled Components
const Container = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const Header = styled.header`
  ${flexCenter};
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 7;
  justify-content: space-between;
  padding: 16px 32px;
  background: transparent;
  color: white;
  padding: 30px 116px;
`;

const Logo = styled.img`
  width: 119px;
  height: 30.311px;
`;

const LoginButton = styled.div`
  color: #FFF;
  text-align: right;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 22.4px */
  letter-spacing: -0.32px;
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
  object-fit: cover;
  z-index: 6;
`;

const MainText = styled.div`
  position: relative;
  z-index: 3;
  text-align: right;
  padding-right: 120px;
`;

const CTAButton = styled.a`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 20px;
  font-weight: 500;
  color: white;
  background: #6c54f7;
  text-decoration: none;
  border-radius: 4px;
  letter-spacing: -0.4px;
  position: absolute;
  top: 550px;
  right: 110px;
`;

const ContentSection = styled.section`
   display: flex;
  flex-direction: column;
  align-items: center; /* 수평 가운데 정렬 */
  justify-content: center; /* 수직 가운데 정렬 */
  padding: 40px 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
color: #111;
text-align: center;
font-family: Pretendard;
font-size: 28px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 39.2px */
letter-spacing: -0.56px;
`;

const Description = styled.p`
  font-size: 28px;
  font-weight: 600;
  color: #555;
`;

const SearchBar = styled.input`
  margin-top: 20px;
  padding: 10px;
  width: 559px;
  height: 54px;
  padding: 15px 22px;
  border-radius: 16px;
  background: #F0F3FA;
  font-size: 1rem;
  border: none;
`;

const ResultCard = styled.div`
  width: 537px;

  background: #fff;
  
  border-radius: 8px;
  padding: 10px;
  position: relative;
  
`;

const PostTitle = styled.h3 `
  font-size: 18;
  color: #111;
  font-weight:500;
`;



const CompetitionSection = styled.section`
  padding: 40px 20px;
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

//임시 post용
// 스타일 컴포넌트
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px auto;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #6c54f7;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #5543c5;
  }
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