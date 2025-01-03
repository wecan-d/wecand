import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import landcard0 from '../../assets/homepage/landcard0.svg';
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
  background-color: ${( isempty ) => (isempty ? '#F0F3FA' : '#F0F3FA')};
`;

const LandCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const JoinNewLand = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  text-align: center;
  color: #111;

  background-color: #FFF; // TODO: 투명도 70%
  z-index: 10;
  font-weight: 500;

  border-radius: 16px;
  transform: translate(-50%, -50%);
  opacity: 0.7;
  
  font-size: 16px;
  padding: 10px 15px;

  width: 250px;
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
    0: landcard0,
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

  // console.log("아일랜드 찍는 중", "mem:", mem, "imageKey", imageKey);
  return (
    <LandCardWrapper 
      isempty={ ((imageKey!==1) && (mem === 0))? 0 : 1 } 
      onClick={handleCardClick}
    >
      { ((imageKey!==1) && (mem === 0)) ? 
          (<></>) : 
          (
            (id===0)? (
              <React.Fragment>
                <LandCardImage src={landcard0} alt={title} />
                <JoinNewLand>새로운 공모전에 참여해보세요</JoinNewLand>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  <LandCardImage src={imageSrc} alt={title} />
                  <Title>{title}</Title>
                  <Role>{roleLabel}</Role>
                  <Status>종료</Status>
                  <MemberCount src={profile} />
                </React.Fragment>
            )
          )
      }

      {/* {id !== 0 && imageSrc && <LandCardImage src={imageSrc} alt={title} />} */}
      {/* <CardInfo> */}
      {/*
        <Num>{imageKey}</Num>
        <Title>{title}</Title>
        <Role>{roleLabel}</Role>
        <Status>종료</Status>
        <MemberCount src={profile} /> 
      */}
      {/* </CardInfo> */}
    </LandCardWrapper>
  );
};

export default LandCard;
