import React from "react";
import styled from "styled-components";
import { useState,useEffect } from "react";

export default function DetailPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 body 스타일 초기화
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <PageWrapper>
      {/* 페이지 헤더 */}
      <Header>
        <CategoryAndTitle>
          <Category>미술,디자인</Category>
          <Title>2024 어도비 디자인 공모전</Title>
        </CategoryAndTitle>
      </Header>


      <MainContent>
        {/* 좌측 이미지 박스 */}
        <MainBox>
          <Image src="/logo/image.svg" />
        </MainBox>

        {/* 우측 정보 섹션 */}
        <SideBox>
          {/* 작성자 및 모집 정보 */}
          <InfoSection>
            <InfoRow>
              <InfoLabel>작성자</InfoLabel>
              <InfoValue>
                박경민 <RoleTag>역량카드</RoleTag>
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>모집 날짜</InfoLabel>
              <InfoValue>2025.02.01</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>현재 모집 인원</InfoLabel>
              <InfoValue>2/3</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>총 지원자</InfoLabel>
              <InfoValue>1,200</InfoValue>
            </InfoRow>
          </InfoSection>

          {/* 모집글 */}
          <Section>
            <SectionTitle>모집글</SectionTitle>
            <Text>
              총 상금 2400만원 같이 따실 분 구합니다.
              <br />
              <br />
              많이 지원해주세요! 열정 넘치는 분이라면 플러스 요인이 됩니다!
              <br />
              저는 열정만 있다면 잘할 수 있다고 생각합니다 ㅎㅎ
            </Text>
          </Section>

          {/* 자격 요건 */}
          <Section>
            <SectionTitle>자격 요건</SectionTitle>
            <Description>
              <UnorderedList>
                <ListItem>밝은 성격을 가지신 분</ListItem>
                <ListItem>열정 넘치시는 분</ListItem>
                <ListItem>협업을 좋아하는 사람</ListItem>
                <ListItem>피그마 하실 줄은 알아요</ListItem>
                <ListItem>
                  일러스트 잘하시는 분이면 더욱 좋아요!!!
                </ListItem>
              </UnorderedList>
            </Description>
          </Section>

          {/* 버튼 */}
          <ActionButtons>
            <LinkButton>공모전 확인하기</LinkButton>
            <ApplyButton onClick={openModal}>지원하기</ApplyButton>
          </ActionButtons>
        </SideBox>
      </MainContent>







    {/* 모달 */}
{isModalOpen && (
  <ModalOverlay onClick={closeModal}>
  <ModalContent onClick={(e) => e.stopPropagation()}>

    <ModalHeader>
      <ModalTitle>해당 공모전 팀에 지원하시겠어요?</ModalTitle>
      <div style={({display:'flex', textAlign: 'right'})}>
        <div>
      <CloseButton onClick={closeModal}>×</CloseButton>
      <HeaderButtons>
        <EditButton>역량 카드 수정</EditButton>
        <SubmitButton>제출하기</SubmitButton>
      </HeaderButtons>
      </div>
    </div>
    </ModalHeader>
    <Divider />
    <ModalBody>
      <SectionTitle>저장된 내 역량카드</SectionTitle>



      {/* 카드 그리드 카드 그리드 카드 그리드 */}
      <CardGrid>
  <Card style={{ gridArea: "communication" }}>
    <CardTitle>소통</CardTitle>
    <CardContent>
      <p>비대면 소통을 선호해요</p>
      <p>새벽연락도 가능해요</p>
    </CardContent>
  </Card>
  <Card style={{ gridArea: "work" }}>
    <CardTitle>작업</CardTitle>
    <CardContent>
      <p>다같이 작업하고 싶어요</p>
      <p>평일에 하고 싶어요</p>
    </CardContent>
  </Card>
  <Card style={{ gridArea: "thinking" }}>
    <CardTitle>사고</CardTitle>
    <CardContent>
      <p>논리적이에요</p>
      <p>창의적이에요</p>
    </CardContent>
  </Card>
  <Card style={{ gridArea: "role" }}>
    <CardTitle>역할</CardTitle>
    <CardContent>
      <p>리더십이 있어요</p>
      <p>기록을 잘 남겨요</p>
    </CardContent>
  </Card>
  <Card style={{ gridArea: "conflict" }}>
    <CardTitle>갈등 해결</CardTitle>
    <CardContent>
      <p>바로 해결해요</p>
      <p>솔직하게 표현해요</p>
    </CardContent>
  </Card>
  <Card style={{ gridArea: "time" }}>
    <CardTitle>시간</CardTitle>
    <CardContent>
      <p>오전(06-12)</p>
      <p>저녁(18-00)</p>
    </CardContent>
  </Card>
  <Card style={{ gridArea: "rest" }}>
    <CardTitle>휴식</CardTitle>
    <CardContent>
      <p>짧게 자주 쉬고 싶어요</p>
    </CardContent>
  </Card>
  <Card style={{ gridArea: "friendship" }}>
    <CardTitle>친목</CardTitle>
    <CardContent>
      <p>작업에만 집중하고 싶어요</p>
    </CardContent>
  </Card>
  <Card style={{ gridArea: "important" }}>
    <CardTitle>중요하게 생각해요</CardTitle>
    <CardContent>
      <p>팀플 시간을 꼭 지켜주기</p>
    </CardContent>
  </Card>
</CardGrid>

  
      <AdditionalSection>
        <SectionColumn>
          <SectionTitle>경력 / 경험</SectionTitle>
          <p>삼성 디자인 멤버십 수료</p>
          <p>2020 해커톤 대상</p>
          <p>피그마, 어도비 사용 가능</p>
        </SectionColumn>
        <SectionColumn>
          <SectionTitle>기타사항</SectionTitle>
          <p>작성된 글이 없습니다.</p>
        </SectionColumn>
      </AdditionalSection>
    </ModalBody>
  </ModalContent>
</ModalOverlay>
)}


    </PageWrapper>
  );
}

