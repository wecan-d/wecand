import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import file from "../assets/mypage/File.svg";
import link from "../assets/mypage/Link.svg";

export default function DetailPage() {

    // 클백 연결 관련 상태관리 역량카드
    const [extraData, setExtraData] = useState([]);
    const [error, setError] = useState(null);


    // user/{userId}/lands
    // const [data2, setData] = useState([]);


    // 드롭 다운 관련 상태관리
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    
    // 토글 핸들러
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
};


// user/{userId}/lands 데이터 받아오는거

// useEffect(() => {
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://172.30.1.28:8080/user/3/lands");
//       setData(response.data);
//       setLoading(false);
//     } catch (err) {
//       setError(err);
//       setLoading(false);
//     }
//   };

//   fetchData();
// }, []);



    // 역량 카드 관련 서버 연결
    useEffect(() => {
        const fetchExtraData = async () => {
            try {
                const response = await axios.get(
                    `https://672819eb270bd0b975546065.mockapi.io/api/v1/register?page=1&limit=25`
                );
                setExtraData(Array.isArray(response.data) ? response.data : []);
                console.log(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err);
            }
        };
        fetchExtraData();
    }, []);



    if (error) return <div>에러가 발생했습니다: {error.message}</div>;


    // 현재 참여중인 공모전 목업 데이터
    const data = [
      { title: "나는야 파드 공모전", author: "박경민", members: 2 },
      { title: "나는야 파드 공모전", author: "박경민", members: 2 },
      { title: "나는야 파드 공모전", author: "박경민", members: 2 },
      { title: "나는야 파드 공모전", author: "박경민", members: 2 },
      { title: "나는야 파드 공모전", author: "박경민", members: 2 },
      { title: "나는야 파드 공모전", author: "박경민", members: 2 },
      { title: "나는야 파드 공모전", author: "박경민", members: 2 },
      { title: "나는야 파드 공모전", author: "박경민", members: 2 },
      { title: "나는야 파드 공모전", author: "박경민", members: 2 },
      { title: "나는야 파드 공모전", author: "박경민", members: 2 },
    ];

    // 좌측과 우측으로 나누기
    const leftColumn = data.slice(0, 5);
    const rightColumn = data.slice(5);

    return (
      <>
      <CardContainer>
        <ImageWrapper>
          <ProfileImage src="your-image-url-here" alt="Profile" style={({width:'100px',height:'100px'})}/>
          <AgeBadge>24</AgeBadge>
        </ImageWrapper>
        <TextWrapper2>
          <Name>김규리</Name>
          <Details>계명대학교 시각디자인학과 3학년</Details>
          <Email>Jjanggu1083@naver.com</Email>
        </TextWrapper2>
    </CardContainer>





      <PageContainer>

      
        <PageWrapper>
            {/* extraData[userId] */}
            <GridWrapper>

                                      {/* 그리드 좌측 */}
            <LeftGrid> 
                <CardGrid>
                    <Card style={{ gridArea: "communication" }}>
                        <CardTitle>소통</CardTitle>
                        <CardContent>
                            {Array.isArray(extraData[18]?.communication)
                                ? extraData[18].communication.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "work" }}>
                        <CardTitle>작업</CardTitle>
                        <CardContent>
                            {Array.isArray(extraData[18]?.teamwork)
                                ? extraData[18].teamwork.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "thinking" }}>
                        <CardTitle>사고</CardTitle>
                        <CardContent>
                            {Array.isArray(extraData[18]?.thinking)
                                ? extraData[18].thinking.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "role" }}>
                        <CardTitle>역할</CardTitle>
                        <CardContent>
                            {Array.isArray(extraData[18]?.role)
                                ? extraData[18].role.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "conflict" }}>
                        <CardTitle>갈등 해결</CardTitle>
                        <CardContent>
                            {Array.isArray(extraData[18]?.conflictResolution)
                                ? extraData[18].conflictResolution.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "time" }}>
                        <CardTitle>시간</CardTitle>
                        <CardContent>
                            {Array.isArray(extraData[18]?.timePreference)
                                ? extraData[18].timePreference.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "rest" }}>
                        <CardTitle>휴식</CardTitle>
                        <CardContent>
                            {Array.isArray(extraData[18]?.restPreference)
                                ? extraData[18].restPreference.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "friendship" }}>
                        <CardTitle>친목</CardTitle>
                        <CardContent>
                            {Array.isArray(extraData[18]?.goal)
                                ? extraData[18].goal.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "important" }}>
                        <CardTitle>중요하게 생각해요</CardTitle>
                        <CardContent>
                            {Array.isArray(extraData[18]?.important)
                                ? extraData[18].important.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                </CardGrid>
            </LeftGrid>

                                          {/* 그리드 우측 */}
            <RightGrid>

              <RightGridWrapper>
                                  {/* 드롭다운 */}
                <DropdownContainer>
                  <DropdownHeader onClick={toggleDropdown}>
                    <HeaderText>툴 / 자격증</HeaderText>
                      <Arrow isOpen={isOpen}>▼</Arrow>
                  </DropdownHeader>
            {isOpen && (
                  <DropdownContent>
                      <ContentItem>PDF 파일</ContentItem>
                      <ContentItem>웹 링크</ContentItem>
                      <ContentItem>기타 내용</ContentItem>
                  </DropdownContent>
            )}
                </DropdownContainer>

                <DropdownContainer>
                  <DropdownHeader onClick={toggleDropdown2}>
                    <HeaderText>경력</HeaderText>
                      <Arrow2 isOpen={isOpen2}>▼</Arrow2>
                  </DropdownHeader>
            {isOpen2 && (
                  <DropdownContent>
                      <ContentItem>PDF 파일</ContentItem>
                      <ContentItem>웹 링크</ContentItem>
                      <ContentItem>기타 내용</ContentItem>
                  </DropdownContent>
            )}
                </DropdownContainer>

                <HeaderText2>작업물</HeaderText2>

                                
                                
                                
                                
                                {/* 여기에 파일 추가시 이 박스를 생성하는 로직 짜야함 */}
                <BoxWrapper>
                  <ImagePlaceholder>
                    <ImageStyle src={file}/>
                  </ImagePlaceholder>
                  <TextWrapper>
                    <FileName>잼민이들.pdf</FileName>
                    <FileSize>1234KB</FileSize>
                  </TextWrapper>
                </BoxWrapper>



                <BoxWrapper>
                  <ImagePlaceholder>
                    <ImageStyle src={link}/>
                  </ImagePlaceholder>
                  <TextWrapper>
                    <FileName>www.figma.com</FileName>
                    
                  </TextWrapper>
                </BoxWrapper>


                        {/* 여기에 기타사항 추가 로직 짜야함 */}
                <HeaderText2>기타사항</HeaderText2>

              </RightGridWrapper>
            </RightGrid>
            </GridWrapper>
        </PageWrapper>
      </PageContainer>



      <MainContainer>
          <OuterGrid>
            <GridLeft>
              <div style={({fontSize: '32px', fontWeight: '600', marginBottom:'40px'})}>
                현재 참여중인 공모전
              </div>
            </GridLeft>
          </OuterGrid>
          <OuterGrid>
          </OuterGrid>
        </MainContainer>
       
                          {/* 현재 참여중인 공모전 */}
        <Container>
          <Column>
            {leftColumn.map((item, idx) => (
              <Card2 key={`left-${idx}`}>
                <CardInfo>
                  <ProjectTitle>{item.title}</ProjectTitle>
                  <TeamLeader>{item.author} <span style={({fontSize:'18px',fontWeight:'400'})}>팀장</span></TeamLeader>
                </CardInfo>
                <TeamMember>
                  <Avatar>👤👤👤👤</Avatar>
                  <MemberCount>+ 멤버 4명{item.member}</MemberCount>
                </TeamMember>
              </Card2>
            ))}
          </Column>
          <Column>
            {rightColumn.map((item, idx) => (
              <Card2 key={`right-${idx}`}>
                <CardInfo>
                  <ProjectTitle>{item.title}</ProjectTitle>
                  <TeamLeader>{item.author} 팀장</TeamLeader>
                </CardInfo>
                <TeamMember>
                <Avatar>👤👤👤</Avatar>
                  <MemberCount>+ 멤버 3명{item.member}</MemberCount>
                </TeamMember>
              </Card2>
            ))}
          </Column>
        </Container>



        <MainContainer>
          <OuterGrid>
            <GridLeft>
              <div style={({fontSize: '32px', fontWeight: '600', marginBottom:'40px'})}>
                내가 지원한 공모전
              </div>
              
            </GridLeft>
            <GridLeft>
            <div style={({fontSize: '32px', fontWeight: '600', marginBottom:'40px'})}>
                내가 작성한 글 / 랜드
              </div>
            </GridLeft>
          </OuterGrid>
          <OuterGrid>
          </OuterGrid>
        </MainContainer>

        {/* 젤 밑에 컴포넌트 */}
        <MainContainer>
      {/* 전체 그리드 */}
      <OuterGrid>
        {/* 좌측 그리드 */}
        <GridLeft>


          <GridSection>
            {/* 섹션 내 좌측 */}
            <SectionLeft><CardTitle>기획, 아이디어</CardTitle></SectionLeft>
            {/* 섹션 내 우측 */}
            <SectionRight>
                <Column>
                {leftColumn.map((item, idx) => (
                  <Card3 key={`left-${idx}`}>
                      <ProjectTitle>{item.title}</ProjectTitle>
                   대기중
                  </Card3>
                ))}
              </Column>
          </SectionRight>
          </GridSection>



          <GridSection>
            {/* 섹션 내 좌측 */}
            <SectionLeft><CardTitle>소통</CardTitle></SectionLeft>
            {/* 섹션 내 우측 */}
            <SectionRight>
                <Column>
                {leftColumn.map((item, idx) => (
                  <Card3 key={`left-${idx}`}>
                    <CardInfo>
                      <ProjectTitle>{item.title}</ProjectTitle>
                      
                    </CardInfo>
                    <TeamMember>
                      거절
                    </TeamMember>
                  </Card3>
                ))}
              </Column>
          </SectionRight>
          </GridSection>

          
        </GridLeft>
        {/* 우측 그리드 */}
        <GridRight>
        <GridSection>
            {/* 섹션 내 좌측 */}
            <SectionLeft><CardTitle>소통</CardTitle></SectionLeft>
            {/* 섹션 내 우측 */}
            <SectionRight>
                <Column>
                {leftColumn.map((item, idx) => (
                  <Card3 key={`left-${idx}`}>
                    <CardInfo>
                      <ProjectTitle>{item.title}</ProjectTitle>
                    </CardInfo>
                    <TeamMember>
                      진행중
                    </TeamMember>
                  </Card3>
                ))}
              </Column>
          </SectionRight>
          </GridSection>

          <GridSection>
            {/* 섹션 내 좌측 */}
            <SectionLeft><CardTitle>소통</CardTitle></SectionLeft>
            {/* 섹션 내 우측 */}
            <SectionRight>
                <Column>
                {leftColumn.map((item, idx) => (
                  <Card3 key={`left-${idx}`}>
                    <CardInfo>
                      <ProjectTitle>{item.title}</ProjectTitle>
                      
                    </CardInfo>
                    <TeamMember>
                      모집 완료
                    </TeamMember>
                  </Card3>
                ))}
              </Column>
          </SectionRight>
          </GridSection>
        </GridRight>
      </OuterGrid>
    </MainContainer>


        
        </>
    );
}

