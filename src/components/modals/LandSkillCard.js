import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function LandSkillCard() {

  const allCards = [
    { id: 'communication', title: '소통', content: ['비대면 소통을 선호해요', '새벽연락도 가능해요'] },
    { id: 'work', title: '작업', content: ['다같이 작업하고 싶어요', '평일에 하고 싶어요'] },
    { id: 'thinking', title: '사고', content: ['논리적이에요', '창의적이에요'] },
    { id: 'role', title: '역할', content: ['리더십이 있어요', '기록을 잘 남겨요'] },
    { id: 'conflict', title: '갈등 해결', content: ['바로 해결해요', '솔직하게 표현해요'] },
    { id: 'time', title: '시간', content: ['오전(06-12)', '저녁(18-00)'] },
    { id: 'rest', title: '휴식', content: ['짧게 자주 쉬고 싶어요'] },
    { id: 'friendship', title: '친목', content: ['작업에만 집중하고 싶어요'] },
    { id: 'important', title: '중요하게 생각해요', content: ['팀플 시간을 꼭 지켜주기'] },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]); // 선택된 카드 상태


  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const toggleCardSelection = (id) => {
    setSelectedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    return () => {
      // 컴포넌트 언마운트 시 body 스타일 초기화
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <PageContainer>
        {/* 페이지 본문 */}
        <button onClick={openModal}>모달 열기</button>
      </PageContainer>

      {/* 모달 */}
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <Header>
              <UserInfo>
                <ProfileImage src="/profile.png" alt="프로필 이미지" />
                <UserInfoText>
                  <div style={({display:'flex',justifyContent:'row'})}>
                  <UserName>김규리</UserName>
                  <UserDetail>20살 여자</UserDetail>
                  </div>
                  <UserSchool>계명대학교 시각디자인학과 3학년</UserSchool>
                  <UserEmail>jjanggu1083@naver.com</UserEmail>
                </UserInfoText>
              </UserInfo>
              <CloseButton onClick={closeModal}>×</CloseButton>
            </Header>
            
            <Divider />
            <SectionTitle>작업 스타일</SectionTitle>


            <CardGrid>
              {allCards.map((card) => (
                <Card
                  key={card.id}
                  style={{ gridArea: card.id }}
                  onClick={() => toggleCardSelection(card.id)}
                  selected={selectedCards.includes(card.id)}
                >
                  <CardTitle>{card.title}</CardTitle>
                  <CardContent>
                    {card.content.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </CardGrid>



            <Divider />
            <Section>
              <SectionTitle>경력 / 경험</SectionTitle>
              <CardContent>
                <p>삼성 디자인 멤버십 수료</p>
                <p>2020 해커톤 대상</p>
                <p>피그마, 어도비 사용 가능</p>
                <FileLink>잼민이를.pdf 1234KB</FileLink>
                <Link href="https://www.figma.com">www.figma.com</Link>
              </CardContent>
            </Section>
            <Divider />
            <Section>
              <SectionTitle>기타사항</SectionTitle>
              <p>아직 작성된 글이 없습니다.</p>
            </Section>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
}

// Styled Components는 동일

// Styled Components
const PageContainer = styled.div`
  padding: 20px;
  overflow: hidden;
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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 538px;
  height: 90vh;
  border-radius: 16px;
  padding: 43px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px; /* 프로필 이미지와 텍스트 간격 */
  position: relative;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 16px;
`;

const UserInfoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h2`
  color: #6C54F7;
font-family: Pretendard;
font-size: 32px;
font-style: normal;
font-weight: 700;
line-height: 140%; /* 44.8px */
margin: 0;
`;

const UserDetail = styled.p`
  font-size: 22px;
  font-weight: 500;
  color: #767676;
  margin: 0;
  line-height: 140%;
  letter-spacing: -0.44px;
  
`;


const UserSchool = styled.p`
  color: #111;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 500;

letter-spacing: -0.36px;
`;

const UserEmail = styled.p`
color: #111;
font-family: Pretendard;
font-size: 18px;
font-weight: 400;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  color: #6c6c6c;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 16px;
`;

const Divider = styled.hr`
  width: 456px;
height: 0px;
flex-shrink: 0;
border: 1px solid #6C54F7;
margin-top: 30px;
`;

const SectionTitle = styled.h3`
    color: #111;
font-family: Pretendard;
font-size: 22px;
font-style: normal;
font-weight: 600;
line-height: normal;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 225px 225px;
  grid-auto-rows: minmax(120px, auto);
  gap: 16px;
  grid-template-areas:
    "communication work"
    "communication work"
    "thinking role"
    "thinking role"
    "conflict time"
    "conflict time"
    "rest friendship"
    "important important";
`;

const Card = styled.div`
  background-color:#F0F3FA;
  border-radius: 8px;
  padding: 0 16px;
`;

const CardTitle = styled.h4`
  
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

const CardContent = styled.div`
 font-size: 18px;
  font-weight: 400;
  color: #111111;
`;

const FileLink = styled.div`
  font-size: 0.9rem;
  color: #0073e6;
  margin-top: 8px;
`;

const Link = styled.a`
  font-size: 0.9rem;
  color: #0073e6;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Section = styled.section`
  margin-bottom: 32px;
  &:last-child {
    margin-bottom: 0;
  }
`;
