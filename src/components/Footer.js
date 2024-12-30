import React from "react";
import styled from "styled-components";
import footer from "../assets/homepage/realfinalfooter.svg"

const Footer = () => {
  return (
    <FooterContainer>
        <Logo src={footer}alt="Wecand Logo" />
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: flex;
  
  align-items: center;
  width: 1726px;
  height: 294px;
  background-color: #ffffff;
  
  
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
`;
