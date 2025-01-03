import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import file from "../assets/mypage/File.svg";
import link from "../assets/mypage/Link.svg";


export default function OwnerDetailPage() {
    // 서버 url 관리 변수
    const server = process.env.REACT_APP_SERVER;
    

    // 포커스한 아이디에 대하여 관리하는 훅
    const [focusedId, setFocusedId] = useState(null);
    // 내가 지원한 공모전 훅 /post/{postId}/with-applicants
    const [apply, setApply] = useState([]);
    // 유저 역량 카드 겟또 /card/{userId}
    const [card, setCard] = useState([{}]);
    const [, setError] = useState(null);

    const [error,setError2] = useState("");
    

    // 클릭하면 focusId에 userId가 저장됨
    const handleFocus = (focusedId) => {
      setFocusedId(focusedId);
      console.log(focusedId);
      console.log("Focused ID:", focusedId); 
    };
    

    //데이터 GET
    useEffect(() => {
      const fetchUsers = async () => {
          try {
              // 1. 해당 공모전에 신청한 유저 아이디 받아와버렸어
              const Postresponse = await axios.get(
                `${server}/post/1/with-applicants`
              );
              setApply(Postresponse.data);
              console.log(Postresponse.data);

              // 2. FocusedId에 해당하는 사용자 카드 데이터 가져와버렸어
                if (focusedId) {
                  const cardResponse = await axios.get(`${server}/card/${focusedId}`);
                  const cardData = Array.isArray(cardResponse.data)
              ? cardResponse.data
              : [cardResponse.data]; // 데이터가 배열이 아니면 배열로 변환
                  setCard(cardData); // 항상 배열 안에 객체 형태로 설정
                  // console.log(cardData);
                }
              
          } catch (err) {
              setError(err);
          }
      };
      fetchUsers();
    }, [focusedId, server]);

    // 신청자 상태 업데이트
    const handleStatusUpdate = async (applicantId, status) => {
      try {
          const response = await axios.patch(
              `${server}/applications/1/${focusedId}`, 
              { status },
              {
                headers: {
                  'Content-Type': 'application/json' // JSON 형식으로 데이터를 전송
                }
              }
            );
          setError2(response.data, status);
          console.log(response)
          console.log('Status updated:', response.data);
      } catch (error) {
          console.error("Error updating status:", error);
      }
    };


    return (
      <>
        <PageContainer>

          {/* 페이지 좌측 유저 리스트 나열하는 섹션 */}
          <PageWrapperLeft>
            <UserListWrapper>
              {apply?.applicants?.length > 0 ? (
                apply.applicants.map((applicant) => (
                  <UserContainer
                    key={applicant.applicationId}
                    onClick={() => handleFocus(applicant.userId)} // 클릭 시 사용자 ID를 상태로 설정
                    focused={focusedId === applicant.userId}
                  >
                    <UserName>{applicant.userName}</UserName>
                    <StatusButtons>
                      <StatusButton>수락</StatusButton>
                      <StatusDivider />
                      <StatusButton2>거절</StatusButton2>
                    </StatusButtons>
                  </UserContainer>
                ))
              ) : (
                <div>지원자가 없습니다.</div>
              )}
            </UserListWrapper>
        </PageWrapperLeft>

          {/* 페이지 우측 focus한 유저 정보 역량 카드 */}
        <PageWrapperRight>
          {card.length > 0 && card[0] && Object.keys(card[0]).length > 0 ? (
            card.map((cardItem, index) => (
            <div key={index}>
              <CardContainer>
                <ImageWrapper>
                  <ProfileImage src="" alt="Profile" />
                  </ImageWrapper>
                  <TextWrapper2>
                    <div style={({display:'flex', flexDirection:'row', alignItems: 'center', gap:'12px'})}>
                      <Name>{cardItem.name || "이름 없음"}</Name>
                      <Name2>{cardItem.identity || "정보 없음"}</Name2>
                    </div>
                    <div>
                        <Details>{cardItem.major || "전공 정보 없음"}</Details>
                        <Email>{cardItem.email || "이메일 없음"}</Email>
                    </div>
                  </TextWrapper2>
                </CardContainer>
                <ButtonContainer>
                <Button onClick={() => handleStatusUpdate(cardItem.userId, "거절")}>거절하기</Button>
                  <Button onClick={() => handleStatusUpdate(cardItem.userId, "수락")}>수락하기</Button>
                </ButtonContainer>
                <Text>작업 스타일</Text>


                {/* 카드 그리드 */}
<CardGrid>
          <Card style={{ gridArea: "communication" }}>
            <CardTitle>소통</CardTitle>
            <CardContent>
              {Array.isArray(cardItem.communication)
                ? cardItem.communication.map((contentItem, idx) => (
                    <p key={idx}>{contentItem}</p>
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
                            {Array.isArray(cardItem?.important)
                                ? cardItem.important.map((contentItem, index) => (
                                      <p key={index}>{contentItem}</p>
                                  ))
                                : "내용 없음"}
                        </CardContent>
          </Card>


</CardGrid>



        <div style={({marginTop: '30px'})}/>
        <Divider />

        <AdditionalSection>
          <SectionColumn>
            <SectionTitle>경력 / 경험</SectionTitle>
          </SectionColumn>
          <SectionColumn>
            <HeaderText>경력</HeaderText>
            {Array.isArray(cardItem.awards) &&
              cardItem.awards.map((award, idx) => (
                <ContentItem key={idx}>{award}</ContentItem>
              ))}
            <HeaderText>기타사항</HeaderText>
            <SectionArea>{cardItem.additionalInfo || "없음"}</SectionArea>
          </SectionColumn>
        </AdditionalSection>
      </div>
    ))
  ) : (
    <div>지원자를 선택하면 정보가 표시됩니다.</div>
  )}
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
  
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap:16px;

`;

const Button = styled.button`
  width: 124px;
  height: 52px;
  background: #DBDBDB;
  border: none;
  font-size: 20px;
  font-weight: 500;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  
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
  padding: 50px 0px 50px 38px;
`;

const UserBox = styled.div`
  color: white;
  font-weight: 500;
  font-size: 22px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  
  padding: 10px 15px;
  border-radius: 8px 0px 0px 8px;
  color: ${(props) => (props.focused ? "black" : "white")}; //클릭시 텍스트 색 하얀색으로
  background-color: ${(props) => (props.focused ? "#F0F3FA" : "#6c54f7")}; //클릭시 배경 색상 하얀색으로
`;

const UserName = styled.div`
  font-size: 22px;
  font-weight: 500;
  margin-right: auto; /* 이름을 왼쪽으로 정렬 */
`;

const StatusButtons = styled.div`
  display: flex;
  align-items: center;
  padding-right: 25px;
`;

const StatusButton = styled.div`
  display: block;
  padding: 5px 10px;
  font-size: 22px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
`;

const StatusButton2 = styled.div`
  display: block;
  padding: 5px 10px;
  font-size: 22px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
`;


const StatusDivider = styled.div`
  width: 1px;
  height: 30px;
  background: #4C3BB0;
  margin: 0 10px;
`;

const PageWrapperRight = styled.div`
    width: 1140px;
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