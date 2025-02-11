import React, { useContext, useState, useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import styled from "styled-components";
import file from "../assets/mypage/File.svg";
import link from "../assets/mypage/Link.svg";
import DetailSVG from "../assets/detail.svg";
import profile from "../assets/profile.png"

export default function DetailPage() {
  const navigate = useNavigate();
  const server = process.env.REACT_APP_SERVER;
  const { postId } = useParams();
  const { userInfo, handleLogout } = useContext(AuthContext);
  const userId = userInfo.token;
  
  const [extraData, setExtraData] = useState([]); // 지원자용 역량 카드 관리 훅
  const [isModalOpen, setIsModalOpen] = useState(false); // 지원자 역량카드 모달
  
  // 오너용 역량카드 관리 훅
  const [owner, setOwner] = useState([]);
  const [ownerId, setOwnerId] = useState();

  const [selectedPostData, setSelectedPostData] = useState(null); // 게시글의 데이터 ex) 작성자, 모집날짜 ...
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false); // 오너 역량카드 모달
  const [error, setError] = useState(null);

  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false); // 두 번째 이미지 모달 표시 여부
  const [modalTimer, setModalTimer] = useState(null); // 타이머 상태
  const [isPostSubmitted, setIsPostSubmitted] = useState(false);

  // 역량카드 스타일 배치
  const cardData = [
    { key: "communication", title: "소통", gridArea: "communication" },
    { key: "teamwork", title: "작업", gridArea: "work" },
    { key: "thinking", title: "사고", gridArea: "thinking" },
    { key: "role", title: "역할", gridArea: "role" },
    { key: "conflictResolution", title: "갈등 해결", gridArea: "conflict" },
    { key: "timePreference", title: "시간", gridArea: "time" },
    { key: "restPreference", title: "휴식", gridArea: "rest" },
    { key: "friendship", title: "친목", gridArea: "friendship" },
  ];

  //역량카드 데이터
  useEffect(() => {
    const fetchExtraData = async () => {
      if (userInfo.isLoggedIn) {
        // 로그인 한 유저에 한해서만 유저 본인의 역량카드 데이터를 가져온다.
          try {
            const response = await axios.get(
              `${server}/card/${userId}`
            );
            setExtraData(Array.isArray(response.data) ? response.data : []);
            console.log(response.data);
            // console.log("HTTP Status Code:", response.status);
          } catch (err) {
            // console.error("Error fetching post data with status:", err.response?.status);
            console.log(err.message);
            setError(err);
        }
      } else {
        setExtraData([]);
      };
    }
    fetchExtraData();
  }, [userInfo.isLoggedIn, server, userId]);


    const fetchPostData = async () => {
      try {
          const response = await axios.get(`${server}/post/${postId}`);
          if (response.data) {
            setSelectedPostData(response.data);
        } else {
            console.error("게시물 데이터를 가져오지 못했습니다.");
        }
          const owner = response.data.ownerId;
          setOwnerId(owner);
          console.log(owner);
          console.log("HTTP Status Code:", response.status);
          console.log(response.data);
      } catch (err) {
          console.error("Error fetching post data:", err.message);
          console.error("Error fetching post data with status:", err.response?.status);
          console.log(err.message);
          setError(err);
      }
  };

    // GET 선택한 게시물[postId]에 대해서 정보 불러오기
    useEffect(() => {
      fetchPostData();
    }, []);

    const handleFirstSubmit = () => {
      setIsModalOpen(true);
      document.body.style.overflow = "hidden";
  };

  const handleOwnerCard = async () => {
    const ownerResponse = await axios.get(`${server}/card/${ownerId}`);
    console.log(ownerResponse.data);
    setOwner(Array.isArray(ownerResponse.data)? ownerResponse.data : []); // 데이터가 배열이 아니면 배열로 변환
    setIsOwnerModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleSecondSubmit = async () => {
      try {
          const response = await axios.post(
              `${server}/applications/${userId}/${postId}`
          );
          // 서버에서 최신 totalApplicants 값을 받아와서 업데이트
        const updatedPostData = response.data; // POST 응답이 갱신된 post 데이터를 반환한다고 가정
        if (updatedPostData) {
          setSelectedPostData(updatedPostData); // 상태 업데이트
        }
          setIsPostSubmitted(true);
          setIsModalOpen(false); // Close first modal

          // Show second confirmation modal after 2 seconds
          setModalTimer(setTimeout(() => {
              setIsConfirmationVisible(true); // Show success confirmation modal

            // Hide success modal after another 2 seconds
            setTimeout(() => {
                setIsConfirmationVisible(false);
                navigate(`/mypage`); // Navigate to MyPage`); // Optionally navigate to another page after 2 seconds
            }, 2000);
          }));
      } catch (err) {
          alert("지원에 실패했습니다.");
          console.error("Error submitting application:", err);
      } finally {
        // 스크롤 복원
        document.body.style.overflow = "auto";
    }
  };

  const closeModal = () => {
      clearTimeout(modalTimer);
      setIsModalOpen(false);
      setIsOwnerModalOpen(false);
      setIsConfirmationVisible(false);
      document.body.style.overflow = "auto";
      // 지원 완료 시 버튼 텍스트를 변경
      if (isPostSubmitted) {
        fetchPostData(); // 최신 데이터로 갱신
      }
  };

  let result;
  if (owner[0] && owner[0].url) {
      const index = owner[0].url.indexOf('.com');
      result = index !== -1 ? owner[0].url.slice(0, index + 4) : 'URL 없음';
  } else {
      result = 'URL 없음';
  }

  if (error) 
    return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <PageWrapper>
      {selectedPostData ? (
      <>
      <Header>
        <CategoryAndTitle>
          <Category>
            {selectedPostData.category}
          </Category>
          <Title>
            <TitleText>{selectedPostData.title}</TitleText>
            <StyledLink href={selectedPostData.url} target="_blank" rel="noopener noreferrer"
              style={{fontSize: "22px", fontWeight: "500"}}> 
              자세히 보기 &gt;
            </StyledLink>
          </Title>
        </CategoryAndTitle>
      </Header>

          <MainContent>
              {/* 좌측 이미지 박스 */}
              <MainBox>
                  <Image src={selectedPostData.img}/>
              </MainBox>

              {/* 우측 정보 섹션 */}
              <SideBox>
                  {/* 작성자 및 모집 정보 */}
                  <InfoSection>
                      <InfoRow>
                          <InfoLabel>작성자</InfoLabel>
                          <InfoValue>
                            <div style={({whiteSpace:"nowrap"})}>
                              {selectedPostData.ownerName} {/* 작성자의 역량카드 열람 모달 열기 */}
                            </div>
                            <RoleTag onClick={handleOwnerCard}>역량카드</RoleTag>
                          </InfoValue>
                      </InfoRow>
                      <InfoRow>
                          <InfoLabel>모집 날짜</InfoLabel>

                          {/* 모집 마감일 */}
                          <InfoValue>{selectedPostData.date}</InfoValue>
                      </InfoRow>
                      <InfoRow>
                          <InfoLabel>현재 모집 인원</InfoLabel>
                          {/* !ERD member = 현재원 */}
                          <div style={({display:'flex', justifyContent:"row",position:'relative'})}>
                          <InfoValue2>{selectedPostData.approvedCount || 0}</InfoValue2>
                          <span style={({color: "#4E5968", fontSize:"22px",position:'absolute',top:'4px',left:'16px'})}>/{selectedPostData.member || 0}</span>
                          </div>
                      </InfoRow>
                      <InfoRow>
                        <InfoLabel>총 지원자</InfoLabel>
                        <InfoValue>{selectedPostData?.totalApplicants || 0}</InfoValue>
                      </InfoRow>
                  </InfoSection>

                  {/* 모집글 */}
                  <Section>
                      <SectionTitle>모집글</SectionTitle>
                      <Text>{selectedPostData.memo}</Text>
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
                    { (ownerId === userId) ? (
                        <ApplyButton onClick={() => navigate(`/detail/${postId}/applicantlist`)}>지원자 목록 보기</ApplyButton>
                      ) : (
                      <ApplyButton onClick={handleFirstSubmit}> 지원하기 </ApplyButton> 
                      )
                    }
                  </ActionButtons>
                </SideBox>
              </MainContent>

          {/* 모달 지원자용 */}
          {isModalOpen && (
          <ModalOverlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <ModalHeader>
                <ModalTitle>해당 역량카드로 지원 하시겠습니까?</ModalTitle>
                <div style={({display: 'flex', textAlign: 'right'})}>
                  <div>
                    <CloseButton onClick={closeModal}>×</CloseButton>
                    <HeaderButtons>
                      {/* 모달에서 지원하기 */}
                      <SubmitButton onClick={handleSecondSubmit}>지원하기</SubmitButton> 
                    </HeaderButtons>
                  </div>
                </div>
              </ModalHeader>
                
              <Divider/>

              <ModalBody>
                <SectionStyle>작업 스타일</SectionStyle>
                {/* extraData[userId] */}
                <CardGrid>
                  {cardData.map(({ key, title, gridArea }) => (
                  <Card key={key} style={{ gridArea }}>
                    <CardTitle>{title}</CardTitle>
                    <CardContent>
                      {Array.isArray(extraData[0]?.[key]) ? extraData[0][key].map((contentItem, index) => 
                        (<p key={index}>{contentItem}</p>)) : "내용 없음"}
                    </CardContent>
                  </Card>
                  ))}
                  <Card style={{ gridArea: "important"}}>
                    <CardTitle>중요하게 생각해요</CardTitle>
                    <CardContent>
                      {Array.isArray(extraData[0]?.important) ? 
                        (extraData[0].important.map((contentItem, index) => 
                          (<p key={index}>{contentItem}</p>))) : (<p>{extraData[0]?.important || "내용 없음"}</p>)
                      }
                    </CardContent>
                  </Card>
                </CardGrid>
                <div style={({marginTop: '30px'})}/>
                
                <Divider/>
                
                <AdditionalSection>
                  <SectionColumn>
                  <SectionTitle2>경력 / 경험</SectionTitle2>
                  <SectionTitle>툴 / 자격증</SectionTitle>
                      {/* 툴 자격증 */}
                      {Array.isArray(extraData[0]?.tools) ? ( extraData[0].tools.map((contentItem, index) => 
                        (
                          <SectionText key={index}>{contentItem}</SectionText>
                        )
                      )) : (
                          <p>{extraData[0]?.important || "내용 없음"}</p> // 배열이 아닌 경우 처리
                        )
                      }

                      {Array.isArray(extraData[0]?.certificates) ? ( extraData[0].certificates.map((contentItem, index) =>
                        (
                          <SectionText key={index}>{contentItem}</SectionText>
                        )
                      )) : (
                          <p>{extraData[0]?.important || "내용 없음"}</p> // 배열이 아닌 경우 처리
                        )
                      }

                      <SectionTitle>작업물</SectionTitle>
                      {extraData?.[0]?.fileUrl && (
                        <a href={extraData[0].fileUrl} target="_blank" rel="noreferrer" style={{ border: 'none', textDecoration: 'none' }}>
                          <BoxWrapper>
                            <ImagePlaceholder>
                              <ImageStyle src={file} />
                            </ImagePlaceholder>
                            <TextWrapper>
                              <FileName>개인작업물.pdf</FileName>
                              <FileSize>1234KB</FileSize>
                            </TextWrapper>
                          </BoxWrapper>
                        </a>
                        )
                      }
                      {extraData?.[0]?.url && (
                        <a href={extraData[0].url} target="_blank" rel="noreferrer" style={({border:'none',textDecoration:'none'})}>
                          <BoxWrapper>
                            <ImagePlaceholder>
                              <ImageStyle src={link} />
                            </ImagePlaceholder>
                            <TextWrapper>
                              <FileName>{result}</FileName>
                              <FileSize>1234KB</FileSize>
                            </TextWrapper>
                          </BoxWrapper>
                        </a>
                        )
                      }
                  </SectionColumn>
                  
                  <SectionColumn>
                    <div style={({marginTop:'87px'})}/>
                    <div style={({position:'relative'})}>
                      <div>
                        <SectionTitle>경력</SectionTitle>
                        {Array.isArray(extraData[0]?.awards) ? ( extraData[0].awards.map((contentItem, index) =>
                          (
                            <SectionText key={index}>{contentItem}</SectionText>
                          )
                        )) : (
                          <p>{extraData[0]?.awards || "내용 없음"}</p>
                          )
                        }
                      </div>
                      <div style={({position:'absolute',top:'145px',left:'0'})}>
                        <SectionTitle>기타사항</SectionTitle>
                        <SectionArea>{extraData[0]?.additionalInfo}</SectionArea>
                      </div>
                    </div>
                  </SectionColumn>
                </AdditionalSection>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )
      }
    {/* 오너 역량카드 */}
    {isConfirmationVisible && (
      <ModalOverlay color="rgba(0, 0, 0, 0.7)">
        <SuccessMessage>
              <img src={DetailSVG} alt="Success" width="500px" height="500px" />
        </SuccessMessage>
      </ModalOverlay>
      )}</>
      ) : (
        <div>다시해</div>
      )
    }

            {isOwnerModalOpen && (
            <ModalOverlay onClick={closeModal}>
              <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                  <div style={({display: 'flex', textAlign: 'right'})}>
                      <div>
                        <CloseButton onClick={closeModal}>×</CloseButton>
                      </div>
                  </div>
                </ModalHeader>

              <CardContainer2>
                <ImageWrapper>
                  <ProfileImage src={profile} alt="Profile" style={{ width: '100px', height: '100px' }} />
                </ImageWrapper>
                <TextWrapper2>
                  <div style={({display:'flex',justifyContent:'row',alignItems:'center', gap:'12px'})}>
                    <Name>{owner[0].cardName || "이름 없음"}</Name>
                    <Details>{owner[0].identity || "전공 정보 없음"}</Details>
                  </div>
                  <div style={({display:'flex',justifyContent:'row', gap:'12px'})}>
                    <Details2>{owner[0].major || "전공 정보 없음"}</Details2>
                    <div style={({width:'1px',height:'21px',border:'0.5px solid blue'})}/>
                    <Email>{owner[0].email || "이메일 없음"}</Email>
                  </div>
                </TextWrapper2>
              </CardContainer2>
              <SectionStyle>작업 스타일</SectionStyle>

              <Divider/>
              <ModalBody>
                <CardGrid>
                  {cardData.map(({ key, title, gridArea }) => (
                  <Card key={key} style={{ gridArea }}>
                    <CardTitle>{title}</CardTitle>
                    <CardContent>
                      {Array.isArray(owner[0]?.[key]) ? owner[0][key].map((contentItem, index) => 
                        (<p key={index}>{contentItem}</p>)) : "내용 없음"}
                    </CardContent>
                  </Card>
                  ))}
                  <Card style={{ gridArea: "important"}}>
                    <CardTitle>중요하게 생각해요</CardTitle>
                    <CardContent>
                      {Array.isArray(owner[0]?.important) ? 
                        (owner[0].important.map((contentItem, index) => 
                          (<p key={index}>{contentItem}</p>))) : (<p>{owner[0]?.important || "내용 없음"}</p>)
                      }
                    </CardContent>
                  </Card>
                </CardGrid>

                <div style={({marginTop: '30px'})}/>
                <Divider/>

                <AdditionalSection>
                  <SectionColumn>
                    <SectionTitle2>경력 / 경험</SectionTitle2>
                    <SectionTitle>툴 / 자격증</SectionTitle>

                    {Array.isArray(owner[0]?.tools) ? ( owner[0].tools.map((contentItem, index) => 
                      (
                        <SectionText key={index}>{contentItem}</SectionText>
                      )
                    )) : (
                      <p>{owner[0]?.important || "내용 없음"}</p>
                      )
                    }

                    {Array.isArray(owner[0]?.certificates) ? ( owner[0].certificates.map((contentItem, index) => 
                      (
                        <SectionText key={index}>{contentItem}</SectionText>
                      )
                    )) : (
                      <p>{owner[0]?.important || "내용 없음"}</p>
                      )
                    }

                    <SectionTitle>작업물</SectionTitle>
                    <a href={owner[0].img} target="_blank" rel="noreferrer" style={({border:'none',textDecoration:'none'})}>
                      <BoxWrapper>
                        <ImagePlaceholder>
                          <ImageStyle src={file} />
                        </ImagePlaceholder>
                        <TextWrapper>
                          <FileName>개인작업물.pdf</FileName>
                          <FileSize>1234KB</FileSize>
                        </TextWrapper>
                      </BoxWrapper>
                    </a>

                    <a href={owner[0].url} target="_blank" rel="noreferrer" style={({border:'none',textDecoration:'none'})}>
                      <BoxWrapper>
                        <ImagePlaceholder>
                          <ImageStyle src={link} />
                        </ImagePlaceholder>
                        <TextWrapper>
                          <FileName>{result}</FileName>
                          <FileSize>1234KB</FileSize>
                        </TextWrapper>
                      </BoxWrapper>
                    </a>
                  </SectionColumn>

                  <SectionColumn>
                    <div style={({marginTop:'87px'})}/>
                    <div style={({position:'relative'})}>
                      <div>
                        <SectionTitle>경력</SectionTitle>
                        {Array.isArray(owner[0]?.awards) ? ( owner[0].awards.map((contentItem, index) => 
                          (
                            <SectionText key={index}>{contentItem}</SectionText>
                          )
                        )) : (
                        <p>{owner[0]?.awards || "내용 없음"}</p>
                          )
                        }
                      </div>
                      <div style={({position:'absolute',top:'145px',left:'0'})}>
                        <SectionTitle>기타사항</SectionTitle>
                        <SectionArea>{owner[0]?.additionalInfo}</SectionArea>
                      </div>
                    </div>
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
  padding: 0 247px 0 120px;
  margin-bottom: 175px;
  margin-top: 20px;
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

const TitleText = styled.span`
`;

const Title = styled.h1 `
  display: flex;
  align-items: center;
  gap: 14px;
  font-weight: 600;
  font-size: 32px;
`;
const StyledLink = styled.a`
  font-weight: 600;
  font-size: 32px;
  color: #000;
  text-decoration: none;

  &:hover {
    color: #555;
    text-decoration: underline;
  }
`;
const MainContent = styled.div `
  display: flex;
  gap: 44px;

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
  width: 582px;
  height: 820px;
  border-radius: 8px;
  object-fit: contain;
`;

const SideBox = styled.div `
  flex: 1;
  display: flex;
  flex-direction: column;
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
  font-size: 28px;
  display: flex;
  font-weight: 500;
  align-items: center;
  gap: 1rem;
  
`;

const InfoValue2 = styled.span `
  font-size: 28px;
  display: flex;
  font-weight: 500;
  align-items: center;
  gap: 0.5rem;
  margin-top: 8px;
  position: absolute;
  top: -8px;
  left: 0; 
`;


const RoleTag = styled.span `
  background-color: #6c54f7;
  color: white;
  font-size: 18px;
  padding: 0.3rem 0.5rem;
  border-radius: 30px;
  display: inline-block;
  width: 101px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = styled.div `
  padding-bottom: 10px;
  gap: 10px;
`;

const Text = styled.div `
  line-height: 140%;
  font-size: 22px;
  color: #4E5968;
  height: 150px;
  width: 851px;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #DBDBDB;
`;

const Description = styled.div `
  border-radius: 8px;
  line-height: 1.6;
  font-weight: 400;
  color: #4E5968;
  border: 1px solid  #DBDBDB;
  height: 170px;
  padding: 0 20px 0 20px;

`;

const ActionButtons = styled.div `
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 44px;
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
  background: ${({ disabled }) => (disabled ? "var(--Color, #4E5968)" : "#6c54f7")};
  color: white;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  &:hover {
    background: ${({ disabled }) => (disabled ? "var(--Color, #4E5968)" : "#5a3ee6")};
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
  position: relative;
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
  position: relative;
  top: 0;
  right: 0;
  font-size: 2.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding-bottom: 1rem;

  @media (max-width: 1024px) {
    top: 1.5rem;
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
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SectionTitle2 = styled.h4 `
  color: #6C54F7;
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

const CardContainer2 = styled.div`
  width: 493px;
  height: 109px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
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
  color: #6C54F7;
  margin-bottom: 10px;
`;

const Details = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #767676;
  margin-bottom: 4px;
`;

const Details2 = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 4px;
`;

const Email = styled.div`
  font-size: 18px;
  font-weight: 400;
`;

const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 470px;
  height: 52px;
  border-radius: 8px;
  padding: 0 12px;
  margin-bottom: 8px;
  margin-top: 10px;
  border-radius: 8px;
  background: #F0F3FA;
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