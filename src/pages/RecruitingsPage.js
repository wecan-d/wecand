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


    const [selectedCategoryText, setSelectedCategoryText] = useState(""); 
    const handle = (categoryName) => {
        setSelectedCategoryText(categoryName);
    };



    const [isOpen, setIsOpen] = useState(false); // 드롭다운 열림 상태
    const [selectedOption, setSelectedOption] = useState("최신순"); // 선택된 옵션

    const toggleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option); // 선택된 옵션 설정
        setIsOpen(false); // 드롭다운 닫기
    };
    

    // !!!!데이터 가져옴
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(process.env.REACT_APP_API_MOCK
                    
                    // process.env.REACT_APP_API_URL
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
        
     

      // !!!! 카테고리 sorting
    const categories = [
        { id: "디자인", name: "디자인" },
        { id: "영상미디어", name: "영상 미디어" },
        { id: "기획아이디어", name: "기획/아이디어" },
        { id: "IT프로그래밍", name: "IT/프로그래밍" },
        { id: "문학에세이", name: "문학/에세이" },
        { id: "창업비즈니스", name: "창업/비즈니스" },
        { id: "학술논문", name: "학술/논문" },
        { id: "사진", name: "사진" },
        { id: "음악공연", name: "음악/공연" },
        { id: "사회공헌봉사", name: "사회공헌/봉사" },
    ];

    //!!페이지네이션
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const itemsPerPage = 5; // 페이지당 표시할 항목 수

    // 페이지에 맞는 데이터 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAndSorted.slice(indexOfFirstItem, indexOfLastItem);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
  };



  const maxPageButtons = 5; // 한 번에 표시할 페이지 버튼 수
  const [startPage, setStartPage] = useState(1); // 현재 페이지 그룹의 
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);


  const handlePageChangeBottom = (pageNumber) => {
    setCurrentPage(pageNumber);
};

const handleNextGroup = () => {
    if (endPage < totalPages) {
        setStartPage((prev) => prev + maxPageButtons);
    }
};

const handlePreviousGroup = () => {
    if (startPage > 1) {
        setStartPage((prev) => prev - maxPageButtons);
    }
};



    return (
        <PageContainer>
            
            <CategoryContainer>
                
                <CategoryWrapper>
                    {categories.map((category) => (
                        <CategoryItem key={category.id}>
                            <CategoryCard onClick={() => {
                              handleCategoryClick(category.id);
                              handle(category.name);
                            }
                            } />
                            <CategoryText>{category.name}</CategoryText>
                        </CategoryItem>
                    ))}
                </CategoryWrapper>
            </CategoryContainer>
            

            <SortAndWriteSection>
                <>
                <CategoryText1>
                공모전 모집글 ㅣ</CategoryText1>
               
                  
                <CategoryText1>
  {selectedCategoryText ? `${selectedCategoryText}` : "전체보기"}
</CategoryText1>
                    <DropdownContainer>
                      <DropdownButton onClick={toggleDropdown}>
                        {selectedOption}<Arrow>▼</Arrow>
                      </DropdownButton>
                      
            {isOpen && (
              <DropdownMenu>
                    <DropdownItem onClick={() => handleSortChange("latest")}>
                        최신순
                    </DropdownItem>
                    <DropdownItem onClick={() => handleSortChange("deadline")}>
                        마감임박순
                    </DropdownItem>
                </DropdownMenu>
            )}
        </DropdownContainer>
              </>
        
                <WriteButton onClick={() => navigate('/maketeam')}>글 작성하기</WriteButton>
            
            </SortAndWriteSection>
              
              <PostListSection>
    {currentItems.length > 0 ? (
        currentItems.map((user, index) => (
            <React.Fragment key={index}>
              <Divide />
                <PostCard onClick={() => handlePostClick(user.postId)}>
                    <PostLeft />
                    <PostCenter>
                        <div style={{ width: '450px', height: '255px' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                                <Tag>{user.category}</Tag>
                            </div>
                            <PostTitle>{user.title}</PostTitle>
                            <PostDescription>{user.memo}</PostDescription>
                            <Author>{user.author}</Author>
                        </div>
                    </PostCenter>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <PostRight>
                            <Deadline>{user.deadline}</Deadline>
                            <PostCardText>마감날짜</PostCardText>
                            <PostInfo>{user.date}</PostInfo>
                            <PostCardText>
                                현재 모집 현황<PostInfo>2/3</PostInfo>
                            </PostCardText>
                        </PostRight>
                    </div>
                </PostCard>
                
            </React.Fragment>
        ))
    ) : (
        <p>해당 카테고리에 대한 공모전이 없습니다.</p>
    )}
</PostListSection>
             {/* 페이지네이션 UI */}
             <Pagination>
             <PageButton disabled={startPage === 1} onClick={handlePreviousGroup}>
                {"<"}
            </PageButton>
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <PageButton
                    key={index + startPage}
                    active={currentPage === index + startPage}
                    onClick={() => handlePageChange(index + startPage)}
                >
                    {index + startPage}
                </PageButton>
            ))}
            <PageButton disabled={endPage === totalPages} onClick={handleNextGroup}>
                {">"}
            </PageButton>
            </Pagination>

            

        </PageContainer>
    );
};

