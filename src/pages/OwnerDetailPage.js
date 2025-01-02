import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import file from "../assets/mypage/File.svg";
import link from "../assets/mypage/Link.svg";


//임시 데이터
import { owner, applied, applicants } from "./MyPageData"




export default function OwnerDetailPage() {

    //테스트 용 applied



    // 테스트 용
    const userId = 2;
    const userId2 = applicants.userId2;
    const [userPosts, setUserPosts] = useState([]);

    const [applyUsers, setApplyUsers] = useState([]);

   
    useEffect(() => {
      // 주어진 데이터를 기반으로 userId에 해당하는 게시글 필터링
      const filteredOwnPosts = owner[0].filter(post => post.ownerId === userId);
      // 주어진 데이터를 기반으로 userId에 해당하는 게시글 필터링
      const filteredApplyPosts = applied.filter(post =>post.applicants.some(applicant => applicant.userId === userId));
      
      setUserPosts(filteredOwnPosts);

      setApplyUsers(filteredApplyPosts);
    }, [userId]);

    



    const server = process.env.REACT_APP_SERVER;
    const mock = process.env.REACT_APP_POST_MOCK;

    // 전체 게시물 sorting 할려고 가져옴
    const [users, setUsers] = useState([]);
    // 내가 지원한 공모전 훅 /post/applied/{userId} -> 승인 상태 수락 ? 거절
    const [apply, setApply] = useState([]);
    // 내가 작성한 공모전 훅 /post/owner/{userId} -> 진행 중 ? 모집완료 //ApproveCount가 Member-1의 수와 일치할 때 모집완료
    const [create, setCreate] = useState([]);
    // 유저 역량 카드 겟또 /card/{userId}
    const [card,setCard] = useState(Array(1).fill({}));
    

    //!! 이 친구 중요할듯 /card/{userId}
    //만약 해당 게시글에 지원한 지원자들 applications/post/{postId} 에서
    //왼쪽을 누를 시 해당 유저의 userId 값을 받아와 그리고
    //card[userId]로 받아와서 -> 열심히 카드로 출력하는거지
    const cardZero = card[0]; 
    const cardOne = card[userId];

   
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

// !!!!데이터 가져옴 PostData 전부
useEffect(() => {
  const fetchUsers = async () => {
      try {
          const response = await axios.get(
            //게시물 데이터 다 받아오기
              `${mock}`
              // `http://${server}/post`
          );
          const response2 = await axios.get(
            `${mock}`
            // `http://${server}/post/applied/1`
          );
          const response3 = await axios.get(
            `${mock}`
            // `http://${server}/post/owner/1`
          );
          const response4 = await axios.get(
            `${mock}`
            // `http://${server}/card/1`
          );

          
          setUsers(response.data);
          //내가 지원한 공모전
          setApply(response2.data);
          //내가 생성한 공모전
          setCreate(response3.data);
          //유저의 카드 데이터
          setCard(response4.data);

          console.log(response.data);
          //내가 지원한 공모전
          console.log(response2.data);
          //내가 생성한 공모전
          console.log(response3.data);
          //유저의 카드 데이터
          console.log(response4.data);
          

          
      } catch (err) {
          setError(err);
          console.error(err);
      }
  };
  fetchUsers();
}, []);





const [activeButtons, setActiveButtons] = useState({}); 
const handleButtonClick = (applicationId, status) => {
  setActiveButtons((prevState) => ({
    ...prevState,
    [applicationId]: status, // 특정 지원자의 상태 업데이트
  }));
};


// 포커스한 아이디에 대하여 관리하는 훅
const [focusedId, setFocusedId] = useState(null);

const handleFocus = (applicationId) => {
  setFocusedId(applicationId);
};



    return (
      <>
      <PageContainer>

        <PageWrapperLeft>
          <UserListWrapper>
            지원자 목록

            {applied
              .filter(post => post.postId === 1) // postId가 1인 게시물만 필터링
              .flatMap(post => post.applicants) // 지원자 배열 펼치기
              .map(applicant => (
                <UserContainer
                      key={applicant.applicationId}
                      applicationId={applicant.userId} //해당 공모전에 지원한 유저의 id
                      userId={applicant.userId}
                >
                  <UserName
                      >{applicant.userName} </UserName>
                    <StatusButtons>
                      <StatusButton

                      >
                          수락

                      </StatusButton>
                      <StatusDivider />

                      <StatusButton2
                      
                      >
                거절
              </StatusButton2>
                    </StatusButtons>
                  {/* 지원자 이름 출력 */}
                </UserContainer>
              ))}


                <UserContainer>
                  
                  </UserContainer>
             
          </UserListWrapper>

          
        </PageWrapperLeft>

      
        <PageWrapperRight>
            {/* extraData[userId] */}
            <CardContainer>
        <ImageWrapper>
          <ProfileImage src="" alt="Profile" style={({width:'100px',height:'100px'})}/>
        </ImageWrapper>
        <TextWrapper2>
          <div style={({display:'flex', flexDirection:'row', alignItems: 'center', gap:'12px'})}>
          <Name>{cardZero.name || "이름 없음"}</Name>
          <Name2>{cardZero.identity || "정보 없음"}</Name2>
          </div>
          <div style={({display:'flex',flexDirection:'row',alignItems:'center',gap:'12px'})}>
            <Details>{cardZero.major || "전공 정보 없음"}</Details>
            <div style={({width:'1px',height:'21px',border:'1px solid #DBDBDB'})}/>
            <Email>{cardZero.email || "이메일 없음"}</Email>
          </div>
          
        </TextWrapper2>
    </CardContainer>
        <Text>{cardZero.name || "이름 없음"}</Text>

                                      {/* 그리드 좌측 */}
            
                <CardGrid>
                    <Card style={{ gridArea: "communication" }}>
                        <CardTitle>소통</CardTitle>
                        <CardContent>
                            {Array.isArray(cardZero?.communication)
                                ? cardZero.communication.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}


                                <CardContent><p>비대면소통을 선호해요</p></CardContent>
                                <CardContent><p>비대면소통을 선호해요</p></CardContent>
                                <CardContent><p>비대면소통을 선호해요</p></CardContent>
                                
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "work" }}>
                        <CardTitle>작업</CardTitle>
                        <CardContent>
                            {Array.isArray(cardZero?.teamwork)
                                ? cardZero.teamwork.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "thinking" }}>
                        <CardTitle>사고</CardTitle>
                        <CardContent>
                            {Array.isArray(cardZero?.thinking)
                                ? cardZero.thinking.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "role" }}>
                        <CardTitle>역할</CardTitle>
                        <CardContent>
                            {Array.isArray(cardZero?.role)
                                ? cardZero.role.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "conflict" }}>
                        <CardTitle>갈등 해결</CardTitle>
                        <CardContent>
                            {Array.isArray(cardZero?.conflictResolution)
                                ? cardZero.conflictResolution.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                        <CardContent><p>비대면소통을 선호해요</p></CardContent>
                        <CardContent><p>비대면소통을 선호해요</p></CardContent>
                        <CardContent><p>비대면소통을 선호해요</p></CardContent>

                    </Card>
                    <Card style={{ gridArea: "time" }}>
                        <CardTitle>시간</CardTitle>
                        <CardContent>
                            {Array.isArray(cardZero?.timePreference)
                                ? cardZero.timePreference.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "rest" }}>
                        <CardTitle>휴식</CardTitle>
                        <CardContent>
                            {Array.isArray(cardZero?.restPreference)
                                ? cardZero.restPreference.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "friendship" }}>
                        <CardTitle>친목</CardTitle>
                        <CardContent>
                            {Array.isArray(cardZero?.goal)
                                ? cardZero.goal.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                    </Card>
                    <Card style={{ gridArea: "important" }}>
                        <CardTitle>중요하게 생각해요</CardTitle>
                        <CardContent>
                            {Array.isArray(cardZero?.important)
                                ? cardZero.important.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
                        <CardContent><p>비대면소통을 선호해요</p></CardContent>
                      
                    </Card>
                </CardGrid>


                <div style={({marginTop: '30px'})}/>
                                <Divider/>

                                <AdditionalSection>

                                  {/* 좌측 */}
                                    <SectionColumn>
                                        <SectionTitle>경력 / 경험</SectionTitle>
                                        
                                    </SectionColumn>




                                    {/* 우측  */}
                                    <SectionColumn>
                                      
                                      

                                    <HeaderText>경력</HeaderText>

                                        {/* tools 배열 출력 !! 이거 다 communication에서 awards로 바꾸기*/}
                                        {Array.isArray(cardZero?.awards) && cardZero.awards.map((awards, index) => ( 
                                            <ContentItem key={`awards-${index}`}>{awards}</ContentItem>
                                          ))}
                                          

                                          <div></div>
                                        여기 경력 나열 하는 곳 

                                        
                                        <HeaderText>기타사항</HeaderText>

                                        
                                        <SectionArea>{extraData[18]?.additionalInfo}</SectionArea>
                                        
                                        {/* <SectionArea>{extraData[18]?.file}</SectionArea> */}
                                        
                                    </SectionColumn>
                                </AdditionalSection>
            

                                          {/* 그리드 우측 */}
            




              <RightGridWrapper>
                                  {/* 드롭다운 */}
                <DropdownContainer>
                  
                    <HeaderText>툴 / 자격증</HeaderText>
                      
                  
                  

                       {/* tools 배열 출력 !! 이거 다 communication에서 tools로 바꾸기*/}
                      {Array.isArray(cardZero?.tools) && cardZero.tools.map((tools, index) => ( 
                        <ContentItem key={`tools-${index}`}>{tools}</ContentItem>
                      ))}
                      {/* tools 배열 출력 !! 이거 다 communication에서 certificates로 바꾸기*/}
                      {Array.isArray(cardZero?.certificates) && cardZero.certificates.map((certificates, index) => ( 
                        <ContentItem key={`certificates-${index}`}>{certificates}</ContentItem>
                      ))}
                      <div></div>
                    여기 툴 자격증 나열하는 곳
                  
            
                </DropdownContainer>

                
                  
                    
                <HeaderText2>작업물</HeaderText2>
                <div></div>

                {card
                  .filter(item => item.file || item.url)
                  .map((item, index) =>(
                    <React.Fragment key={index}>

                        {/* .file 값이 존재하는 경우 */}
                      {item.file && (
                        <BoxWrapper>
                          <ImagePlaceholder>
                            <ImageStyle src={item.file}/>
                          </ImagePlaceholder>

                          <TextWrapper>
                            {/* 이거 파일 이름이랑 사이즈 어캐 받아오지 파일 데이터 안에 있나? */}

                            {/* <FileName>{item.fileName || "파일 이름 없음"}</FileName>
                            <FileSize>{item.fileSize || "파일 크기 없음"}</FileSize> */}
                          </TextWrapper>
                        </BoxWrapper>
                      )}

                      {/* .url 값이 존재하는 경우 */}
                      {item.url && (
                        <BoxWrapper>
                          <ImagePlaceholder>
                            <ImageStyle src={item.url} />
                          </ImagePlaceholder>
                          <TextWrapper>
                            이거 어캐해
                            {/* <FileName>{item.url || "URL 없음"}</FileName> */}
                          </TextWrapper>
                        </BoxWrapper>
                      )}

                    </React.Fragment>
                  ))
                }

                

                                
                                
                                
                                
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

                
                  <HeaderArea>{cardZero.additionalInfo}</HeaderArea>

              </RightGridWrapper>
            
            
        </PageWrapperRight>
      </PageContainer>



                          {/* 현재 참여중인 공모전 */}
        



        
        </>
    );
}

