import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import file from "../assets/mypage/File.svg";
import link from "../assets/mypage/Link.svg";
import progress from "../assets/common/progress.svg"
import complete from "../assets/common/complete.svg"

import mem1 from "../assets/mypage/mem1.svg"
import mem2 from "../assets/mypage/mem2.svg"
import mem3 from "../assets/mypage/mem3.svg"
import mem4 from "../assets/mypage/mem4.svg"
import mem5 from "../assets/mypage/mem5.svg"
import profile from "../assets/profile.png"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function truncateString(str, maxLength) {
  if (!str) return "";
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
}

function chunkArray(array, size) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

export default function MyPage() {

    // 서버 url 관리 변수
    const server = process.env.REACT_APP_SERVER;
    const { userInfo, handleLogout } = useContext(AuthContext);
    const userId = userInfo.token;  

    const navigate = useNavigate();

    // 인원 수에 따른 이미지를 리턴
    const getMemImage = (count) => {
      if (count === 1) return mem1;
      if (count === 2) return mem2;
      if (count === 3) return mem3;
      if (count === 4) return mem4;
      return mem5; // 5명 이상
    };

    // [GET] 유저 역량 카드 /card/{userId}
    const [card, setCard] = useState([{}]);
    const [applyPosts, setApplyPosts] = useState([
      {
        id: 0,
        title: "새로운 공모전을 신청해보세요",
        status: "approved",
        category: "category",
      }
    ]);

    const getApplyPosts = async (userId) => {
      const applyPostsData = await axios.get(`${server}/post/applied/${userId}`);
      const newApplyPosts = filteredApplyPosts(applyPostsData.data, userId);
      setApplyPosts(newApplyPosts);
      console.log("지원한 목록:", applyPostsData);
      console.log("필터링: ", newApplyPosts);
    }

    const filteredApplyPosts = (data, userToken) => {
      return data.map((post) => {
          return {
            id: post.postId+1,
            title: post.title,
            status: post.status,
            category: post.category,
          }
      })
      // APPROVED(수락)상태가 아닐 때만, 지원한 목록 나열
      .filter((item) => item.status !== "APPROVED" && item != null);
      // .filter((item) => item != null);
    }

    const fetchUsers = async () => {
      try {
          // 사용자 카드 데이터 가져와버렸어
        const cardResponse = await axios.get(`${server}/card/${userInfo.token}`);
            const cardData = Array.isArray(cardResponse.data)
          ? cardResponse.data
          : [cardResponse.data];
            setCard(cardData); // 항상 배열 안에 객체 형태로 설정
          console.log(cardData);
      } catch (err) {
          setError(err);
      }
  };

  const fetch2Posts = async () => {
    try{
      const own = await axios.get(
        `${server}/post/owner/${userId}`
      );
      setUserPosts(own.data);
      console.log(own.data);
    }catch (err){
      console.error('Error fetching data:', err);
      setError(err);
    }
};

    //[GET] 유저 로그인 정보
    useEffect(() => {
      if(userInfo.isLoggedIn) {
        fetchUsers();
        getJoinedLandData();
        fetch2Posts();
        getApplyPosts(userId);
      }
    }, [userInfo.isLoggedIn]);

    const [userPosts, setUserPosts] = useState([]);
    const [, setError] = useState(null);
    // 드롭 다운 상태관리
    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    
    // 토글 핸들러
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
      setIsOpen2(false);
  };

  const toggleDropdown2 = () => {
    setIsOpen2(!isOpen2);
    setIsOpen(false);
};

const OwnerProjects = userPosts.reduce((acc, create) => {
  const { category } = create;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(create);
  return acc;
}, {});

const AppliedProjects = applyPosts.reduce((acc, create) => {
  const { category } = create;
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(create);
  return acc;
}, {});

const statusText = {
  APPROVED: "수락",
  PENDING: "대기 중",
  REJECTED: "거절",
};