export default RecruitmentPage;

const PostCardText = styled.div`
color: #4E5968;
text-align: right;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 25.2px */
`

// Styled Components
const PageContainer = styled.div `
  padding: 0 8rem; 
  flex-direction: column;
  min-height: 100vh;
`;

const CategoryContainer = styled.div `
  padding: 64px 3rem 6rem;
  margin-right: 30px;
`;


const CategoryWrapper = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10vh, 1fr));
  height: 10vh;
`;

const CategoryText = styled.span `
  color: #333;
  font-weight: 600;
  margin-top: 10px;
  font-size: 24px;
  color: #7D7D7D;
  font-weight: 400;
  font-size: 22px;
  white-space : nowrap;
`;

const CategoryText1 = styled.div `
  color: black;
  font-weight: 600;
  margin-top: 10px;
  font-size: 24px;
  font-weight: 400;
  font-size: 32px;
  white-space : nowrap;
  font-weight: 600;
  padding-bottom: 10px;
`;


const Divide = styled.div`
  width: 1487px;
  height: 0px;
  border: 1px solid #DBDBDB;
  margin: 30px 0;
`;


const CategoryItem = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover ${CategoryText}{
   color: #6C54F7;
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
  height: 56px;
  width: 56px;
  border-radius: 8px;
`;

const SortAndWriteSection = styled.div `
  display: flex;
  align-items: center;
  
`;


const WriteButton = styled.button `
  width: 120px;
  height: 52px;
  border: none;
  padding: 10px 15px;
  font-size: 20px;
  background: #6C54F7;
  font-weight: 500;
  color: white;
  border-radius: 8px;
  display: flex;
justify-content: center;
white-space: nowrap;
gap: 10px;
margin-left: 895px;
position: absolute;
right: 190px;
font-family: Pretendard;
font-size: 24px;
`;

const PostListSection = styled.section `
  display: flex;
  flex-direction: column;
  
`;

const PostCard = styled.div `
  display: flex;
  justify-content: space-between;
  
  height: 350px;
  max-width: 1487px;
`;

const PostLeft = styled.div `
  flex: 0.8; /* 1 */
  display: flex;
  flex-direction: column;
  border-radius: 16px;
background: #F0F3FA;
  padding: 3rem;
`;

const PostCenter = styled.div `
  flex: 4; /* 2 */
  display: flex;
  flex-direction: column;
  padding-left: 19px;
  
  
  
`;

const PostRight = styled.div `
  flex: 1; /* 1 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  
  gap: 10px;
`;

const Tag = styled.div `
  display: inline-block;
  text-align: center;
  
  padding-bottom: 12px;
  margin-bottom: 0.5rem;
   white-space: nowrap;
   font-size: 18px;
   color: #6C54F7;
font-family: Pretendard;
font-size: 18px;
font-style: normal;
font-weight: 500;
line-height: 140%;
`;

const PostTitle = styled.h3 `
padding-bottom: 12px;
  margin: 0.5rem 0;
  font-size: 22px;
  font-weight: 500;
`;

const PostDescription = styled.p `
padding-bottom: 12px;
  margin: 0.5rem 0;
  font-size: 20px;
  color: #4E5968;
  line-height: 140%; /* 25.2px */
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
  color: #6C54F7;
font-family: Pretendard;
font-size: 32px;
font-style: normal;
font-weight: 500;
line-height: 140%; /* 44.8px */
`;


const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    width: 150px;
`;

const DropdownButton = styled.button`
    width: 100%;
    background-color: #ffffff;
    border:none;
    border-radius: 8px;
    padding: 10px 15px;
    font-size: 20px;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    

    &:hover {
        background-color: #f9f9f9;
    }
`;

const Arrow = styled.span`
    font-size: 12px;
    color: #000;
`;

const DropdownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #ffffff;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    z-index: 1000;
`;

const DropdownItem = styled.div`
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0;
    }
`;

// Styled Components
const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 95px;
`;

const PageButton = styled.button`
    color: #4E5968;
    background-color: white;
    border:none;
    margin: 0 5px;
    font-size: 18px;
    
    
    cursor: pointer;

    &:hover {
      color: #6C54F7;
      border-bottom : 2px solid #6C54F7;
    }
`;