import React from "react";
import styled from "styled-components";

const SearchResults = ({ data }) => {
  if (data.length === 0) {
    return <NoResults>검색 결과가 없습니다.</NoResults>;
  }

  return (
    <ResultsContainer>
      {data.map((item) => (
        <ResultCard key={item.id}>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
        </ResultCard>
      ))}
    </ResultsContainer>
  );
};

export default SearchResults;

// Styled Components
const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const ResultCard = styled.div`
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1.2rem;
`;

const Description = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const NoResults = styled.div`
  text-align: center;
  color: #999;
  font-size: 1rem;
`;