// SkillCardModal.js
import React from "react";
import styled from "styled-components";

/**
 * @param {boolean}   isOpen         모달 열림/닫힘 상태
 * @param {function}  onClose        모달 닫기 함수 (사용 시 필요)
 * @param {object}    userInfo       모달에 표시할 사용자 정보
 * @param {string}    positionTop    모달의 top 위치 (기본값: "50%")
 * @param {string}    positionLeft   모달의 left 위치 (기본값: "50%")
 * @param {boolean}   centerByTransform  모달을 중앙에 맞출지 여부 (기본값: true)
 */
function SkillCardModal({
  isOpen,
  onClose,
  userInfo = {},
  positionTop = "50%",
  positionLeft = "50%",
  centerByTransform = true,
}) {
  if (!isOpen) return null;

  const {
    profileImage,
    name,
    age,
    gender,
    affiliation,
    email,
    workStyle,
    hardSkills,
  } = userInfo;

  return (
    <ModalContainer
      top={positionTop}
      left={positionLeft}
      center={centerByTransform}
    >
      <ProfileSection>
        <ProfileImage src={profileImage} alt="Profile" />
        <Name>{name}</Name>
        <InfoText>나이: {age}</InfoText>
        <InfoText>성별: {gender}</InfoText>
        <InfoText>소속: {affiliation}</InfoText>
        <InfoText>이메일: {email}</InfoText>
      </ProfileSection>
      <Divider />
      <WorkStyleSection>
        <SectionTitle>작업 스타일</SectionTitle>
        <Description>{workStyle}</Description>
      </WorkStyleSection>
      <Divider />
      <HardSkillSection>
        <SectionTitle>하드 스킬</SectionTitle>
        <SkillList>
          {hardSkills && hardSkills.length > 0 ? (
            hardSkills.map((skill, idx) => (
              <SkillItem key={idx}>{skill}</SkillItem>
            ))
          ) : (
            <Description>등록된 하드스킬이 없습니다.</Description>
          )}
        </SkillList>
      </HardSkillSection>
    </ModalContainer>
  );
}

export default SkillCardModal;

/* ===================== styled-components ===================== */

/**
 * ModalContainer:
 *  - position: fixed
 *  - props로 받은 top, left를 적용
 *  - center prop에 따라 transform으로 중앙 정렬 여부 결정
 */
const ModalContainer = styled.div`
  position: fixed;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  
  /* 
    center가 true면, (top,left) 기준에서 -50%만큼 이동해서 '중앙 정렬' 
    false면, transform을 제거 (직접 원하는 위치 지정)
  */
  transform: ${({ center }) => (center ? "translate(-50%, -50%)" : "none")};

  background-color: #fff;
  border-radius: 16px;
  width: 350px;       /* 가로 크기 - 필요하면 조절 */
  max-height: 80vh;   /* 화면 높이 80%까지 */
  overflow-y: auto;   /* 내용 넘치면 스크롤 */
  padding: 24px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 9999;
`;

/** 프로필 섹션 */
const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  margin-bottom: 16px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%; 
  object-fit: cover;
  margin-bottom: 12px;
`;

const Name = styled.h2`
  margin: 0 0 8px;
  font-size: 1.25rem;
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #444;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 16px 0;
`;

const WorkStyleSection = styled.div`
  margin-bottom: 16px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1.1rem;
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #444;
`;

const HardSkillSection = styled.div`
  margin-bottom: 16px;
`;

const SkillList = styled.ul`
  list-style: disc;
  margin: 0;
  padding-left: 18px;
`;

const SkillItem = styled.li`
  font-size: 0.9rem;
  color: #444;
`;