// 개인정보

const CardContainer = styled.div`
  width: 493px;
  height: 109px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  margin-left: 117px;
  margin-bottom: 42px;
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-right: 24px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const AgeBadge = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  background-color: #ff4d4d;
  color: #ffffff;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 12px;
`;

const TextWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 10px;
`;

const Details = styled.div`
  font-size: 18px;
  font-weight: 500;
  
  margin-bottom: 4px;
`;

const Email = styled.div`
  font-size: 18px;
  font-weight: 400;
`;

// 역량카드

const PageContainer = styled.div`
  width: 1726px;
  height: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 120px;
`;

const PageWrapper = styled.div`
    width: 1568px;
    padding: 30px;
    margin-left: 76px;
    background: #836EFF;
    border-radius: 16px;
    
`;

const GridWrapper = styled.div`
  display : flex;
  width: 100%;
`;
const LeftGrid = styled.div`
  width: 900px;
  background: #836EFF;
  align-items: center;
`;

const RightGrid = styled.div`
  width: 494px;
  align-items: center;
  margin-left: 15px;
  padding: 7px 150px 0px 30px;
`;

const RightGridWrapper = styled.div`
   
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(200px, 4fr);
    gap: 1rem;
    grid-template-areas:
        "communication work thinking role"
        "communication work thinking role"
        "conflict time rest friendship"
        "conflict time important important";