// 개인정보

const CardContainer = styled.div`
  width: 493px;
  height: 109px;
  display: flex;
  align-items: center;
  background: #F0F3FA;
  border-radius: 8px;
  padding: 10px;
  
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
  
  margin-bottom: 10px;
  color:#6C54F7;
`;

const Name2 = styled.div`
  font-size: 22px;
  font-weight: 500;
  
  margin-bottom: 10px;
  color: #767676;
`;

const Details = styled.div`
  font-size: 18px;
  font-weight: 500;
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

const PageWrapperLeft = styled.div`
    width: 428px;
    height: auto;
    
    margin-left: 76px;
    background: #6C54F7;
    border-radius: 16px;
    /* overflow: auto; */
`;

const UserListWrapper = styled.div`
  padding: 50px 48px;
`;

const UserBox = styled.div`
  color: white;
  font-weight: 500;
  font-size: 22px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  
  padding: 10px 20px;
  border-radius: 8px;
  color: ${(props) => (props.active1 ? "black" : "white")}; //클릭시 텍스트 색 하얀색으로
  background-color: ${(props) => (props.active1 ? "white" : "#6c54f7")}; //클릭시 배경 색상 하얀색으로
`;

const UserName = styled.div`
  font-size: 22px;
  font-weight: 500;
  margin-right: auto; /* 이름을 왼쪽으로 정렬 */
