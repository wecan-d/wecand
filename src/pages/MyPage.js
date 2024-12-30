import React, {useState, useEffect, useContext} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { SearchContext } from '../context/SearchContext';

const HomePage = () => {

    // 임시 목업데이터 확인용 hook
    const [ users, setUsers ] = useState([]);

    const [ filteredUsers, setFilteredUsers ] = useState([]); // 필터링된 데이터
    const { searchTerm } = useContext(SearchContext); // 전역 검색 상태 가져오기

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(
                    "https://676e83a3df5d7dac1ccae100.mockapi.io/post"
                );
                setUsers(response.data);
                setFilteredUsers(response.data); // 초기 데이터 설정
            } catch (err) {
                console.error(err);
            }
        };
        fetchUsers();
    }, []);
    //

   
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers(users); // 검색어가 없으면 전체 데이터 표시
    } else {
      const filtered = users.filter((user) =>
        user.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

    // 한 화면에 6개만 표시
    const visibleUsers = users.slice(0, 6);

    const navigate = useNavigate();

    const categoryHandler = (category) => {
        navigate(`/recruiting/${category}?sort=latest`);
    };

    const newFeedHandler = (postId) => {
        navigate(`/detail/${postId}`)
    }

    const categories = [
        {
            id: "art",
            name: "미술"
        }, {
            id: "design",
            name: "디자인"
        }, {
            id: "media",
            name: "영상/미디어"
        }, {
            id: "programming",
            name: "프로그래밍"
        }, {
            id: "business",
            name: "창업/비즈니스"
        }, {
            id: "photography",
            name: "사진"
        }, {
            id: "literature",
            name: "문학/에세이"
        }, {
            id: "music",
            name: "음악/공연"
        }, {
            id: "volunteering",
            name: "사회공헌/봉사"
        }, {
            id: "idea",
            name: "기획/아이디어"
        }
    ];

    return (
        <PageContainer>

























<ResultsContainer>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <ResultCard key={user.id}>
            <Tag>{user.category}</Tag>
            <PostTitle>{user.title}</PostTitle>
          </ResultCard>
        ))
      ) : (
        <NoResults>검색 결과가 없습니다.</NoResults>
      )}
    </ResultsContainer>



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
                        {
                            categories.map((category) => (
                                <CategoryCard key={category.id}>
                                    <CardContent onClick={() => categoryHandler(category.id)}></CardContent>
                                    <CategoryText>{category.name}</CategoryText>
                                </CategoryCard>
                            ))
                        }
                    </CategoryWrapper>
                </CategoryContainer>

                <StatusWrapper>
                    <StatusHeader>
                        <StatusTitle>모집 신청 현황</StatusTitle>
                        <MoreButton>더보기</MoreButton>
                    </StatusHeader>
                    <StatusContent>
                        <StatusList>
                            {
                                Array
                                    .from({length: 6})
                                    .map((_, index) => (
                                        <StatusItem key={index}>
                                            아이아이아아
                                            <StatusButton>{
                                                    index === 5
                                                        ? "거절"
                                                        : "수락"
                                                }</StatusButton>
                                        </StatusItem>
                                    ))
                            }
                        </StatusList>
                    </StatusContent>
                </StatusWrapper>
            </CategoryAndStatus>

            {/* 새로 올라온 공모전 모집 글 */}
            <NewPostsSection>
                <SectionTitle>새로 올라온 공모전 모집 글</SectionTitle>
                <PostsWrapper>
                    {
                        visibleUsers.map((users) => (
                            <PostCard key={users.postId} onClick={newFeedHandler}>
                                <Tag>{users.category}</Tag>
                                <PostTitle>{users.title}
                                    날짜{users.date}</PostTitle>
                            </PostCard>
                        ))
                    }
                </PostsWrapper>
            </NewPostsSection>
        </PageContainer>
    );
};

export default HomePage;

// Styled Components

const PageContainer = styled.div `
  padding: 4rem;
`;

const LandContainer = styled.div `
  position: relative;
  width: 100%;
  height: 300px;
  background-image: url("/assets/land.png");
  background-size: cover;
  background-position: center;
`;

const Overlay = styled.div `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LandButton = styled.button `
  padding: 10px 20px;
  background-color: white;
  border: none;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #eee;
  }
`;

const CategoryAndStatus = styled.div `
  display: flex;
  gap: 2rem;
  margin: 2rem 6rem;
`;

const CategoryContainer = styled.div `
  flex: 7;
  display: flex;
  flex-direction: column;
  background: #EEE;
  justify-content: center;
`;

const CategoryWrapper = styled.div `
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  gap: 2rem;
`;

const CategoryCard = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;
const CardContent = styled.div `
  width: 120px;
  height: 120px;
  background-color: #BFBFBF;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  border: none;
  

  &:hover {
    border: 1px solid black;
  }
`;

const CategoryText = styled.div `
  font-size: 0.9rem;
  color: #333;
`;

const StatusWrapper = styled.div `
  flex: 3;
  background: #7b7b7b;
`;

const StatusHeader = styled.div `
  height: 12%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #555555;
  color: white;
  padding: 0.5rem 1rem;
`;

const StatusTitle = styled.h3 `
  margin: 0;
`;

const MoreButton = styled.button `
  background: #888;
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  cursor: pointer;

  &:hover {
    background: #666;
  }
`;

const StatusContent = styled.div `
  background: #d9d9d9;
  padding: 1rem;
`;

const StatusList = styled.div `
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StatusItem = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #d9d9d9;
`;

const StatusButton = styled.button `
  background: white;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const NewPostsSection = styled.section `
  margin: 4rem 6rem;
`;

const SectionTitle = styled.h2 `
  margin-bottom: 1rem;
`;

const PostsWrapper = styled.div `
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  background: #EEE;
  
`;

const PostCard = styled.div `
  background-color: white;
  padding: 1rem;
`;

const Tag = styled.div `
  background: #c4c4c4;
  color: black;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  margin-bottom: 0.5rem;
  width: 4rem;
`;

const PostTitle = styled.h3 `
  font-size: 1rem;
  color: #333;
`;














const ResultsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const ResultCard = styled.div`
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NoResults = styled.div`
  text-align: center;
  color: #999;
`;