`;

const Card = styled.div`
    background: white;
    border-radius: 8px;
    padding: 16px;
`;

const CardTitle = styled.div`
    background: #6c54f7;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 0.5rem;
    height: 31px;
    font-weight: 500;
    white-space: nowrap;
`;

const CardContent = styled.div`
    font-size: 18px;
    font-weight: 400;
    color: #111111;
`;

//드롭다운 스타일

const DropdownContainer = styled.div`
    width: 465px;
    border-radius: 5px;
    margin-bottom: 18px;
    
`;

const DropdownHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    background: #836EFF;
    border-radius: 5px;
`;

const HeaderText = styled.div`
    display: inline-block;
     font-size: 18px;
    font-weight: 600;
    
`;

const HeaderText2 = styled.div`
    display: inline-block;
     font-size: 18px;
    font-weight: 600;
    color:white;
    
`;

const Arrow = styled.div`
   font-size: 18px;
    font-weight: 600;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease-in-out;
`;

const Arrow2 = styled.div`
    font-size: 18px;
    font-weight: 600;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease-in-out;
`;

const DropdownContent = styled.div`
    background-color: white;
    color: #111;
    padding: 10px 20px;
    border-radius: 5px;
`;

const ContentItem = styled.div`
    padding: 5px 0;
    font-size: 18px;
    font-weight: 400;
    &:hover {
        cursor: pointer;
    }
`;

