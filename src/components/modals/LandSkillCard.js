import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import profile from "../../assets/profile.png";
import { IoMdClose } from "react-icons/io";


const LandSkillCard = ({
  isOpen, 
  onClose, 
  userInfo, 
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
    { id: 'communication', title: '소통' },
    { id: 'teamwork', title: '작업' },
    { id: 'thinking', title: '사고' },
    { id: 'role', title: '역할' },
    { id: 'conflictResolution', title: '갈등 해결' },
    { id: 'timePreference', title: '시간' },
    { id: 'restPreference', title: '휴식' },
    { id: 'friendship', title: '친목' },
    { id: 'important', title: '중요하게 생각해요' },
  ];

  console.log(userInfo);

  return (
    <ModalContent ref={modalRef} onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose}><IoMdClose /></CloseButton>
      <Header>
        <ProfileImage src={profile} alt="프로필 이미지" />
        <UserInfoText>
          <UserInfoTitle>
            <UserName>{userInfo.name}</UserName>
            <UserDetail>{userInfo.age}세, {userInfo.gender}</UserDetail>
          </UserInfoTitle>
          <UserSchool>{userInfo.identity}</UserSchool>
          <UserEmail>{userInfo.email}</UserEmail>
        </UserInfoText>
      </Header>
      
      <Divider />

      <SectionTitle>작업 스타일</SectionTitle>
      <CardGrid>
        {allCards.map((card) => { 
          const content = userInfo[card.id];
          let contentItems = [];
          if(Array.isArray(content)) {
            contentItems = content;
          } else if (typeof content === 'string') {
            contentItems = [content];
          }

          return (
            <Card
              key={card.id}
              style={{ gridArea: card.id }}
            >
              <CardTitle>{card.title}</CardTitle>
              <CardContent>
                {contentItems && contentItems.length > 0 ? (contentItems.map((item, index) => (
                  <p key={index}>{item}</p>
                ))
              ): (<p></p>)}
              </CardContent>
            </Card>
          );
        })}
      </CardGrid>

      <Divider />

      <Section>
        <SectionTitle>경력 / 경험</SectionTitle>
        {(userInfo.certificates?.length > 0 || userInfo.tools?.length > 0) && (
          <>
            <SectionSubTitle>툴 / 자격증</SectionSubTitle>
            <CardContent>
              {userInfo.certificates?.map((cert, index) => (
                <p key={`cert-${index}`}>{cert}</p>
              ))}
              {userInfo.tools?.map((tool, index) => (
                <p key={`tool-${index}`}>{tool}</p>
              ))}
            </CardContent>
          </>
        )}
        {userInfo.awards?.length > 0 && (
          <>
            <SectionSubTitle>경력 / 경험</SectionSubTitle>
            <CardContent>
              {userInfo.awards.map((award, index) => (
                <p key={`award-${index}`}>{award}</p>
              ))}
            </CardContent>
          </>
        )}
        {userInfo.portfolio?.length > 0 && (
          <>
            <SectionSubTitle>작업물</SectionSubTitle>
            <CardContent>
              {userInfo.portfolio.map((item, index) => (
                <p key={`portfolio-${index}`}>{item}</p>
              ))}
            </CardContent>
          </>
        )}
      </Section>
      <Divider />
      <Section>
        <SectionTitle>기타사항</SectionTitle>
        <p>{userInfo.addtionalInfo}</p>
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

const SectionSubTitle = styled(SectionTitle)`
  font-size: 18px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 225px 225px;
  grid-auto-rows: auto;
  gap: 14px;
  grid-template-areas:
    "communication teamwork"
    "communication teamwork"
    "thinking role"
    "thinking role"
    "conflictResolution timePreference"
    "conflictResolution timePreference"
    "restPreference friendship"
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
  /* margin-bottom: 32px; */
  &:last-child {
    margin-bottom: 0;
  }
`;

export default LandSkillCard;