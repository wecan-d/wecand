//!!!!서버 연결 성공
//!!!!카테고리, 최신순, 마감 임박순 필터링 성공

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const RecruitmentPage = () => {
    const [users, setUsers] = useState([]);
    const { category } = useParams(); // URL에서 카테고리 값을 가져오기
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const sort = searchParams.get("sort") || "latest"; // 기본 정렬 기준
    const [selectedCategory, setSelectedCategory] = useState(category || "");
    const [sortCriteria, setSortCriteria] = useState(sort);

    // !!!!데이터 가져옴 
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    // "https://676e83a3df5d7dac1ccae100.mockapi.io/post"
                    "http://172.30.1.44:8080/post"
                );
                setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

    // 게시물 클릭시 데이터 값을 넘겨주는 핸들러
    const handlePostClick = (postId) => {
      console.log("Navigating to postId:", postId); // 디버깅 로그
      if (postId) {
          navigate(`/detail/${postId}`);
      } else {
          console.error("Invalid postId:", postId);
      }
  };


    // URL에서 category 및 sort가 변경될 때 상태를 업데이트
    useEffect(() => {
        if (category) {
            setSelectedCategory(category);
        }
        setSortCriteria(sort);
    }, [category, sort]);

    // 클릭 시 URL과 상태 업데이트
    const handleCategoryClick = (categoryId) => {
        navigate(`/recruiting/${categoryId}?sort=${sortCriteria}`);
    };

    const handleSortChange = (newSort) => {
        setSortCriteria(newSort);
        setSearchParams({ sort: newSort });
    };

    const filteredAndSorted = users
        .filter((item) => {
            if (selectedCategory) {
                return item.category === selectedCategory;
            }
            return true;
        })
        .sort((a, b) => {
            const currentDate = new Date();
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            const createTimeA = new Date(a.createTime);
            const createTimeB = new Date(b.createTime);
            if (sortCriteria === "latest") {
                return createTimeB - createTimeA;
            } else if (sortCriteria === "deadline") {
                return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate);
            }
            return 0;
        });
        
        //!!!!마감일 로직
        const RemainingDays = (deadline) => {
          const currentDate = new Date();
          const deadlineDate = new Date(deadline);
          const differenceInTime = deadlineDate - currentDate;
          const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24)); // 밀리초를 일로 변환
          return differenceInDays > 0 ? `D-${differenceInDays}` : "마감 완료";
      };

      // !!!! 카테고리 sorting
    const categories = [
        { id: "art", name: "미술,디자인" },
        { id: "기술", name: "기술" },
        { id: "마케팅", name: "마케팅" },
        { id: "photography", name: "사진" },
        { id: "literature", name: "문학" },
        { id: "music", name: "음악" },
        { id: "volunteering", name: "봉사" },
        { id: "idea", name: "아이디어" },
        { id: "media", name: "미디어" },
        { id: "design", name: "디자인" },
    ];

    return (
        <PageContainer>
            <div style={({fontSize:'36px',fontWeight:'600', marginBottom:'26px'})}>공모전 모집글</div>
            <CategoryContainer>
                <CategoryTitle>카테고리</CategoryTitle>
                <CategoryWrapper>
                    {categories.map((category) => (
                        <CategoryItem key={category.id}>
                            <CategoryCard onClick={() => handleCategoryClick(category.id)} />
                            <CategoryText>{category.name}</CategoryText>
                        </CategoryItem>
                    ))}
                </CategoryWrapper>
            </CategoryContainer>

            <SortAndWriteSection>
                <SortButtons>
                    <SortButton
                        onClick={() => handleSortChange("latest")}
                        active={sortCriteria === "latest"}
                    >
                        최신순
                    </SortButton>
                    <SortButton
                        onClick={() => handleSortChange("deadline")}
                        active={sortCriteria === "deadline"}
                    >
                        마감임박순
                    </SortButton>
                </SortButtons>
                <WriteButton>글 작성하기 +</WriteButton>
            </SortAndWriteSection>

            <PostListSection >
                {filteredAndSorted.length > 0 ? (
                    filteredAndSorted.map((user, index) => (


                      //!!!!이거 겁나 중요
                        <PostCard key={index}
                                  onClick={() => handlePostClick(user.postId)}
                        >
                            <PostLeft />
                            <PostCenter>
                              <div style={({display:'flex', justifyContent: 'flex-start'})}>
                                <Tag>{user.category}</Tag>
                              </div>
                                <PostTitle>{user.title}</PostTitle>
                                <PostDescription>{user.memo}</PostDescription>
                                <Author>{user.author}</Author>
                            </PostCenter>
                            <PostRight>
                                <Deadline>{user.deadline}</Deadline>
                                <PostInfo>{RemainingDays(user.date)}</PostInfo>
                                <PostInfo2>모집인원</PostInfo2>
                                <PostInfo2>지원자 {user.applicants}명</PostInfo2>
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
const PageContainer = styled.div `
  padding: 0 8rem; 
  flex-direction: column;
  min-height: 100vh;
`;

const CategoryContainer = styled.div `
  padding: 1rem 2rem 8rem;
  background-color: #f5f5f5;
  margin-bottom: 5%;
`;

const CategoryTitle = styled.h2 `
  font-weight: bold;
  margin-bottom: 1rem;
`;

const CategoryWrapper = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10vh, 1fr));
  height: 10vh;
  gap: 2rem;
`;

const CategoryText = styled.span `
  font-size: 0.9rem;
  color: #333;
  font-weight: 600;
  margin-top: 16px;
  font-size: 24px;
  color: #7D7D7D;
`;

const CategoryItem = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  
  &:hover ${CategoryText}{
    color: black;
  }
`;


const CategoryCard = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: #e0e0e0;
  padding: 1rem;
  height: 100px;
  width: 100px;

  &:hover {
    border: 1px solid black;
  }
`;

const SortAndWriteSection = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 27px;
`;

const SortButtons = styled.div `
  display: flex;
  flex-direction: row;
  
  gap: 1rem;
`;

const SortButton = styled.button `
  
  text-align: center;
  width: 163px;
  height: 56px;
  font-size: 20px;
  font-weight: 500;
  background: ${ (props) => (
    props.active
        ? "#F5F5F5"
        : " #BFBFBF"
)};
  color: ${ (props) => (
    props.active
        ? "#000"
        : "#000"
)};
  border: none;
  padding: 0 24px 0 24px;
`;

const WriteButton = styled.button `
  width: 224px;
  height: 60px;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  color: #000;
  background: #F5F5F5;
  font-weight: 500;

font-family: Pretendard;
font-size: 24px;
`;

const PostListSection = styled.section `
  display: flex;
  flex-direction: column;
  gap: 2rem;
  
`;

const PostCard = styled.div `
  display: flex;
  justify-content: space-between;
  background: #f5f5f5;
  
  height: 350px;
`;

const PostLeft = styled.div `
  flex: 1; /* 1 */
  display: flex;
  flex-direction: column;
  background: #D9D9D9;
  padding: 3rem;
`;

const PostCenter = styled.div `
  flex: 2; /* 2 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  
  padding: 3rem;
`;

const PostRight = styled.div `
  flex: 1; /* 1 */
  display: flex;
  flex-direction: column;
  background: #c4c4c4;
  padding: 23px 24px;
  gap: 10px;
`;

const Tag = styled.div `
  display: inline-block;
  text-align: center;
  background: #c4c4c4;
  padding: 8px 12px;
  margin-bottom: 0.5rem;
   white-space: nowrap;
   font-size: 18px;
`;

const PostTitle = styled.h3 `
  margin: 0.5rem 0;
  font-size: 32px;
  font-weight: 500;
`;

const PostDescription = styled.p `
  margin: 0.5rem 0;
  font-size: 20px;
`;

const Author = styled.span `
  margin-top: auto;
  font-size: 0.9rem;
  color: #666;
`;

const Deadline = styled.div `
  font-size: 1.5rem;
  font-weight: bold;
`;

const PostInfo = styled.div `
  font-size: 32px;
  font-weight: 500;
  color: black;
`;

const PostInfo2 = styled.div `
  color: #000;

font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 500;
line-height: normal;
`;