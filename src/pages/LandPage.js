import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent, KeepScale } from "react-zoom-pan-pinch";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import styled from "styled-components";

import bgsvg from "../assets/LandPage/background.svg";
import mon from "../assets/LandPage/human.svg";
import bubble0 from "../assets/LandPage/Bubbles/bubble0.svg";
import bubble1 from "../assets/LandPage/Bubbles/bubble1.svg";
import bubble2 from "../assets/LandPage/Bubbles/bubble2.svg";
import bubble3 from "../assets/LandPage/Bubbles/bubble3.svg";
import bubble4 from "../assets/LandPage/Bubbles/bubble4.svg";
import bubble5 from "../assets/LandPage/Bubbles/bubble5.svg";
import bubble6 from "../assets/LandPage/Bubbles/bubble6.svg";
import bubble7 from "../assets/LandPage/Bubbles/bubble7.svg";
import bubble8 from "../assets/LandPage/Bubbles/bubble8.svg";
import bubble9 from "../assets/LandPage/Bubbles/bubble9.svg";
import bubble10 from "../assets/LandPage/Bubbles/bubble10.svg";

import exit from "../assets/icon_exit.png";
import profile from "../assets/profile.png";
import ConfirmModal from "../components/modals/ConfirmModal";
import SkillCardModal from "../components/modals/LandSkillCard";

import { getMembersAPI } from "../context/FormContext";
import axios from "axios";

const SCR_HEIGHT = window.screen.height - (window.outerHeight - window.innerHeight);
const SCR_WIDTH = window.screen.width - (window.outerWidth - window.innerWidth);
const BG_RATIO = 1.82;

const bubbleArr = [bubble1, bubble2, bubble3, bubble4, bubble5, bubble6, bubble7, bubble8, bubble9, bubble10];

