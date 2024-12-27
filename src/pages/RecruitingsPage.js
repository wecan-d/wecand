import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const RecruitmentPage = () => {

  const { category } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(category || "all");

  const categories = [
    { id: "design", name: "디자인" },
    { id: "art", name: "미술" },
    { id: "media", name: "영상/미디어" },
    { id: "programming", name: "프로그래밍" },
    { id: "business", name: "창업/비즈니스" },
    { id: "photography", name: "사진" },
    { id: "literature", name: "문학/에세이" },
    { id: "music", name: "음악/공연" },
    { id: "volunteering", name: "사회공헌/봉사" },
  ];

  const contests = [
    {
      category: "design",
      title: "2024 Adobe Design Contest",
      description:
        "Looking for responsible and skilled illustrators. Everyone is welcome to apply!",
      author: "Kim Gyuri",
      deadline: "D-31",
      recruitmentStatus: "2/5",
      applicants: 5,
    },
    {
      category: "design",
      title: "2024 Adobe Design Contest",
      description:
        "Looking for responsible and skilled illustrators. Everyone is welcome to apply!",
      author: "Kim Gyuri",
      deadline: "D-31",
      recruitmentStatus: "2/5",
      applicants: 5,
    },
    {
      category: "art",
      title: "Art Contest A",
      description:
        "Join our art contest and showcase your creativity to the world!",
      author: "Lee Sunwoo",
      deadline: "D-15",
      recruitmentStatus: "3/7",
      applicants: 12,
    },
    {
      category: "media",
      title: "Media Production Contest",
      description:
        "We need talented media creators. Apply now to join our project!",
      author: "Park Jihoon",
      deadline: "D-10",
      recruitmentStatus: "4/10",
      applicants: 20,
    },
    {
      category: "programming",
      title: "2024 Programming Hackathon",
      description:
        "Are you a skilled programmer? Join us for an intense 48-hour coding event!",
      author: "Choi Minji",
      deadline: "D-20",
      recruitmentStatus: "5/10",
      applicants: 25,
    },
    {
      category: "literature",
      title: "Essay and Literature Contest",
      description:
        "Showcase your writing skills and win amazing prizes in our contest!",
      author: "Han Seojin",
      deadline: "D-5",
      recruitmentStatus: "6/8",
      applicants: 18,
    },
    {
      category: "business",
      title: "Startup and Business Idea Contest",
      description:
        "Have a groundbreaking business idea? Share it and make it a reality!",
      author: "Jung Hyesoo",
      deadline: "D-12",
      recruitmentStatus: "3/6",
      applicants: 10,
    },
    {
      category: "photography",
      title: "Photography Contest B",
      description:
        "Capture the best moments and share your photography skills with us!",
      author: "Kim Joonho",
      deadline: "D-25",
      recruitmentStatus: "2/5",
      applicants: 8,
    },
    {
      category: "music",
      title: "Music and Performance Contest",
      description:
        "If you have a passion for music and performance, this contest is for you!",
      author: "Kang Yejin",
      deadline: "D-18",
      recruitmentStatus: "4/8",
      applicants: 14,
    },
    {
      category: "volunteering",
      title: "Social Contribution Contest",
      description:
        "Create impactful social projects and join our volunteering contest!",
      author: "Moon Taeho",
      deadline: "D-8",
      recruitmentStatus: "5/10",
      applicants: 20,
    },
  ];
  

  const filteredContests = selectedCategory === "all"
    ? contests
    : contests.filter((contest) => contest.category === selectedCategory);
  
  return(
  <PageContainer>
      {/* 카테고리 섹션 */}
      
      <CategoryContainer>
        <CategoryTitle>카테고리</CategoryTitle>
        <CategoryWrapper>
    {Array.from({ length: 10 }).map((_, index) => {
      const contest = filteredContests[index]; // filteredContests에서 데이터를 가져옴
      return (
        <CategoryItem key={index}>
          {contest ? (
            <>
              <CategoryCard>
                <CardContent>
                  
                </CardContent>
              </CategoryCard>
              <CategoryText>{contest.category}</CategoryText>
            </>
          ) : (
            <>
              <CategoryCard />
              <CategoryText>빈 항목</CategoryText>
            </>
          )}
        </CategoryItem>
      );
    })}
  </CategoryWrapper>
      </CategoryContainer>

      {/* 정렬 및 글 작성 버튼 섹션 */}
      <SortAndWriteSection>
        <SortButtons>
          <SortButton >최신순</SortButton>
          <SortButton>마감임박순</SortButton>
        </SortButtons>
        <WriteButton>글 작성하기 +</WriteButton>
      </SortAndWriteSection>

      {/* 모집글 목록 섹션 */}
      <PostListSection>
        {filteredContests.length > 0 ? (
           filteredContests.map((contest, index) => (
      <PostCard key={index}>
        <PostLeft>
          {/* 필요 시 왼쪽 섹션에 추가 데이터 사용 */}
        </PostLeft>
        <PostCenter>
          <Tag>{contest.category}</Tag> {/* 태그 출력 */}
          <PostTitle>{contest.title}</PostTitle> {/* 제목 출력 */}
          <PostDescription>{contest.description}</PostDescription> {/* 설명 출력 */}
          <Author>{contest.author}</Author> {/* 작성자 출력 */}
        </PostCenter>
        <PostRight>
          <Deadline>{contest.deadline}</Deadline> {/* 마감일 출력 */}
          <PostInfo>모집인원 {contest.recruitmentStatus}</PostInfo> {/* 모집 현황 출력 */}
          <PostInfo>지원자 {contest.applicants}명</PostInfo> {/* 지원자 수 출력 */}
        </PostRight>
      </PostCard>
    ))
  ) : (
    <p>해당 카테고리에 대한 공모전이 없습니다.</p>
  )}
</PostListSection>
    </PageContainer>
  );
};

