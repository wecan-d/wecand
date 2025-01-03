import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import file from "../assets/mypage/File.svg";
import link from "../assets/mypage/Link.svg";
import progress from "../assets/common/progress.svg"
import complete from "../assets/common/complete.svg"
import reject from "../assets/common/reject.svg"
import accept from "../assets/common/accept.svg"
import wait from "../assets/common/wait.svg"

//임시 데이터
import { owner, applied } from "./MyPageData"

export default function MyPage() {
    // 서버 url 관리 변수
    const server = process.env.REACT_APP_SERVER;

    // 유저 역량 카드 겟또 /card/{userId}
    const [card, setCard] = useState([{}]);

    //데이터 GET
    useEffect(() => {
      const fetchUsers = async () => {
          try {
              // 사용자 카드 데이터 가져와버렸어
                  const cardResponse = await axios.get(`${server}/card/2`);
                  const cardData = Array.isArray(cardResponse.data)
                ? cardResponse.data
                : [cardResponse.data];
                  setCard(cardData); // 항상 배열 안에 객체 형태로 설정
                  console.log(cardData);
          } catch (err) {
              setError(err);
          }
      };
      fetchUsers();
    }, [server]);

    // 테스트 용
    const userId = 2;
    
    const [userPosts, setUserPosts] = useState([]);

    const [applyPosts, setApplyPosts] = useState([]);


    useEffect(() => {
      const fetchPosts = async () => {
        try{
          const posts = await axios.get(
            `${server}/post/applied/2`
          )
          console.log(posts.data);
          
          // const filteredApplyPosts = posts.filter(post =>post.applicants.some(applicant => applicant.userId === userId));
          const filteredApplyPosts = posts.filter(post =>post.applicants.some(applicant => applicant.status === "APPEND"));
          
          setApplyPosts(filteredApplyPosts);
          console.log(filteredApplyPosts);

        }catch (err) {
          console.error('Error fetching data:', err);
          setError(err);
      }
    };
      fetchPosts();
    }, [userId, server]);

     // 주어진 데이터를 기반으로 userId에 해당하는 게시글 필터링
      // const filteredOwnPosts = owner[0].filter(post => post.ownerId === userId);
      // 주어진 데이터를 기반으로 userId에 해당하는 게시글 필터링
      // const filteredApplyPosts = applied.filter(post =>post.applicants.some(applicant => applicant.userId === userId));

      // setUserPosts(filteredOwnPosts);
    const mock = process.env.REACT_APP_POST_MOCK;
    
    
    
    // 전체 게시물 sorting 할려고 가져옴
    const [users, setUsers] = useState([]);
    // 내가 지원한 공모전 훅 /post/applied/{userId} -> 승인 상태 수락 ? 거절
    const [apply, setApply] = useState([]);
    // 내가 작성한 공모전 훅 /post/owner/{userId} -> 진행 중 ? 모집완료 //ApproveCount가 Member-1의 수와 일치할 때 모집완료
    const [create, setCreate] = useState([]);
    

    // 내가 참여중인 공모전 훅 /land/{landId}/members
    const [join , setJoin] = useState([]);

    // 클백 역량카드 상태관리
    const [extraData, setExtraData] = useState(Array(19).fill({}));
    // const [extraData, setExtraData] = useState([{ tools: [], certificates: [] }]);
    const [error, setError] = useState(null);
    




    // 드롭 다운 관련 상태관리
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    
    // 토글 핸들러
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
      setIsOpen2(false);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
    setIsOpen(false);
};


// 카테고리별로 그룹화 -> 자신이 지원한 게시물보기
const ApplyProjects = applyPosts.reduce((acc, apply) => {
  const { category } = apply;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(apply);
  return acc;
}, {});



// 카테고리별로 그룹화 -> 자신이 작성한 게시물보기
const CreateProjects = create.reduce((acc, create) => {
  const { category } = create;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(create);
  return acc;
}, {});

const OwnerProjects = userPosts.reduce((acc, create) => {
  const { category } = create;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(create);
  return acc;
}, {});



    // 역량 카드 관련 서버 연결
    // useEffect(() => {
    //     const fetchExtraData = async () => {
    //         try {
    //             const response = await axios.get(
    //               `${mock}`
    //                 // `http://${server}/card/1`
    //             );
    //             setExtraData(Array.isArray(response.data) ? response.data : []);
                
    //         } catch (err) {
              
    //             console.error("Error fetching data:", err.message);
    //             setError(err);
    //         }
    //     };
    //     fetchExtraData();
    // }, []);






    // if (error) return <div>에러가 발생했습니다: {error.message}</div>;


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