const Land = ({ teamMembers, hoveredMemberIds, onHover, onOpenSkillCard }) => {
  
  const FromTopLeftList = [
    { fromtop:82, fromleft: 45 },
    { fromtop:64, fromleft: 27.5 },
    { fromtop:52.5, fromleft: 64 },
    { fromtop:43, fromleft: 42.2 },
    { fromtop:78, fromleft: 77.5 },
    { fromtop:36, fromleft: 34.5 },
    { fromtop:72, fromleft: 61 },
    { fromtop:58, fromleft: 73 },
    { fromtop:53, fromleft: 50.4 },
    { fromtop:32, fromleft: 50.5 }
  ];
  
  let containerWidth = SCR_WIDTH;
  let containerHeight = containerWidth / BG_RATIO;
  if (containerHeight < SCR_HEIGHT) {
    containerHeight = SCR_HEIGHT;
    containerWidth = containerHeight * BG_RATIO;
  }

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: `${SCR_WIDTH}`, height: `${SCR_HEIGHT}`, overflow: "hidden" }}>
      <TransformWrapper
        initialScale={1}
        initialPositionX={0}
        initialPositionY={0}
        minScale={0.7}
        maxScale={3}
        limitToBounds={true}
      >

        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
          <React.Fragment>
            <TransformComponent>
              <div style={{ position: "relative", width: `${containerWidth}px`, height: `${containerHeight}px`, display: "flex", justifyContent: "center" }}>
                <img src={bgsvg} alt="background" style={{ width: "100%", height: "100%", objectFit: "cover" }} />


                {teamMembers.map((member, i) => {
                  const { fromtop, fromleft } = FromTopLeftList[i];

                  const monTop = `${fromtop}%`;
                  const monLeft = `${fromleft}%`;
                  const bubbleTop = `calc(${fromtop}% - ${SCR_HEIGHT * 0.07}px)`;

                  const isHovered = hoveredMemberIds.includes(member.userId);

                  let bubbleSrc = isHovered ? bubble0 : bubbleArr[i];

                  return (
                    <React.Fragment key={member.userId}>
                      <img
                        src={mon}
                        alt={`monster of ${member.name}`}
                        style={{
                          width: `${SCR_HEIGHT * 0.038}px`,
                          position: "absolute",
                          top: monTop,
                          left: monLeft,
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: bubbleTop,
                          left: monLeft,
                          transform: "translate(-50%, -50%)",
                          zIndex: 2,
                        }}

                        onMouseEnter={() => onHover(member.userId, true)}
                        onMouseLeave={() => onHover(member.userId, false)}

                        onClick={() => onOpenSkillCard?.()}
                      >
                        <KeepScale style={{ transformOrigin: "center bottom" }}>
                          <div>
                            <img
                              src={bubbleSrc}
                              alt={`bubble-${member.name}`}
                              style={{ width: "50px", pointerEvents: "auto", cursor: "pointer" }}
                            />
                          </div>
                        </KeepScale>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );

}

const TeamListFloatingContainer = styled.div`
  position: absolute;
  top: 80px;
  left: calc(100vw - 30px);
  transform: translate(-100%, 0);
  width: 230px;
  padding: 16px 16px 0 16px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  z-index: 5;
`;

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 12px;
  color: white;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 8px;
`;
const MemberName = styled.span`
  font-size: 0.95rem;
  color: white;
`;

const SkillButton = styled.button`
  background-color: #6c54f7;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 0.8rem;
`;

const ExpandButton = styled.button`
  margin-top: 8px;
  margin-bottom: 0;
  padding: 0;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 20px;
  width: 100%;
`;

// Modal Overlay
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal Container
const ModalContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
`;

// Input Field
const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  box-sizing: border-box;
`;

// Button Group
const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const AddShortcutModal = ({ isOpen, onClose, onAdd }) => {
  const [shortcutName, setShortcutName] = useState("");
  const [shortcutURL, setShortcutURL] = useState("");

  const handleAdd = () => {
    if (shortcutName.trim() === "" || shortcutURL.trim() === "") {
      alert("이름과 URL을 모두 입력해주세요.");
      return;
    }
    onAdd({ name: shortcutName, url: shortcutURL });
    setShortcutName("");
    setShortcutURL("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <h3>바로가기 추가</h3>
        <label>이름</label>
        <InputField
          type="text"
          value={shortcutName}
          onChange={(e) => setShortcutName(e.target.value)}
          placeholder="바로가기 이름"
        />
        <label>URL</label>
        <InputField
          type="text"
          value={shortcutURL}
          onChange={(e) => setShortcutURL(e.target.value)}
          placeholder="URL"
        />
        <ButtonGroup>
          <button onClick={onClose}>취소</button>
          <button onClick={handleAdd}>추가</button>
        </ButtonGroup>
      </ModalContainer>
    </ModalOverlay>
  );
};


const TeamListFloating = ({ members, onHover, onOpenSkillCard, onToggleExpand }) => {
  const [expanded, setExpanded] = useState(false);

  const visibleCount = expanded ? members.length : Math.min(members.length, 4);

  return (
    <TeamListFloatingContainer>
      <Title>팀원 목록</Title>
      <MemberList>
        {members.slice(0, visibleCount).map((member) => (
          <MemberRow
            key={member.userId}
            onMouseEnter={() => onHover(member.userId, true)}
            onMouseLeave={() => onHover(member.userId, false)}
          >
            <ProfileWrapper>
              <ProfileImage src={require("../assets/profile.png")} alt={member.name} />
              <MemberName>{member.name}</MemberName>
            </ProfileWrapper>
            <SkillButton onClick={() => onOpenSkillCard?.()}>역량카드</SkillButton>
          </MemberRow>
        ))}
      </MemberList>

      {members.length > 4 && (
        <ExpandButton onClick={() => {onToggleExpand(!expanded); setExpanded(!expanded); }}>
          {expanded ? (
              <MdExpandLess />
          ) : (
              <MdExpandMore />
          )}
        </ExpandButton>
      )}
    </TeamListFloatingContainer>
  );
};

const TeamPageFloatingContainer = styled.div`
  position: absolute;
  left: calc(100vw - 30px);
  transform: translateX(-100%);
  width: 230px;
  padding: 16px 16px 0 16px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  z-index: 5;
`;

const TeamPageTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddButton = styled.button`
  color: white;
  background-color: rgba(0, 0, 0, 0);
  border: none;
  margin-bottom: 12px;
  padding: 0;
  cursor: pointer;
`;

const ShortcutList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShortcutRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;

  &:last-child {
    margin-bottom: 12px;
  }
`;

const ShortcutName = styled.span`
  font-size: 0.95rem;
  color: white;
  cursor: pointer;
  text-decoration: underline;
`;

const TeamPageFloating = ({ memberNum, isTeamListExpanded, shortcuts, onAddShortcut }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddClick = () => {
    setIsModalOpen(true);
  };

  const handleAddShortcut = (shortcut) => {
    onAddShortcut(shortcut);
  };

  return (
    <TeamPageFloatingContainer 
      style={{ top: `calc(86px + 22.5px + ${(memberNum > 4 && (!isTeamListExpanded))? 180: (memberNum <= 4)? 44 * memberNum - 24.5 : 44*memberNum}px + 24.5px + 40px)` }}
    >
      <TeamPageTitleWrapper>
        <Title>팀 페이지</Title>
        {shortcuts.length < 3 && (
          <AddButton onClick={handleAddClick}>추가하기</AddButton>
        )}
      </TeamPageTitleWrapper>
      <ShortcutList>
        {shortcuts.map((shortcut, index) => (
          <ShortcutRow key={index}>
            <ShortcutName onClick={() => window.open(shortcut.url, "_blank")}>
              {shortcut.name}
            </ShortcutName>
          </ShortcutRow>
        ))}
      </ShortcutList>

      <AddShortcutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddShortcut}
      />
    </TeamPageFloatingContainer>
  );
};

const LandTitleDiv = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  color: white;

  margin-top: 15px;
`;

const LandTitle = styled.h1`
  margin: 0;
  margin-right: 5px;
  padding: 0;
`;

const LeftTopButton = styled.img`
  position: absolute;
  left: 3vw;
  top: 5vh;
  width: 30px;
  transform: translate(-50%, -50%);

  cursor: pointer;
`;

const RightTopButton = styled.img`
  position: absolute;
  left: calc(100vw - 30px);
  top: 23px;
  width: 40px;
  transform: translate(-100%, 0);
`;

const RightBottomButton = styled.button`
  position: absolute;
  left: calc(100vw - 30px);
  top: calc(100vh - 23px);
  transform: translate(-100%, -100%);

  width: 100px;
  height: 40px;
  border-radius: 32px;

  cursor: pointer;
`;


const LandPage = () => {

  const [teamMembers, setTeamMembers] = useState([]); // 초기값은 빈 배열

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        console.log("쏩니다");
        const response = await axios.get("http://172.30.1.79:8080/land/2/members");
        setTeamMembers(response.data); // 서버로부터 데이터 설정
        console.log(response.data);
      } catch (error) {
        console.error("API 호출 에러(GET)", error);
      }
    };

    fetchTeamMembers(); // 데이터 가져오기
  }, []); // 컴포넌트 마운트 시 1회 실행

  if (!Array.isArray(teamMembers)) {
    alert("에러 발생");
  }

  const teamMembers2 = [
    { id: 1, profile: "profile.png", name: "강신엽" },
    { id: 2, profile: "profile.png", name: "강신엽" },
    { id: 3, profile: "profile.png", name: "지석영" },
    { id: 4, profile: "profile.png", name: "지석영" },
    { id: 5, profile: "profile.png", name: "정민찬" },
    // { id: 6, profile: "profile.png", name: "정민찬" },
  ];

  const allCards = [
    { id: 'communication', title: '소통', content: ['비대면 소통을 선호해요', '새벽연락도 가능해요'] },
    { id: 'work', title: '작업', content: ['다같이 작업하고 싶어요', '평일에 하고 싶어요'] },
    { id: 'thinking', title: '사고', content: ['논리적이에요', '창의적이에요'] },
    { id: 'role', title: '역할', content: ['리더십이 있어요', '기록을 잘 남겨요'] },
    { id: 'conflict', title: '갈등 해결', content: ['바로 해결해요', '솔직하게 표현해요'] },
    { id: 'time', title: '시간', content: ['오전(06-12)', '저녁(18-00)'] },
    { id: 'rest', title: '휴식', content: ['짧게 자주 쉬고 싶어요'] },
    { id: 'friendship', title: '친목', content: ['작업에만 집중하고 싶어요'] },
    { id: 'important', title: '중요하게 생각해요', content: ['팀플 시간을 꼭 지켜주기'] },
  ];

  const [isAddTeamPageOpen, setIsAddTeamPageOpen] = useState(false);
  const [isSkillCardOpen, setIsSkillCardOpen] = useState(false);
  const [hoveredMemberIds, setHoveredMemberIds] = useState([]);
  const [isTeamListExpanded, setIsTeamListExpanded] = useState(false);
  const [shortcuts, setShortcuts] = useState([]);

  const handleOpenAddTeamPage = () => {
    setIsAddTeamPageOpen(true);
  };

  const handleCloseAddTeamPage = () => {
    setIsAddTeamPageOpen(false);
  };

  const handleOpenSkillCard = () => {
    setIsSkillCardOpen(true);
  }

  const handleCloseSkillCard = () => {
    setIsSkillCardOpen(false);
  }

  const handleConfirm = () => {
    setIsAddTeamPageOpen(false);
    alert("팀에서 나갔습니다!");
  };

  const handleHover = (MemberId, isHovered) => {
    setHoveredMemberIds((prev) => {
      if (isHovered) {
        if (!prev.includes(MemberId)) {
          return [...prev, MemberId];
        }
        return prev;
      } else {
        return prev.filter((id) => id !== MemberId);
      }
    });
  };

  const handleAddShortcut = (shortcut) => {
    if (shortcuts.length < 3) {
      setShortcuts([...shortcuts, shortcut]);
    }
  };

  document.body.style.overflow = 'hidden';

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#6C54F7" }}>
      <Land 
        teamMembers={teamMembers} 
        hoveredMemberIds={hoveredMemberIds}
        onHover={handleHover}
        onOpenSkillCard={handleOpenSkillCard}
      />

      <LandTitleDiv>
        <LandTitle>PARD</LandTitle>
      </LandTitleDiv>

      
      <RightTopButton src={profile} onClick={() => setIsSkillCardOpen(true) } />
      
      <TeamListFloating
        members={teamMembers}
        onHover={handleHover}
        onOpenSkillCard={handleOpenSkillCard}
        onToggleExpand={setIsTeamListExpanded}
      />
      <TeamPageFloating
        memberNum={teamMembers.length}
        isTeamListExpanded={isTeamListExpanded}
        shortcuts={shortcuts}
        onAddShortcut={handleOpenAddTeamPage}
      />

      <RightBottomButton onClick={handleOpenAddTeamPage} >홈 이동하기</RightBottomButton>

      <ConfirmModal 
        isOpen={isAddTeamPageOpen}
        onClose={handleCloseAddTeamPage}
        onConfirm={handleConfirm}
        title="팀을 나가시겠습니까?"
        message="팀을 나가면 진행 중인 활동에 더 이상 참여할 수 없습니다."
        cancelText="취소"
        confirmText="나가기"
        showOverlay={true}
      />


      <SkillCardModal
        isOpen={isSkillCardOpen}
        onClose={handleCloseSkillCard}
        userInfo={{
          profileImage: {profile},
          name: "홍길동",
          age: 21,
          gender: "남성",
          affiliation: "서울대학교 컴퓨터공학과 3학년",
          email: "hong@hong.com",
          workStyle: "주 1회 오프라인, Git/GitHub 협업",
          hardSkills: ["React", "Node.js", "AWS"],
        }}

        positionTop= "50px"
        positionLeft="50px"
        centerByTransform={false}
      />
    </div>
  )
}

export default LandPage;