export default RecruitmentPage;

// Styled Components
const PageContainer = styled.div`
  padding: 2.5rem; 
  flex-direction: column;
  min-height: 100vh;
`;

const CategoryContainer = styled.div`
  padding: 1rem 2rem 8rem;
  background-color: #f5f5f5;
  margin-bottom: 5%;
`;

const CategoryTitle = styled.h2`
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10vh, 1fr));
  height: 10vh;
  gap: 2rem;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const CardContent = styled.div`

`;
const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: #e0e0e0;
  padding: 1rem;
  border-radius: 8px;
  height: 100px;
  width: 100px;

  &:hover {
    border: 1px solid black;
  }
`;

const SortAndWriteSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CategoryText = styled.span`
  font-size: 0.9rem;
  color: #333;
  font-weight: bold;
`;

const SortButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const SortButton = styled.button`
  background: ${(props) => (props.active ? "#000" : "#e0e0e0")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: none;
  width: 100px;
  padding: 0.5rem 1rem;
`;

const WriteButton = styled.button`
  background: #000;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
`;

const PostListSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
`;

const PostCard = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f5f5f5;
  
  height: 350px;
`;

const PostLeft = styled.div`
  flex: 1; /* 1 */
  display: flex;
  flex-direction: column;
  background: #D9D9D9;
  padding: 3rem;
`;

const PostCenter = styled.div`
  flex: 2; /* 2 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
`;

const PostRight = styled.div`
  flex: 1; /* 1 */
  display: flex;
  flex-direction: column;
  background: #c4c4c4;
  padding: 3rem;
`;

const Tag = styled.div`
  background: #c4c4c4;
  width: 5rem;
  padding: 0.3rem 0.5rem;
  margin-bottom: 0.5rem;
`;

const PostTitle = styled.h3`
  margin: 0.5rem 0;
`;

const PostDescription = styled.p`
  margin: 0.5rem 0;
`;

const Author = styled.span`
  margin-top: auto;
  font-size: 0.9rem;
  color: #666;
`;

const Deadline = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const PostInfo = styled.div`
  margin-top: 0.5rem;
  color: #666;
`;