const statusColor = {
  APPROVED: "#54B8A7",
  PENDING: "#EF8C3E",
  REJECTED: "#D74F8B",
};

    const [data, setData] = useState([]);
    const getJoinedLandData = async () => {
      const d = await axios.get(`${server}/user/${userId}/lands`);
      setData(d.data);
    };

    const chunkedData = chunkArray(data, 2);


    // 역량카드 스타일 배치
    const cardData = [
      { key: "communication", title: "소통", gridArea: "communication" },
      { key: "teamwork", title: "작업", gridArea: "work" },
      { key: "thinking", title: "사고", gridArea: "thinking" },
      { key: "role", title: "역할", gridArea: "role" },
      { key: "conflictResolution", title: "갈등 해결", gridArea: "conflict" },
      { key: "timePreference", title: "시간", gridArea: "time" },
      { key: "restPreference", title: "휴식", gridArea: "rest" },
      { key: "friendship", title: "친목", gridArea: "friendship" },
    ];
  return (
    <>
    { card.length > 0 && card[0] && Object.keys(card[0]).length > 0 ? (card.map((cardItem, index) => (
    <div key={index}>
      <CardContainer>
        <ImageWrapper>
          <ProfileImage src={profile} alt="Profile" style={{ width: '100px', height: '100px' }} />
        </ImageWrapper>
        <TextWrapper2>
          <Name>{cardItem.cardName || "이름 없음"}</Name>
          <Details>{cardItem.major || "전공 정보 없음"}</Details>
          <Email>{cardItem.email || "이메일 없음"}</Email>
        </TextWrapper2>
      </CardContainer>
    
    <PageContainer>
      <PageWrapper>
          <GridWrapper>
          {/* extraData[userId] */}
          {/* 그리드 좌측 */}
          <LeftGrid>
            <CardGrid>
              {cardData.map(({ key, title, gridArea }) => (
                  <Card key={key} style={{ gridArea }}>
                      <CardTitle>{title}</CardTitle>
                      <CardContent>
                        {Array.isArray(cardItem?.[key])
                          ? cardItem[key].map((contentItem, index) => (
                            <p key={index}>{contentItem}</p>
                        )) : "내용 없음"}
                      </CardContent>
                  </Card>
              ))}
                
                {/* 중요하게 생각해요 (별도 처리) */}
              <Card style={{ gridArea: "important" }}>
                <CardTitle isImportant>중요하게 생각해요</CardTitle>
                <CardContent>{cardItem.important || "내용 없음"}</CardContent>
              </Card>
            </CardGrid>
          </LeftGrid>
          
          {/* 그리드 우측 */}
          <RightGrid>
            <RightGridWrapper>

              <DropdownContainer>
                <DropdownHeader onClick={toggleDropdown}>
                  <HeaderText>툴 / 자격증</HeaderText>
                    <Arrow isOpen={isOpen}>▼</Arrow>
                </DropdownHeader>
                
                {isOpen && (
                <DropdownContent>
                  {/* 툴 */}
                  {Array.isArray(cardItem?.tools) && cardItem.tools.map((tools, index) => ( 
                    <ContentItem key={`tools-${index}`}>{tools}</ContentItem>
                  ))}
                  {/* 자격증 */}
                  {Array.isArray(cardItem?.certificates) && cardItem.certificates.map((certificates, index) => ( 
                    <ContentItem key={`certificates-${index}`}>{certificates}</ContentItem>
                  ))}
                </DropdownContent>
                )}
              </DropdownContainer>

              <DropdownContainer>
                <DropdownHeader onClick={toggleDropdown2}>
                  <HeaderText>경력</HeaderText>
                    <Arrow2 isOpen={isOpen2}>▼</Arrow2>
                </DropdownHeader>
                
                {isOpen2 && (
                <DropdownContent>
                  {/* 경력 */}
                  {Array.isArray(cardItem?.awards) && cardItem.awards.map((awards, index) => ( 
                    <ContentItem key={`awards-${index}`}>{awards}</ContentItem>
                  ))}
                </DropdownContent>
                )}
              </DropdownContainer>
              <HeaderText2>작업물</HeaderText2>
              
              {/* 파일 추가시 박스를 생성 */}
              <a href={cardItem.fileUrl} target="_blank" style={({border:'none',textDecoration:'none'})}>
              <BoxWrapper>
                <ImagePlaceholder>
                  <ImageStyle src={file} />
                </ImagePlaceholder>
                <TextWrapper>
                  <FileName>개인작업물 파일</FileName>
                  <FileSize>1234KB</FileSize>
                </TextWrapper>
              </BoxWrapper>
              </a>

              <a href={cardItem.url} style={({border:'none',textDecoration:'none'})}>
              <BoxWrapper>
                <ImagePlaceholder>
                  <ImageStyle src={link}/>
                </ImagePlaceholder>
                <TextWrapper>
                  <FileName>개인 URL</FileName>
                </TextWrapper>
              </BoxWrapper>
              </a>

              <HeaderText2>기타사항</HeaderText2>
              <HeaderArea>{cardItem.additionalInfo}</HeaderArea>
                </RightGridWrapper>
            </RightGrid>
          </GridWrapper>
      </PageWrapper>
    </PageContainer>
    </div>
))
) : (
  <div>카드 정보가 없습니다.</div> // 여기에 내용이 없을 때 처리할 추가적인 UI를 넣어도 좋습니다.
)}
<MainContainer>
  <OuterGrid>
    <GridLeft>
      <div style={({fontSize: '32px', fontWeight: '600', marginBottom:'40px'})}>
        현재 참여중인 공모전
      </div>
    </GridLeft>
  </OuterGrid>
</MainContainer>

{/* 현재 참여중인 공모전 */}
<Container>
  {/* chunkedData의 각 row를 렌더링 */}
  {chunkedData.map((row, rowIndex) => (
  <Row key={rowIndex}>
    {row.map((item) => (
      <Card2 key={item.landId} onClick={() => navigate(`/land/${item.landId}`)}>
        <CardInfo>
          <ProjectTitle>{item.landName}</ProjectTitle>
          <TeamLeader>
            {item.role === "owner" ? "팀장" : "팀원"}
          </TeamLeader>
        </CardInfo>
        <TeamMember>
          <MemImage src={getMemImage(item.countMember)} alt="memIcon" />
          {(item.countMember > 4)? <Num>+{(item.countMember-4) || 1}</Num> : <></>}
        </TeamMember>
      </Card2>
    ))}
  </Row>
))}
</Container>

<MainContainer>
  {/* 그리드 위에 설명 */}
  <OuterGrid>
    <GridLeft>
      <div style={({fontSize: '32px', fontWeight: '600', marginBottom:'40px'})}>
        내가 지원한 공모전
      </div>
    </GridLeft>
    <GridLeft>
      <div style={({fontSize: '32px', fontWeight: '600', marginBottom:'40px'})}>
          내가 작성한 글
      </div>
    </GridLeft>
  </OuterGrid>
</MainContainer>

<MainContainer>
  {/* 전체 그리드 */}
      <OuterGrid>
        {/* 좌측 그리드 */}
        <GridLeft>
          <GridSection>
            {/* 카테고리 정렬 배열 */}
            {Object.keys(AppliedProjects).map((category, index) => (
            <Card3 key={index}>
              <SectionLeft>
                <CardTitle>{category}</CardTitle>
              </SectionLeft>

              <SectionRight>
                <Column>
                {/* 카테고리 별 포스트 배열 */}
                {AppliedProjects[category].map((category) => (
                  <Card3 key={category.postId}>
                    <ProjectTitle onClick={() => navigate(`/detail/${category.id-1}`)}>{truncateString(category.title, 32)} </ProjectTitle>
                    <StatusBox>
                      {statusText[category.status] || "거절됨"}
                      <StatusColor clr={statusColor[category.status] || "#D7F48B"} />
                    </StatusBox>
                  </Card3>
                ))}
                </Column>
              </SectionRight>
            </Card3>
          ))}
          </GridSection>
        </GridLeft>

        <GridRight>
          <GridSection>
            {/* 카테고리 정렬 배열 */}
            {Object.keys(OwnerProjects).map((category, index) => (
              <Card3 key={index}>
                <SectionLeft>
                  <CardTitle>{category}</CardTitle>
                </SectionLeft>

                <SectionRight>
                  <Column>
                  {/* 카테고리 별 포스트 배열 */}
                  {OwnerProjects[category].map((category) => {
                    // 원하는 길이(예: 20자)만큼만 잘라내기
                    const truncatedTitle = truncateString(category.title, 37);
                    return(
                    <Card3 key={category.postId}>
                      <ProjectTitle onClick={() => navigate(`/detail/${category.postId}`)}>{truncatedTitle} </ProjectTitle>
                      <img
                        src={category.approvedCount === category.totalApplicants - 1 ? complete : progress}
                        alt=""
                        style={{ width: "110px", height: "35px" }}
                      />
                    </Card3>
                    );
                  })}
                  </Column>
                </SectionRight>
              </Card3>
            ))}
          </GridSection>
        </GridRight>
      </OuterGrid>
    </MainContainer>
  </>
);
}

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

