//!!!!RecruitingPage랑 데이터 연결 성공

import React from "react";
import styled from "styled-components";
import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import DetailSVG from "../assets/detail.svg";

export default function DetailPage() {
    const [extraData, setExtraData] = useState([]);

    const [selectedPostData, setSelectedPostData] = useState(null);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 표시 여부
    const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);

    const [isConfirmationVisible, setIsConfirmationVisible] = useState(false); // 두 번째 이미지 모달 표시 여부
    const [modalTimer, setModalTimer] = useState(null); // 타이머 상태
    const [isPostSubmitted, setIsPostSubmitted] = useState(false);

    const server = process.env.REACT_APP_SERVER;

    const { postId } = useParams();
    console.log(postId);
    const { userId } = useParams();
    
    const navigate = useNavigate(); // Initialize useNavigate hook


    //역량카드 데이터
    useEffect(() => {
        const fetchExtraData = async () => {
            try {
                const response = await axios.get(
                    // `http://${server}:8080/card/${userId}`
                    `https://672819eb270bd0b975546065.mockapi.io/api/v1/register?page=1&limit=25`
                );
                setExtraData(Array.isArray(response.data) ? response.data : []);
                console.log(response.data);
                console.log("HTTP Status Code:", response.status);
            } catch (err) {
                console.error("Error fetching post data with status:", err.response?.status);
                console.log(err.message);
                setError(err);
            }
        };
        fetchExtraData();
    }, []);






    // GET 선택한 게시물[postId]에 대해서 정보 불러오기 !!완료!!
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`https://676e83a3df5d7dac1ccae100.mockapi.io/post/${postId}`);
                // const response = await axios.get(`http://${server}/post/${postId}`);
                setSelectedPostData(response.data);
                console.log("HTTP Status Code:", response.status);
            } catch (err) {
                console.error("Error fetching post data:", err.message);
                console.error("Error fetching post data with status:", err.response?.status);
                console.log(err.message);
                setError(err);
            }
        };
        fetchPostData();
    }, [postId]);

    const handleFirstSubmit = () => {
      setIsModalOpen(true); // Open the first modal
      document.body.style.overflow = "hidden"; 
  };

  const handleOwnerCard = () => {
    setIsOwnerModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // const handleSecondSubmit = async () => {

      
  //     const userId = "2"; // Assuming you retrieve the user ID from authentication
  //     try {
  //         // Sending POST request to the server
  //         await axios.post(
  //             `http://${server}/applications/${userId}/${postId}`
  //         );
  //         setIsPostSubmitted(true);
  //         setIsModalOpen(false); // Close first modal

  //         // Show second confirmation modal after 2 seconds
  //         setModalTimer(setTimeout(() => {
  //             setIsConfirmationVisible(true); // Show success confirmation modal

  //             // Hide success modal after another 2 seconds
  //             setTimeout(() => {
  //                 setIsConfirmationVisible(false);
  //                 navigate(`/detail/${postId}`); // Optionally navigate to another page after 2 seconds
  //             }, 2000);
  //         }));
  //     } catch (err) {
  //         alert("지원에 실패했습니다.");
  //     }
  // };

  const closeModal = () => {
      clearTimeout(modalTimer);
      setIsModalOpen(false);
      setIsOwnerModalOpen(false);
      setIsConfirmationVisible(false);
      document.body.style.overflow = "auto";
  };


  

    if (error) 
        return <div>에러가 발생했습니다: {error.message}</div>;
    return (
      
        <PageWrapper>
          {selectedPostData ? (
            <>
            {/* 페이지 헤더 */}
            <Header>

                <CategoryAndTitle>

                    {/*!ERD category! */}
                    <Category>
                      {selectedPostData.category}
                    </Category>
                    {/* !ERD title! */}
                    <Title>{selectedPostData.title}
                    </Title>
                </CategoryAndTitle>
            </Header>

            <MainContent>
                {/* 좌측 이미지 박스 */}
                <MainBox>

                    {/* !ERD img */}
                    <Image src="/logo/image.svg"/>
                </MainBox>

                {/* 우측 정보 섹션 */}
                <SideBox>
                    {/* 작성자 및 모집 정보 */}
                    <InfoSection>
                        <InfoRow>
                            <InfoLabel>작성자</InfoLabel>
                            <InfoValue>
                                {selectedPostData.name} {/* 작성자의 역량카드 열람 모달 열기 */}
                                <RoleTag onClick={handleOwnerCard}>역량카드</RoleTag>

                            </InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>모집 날짜</InfoLabel>

                            {/* !ERD date = 모집 마감일! */}
                            <InfoValue>{selectedPostData.date}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>현재 모집 인원</InfoLabel>
                            {/* !ERD member = 현재원 */}
                            <InfoValue>{selectedPostData.member}
                            </InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>총 지원자</InfoLabel>
                            {/* <InfoValue>{selectedPostData.applicants.length}</InfoValue> */}

                            {/* !ERD applicants = 모집 지원자! */}
                            {/* <InfoValue>1,200 {selectedPostData.applicants}</InfoValue> */}
                        </InfoRow>
                    </InfoSection>

                    {/* 모집글 */}
                    <Section>
                        <SectionTitle>모집글</SectionTitle>
                        <Text>
                            {/* !ERD memo = 메모 */}
                            {selectedPostData.memo}

                            {/* 총 상금 2400만원 같이 따실 분 구합니다.
              <br />
              <br />
              많이 지원해주세요! 열정 넘치는 분이라면 플러스 요인이 됩니다!
              <br />
              저는 열정만 있다면 잘할 수 있다고 생각합니다 ㅎㅎ */
            }
                        </Text>
                    </Section>
            

                    {/* 자격 요건 */}
                    <Section>
                        <SectionTitle>자격 요건</SectionTitle>
                        <Description>
                            <UnorderedList>
                                <ListItem>{selectedPostData.memo2}</ListItem>
                               
                                
                            </UnorderedList>
                        </Description>
                    </Section>

                    {/* 버튼 */}
                    <ActionButtons>
                      {/* 이거 제목 옆에 > 랑 같이 */}
                        <LinkButton>자세히 보기</LinkButton>
                        {/* 지원하기 완료되면 대기중 띄우기 (개발 / 진행상황) */}
                        <ApplyButton onClick={handleFirstSubmit}>지원하기</ApplyButton>
                    </ActionButtons>
                </SideBox>

            </MainContent>

            {/* 모달 지원자용 */}
            {
                isModalOpen && (
                  
                    <ModalOverlay onClick={closeModal}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>

                            <ModalHeader>
                                <ModalTitle>해당 역량카드로 지원 하시겠습니까?</ModalTitle>
                                <div style={({display: 'flex', textAlign: 'right'})}>
                                    <div>
                                        <CloseButton onClick={closeModal}>×</CloseButton>
                                        <HeaderButtons>

                                            {/* <SubmitButton onClick={handleSecondSubmit}>지원하기</SubmitButton> */}
                                        </HeaderButtons>
                                    </div>
                                </div>
                            </ModalHeader>
                            <Divider/>
                            <ModalBody>
                                <SectionStyle>작업 스타일</SectionStyle>

                                {/* 카드 그리드 카드 그리드 카드 그리드 */}
                                {/* extraData[userId] */}
                                <CardGrid>
                                  
                                    


                                    <Card style={{ gridArea: "communication" }}>
                                        <CardTitle>소통</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.communication) ? ( extraData[18].communication.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.communication || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "work"
                                        }}>
                                        <CardTitle>작업</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.teamwork) ? ( extraData[18].teamwork.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.teamwork || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "thinking"
                                        }}>
                                        <CardTitle>사고</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.thinking) ? ( extraData[18].thinking.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.thinking || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "role"
                                        }}>
                                        <CardTitle>역할</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.role) ? ( extraData[18].role.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.role || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "conflict"
                                        }}>
                                        <CardTitle>갈등 해결</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.conflictResolution) ? ( extraData[18].conflictResolution.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.conflictResolution || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "time"
                                        }}>
                                        <CardTitle>시간</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.timePreference) ? ( extraData[18].timePreference.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.timePreference || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "rest"
                                        }}>
                                        <CardTitle>휴식</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.restPreference) ? ( extraData[18].restPreference.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.restPreference || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "friendship"
                                        }}>
                                        <CardTitle>친목</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.goal) ? ( extraData[18].goal.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.goal || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "important"
                                        }}>
                                        <CardTitle>중요하게 생각해요</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.important) ? ( extraData[18].important.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.important || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                </CardGrid>

                                <div style={({marginTop: '30px'})}/>
                                <Divider/>

                                <AdditionalSection>
                                    <SectionColumn>
                                        <SectionTitle>경력 / 경험</SectionTitle>
                                        <SectionText>{extraData[18]?.awards}</SectionText>
                                        <SectionText>{extraData[18]?.tools}</SectionText>
                                        <SectionText>{extraData[18]?.certificates}</SectionText>
                                        <SectionText>{extraData[18]?.url}</SectionText>
                                        <SectionArea>PDF 자리</SectionArea>
                                    </SectionColumn>
                                    <SectionColumn>
                                        <SectionTitle>기타사항</SectionTitle>
                                        <SectionArea>{extraData[18]?.additionalInfo}</SectionArea>
                                        
                                        {/* <SectionArea>{extraData[18]?.file}</SectionArea> */}
                                        
                                    </SectionColumn>
                                </AdditionalSection>
                            </ModalBody>
                        </ModalContent>
                    </ModalOverlay>
                )
            }
            {/* Second Confirmation Modal */}
            {isConfirmationVisible && (
                        <ModalOverlay color="rgba(0, 0, 0, 0.7)">
                            <SuccessMessage>
                                  <img src={DetailSVG} alt="Success" width="500px" height="500px" />
                            </SuccessMessage>
                        </ModalOverlay>
                    )}
             </>
        ) : (
            <div>다시해</div>
        )}
        {
                isOwnerModalOpen && (
                  
                    <ModalOverlay onClick={closeModal}>
                        <ModalContent onClick={(e) => e.stopPropagation()}>

                            <ModalHeader>
                                
                                  {/* 여기에 글 작성자 정보 변수 및 스타일 넣기 */}

                                <div style={({display: 'flex', textAlign: 'right'})}>
                                    <div>
                                        <CloseButton onClick={closeModal}>×</CloseButton>
                                        <HeaderButtons>

                                            {/* <SubmitButton onClick={handleSecondSubmit}>지원하기</SubmitButton> */}
                                        </HeaderButtons>
                                    </div>
                                </div>
                            </ModalHeader>
                            <Divider/>
                            <ModalBody>
                                <SectionStyle>작업 스타일</SectionStyle>

                                {/* 카드 그리드 카드 그리드 카드 그리드 */}
                                {/* extraData[userId] */}
                                <CardGrid>
                                  
                                    


                                    <Card style={{ gridArea: "communication" }}>
                                        <CardTitle>소통</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.communication) ? ( extraData[18].communication.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.communication || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "work"
                                        }}>
                                        <CardTitle>작업</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.teamwork) ? ( extraData[18].teamwork.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.teamwork || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "thinking"
                                        }}>
                                        <CardTitle>사고</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.thinking) ? ( extraData[18].thinking.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.thinking || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "role"
                                        }}>
                                        <CardTitle>역할</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.role) ? ( extraData[18].role.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.role || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "conflict"
                                        }}>
                                        <CardTitle>갈등 해결</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.conflictResolution) ? ( extraData[18].conflictResolution.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.conflictResolution || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "time"
                                        }}>
                                        <CardTitle>시간</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.timePreference) ? ( extraData[18].timePreference.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.timePreference || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "rest"
                                        }}>
                                        <CardTitle>휴식</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.restPreference) ? ( extraData[18].restPreference.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.restPreference || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "friendship"
                                        }}>
                                        <CardTitle>친목</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.goal) ? ( extraData[18].goal.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.goal || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                    <Card
                                        style={{
                                            gridArea: "important"
                                        }}>
                                        <CardTitle>중요하게 생각해요</CardTitle>
                                        <CardContent>
                                          {Array.isArray(extraData[18]?.important) ? ( extraData[18].important.map((contentItem, index) => (
                                            <p key={index}>{contentItem}</p> // 각 요소를 p 태그로 감쌈
                                          ))
                                          ) : (
                                            <p>{extraData[18]?.important || "내용 없음"}</p> // 배열이 아닌 경우 처리
                                )}
                                </CardContent>
                                    </Card>
                                </CardGrid>

                                <div style={({marginTop: '30px'})}/>
                                <Divider/>

                                <AdditionalSection>
                                    <SectionColumn>
                                        <SectionTitle>경력 / 경험</SectionTitle>
                                        <SectionText>{extraData[18]?.awards}</SectionText>
                                        <SectionText>{extraData[18]?.tools}</SectionText>
                                        <SectionText>{extraData[18]?.certificates}</SectionText>
                                        <SectionText>{extraData[18]?.url}</SectionText>
                                        <SectionArea>PDF 자리</SectionArea>
                                    </SectionColumn>
                                    <SectionColumn>
                                        <SectionTitle>기타사항</SectionTitle>
                                        <SectionArea>{extraData[18]?.additionalInfo}</SectionArea>
                                        
                                        {/* <SectionArea>{extraData[18]?.file}</SectionArea> */}
                                        
                                    </SectionColumn>
                                </AdditionalSection>
                            </ModalBody>
                        </ModalContent>
                    </ModalOverlay>
                )
            }
        </PageWrapper>
    );
}