// 파일, pdf 스타일
const BoxWrapper = styled.div`
display: flex;
align-items: center;
width: 470px;
height: 52px;
border-radius: 8px;
background-color: white;
padding: 0 12px;
margin-bottom: 18px;
margin-top: 20px;

`;

const ImagePlaceholder = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 20px;
height: 20px;
`;

const ImageStyle = styled.img`
  width: 18px;
  height: 18px;
`;

const TextWrapper = styled.div`
display: flex;
align-items: center;

flex: 1;
margin-left: 10px;

`;

const FileName = styled.div`
font-size: 18px;
font-weight: 400;
color: #111111;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;

const FileSize = styled.div`
font-size: 12px;
color: #767676;
margin-left: 10px;
`;


//현재 참여중인 공모전 스타일
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  
  
  margin: 0 114px;
  margin-bottom: 114px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const Card2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 23.5px 25px;
  background: #f0f3fa;
  border-radius: 8px;
`;

const Card3 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 25px;
  margin-bottom: 18px;
  font-size: 22px;
  font-weight: 400;
  border-radius: 8px;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: row;
  gap:24px;
`;

const ProjectTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #111;
`;

const TeamLeader = styled.div`
  font-size: 22px;
`;

const TeamMember = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Avatar = styled.div`
  font-size: 18px;
`;

const MemberCount = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #767676;
`;

//젤 아래 컴포넌트

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  margin: 0 119px;
  
`;

const OuterGrid = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 42px;
`;

const GridLeft = styled.div`
  flex: 1;
  
  display: flex;
  flex-direction: column;
  
`;

const GridRight = styled.div`
  flex: 1;
  
  display: flex;
  flex-direction: column;
  
`;

const GridSection = styled.div`
  display: flex;
  
  margin: 10px 0;
  margin-bottom: 42px;
  border-radius: 5px;
`;

const SectionLeft = styled.div`
  flex: 1;
  
  
  border-radius: 5px;
`;

const SectionRight = styled.div`
  flex: 5;
  
  
  border-radius: 5px;
`;









// import React, {useState, useEffect, useContext} from "react";
// import styled from "styled-components";
// import {useNavigate} from "react-router-dom";
// import axios from "axios";
// import { SearchContext } from '../context/SearchContext';

// const HomePage = () => {

//     // 임시 목업데이터 확인용 hook
//     const [ users, setUsers ] = useState([]);

//     const [ filteredUsers, setFilteredUsers ] = useState([]); // 필터링된 데이터
//     const { searchTerm } = useContext(SearchContext); // 전역 검색 상태 가져오기

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get(
//                     "https://676e83a3df5d7dac1ccae100.mockapi.io/post"
//                     // "http://172.17.217.97:8080/users"
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