// Styled Components
const PageWrapper = styled.div`
  display: flex;
  /* height: 100vh; */
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

const Header = styled.header`
  

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const CategoryAndTitle = styled.div`
  display: flex;
  flex-direction: column;
`;

const Category = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #6c54f7;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainBox = styled.div`
  
  display: flex;
  justify-content: center;
  align-items: center;
  


  @media (max-width: 768px) {
    flex: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  max-width: 80%; /* 너비를 90%로 줄임 */
  max-height: 100%; /* 높이를 90%로 줄임 */
  
  
  
  border-radius: 8px;
`;

const SideBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;


const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  &:not(:last-child) {
    margin-right: 1.5rem; /* 행 사이 간격 */
  }
`;


const InfoLabel = styled.span`
  font-size: 0.9rem;
  color: #888;
  
`;

const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem; /* 역할 태그와 텍스트 간 간격 */
`;


const RoleTag = styled.span`
  background-color: #6c54f7;
  color: white;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  display: inline-block;
`;

const Section = styled.div``;



const Text = styled.p`
  line-height: 1.6;
`;

const Description = styled.div`
  background: #f0f3fa;
  padding: 1rem;
  border-radius: 8px;
  line-height: 1.6;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const LinkButton = styled.button`
  
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

const UnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 0.8rem;
  position: relative;
  padding-left: 1.5rem;

  &:before {
    content: "•";
    color: #6c6c6c;
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  position: relative; /* 자식 요소가 부모를 기준으로 위치하도록 설정 */
  display: flex;
  justify-content: space-between;
  align-items: center;

`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #6C54F7;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 1rem;
  
`;

const EditButton = styled.button`
  background-color: #f3f3f3;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid black;
`;

const SubmitButton = styled(EditButton)`
  background-color: #6c54f7;
  color: white;
  border: none;
`;

const CloseButton = styled.button`
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

const Divider = styled.hr`
  margin: 1rem 0;
  border: none;
  border-top: 1px solid #6C54F7;;
`;

const ModalBody = styled.div`
  
`;


const AdditionalSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
`;

const SectionColumn = styled.div`
  flex: 1;
  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const SectionTitle = styled.h4`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 4fr);
  gap: 1rem;
  grid-template-areas:
  "communication work thinking role"
  "communication work thinking role"
  "conflict time rest friendship"
  "conflict time important important";
`;

const Card = styled.div`
  background: #f0f3fa;
  padding: 1rem;
  border-radius: 8px;
`;

const CardTitle = styled.div`
  background: #6c54f7;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  display: inline-block;
  margin-bottom: 0.5rem;
`;

const CardContent = styled.div`
  font-size: 0.9rem;
  color: #6c6c6c;
`;