// Styled Components

const SectionArea = styled.div `
  color: #767676;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const SectionText = styled.p `
  color: #111;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 400;
line-height: normal;
`;

const SectionStyle = styled.div `
  color: #111;
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 600;
line-height: normal;
margin-bottom: 20px;
margin-top: 30px;
`;
const PageWrapper = styled.div `
  display: flex;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 1024px) {
    padding: 0 4rem;
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
  }
`;

const Header = styled.header `
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CategoryAndTitle = styled.div `
  display: flex;
  flex-direction: column;
`;

const Category = styled.span `
  font-weight: 500;
  color: #6c54f7;
  font-size: 18px;
`;

const Title = styled.h1 `
  font-weight: 600;
  font-size: 32px;
`;

const MainContent = styled.div `
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainBox = styled.div `
  display: flex;
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const Image = styled.img `
  /* width: 100%; */
  max-width: 84%; /* 너비를 90%로 줄임 */
  border-radius: 8px;
  object-fit: contain;
`;

const SideBox = styled.div `
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const InfoSection = styled.div `
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const InfoRow = styled.div `
  display: flex;
  flex-direction: column;
  flex: 1;

  &:not(:last-child) {
    margin-right: 1.5rem; 
  }
`;

const InfoLabel = styled.span `
  font-size: 22px;
  color: #767676;
  font-weight: 400;
`;

