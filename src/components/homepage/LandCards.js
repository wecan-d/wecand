import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import landcard1 from '../../assets/homepage/landcard1.svg';
import landcard2 from '../../assets/homepage/landcard2.svg';
import landcard3 from '../../assets/homepage/landcard3.svg';
import landcard4 from '../../assets/homepage/landcard4.svg';

import profile from '../../assets/profile.png'

// 스타일드 컴포넌트 정의
const LandCardWrapper = styled.div`
  width: 360px;
  height: 457px;
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  background-color: ${({ isEmpty }) => (isEmpty ? '#F0F3FA' : 'transparent')};
`;

const LandCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CardInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  border-radius: 5px;
`;

const Title = styled.p`
  position: absolute;
  top: 50px;
  left: 30px;
  font-size: 28px;
  font-weight: 600;
  color: white;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Role = styled.p`
  position: absolute;
  top: 100px;
  left: 30px;

  color: white;
  font-size: 18px;
`;

const MemberCount = styled.img`
  position: absolute;
  left: 30px;
  bottom: 30px;

  width: 42px;

`;

const Num = styled.p`
  position: absolute;
  width: 35px;
  height: 35px;
  top: 20px;
  left: 30px;

  border-radius: 20px;
  background-color: white;

  text-align: center;

  /* transform: translate(-50%, -50%); */
`;

const Status = styled.p`
  position: absolute;
  top: 30px;
  right: 30px;
  font-size: 18px;
  color: white;
`;


const LandCard = ({ id, title, role, mem, imageKey }) => {
  const navigate = useNavigate();

  // 역할에 따른 표시 텍스트
  const roleLabel = role === 'owner' ? '팀장' : '팀원';

  const imageMapping = {
    1: landcard1,
    2: landcard2,
    3: landcard3,
    4: landcard4,
  };

  // 이미지가 없으면 기본 이미지나 null 처리
  const imageSrc = imageMapping[imageKey] || null;

  const handleCardClick = () => {
    if (id !== 0) {
      navigate(`/land/${id}`);
    }
  };

  return (
    <LandCardWrapper 
      isEmpty={id === 0} 
      onClick={handleCardClick}
    >
      {id !== 0 && imageSrc && <LandCardImage src={imageSrc} alt={title} />}
      {/* <CardInfo> */}
        <Num>{imageKey}</Num>
        <Title>{title}</Title>
        <Role>{roleLabel}</Role>
        <Status>종료</Status>
        <MemberCount src={profile} />
      {/* </CardInfo> */}
    </LandCardWrapper>
  );
};

export default LandCard;
