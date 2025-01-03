import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// Styled Component
const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 12px 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 16px;
  cursor: pointer;
  /* transition: box-shadow 0.3s; */
  
  width: auto;
  height: 50px;
  background-color: #f0f3fa;
  white-space: nowrap;

  /* &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  } */

  gap: 17px;
  // 동적으로 높이를 title 길이에 맞게 조정
  /* width: ${(props) => `${props.titleLength + 50}px`}; */
`;

const Title = styled.p`
  margin: 0;
  font-size: 19px;
  font-weight: 500;
  color: #111;
  text-align: left;
`;

const StatusBox = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  height: 32px;
  background-color: white;
  gap: 10px;
  font-size: 17px;
  font-weight: 500;
`;

const StatusColor = styled.div`
  background-color: ${(props) => props.clr};
  border-radius: 20px;
  width: 18px;
  height: 18px;
`;

// Component
export const TeamAllowStateBox = ({ id, title, status }) => {
  const navigate = useNavigate();

  // 상태에 따른 이미지 경로
  const statusText = {
    APPROVED: "수락",
    PENDING: "대기 중",
    REJECTED: "거절",
  };

  const statusColor = {
    APPROVED: "#54B8A7",
    PENDING: "#EF8C3E",
    REJECTED: "#D74F8B",
  }

  const handleClick = () => {
    if(id !== 0) navigate(`/details/${id}`);
  };

    /* <Box onClick={handleClick} titleLength={title.length * 10}> */
  return (
    <Box onClick={handleClick} >
      <Title>{title}</Title>
      <StatusBox>
        {statusText[status] || "거절됨"}
        <StatusColor clr={statusColor[status] || "#D7F48B"} />
      </StatusBox>
    </Box>
  );
};