const InfoValue = styled.span `
  font-size: 26px;
  display: flex;
  font-weight: 500;
  align-items: center;
  gap: 0.5rem; /* 역할 태그와 텍스트 간 간격 */
  margin-top: 8px;
`;

const RoleTag = styled.span `
  background-color: #6c54f7;
  color: white;
  font-size: 18px;
  padding: 0.3rem 0.5rem;
  border-radius: 30px;
  display: inline-block;
`;

const Section = styled.div `
  
  
  
padding-bottom: 10px;

gap: 10px;

`;

const Text = styled.div `
  line-height: 140%;
  font-size: 22px;
  color: #4E5968;
  /* border: 1px solid  #DBDBDB; */
  height: 150px;
  width: 851px;
  border-radius: 16px;
  /* padding: 20px; */
  padding-top: 20px;
`;

const Description = styled.div `
  
  border-radius: 8px;
  line-height: 1.6;
  font-weight: 400;
  color: #4E5968;
  /* border: 1px solid  #DBDBDB; */
  height: 170px;

`;

const ActionButtons = styled.div `
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const LinkButton = styled.button `
width: 187px;
height: 64px;
font-size: 22px;
gap: 10px;
  
  padding: 0.7rem 1rem;
  background: white;
  border: 1px solid #ddd;
  
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #6c54f7;
    color: white;
  }
