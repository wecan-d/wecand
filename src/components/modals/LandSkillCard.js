import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import profile from "../../assets/profile.png";
import { IoMdClose } from "react-icons/io";


const LandSkillCard = ({
  isOpen, 
  onClose, 
  userInfo = {}, 
  positionTop,
  positionLeft,
  centerByTransform
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allCards = [
    { id: 'communication', title: '소통', content: ['비대면 소통을 선호해요', '새벽연락도 가능해요'] },
    { id: 'work', title: '작업', content: ['다같이 작업하고 싶어요', '평일에 하고 싶어요'] },
    { id: 'thinking', title: '사고', content: ['논리적이에요', '창의적이에요'] },
    { id: 'role', title: '역할', content: ['리더십이 있어요', '기록을 잘 남겨요'] },
    { id: 'conflict', title: '갈등 해결', content: ['바로 해결해요', '솔직하게 표현해요'] },
    { id: 'time', title: '시간', content: ['오전(06-12)', '저녁(18-00)', '오전(06-12)', '오전(06-12)', '오전(06-12)'] },
    { id: 'rest', title: '휴식', content: ['짧게 자주 쉬고 싶어요'] },
    { id: 'friendship', title: '친목', content: ['작업에만 집중하고 싶어요'] },
    { id: 'important', title: '중요하게 생각해요', content: ['팀플 시간을 꼭 지켜주기'] },
  ];

  return (
    <ModalContent ref={modalRef} onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose}><IoMdClose /></CloseButton>
      <Header>
        <ProfileImage src={profile} alt="프로필 이미지" />
        <UserInfoText>
          <UserInfoTitle>
            <UserName>김규리</UserName>
            <UserDetail>20세, 여성</UserDetail>
          </UserInfoTitle>
          <UserSchool>계명대학교 시각디자인학과 3학년</UserSchool>
          <UserEmail>jjanggu1083@naver.com</UserEmail>
        </UserInfoText>
      </Header>
      
      <Divider />

      <SectionTitle>작업 스타일</SectionTitle>
      <CardGrid>
        {allCards.map((card) => (
          <Card
            key={card.id}
            style={{ gridArea: card.id }}
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
  );
}

const ModalContent = styled.div`
  position: absolute;
  top: 5vh;
  left: 30px;

  background: white;
  width:520px;
  height: 90vh;
  border-radius: 16px;
  padding: 33px;
  padding-top: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 30px;
  color: #000;
  cursor: pointer;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 90px;
  height: 90px;
  margin-right: 20px;
`;

const UserInfoText = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
`;

const UserInfoTitle = styled.div`
  display: flex;
  gap: 10px;
  align-items: baseline;
`;

const UserName = styled.p`
  color: #6C54F7;
  font-size: 30px;
  font-weight: bold;
  margin: 0;
`;

const UserDetail = styled.p`
  font-size: 18px;
  color: #767676;
  margin: 0;
`;


const UserSchool = styled.p`
  color: #111;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  margin-top: 14px;
  margin-bottom: 10px;
`;

const UserEmail = styled.p`
  color: #111;
  font-family: Pretendard;
  font-size: 18px;
  font-weight: 400;
  margin: 0;
`;

const Divider = styled.hr`
  width: 100%;
  border: 1px solid #6C54F7;
  margin: 30px 0;
`;

const SectionTitle = styled.h3`
  color: #111;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  margin-top: 0;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 225px 225px;
  grid-auto-rows: minmax(120px, auto);
  gap: 14px;
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
  margin-bottom: 10px;
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

export default LandSkillCard;