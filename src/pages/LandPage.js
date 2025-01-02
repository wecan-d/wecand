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

import profile from "../assets/profile.png";
import SkillCardModal from "../components/modals/LandSkillCard";

import { urls, urlnames, card, card2, members, card1, card4, card3, card5 } from "./LandPageData";

import { getMembersAPI } from "../context/FormContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddTeamPageModal from "../components/modals/AddTeamPageModal";

const SCR_HEIGHT = window.screen.height - (window.outerHeight - window.innerHeight);
const SCR_WIDTH = window.screen.width - (window.outerWidth - window.innerWidth);
const BG_RATIO = 1.82;

const MARGIN_FROM_RIGHT = 50;

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

                        onClick={() => onOpenSkillCard(member.userId)}
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
  top: 95px;
  left: calc(100vw - ${MARGIN_FROM_RIGHT}px);
  transform: translate(-100%, 0);
  width: 280px;
  padding: 20px 20px 0 20px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 12px;
  z-index: 5;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: white;
`;

const MemberList = styled.div`
  display: flex;
  flex-direction: column;

  &:last-child {
    margin-bottom: 10px;
  }
`;

const MemberRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0;
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
  margin-right: 10px;
`;
const MemberName = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: white;
`;

const SkillButton = styled.button`
  background-color: #6c54f7;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 17px;
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

const AddShortcutModal2 = ({ isOpen, onClose, onAdd }) => {
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
      <Title style = {{marginBottom: "12px"}}>팀원 목록</Title>
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
            <SkillButton onClick={() => onOpenSkillCard(member.userId)}>역량카드</SkillButton>
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
  left: calc(100vw - ${MARGIN_FROM_RIGHT}px);
  transform: translateX(-100%);
  width: 280px;
  padding: 16px;
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
  margin: 10px 0;
  padding-left: 5px;

&:first-child {
  margin-top: 15px;
}
&:last-child {
  margin-bottom: 2px;
}
`;

const ShortcutName = styled.span`
  font-size: 18px;
  color: white;
  cursor: pointer;
  text-decoration: underline;
`;

const TeamPageFloating = ({ memberNum, isTeamListExpanded, teamPages, handleOpenAddTeamPage }) => {

  const handleAddClick = () => {
    handleOpenAddTeamPage();
  };

  return (
    <TeamPageFloatingContainer 
      style={{ top: `calc(111px + 32.5px + ${(memberNum > 4 && (!isTeamListExpanded))? 176: (memberNum <= 4)? 45 * memberNum - 24.5 : 45*memberNum}px + 24.5px + 40px)` }}
    >
      <TeamPageTitleWrapper>
        <Title>팀 페이지</Title>
        {teamPages.length < 5 && (
          <AddButton onClick={handleAddClick}>추가하기</AddButton>
        )}
      </TeamPageTitleWrapper>
      <ShortcutList>
        {teamPages.map((teamPage, index) => (
          <ShortcutRow key={index}>
            <ShortcutName 
              onClick={() => {
                const url = teamPage.url.startsWith("http")? teamPage.url : `https://${teamPage.url}`
                window.open(url, "_blank")
              }}
            >
              {teamPage.name}
            </ShortcutName>
          </ShortcutRow>
        ))}
      </ShortcutList>

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

const RightTopButton = styled.img`
  position: absolute;
  left: calc(100vw - ${MARGIN_FROM_RIGHT}px);
  top: 25px;
  width: 50px;
  transform: translate(-100%, 0);
`;

const RightBottomButton = styled.button`
  position: absolute;
  left: calc(100vw - ${MARGIN_FROM_RIGHT}px);
  top: calc(100vh - 40px);
  transform: translate(-100%, -100%);

  width: 148px;
  height: 52px;
  border: none;
  border-radius: 32px;

  padding: 10px;
  color: #6C54F7;

  font-size: 20px;
  font-weight: 700;

  cursor: pointer;

  &:hover {
    width: 150px;
    height: 54px;
    left: calc(100vw - 49px);
    top: calc(100vh - 39px);

    font-size: 20.5px;
  }
`;


const LandPage = () => {

  const [isAddTeamPageOpen, setIsAddTeamPageOpen] = useState(false);
  const [isSkillCardOpen, setIsSkillCardOpen] = useState(false);
  const [hoveredMemberIds, setHoveredMemberIds] = useState([]);
  const [isTeamListExpanded, setIsTeamListExpanded] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState(null);
  const [teamPage, setTeamPage] = useState([]);

  const handleOpenAddTeamPage = () => {
    setIsAddTeamPageOpen(true);
  };

  const handleCloseAddTeamPage = () => {
    setIsAddTeamPageOpen(false);
  };

  const handleAddTeamPage = (teamPageName, teamPageUrl) => {
    setTeamPage((prevTeamPage) => [...prevTeamPage, {
      "name": teamPageName,
      "url": teamPageUrl
    }]);
  };

  const combinedUrls = urls.map((url, index) => {
    return {name: urlnames[index], url: url};
  });

  const handleOpenSkillCard = (userId) => {
    const cardMap = {
      1: card1,
      2: card2,
      3: card3,
      4: card4,
      5: card5,
    };
    setSelectedUserInfo(cardMap[userId]);
    
    setIsSkillCardOpen(true);
  }

  const handleCloseSkillCard = () => {
    setIsSkillCardOpen(false);
    setSelectedUserInfo(null);
  }

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

  document.body.style.overflow = 'hidden';

  const navigate = useNavigate();
  const handleRightBottomButtonClick = () => {
    document.body.style.overflow = 'auto';
    navigate('/home');
  }
  const handleRightTopButtonClick = () => {
    document.body.style.overflow = 'auto';
    navigate('/mypage');
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#6C54F7" }}>
      <Land 
        teamMembers={members} 
        hoveredMemberIds={hoveredMemberIds}
        onHover={handleHover}
        onOpenSkillCard={handleOpenSkillCard}
      />

      <LandTitleDiv>
        <LandTitle>PARD</LandTitle>
      </LandTitleDiv>

      
      <RightTopButton src={profile} onClick={handleRightTopButtonClick} />
      
      <TeamListFloating
        members={members}
        onHover={handleHover}
        onOpenSkillCard={handleOpenSkillCard}
        onToggleExpand={setIsTeamListExpanded}
      />
      <TeamPageFloating
        memberNum={members.length}
        isTeamListExpanded={isTeamListExpanded}
        teamPages={combinedUrls}
        handleOpenAddTeamPage={handleOpenAddTeamPage}
      />

      <RightBottomButton onClick={handleRightBottomButtonClick} >홈 이동하기</RightBottomButton>

      <SkillCardModal
        isOpen={isSkillCardOpen}
        onClose={handleCloseSkillCard}
        userInfo={selectedUserInfo}

        positionTop= "50px"
        positionLeft="50px"
        centerByTransform={false}
      />

      <AddTeamPageModal
        isOpen={isAddTeamPageOpen}
        onClose={handleCloseAddTeamPage}
        onConfirm={handleAddTeamPage}
      />
    </div>
  )
}

export default LandPage;