`;

const ApplyButton = styled(LinkButton)`
  background: #6c54f7;
  color: white;

  &:hover {
    background: #5a3ee6;
  }
`;

const UnorderedList = styled.div `
  list-style-type: none;
  line-height: 160%; 
  /* padding: 20px; */
  padding-top: 20px;
  font-size: 22px;
`;

const ListItem = styled.div `
`;

const SuccessMessage = styled.div`
`;

const ModalOverlay = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div `
  width: 1058px;
  height: 941px;
  
  max-height: 90vh;
  background: #fff;
  padding: 40px 60px;
  border-radius: 10px;
  overflow-y: auto;
  
`;

const ModalHeader = styled.div `
  position: relative; /* 자식 요소가 부모를 기준으로 위치하도록 설정 */
  display: flex;
  justify-content: space-between;
  

`;

const ModalTitle = styled.h2 `
  font-size: 32px;
  font-weight: 600;
  color: #6C54F7;
  margin-top: 70px;
  
`;

const HeaderButtons = styled.div `
  display: flex;
  gap: 1rem;
  
`;

const EditButton = styled.button `
  padding: 0.7rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  
  width: 164px;
height: 64px;
font-size: 22px;
font-style: normal;
font-weight: 500;
border: 1px solid #DBDBDB;
background-color: white;

`;

const SubmitButton = styled(EditButton)`
  background-color: #6c54f7;
  color: white;
  border: none;
`;

const CloseButton = styled.button `
  position: relative; /* 고정을 위해 absolute 사용 */
  top: 0; /* 기본 상단 위치 */
  right: 0; /* 기본 오른쪽 위치 */
  font-size: 2.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding-bottom: 1rem;

  /* 반응형 스타일 */
  @media (max-width: 1024px) {
    top: 1.5rem; /* 화면 크기가 작아지면 위치 변경 */
    right: 2rem;
  }

  @media (max-width: 768px) {
    top: 1rem;
    right: 1rem;
  }

  @media (max-width: 480px) {
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1.5rem; /* 버튼 크기도 조정 */
  }
`;

const Divider = styled.hr `
  margin: 1rem 0;
  border: none;
  border-top: 1px solid #6C54F7;;
`;

const ModalBody = styled.div `
  
`;

const AdditionalSection = styled.div `
  display: flex;
  justify-content: space-between;
`;

const SectionColumn = styled.div `
  flex: 1;
  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const SectionTitle = styled.h4 `
  color: #111;
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

const CardGrid = styled.div `
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

const Card = styled.div `
  background: #f0f3fa;
  border-radius: 8px;
  padding: 16px;
`;

const CardTitle = styled.div `
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
`;

const CardContent = styled.div `
  font-size: 18px;
  font-weight: 400;
  color: #111111;
  
`;