const CardContainer = styled.div`
  width: 493px;
  height: 109px;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 10px;
  margin-left: 117px;
  margin-bottom: 42px;
`;

const ImageWrapper = styled.div`
  position: relative;
  margin-right: 24px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const TextWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-size: 32px;
  font-weight: 600;
  color: #111111;
  margin-bottom: 10px;
`;

const Details = styled.div`
  font-size: 18px;
  font-weight: 500;
  
  margin-bottom: 4px;
`;

const Email = styled.div`
  font-size: 18px;
  font-weight: 400;
`;

// 역량카드

const PageContainer = styled.div`
  width: 1726px;
  height: auto;
  display: flex;
  justify-content: center;
  margin-bottom: 120px;
`;

const PageWrapper = styled.div`
    width: 1568px;
    padding: 30px;
    margin-left: 76px;
    background: #836EFF;
    border-radius: 16px;
    
`;

const GridWrapper = styled.div`
  display : flex;
  width: 100%;
`;
const LeftGrid = styled.div`
  width: 900px;
  background: #836EFF;
  align-items: center;
`;

const RightGrid = styled.div`
  width: 494px;
  align-items: center;
  margin-left: 15px;
  padding: 7px 150px 0px 30px;
`;

const RightGridWrapper = styled.div``;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(200px, 4fr);
    gap: 1rem;
    grid-template-areas:
        "communication work thinking role"
        "communication work thinking role"
        "conflict time rest friendship"
        "conflict time important important";