`;

const StatusButtons = styled.div`
  display: flex;
  align-items: center;
`;

const StatusButton = styled.div`
  display: block;
  padding: 5px 10px;
  font-size: 22px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  color: ${(props) => (props.active ? "#5020D3A3" : "##DBDBDB")}; //활성시 화이트 진하게 다시 누르면 
  font-weight: ${(props) => (props.active ? "700" : "500")};
`;

const StatusButton2 = styled.div`
  display: block;
  padding: 5px 10px;
  font-size: 22px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  color: ${(props) => (props.deactivated  ? "#DBDBDB" : "black")};
  
`;


const StatusDivider = styled.div`
  width: 1px;
  height: 30px;
  background: #4C3BB0;
  margin: 0 10px;
`;

const PageWrapperRight = styled.div`
    width: 1060px;
    height: 815px;
    padding: 30px;
    padding-left: 60px;
    padding-right: 60px;
    
    background: #F0F3FA;
    border-radius: 16px;
    overflow: auto;
`;

const RightGridWrapper = styled.div`
   
`;

const Text = styled.div`
color: #111;

font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 600;
line-height: 140%; /* 30.8px */
`

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
    
    border-radius: 5px;
`;

const HeaderText = styled.div`
     font-size: 18px;
    font-weight: 600;
    
`;

const HeaderText2 = styled.div`
    display: inline-block;
     font-size: 18px;
    font-weight: 600;
    
    
`;

const HeaderArea = styled.div`
  width: 455px;
  height: auto;
  margin-top: 22px;
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


const Divider = styled.hr `
  margin: 1rem 0;
  border: none;
  border-top: 1px solid #6C54F7;;
`;

const SectionTitle = styled.h4 `
  color: #6C54F7;
  font-family: Pretendard;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

`;

const AdditionalSection = styled.div `
  display: flex;
  justify-content: space-between;
`;

const SectionColumn = styled.div `
  flex: 1;
`;

const SectionText = styled.p `
  color: #111;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const SectionArea = styled.div `
  color: #767676;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;