{card.length > 0 && card[0] && Object.keys(card[0]).length > 0 ? (
  card.map((cardItem, index) => (
    <div key={index}>
      <CardContainer>
        <ImageWrapper>
          <ProfileImage src="" alt="Profile" style={{ width: '100px', height: '100px' }} />
        </ImageWrapper>
        <TextWrapper2>
          <Name>{cardItem.cardName || "이름 없음"}</Name>
          <Details>{cardItem.major || "전공 정보 없음"}</Details>
          <Email>{cardItem.email || "이메일 없음"}</Email>
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
                            {Array.isArray(cardItem?.communication)
                                ? cardItem.communication.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "work" }}>
                        <CardTitle>작업</CardTitle>
                        <CardContent>
                            {Array.isArray(cardItem?.teamwork)
                                ? cardItem.teamwork.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "thinking" }}>
                        <CardTitle>사고</CardTitle>
                        <CardContent>
                            {Array.isArray(cardItem?.thinking)
                                ? cardItem.thinking.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "role" }}>
                        <CardTitle>역할</CardTitle>
                        <CardContent>
                            {Array.isArray(cardItem?.role)
                                ? cardItem.role.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "conflict" }}>
                        <CardTitle>갈등 해결</CardTitle>
                        <CardContent>
                            {Array.isArray(cardItem?.conflictResolution)
                                ? cardItem.conflictResolution.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "time" }}>
                        <CardTitle>시간</CardTitle>
                        <CardContent>
                            {Array.isArray(cardItem?.timePreference)
                                ? cardItem.timePreference.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "rest" }}>
                        <CardTitle>휴식</CardTitle>
                        <CardContent>
                            {Array.isArray(cardItem?.restPreference)
                                ? cardItem.restPreference.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "friendship" }}>
                        <CardTitle>친목</CardTitle>
                        <CardContent>
                            {Array.isArray(cardItem?.friendship)
                                ? cardItem.friendship.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "important" }}>
                        <CardTitle>중요하게 생각해요</CardTitle>
                        <CardContent>
                            {cardItem.important}
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

                       {/* tools 배열 출력 !! 이거 다 communication에서 tools로 바꾸기*/}
                      {Array.isArray(cardItem?.tools) && cardItem.tools.map((tools, index) => ( 
                        <ContentItem key={`tools-${index}`}>{tools}</ContentItem>
                      ))}
                      {/* tools 배열 출력 !! 이거 다 communication에서 certificates로 바꾸기*/}
                      {Array.isArray(cardItem?.certificates) && cardItem.certificates.map((certificates, index) => ( 
                        <ContentItem key={`certificates-${index}`}>{certificates}</ContentItem>
                      ))}
                      
                    
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
                     {/* tools 배열 출력 !! 이거 다 communication에서 awards로 바꾸기*/}
                     {Array.isArray(cardItem?.awards) && cardItem.awards.map((awards, index) => ( 
                        <ContentItem key={`awards-${index}`}>{awards}</ContentItem>
                      ))}
                  </DropdownContent>
            )}
                </DropdownContainer>

                <HeaderText2>작업물</HeaderText2>

                

                

                                
                                
                                
                                
                                {/* 여기에 파일 추가시 이 박스를 생성하는 로직 짜야함 */}
                <a href={cardItem.fileUrl} style={({border:'none',textDecoration:'none'})}>
                <BoxWrapper>
                
                  <ImagePlaceholder>
                    <ImageStyle src={file}/>
                  </ImagePlaceholder>
                  <TextWrapper>
                    <FileName>
                      개인작업물.pdf</FileName>
                    <FileSize>1234KB</FileSize>
                  </TextWrapper>
                </BoxWrapper>
                </a>


                <a href={cardItem.url} style={({border:'none',textDecoration:'none'})}>
                <BoxWrapper>
                  <ImagePlaceholder>
                    <ImageStyle src={link}/>
                  </ImagePlaceholder>
                  <TextWrapper>
                    <FileName>www.figma.com</FileName>
                  </TextWrapper>
                </BoxWrapper>
                </a>


                        {/* 여기에 기타사항 추가 로직 짜야함 다 짬*/}
                <HeaderText2>기타사항</HeaderText2>
                  <HeaderArea>{cardItem.additionalInfo}</HeaderArea>

              </RightGridWrapper>
            </RightGrid>
            </GridWrapper>
        </PageWrapper>
      </PageContainer>

      </div>
  ))
) : (
  <div>카드 정보가 없습니다.</div> // 여기에 내용이 없을 때 처리할 추가적인 UI를 넣어도 좋습니다.
)}





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
         <Column></Column>
        </Container>



        <MainContainer>
          {/* 그리드 위에 설명 */}
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
         
        </MainContainer>

        {/* 젤 밑에 컴포넌트 시작*/}
        <MainContainer>
      {/* 전체 그리드 */}
      <OuterGrid>
        {/* 좌측 그리드 */}
        <GridLeft>

          

        <GridSection>
           {/* 카테고리 정렬 배열 변수만 다 박으면 되삼*/}
            {Object.keys(ApplyProjects).map((category, index) => (
              <Card3 key={index}>

                <SectionLeft>
                  <CardTitle>{category}</CardTitle>
                </SectionLeft>

                <SectionRight>
                  <Column>
                  {/* 카테고리 별 포스트 배열 */}
                {ApplyProjects[category]

                .filter(apply =>
                  apply.applicants.some(applicant =>
                    [ "APPEND"].includes(applicant.status)
                  )
                ).map((category) => (
                  
                  <Card3 key={category.postId}>
                    <ProjectTitle>{category.title} </ProjectTitle>
                    
                    <img
                        src={
                          category.applicants.some(applicant => applicant.status === "APPEND")
                            ? wait // 대기 중
                            : category.applicants.some(applicant => applicant.status === "{\"status\":\"거절\"}")
                            ? reject // 거절
                            : null
                        }
                        alt=""
                        style={{ width: "110px", height: "35px" }}
                      />
                  </Card3>
                 
                ))}
                 </Column>
              </SectionRight>
              </Card3>
            ))}
        </GridSection>

        </GridLeft>

                    {/* 찐찐 최종  */}
                    {/* 우측 그리드 섹션 */}
        <GridRight>

        {/* <GridSection> */}
           {/* 카테고리 정렬 배열 */}
            {/* {Object.keys(CreateProjects).map((category, index) => (
              <Card3 key={index}>

                <SectionLeft>
                  <CardTitle>{category}</CardTitle>
                </SectionLeft>

                <SectionRight>
                  <Column> */}
                  {/* 카테고리 별 포스트 배열 */}
                {/* {CreateProjects[category].map((category) => (
                  <Card3 key={category.postId}>
                    <ProjectTitle>{category.title} </ProjectTitle>
                    <div>{category.approvedCount}</div>
                  </Card3>
                ))}
                  </Column>
                </SectionRight>
              </Card3>
            ))}
        </GridSection> */}


