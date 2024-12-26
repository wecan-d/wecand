import React from "react";
import styled from "styled-components";

const HomePage = () => {
  return (
    <PageContainer>
      {/* 홈 배경 이미지 */}
      <LandContainer>
        <Overlay>
          <LandButton>내 공모전 랜드 들어가기</LandButton>
        </Overlay>
      </LandContainer>

      {/* 카테고리 , 모집 신청 현황 */}
      <CategoryAndStatus>
        <CategoryContainer>
          
          <CategoryWrapper>
            {Array.from({ length: 10 }).map((_, index) => (
              <CategoryCard key={index}>
                <CardContent />
                <CategoryText>카테고리</CategoryText>
              </CategoryCard>
            ))}
          </CategoryWrapper>
        </CategoryContainer>

        <StatusWrapper>
          <StatusHeader>
            <StatusTitle>모집 신청 현황</StatusTitle>
            <MoreButton>더보기</MoreButton>
          </StatusHeader>
          <StatusContent>
            <StatusList>
              {Array.from({ length: 6 }).map((_, index) => (
                <StatusItem key={index}>
                  아이아이아아
                  <StatusButton>{index === 5 ? "거절" : "수락"}</StatusButton>
                </StatusItem>
              ))}
            </StatusList>
          </StatusContent>
        </StatusWrapper>
      </CategoryAndStatus>

      {/* 새로 올라온 공모전 모집 글 */}
      <NewPostsSection>
        <SectionTitle>새로 올라온 공모전 모집 글</SectionTitle>
        <PostsWrapper>
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCard key={index}>
              <Tag>미술, 디자인</Tag>
              <PostTitle>2024 디자인 공모전 할 사람 구해요</PostTitle>
            </PostCard>
          ))}
        </PostsWrapper>
      </NewPostsSection>
    </PageContainer>
  );
};

export default HomePage;

// Styled Components
const PageContainer = styled.div`
  padding: 4rem;
`;

const LandContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  background-image: url("/assets/land.png");
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LandButton = styled.button`
  padding: 10px 20px;
  background-color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #eee;
  }
`;

const CategoryAndStatus = styled.div`
  display: flex;
  gap: 2rem;
  margin: 2rem 0;
`;

const CategoryContainer = styled.div`
  flex: 7;
  display: flex;
  flex-direction: column;
  background: #EEE;
  justify-content: center;
`;

const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const CardContent = styled.div`
  width: 120px;
  height: 120px;
  background-color:#BFBFBF;
  border-radius: 8px;

  &:hover {
    border: 1px solid black;
  }
`;

const CategoryText = styled.div`
  font-size: 0.9rem;
  color: #333;
`;

const StatusWrapper = styled.div`
  flex: 3;
  background: #7b7b7b;
`;

const StatusHeader = styled.div`
  height: 12%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #555555;
  color: white;
  padding: 0.5rem 1rem;
`;

const StatusTitle = styled.h3`
  margin: 0;
`;

const MoreButton = styled.button`
  background: #888;
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  cursor: pointer;

  &:hover {
    background: #666;
  }
`;

const StatusContent = styled.div`
  background: #d9d9d9;
  padding: 1rem;
`;

const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #d9d9d9;
`;

const StatusButton = styled.button`
  background: white;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const NewPostsSection = styled.section`
  margin: 2rem 0;
`;

const SectionTitle = styled.h2`
  margin-bottom: 1rem;
`;

const PostsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const PostCard = styled.div`
  background-color: white;
  padding: 1rem;
`;

const Tag = styled.div`
  background: #c4c4c4;
  color: black;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  margin-bottom: 0.5rem;
  width: 4rem;
`;

const PostTitle = styled.h3`
  font-size: 1rem;
  color: #333;
`;