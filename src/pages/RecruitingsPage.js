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

    // 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    "https://676e83a3df5d7dac1ccae100.mockapi.io/post"
                );
                setUsers(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);

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

    const categories = [
        { id: "art", name: "미술,디자인" },
        { id: "programming", name: "프로그래밍" },
        { id: "business", name: "비즈니스" },
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

            <PostListSection>
                {filteredAndSorted.length > 0 ? (
                    filteredAndSorted.map((user, index) => (
                        <PostCard key={index}>
                            <PostLeft />
                            <PostCenter>
                                <Tag>{user.category}</Tag>
                                <PostTitle>{user.title}</PostTitle>
                                <PostDescription>{user.description}</PostDescription>
                                <Author>{user.author}</Author>
                            </PostCenter>
                            <PostRight>
                                <Deadline>{user.deadline}</Deadline>
                                <PostInfo>모집 마감 {user.date}</PostInfo>
                                <div>생성일 {user.createTime}</div>
                                <PostInfo>지원자 {user.applicants}명</PostInfo>
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

const CategoryItem = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;


const CategoryCard = styled.div `
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

const SortAndWriteSection = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CategoryText = styled.span `
  font-size: 0.9rem;
  color: #333;
  font-weight: bold;
`;

const SortButtons = styled.div `
  display: flex;
  gap: 1rem;
`;

const SortButton = styled.button `
  background: ${ (props) => (
    props.active
        ? "#000"
        : "#e0e0e0"
)};
  color: ${ (props) => (
    props.active
        ? "#fff"
        : "#000"
)};
  border: none;
  width: 100px;
  padding: 0.5rem 1rem;
`;

const WriteButton = styled.button `
  background: #000;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
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
  padding: 3rem;
`;

const Tag = styled.div `
  background: #c4c4c4;
  width: 5rem;
  padding: 0.3rem 0.5rem;
  margin-bottom: 0.5rem;
`;

const PostTitle = styled.h3 `
  margin: 0.5rem 0;
`;

const PostDescription = styled.p `
  margin: 0.5rem 0;
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
  margin-top: 0.5rem;
  color: #666;
`;