{/* !!테스트용 여기 변수만 맞추면 되삼 */}
        <GridSection>
           {/* 카테고리 정렬 배열 */}
            {Object.keys(OwnerProjects).map((category, index) => (
              <Card3 key={index}>

                <SectionLeft>
                  <CardTitle>{category}</CardTitle>
                </SectionLeft>

                <SectionRight>
                  <Column>
                  {/* 카테고리 별 포스트 배열 */}
                {OwnerProjects[category].map((category) => (
                  
                  <Card3 key={category.postId}>
                    <ProjectTitle>{category.title} </ProjectTitle>
                    <div>{category.approvedCount}</div>
                    
                    
                      <img
                        src={category.approvedCount === category.totalApplicants - 1 ? complete : progress}
                        alt=""
                        style={{ width: "110px", height: "35px" }}
                      />
                    
                  </Card3>
                 
                ))}
                 </Column>
              </SectionRight>
              </Card3>
            ))}
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

const HeaderArea = styled.div`
  width: 455px;
  height: auto;
  margin-top: 22px;
  color: #FFF;

font-family: Pretendard;
font-size: 18px;
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
    position: absolute;
    width: 470px;
    height: auto;
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
  flex-direction: column;
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






// {/* <GridSection>
            
//             <SectionLeft><CardTitle>소통</CardTitle></SectionLeft>
            
//             <SectionRight>
//                 <Column>
//                 {leftColumn.map((item, idx) => (
//                   <Card3 key={`left-${idx}`}>
//                     <CardInfo>
//                       <ProjectTitle>{item.title}</ProjectTitle>
                      
//                     </CardInfo>
//                     <TeamMember>
//                       거절
//                     </TeamMember>
//                   </Card3>
//                 ))}
//               </Column>
//           </SectionRight>
//           </GridSection> */}



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