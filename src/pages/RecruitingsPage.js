import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
// 이미지 import
import design from "../assets/homepage/design.svg"
import idea from "../assets/homepage/idea.svg"
import munhak from "../assets/homepage/essay.svg"
import photo1 from "../assets/homepage/photo.svg"
import social from "../assets/homepage/social.svg"
import media from "../assets/homepage/media.svg"
import music from "../assets/homepage/music.svg"
import business from "../assets/homepage/business.svg"
import nonmun from "../assets/homepage/nonmun.svg"
import programming from "../assets/homepage/programming.svg"
import searchicon from "../assets/homepage/search.svg"

const server = process.env.REACT_APP_SERVER;

const RecruitmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // ----- 1) 서버에서 가져올 전체 데이터
  const [post, setPost] = useState([]); // 모든 게시물
  // ----- 2) 검색어 input 관리
  const [searchWord, setSearchWord] = useState(searchParams.get("searchword") || "");

  // ----- 3) URL 파라미터 / 쿼리스트링에서 가져오는 값들
  const { category } = useParams(); // /recruiting/:category  (예: /recruiting/디자인)
  const sortParam = searchParams.get("sort") || "latest";   // ?sort=latest
  const searchWordParam = searchParams.get("searchword") || ""; // ?searchword=검색어

  // ----- 4) 보여줄 카테고리 문구
  const [selectedCategoryText, setSelectedCategoryText] = useState("");
  
  // 드롭다운 (정렬 기준) 열림/닫힘
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    sortParam === "deadline" ? "마감임박순" : "최신순"
  );
  
  // 모든 게시물 데이터 fetch
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          // "https://676e83a3df5d7dac1ccae100.mockapi.io/post"
          `${server}/post`
        );
        setPost(response.data);
        console.log(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  // 검색창에서 카테고리 이름 클릭 시 보여줄 텍스트 변경
  const handle = (categoryName) => {
    setSelectedCategoryText(categoryName);
  };

  // 정렬 기준 선택 (dropdown)
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const handleSortChange = (newSort) => {
    setSearchParams((prev) => {
      // 기존 쿼리 파라미터를 모두 유지하면서 sort만 업데이트
      const newParams = new URLSearchParams(prev);
      newParams.set("sort", newSort);
      // 검색어도 유지하려면 searchword도 기존 값 유지
      if (searchWordParam) {
        newParams.set("searchword", searchWordParam);
      }
      return newParams;
    });
    setIsOpen(false);
    setSelectedOption(newSort === "deadline" ? "마감임박순" : "최신순");
  };

  // 카테고리 클릭 시 URL 변경
  const handleCategoryClick = (categoryId) => {
    // /recruiting/카테고리?sort=xxx&searchword=xxx
    navigate(`/recruiting/${categoryId}?sort=${sortParam}&searchword=${searchWordParam}`);
    handle(categoryId);
  };

  // 게시물 클릭시 상세페이지로 이동
  const handlePostClick = (postId) => {
    if (postId) {
      navigate(`/detail/${postId}`);
    }
  };

  // ----- 5) 최종 목록 필터링 & 정렬
  //  1) 검색 필터 → 2) 카테고리 필터 → 3) 정렬
  const filteredAndSorted = post
    .filter((item) => {
      // 검색어 필터
      if (!searchWordParam) return true; // 검색어 없으면 전체
      const lowerSearch = searchWordParam.toLowerCase();
      return (
        item.title.toLowerCase().includes(lowerSearch) ||
        item.category.toLowerCase().includes(lowerSearch)
      );
    })
    .filter((item) => {
      // URL param 카테고리 필터
      if (!category) return true; // 카테고리가 없으면 전체
      return item.category === category;
    })
    .sort((a, b) => {
      // 정렬
      if (sortParam === "latest") {
        // 작성일(createTime) 기준 내림차순
        const createTimeA = new Date(a.createTime);
        const createTimeB = new Date(b.createTime);
        return createTimeB - createTimeA;
      } else if (sortParam === "deadline") {
        // 마감임박순
        const currentDate = new Date();
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return Math.abs(dateA - currentDate) - Math.abs(dateB - currentDate);
      }
      return 0;
    });

  // ----- 6) 페이지네이션
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const itemsPerPage = 5; // 페이지당 표시할 항목 수

  // 현재 페이지 데이터
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSorted.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);

  // 페이지 그룹
  const maxPageButtons = 5;
  const [startPage, setStartPage] = useState(1);
  const endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

  const handlePageChange = (pageNumber) => {
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

  // ----- 7) 검색창 입력 시 (searchWord) 상태에 저장
  //         검색 아이콘을 클릭하면 query string으로 반영
  const handleSearchInputChange = (e) => {
    setSearchWord(e.target.value);
  };
  const handleSearchIconClick = () => {
    // /recruiting?searchword=xxx&sort=xxx
    navigate(`/recruiting?searchword=${searchWord}&sort=${sortParam}`);
  };

  // ----- useEffect로 카테고리 라벨(상단에 표시될 텍스트) 갱신
  useEffect(() => {
    if (category) {
      setSelectedCategoryText(category);
    } else {
      setSelectedCategoryText("전체보기");
    }
  }, [category]);

  return (
    <PageContainer>
      {/* 카테고리 영역 */}
      <CategoryContainer>
        <CategoryWrapper>
          {categories.map((cat) => (
            <CategoryItem key={cat.id}>
              <CategoryCard
                src={cat.photo}
                onClick={() => handleCategoryClick(cat.id)}
              />
              <CategoryText>{cat.name}</CategoryText>
            </CategoryItem>
          ))}
        </CategoryWrapper>
      </CategoryContainer>
      
      {/* 정렬/검색/글작성 섹션 */}
      <SortAndWriteSection>
        <>
          <CategoryText1>공모전 모집글 ㅣ</CategoryText1>
          <CategoryText1>
            {selectedCategoryText ? selectedCategoryText : "전체보기"}
          </CategoryText1>

          <DropdownContainer>
            <DropdownButton onClick={toggleDropdown}>
              {selectedOption}
              <Arrow>▼</Arrow>
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
            value={searchWord}
            onChange={handleSearchInputChange}
          />
          <SearchIcon onClick={handleSearchIconClick}>
            <SearchIcon2 src={searchicon} alt="searchIcon" />
          </SearchIcon>
        </SearchWrapper>

        <WriteButton onClick={() => navigate("/maketeam")}>
          글 작성하기
        </WriteButton>
      </SortAndWriteSection>

      {/* 게시물 리스트 */}
      <PostListSection>
        {currentItems.length > 0 ? (
          currentItems.map((user, index) => (
            <React.Fragment key={index}>
              <Divide />
              <PostCard onClick={() => handlePostClick(user.postId)}>
                <PostLeft src={user.img}/>
                <PostCenter>
                  <div style={{ width: "450px", height: "255px" }}>
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                      <Tag>{user.category}</Tag>
                    </div>
                    <PostTitle>{user.title}</PostTitle>
                    <PostDescription>{user.memo}</PostDescription>
                    <Author>{user.author}</Author>
                  </div>
                </PostCenter>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
          <p>해당 조건의 공모전 모집글이 없습니다.</p>
        )}
      </PostListSection>

      {/* 페이지네이션 */}
      <Pagination>
        <PageButton disabled={startPage === 1} onClick={handlePreviousGroup}>
          {"<"}
        </PageButton>
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <PageButton
            key={index + startPage}
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

// ----- 카테고리 리스트(아이콘, 텍스트)
const categories = [
  { id: "디자인", name: "디자인", photo: design },
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

// ----- Styled Components
const PageContainer = styled.div`
  padding: 0 8rem;
  flex-direction: column;
  min-height: 100vh;
`;
const CategoryContainer = styled.div`
  padding: 64px 3rem 6rem;
  margin-right: 30px;
`;
const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10vh, 1fr));
  height: 10vh;
`;
const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  &:hover span {
    color: #6c54f7;
  }
`;
const CategoryCard = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 8px;
`;
const CategoryText = styled.span`
  color: #7d7d7d;
  font-size: 22px;
  margin-top: 10px;
  white-space: nowrap;
`;
const SortAndWriteSection = styled.div`
  display: flex;
  align-items: center;
`;
const CategoryText1 = styled.div`
  color: black;
  font-weight: 600;
  margin-top: 10px;
  font-size: 32px;
  padding-bottom: 10px;
`;
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 150px;
`;
const DropdownButton = styled.button`
  width: 100%;
  background-color: #ffffff;
  border: none;
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
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 360px;
  height: 54px;
  border: 1px solid #dbdbdb;
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
    color: #767676;
  }
`;
const SearchIcon = styled.span`
  font-size: 1.2rem;
  color: #6c6c6c;
  cursor: pointer;
`;
const SearchIcon2 = styled.img`
  width: 21px;
  height: 21px;
`;
const WriteButton = styled.button`
  width: 120px;
  height: 52px;
  border: none;
  padding: 10px 15px;
  font-size: 20px;
  background: #6c54f7;
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
const PostListSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;
const PostCard = styled.div`
  display: flex;
  justify-content: space-between;
  height: 350px;
  max-width: 1487px;
`;
const PostLeft = styled.img`
  flex: 1;
  width: 216px;
  height: auto;
  border-radius: 16px;
  background: #f0f3fa;
  
  
`;
const PostCenter = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;
  padding-left: 19px;
`;
const PostRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;
const Divide = styled.div`
  width: 1487px;
  height: 0px;
  border: 1px solid #dbdbdb;
  margin: 30px 0;
`;
const Tag = styled.div`
  display: inline-block;
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  font-size: 18px;
  color: #6c54f7;
  font-family: Pretendard;
  line-height: 140%;
`;
const PostTitle = styled.h3`
  padding-bottom: 12px;
  margin: 0.5rem 0;
  font-size: 22px;
  font-weight: 500;
`;
const PostDescription = styled.p`
  padding-bottom: 12px;
  margin: 0.5rem 0;
  font-size: 20px;
  color: #4e5968;
  line-height: 140%;
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
const PostCardText = styled.div`
  color: #4e5968;
  text-align: right;
  font-family: Pretendard;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;
const PostInfo = styled.div`
  color: #6c54f7;
  font-family: Pretendard;
  font-size: 32px;
  font-style: normal;
  font-weight: 500;
  line-height: 140%;
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 95px;
`;
const PageButton = styled.button`
  color: #4e5968;
  background-color: white;
  border: none;
  margin: 5px;
  font-size: 18px;
  cursor: pointer;
  position: relative;
  &:hover {
    color: #6c54f7;
  }
  &:hover::after {
    content: "";
    display: block;
    width: 35px;
    height: 2px;
    background: #6c54f7;
    margin: 0 auto;
  }
`;
