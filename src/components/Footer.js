import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      
      <TopContainer>
        <LeftSection>
            <Logo src="/logo/logo2.svg" alt="Logo" />
          <TextWrapper>
            <Title>공모전 팀을 꾸리는 공간</Title>
            <Brand>Wecand:</Brand>
          </TextWrapper>
        </LeftSection>
        <RightSection>
          <p>ⓒ 2025 Gem민이들 All rights reserved.</p>
        </RightSection>
      </TopContainer>

      <BottomContainer>
        <BottomText>
          인터넷으로 공모전 팀원을 찾고
        </BottomText>
        <BottomText>
          그 팀원에 대해 쉽게 알 수 있는 Wecand:
        </BottomText>
      </BottomContainer>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  width: 100%;
  background-color: #EEE;
  padding: 3rem 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 500;
  align-items: flex-start;
`;

const TopContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 20%;
  margin-bottom: 2rem;
  font-size: 1.2rem;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled.img`
  width: 60px;
  height: 60px;
`;



const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.8rem;
`;

const Title = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
`;

const Brand = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: #333;
`;

const RightSection = styled.div`
  
`;

const BottomContainer = styled.div`
  margin-top: 1rem;
  width: 100%;
`;

const BottomText = styled.p`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
`;