`;

const Num = styled.p`
  position: absolute;
  right: 3px;
  top: 3px;
  font-size: 12px;
  font-weight: 500;

  transform: translate(-50%, -50%);
`;

const Card = styled.div`
    background: white;
    border-radius: 8px;
    padding: 16px;
`;

const CardTitle = styled.div`
    background: #6c54f7;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 8px;
    font-size: 18px;
    font-weight: bold;
    display: inline-block;
    margin-bottom: 0.5rem;
    height: 31px;
    font-weight: 500;
    white-space: nowrap;
    width: ${({ isImportant }) => (isImportant ? "150px" : "110px")};
`;

const CardContent = styled.div`
    font-size: 18px;
    font-weight: 400;
    color: #111111;
`;

//드롭다운 스타일

const DropdownContainer = styled.div`
    width: 465px;
    border-radius: 5px;
    margin-bottom: 18px;
    
`;

const DropdownHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    background: #836EFF;
    border-radius: 5px;
`;

const HeaderText = styled.div`
    display: inline-block;
     font-size: 18px;
    font-weight: 600;
    
`;

const HeaderText2 = styled.div`
    display: inline-block;
     font-size: 18px;
    font-weight: 600;
    color:white;
    
`;

const HeaderArea = styled.div`
  width: 455px;
  height: auto;
  margin-top: 22px;
  color: #FFF;

font-family: Pretendard;
font-size: 18px;
`;

const Arrow = styled.div`
   font-size: 18px;
    font-weight: 600;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease-in-out;
`;

const Arrow2 = styled.div`
    font-size: 18px;
    font-weight: 600;
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease-in-out;
`;

const DropdownContent = styled.div`
    position: absolute;
    width: 470px;
    height: auto;
    background-color: white;
    color: #111;
    padding: 10px 20px;
    border-radius: 5px;
`;

const ContentItem = styled.div`
    padding: 5px 0;
    font-size: 18px;
    font-weight: 400;
    &:hover {
        cursor: pointer;
    }
`;

// 파일, pdf 스타일
const BoxWrapper = styled.div`
display: flex;
align-items: center;
width: 470px;
height: 52px;
border-radius: 8px;
background-color: white;
padding: 0 12px;
margin-bottom: 18px;
margin-top: 20px;

`;

const ImagePlaceholder = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 20px;
height: 20px;
`;

const ImageStyle = styled.img`
  width: 18px;
  height: 18px;
`;

const TextWrapper = styled.div`
display: flex;
align-items: center;

flex: 1;
margin-left: 10px;

`;

const FileName = styled.div`
font-size: 18px;
font-weight: 400;
color: #111111;
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
`;

const FileSize = styled.div`
font-size: 12px;
color: #767676;
margin-left: 10px;
`;


//현재 참여중인 공모전 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px; 
  width: 1580px;
  margin: 0 114px;
  margin-bottom: 114px;
`;

const Row = styled.div`
  display: flex;
  gap: 20px; 
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;

const Card2 = styled.div`
  width: 775px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 23.5px 25px;
  background: #f0f3fa;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: #e6e8f0;
  }
`;

const Card3 = styled.div`
  display: flex;
  justify-content: space-between;
  
  
  margin-bottom: 18px;
  font-size: 22px;
  font-weight: 400;
  border-radius: 8px;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap:24px;
`;

const ProjectTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: #111;
`;

const TeamLeader = styled.div`
  font-size: 20px;
  font-weight: 400;
`;

const TeamMember = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
`;

const MemImage = styled.img`
  height: 28px; 
`;

//젤 아래 컴포넌트

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  
  margin: 0 119px;
  
`;

const OuterGrid = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 42px;
`;

const GridLeft = styled.div`
  flex: 1;
  
  display: flex;
  flex-direction: column;
  
`;

const GridRight = styled.div`
  flex: 1;
  
  display: flex;
  flex-direction: column;
  
`;

const GridSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  margin-bottom: 42px;
  border-radius: 5px;
`;

const SectionLeft = styled.div`
  flex: 1;
  border-radius: 5px;
`;

const SectionRight = styled.div`
  flex: 5;
  border-radius: 5px;
`;
