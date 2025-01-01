//!!!!서버 연결 성공
//!!!!카테고리, 최신순, 마감 임박순 필터링 성공

import React, { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { SearchContext } from '../context/SearchContext';
import styled from "styled-components";
import axios from "axios";
import idea from "../assets/homepage/기획아이디어.svg"
import munhak from "../assets/homepage/문학에세이.svg"
import photo1 from "../assets/homepage/사진.svg"
import social from "../assets/homepage/사회공헌봉사.svg"
import media from "../assets/homepage/영상미디어.svg"
import music from "../assets/homepage/음악공연.svg"
import business from "../assets/homepage/창업비즈니스.svg"
import nonmun from "../assets/homepage/학술논문.svg"
import programming from "../assets/homepage/IT프로그래밍.svg"
import searchicon from "../assets/homepage/search.svg"


const RecruitmentPage = () => {

    // SearchContext에서 searchTerm, filteredData 받아오기 검색기능 훅
    const { searchTerm, setSearchTerm, filteredData } = useContext(SearchContext); 

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

   
    

    // !!!!데이터 가져옴
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    "https://676e83a3df5d7dac1ccae100.mockapi.io/post"
                    // `http://${server}:8080/post`
                );
                setUsers(response.data);
                console.log(response.data);
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

    const filteredAndSorted = filteredData
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
        { id: "디자인", name: "디자인", photo: photo1 },
        { id: "영상미디어", name: "영상 미디어", photo: media },
        { id: "기획아이디어", name: "기획/아이디어", photo: idea },
        { id: "IT프로그래밍", name: "IT/프로그래밍", photo: programming },
        { id: "문학에세이", name: "문학/에세이", photo: munhak },
        { id: "창업비즈니스", name: "창업/비즈니스", photo: business },
        { id: "학술논물", name: "학술/논문", photo: nonmun },
        { id: "사진", name: "사진", photo: photo1 },
        { id: "음악공연", name: "음악/공연", photo: music },
        { id: "사회공헌봉사", name: "사회공헌/봉사", photo: social },
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
    const [startPage, setStartPage] = useState(1); // 현재 페이지 그룹의 시작 번호

    const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    const handlePageChange2 = (pageNumber) => {
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

    const handleSearchChange = (e) => {
      const newSearchTerm = e.target.value;
      setSearchTerm(newSearchTerm);
      
  };

    return (
        <PageContainer>
            
            <CategoryContainer>

                <CategoryWrapper>
                    {categories.map((category) => (
                        <CategoryItem key={category.id}>
                            <CategoryCard 
                                src={category.photo} 
                                onClick={() => {
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
                <CategoryText1>공모전 모집글 ㅣ</CategoryText1>
                <CategoryText1>{selectedCategoryText ? `${selectedCategoryText}` : "전체보기"}</CategoryText1>

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

              <SearchWrapper>
                <SearchInput
                  type="text"
                  placeholder="원하는 검색어를 입력하세요"
                  onInput={(e) => setSearchTerm(e.target.value)}
                />
                <SearchIcon onClick={() => setSearchParams({ search: searchTerm })}><SearchIcon2 src={searchicon} alt="Profile" /></SearchIcon>
              </SearchWrapper>
        
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

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 360px;
  height: 54px;
  border: 1px solid #DBDBDB;
  border-radius: 8px;
  justify-content: space-between;
  padding: 15px;
  position: absolute;
  top: 354px;
  right: 335px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: 1rem;
  color: #6c6c6c;

  &::placeholder {
    color:#767676;
  }
`;

const SearchIcon = styled.span`
  font-size: 1.2rem;
  color: #6c6c6c;
  cursor: pointer;
`;

const SearchIcon2 = styled.img`
  width: 21.028px;
height: 21.026px;
flex-shrink: 0;
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


const CategoryCard = styled.img `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
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

const PostLeft = styled.img `
  flex: 0.8; /* 1 */
  display: flex;
  width: 100%;
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