import React, { useState } from "react";
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
import SkillCardModal from "../components/modals/SkillCardModal";

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
        limitToBounds={false}
        // 이동 제한
        onPanningStop={(ref) => {
          const { scale, positionX, positionY } = ref.state;
          
          const minX = -0.3 * SCR_WIDTH;
          const maxX = 0.3 * SCR_WIDTH;
          const minY = -0.3 * SCR_HEIGHT;
          const maxY = 0.3 * SCR_HEIGHT;
      
          let clampedX = Math.min(Math.max(positionX, minX), maxX);
          let clampedY = Math.min(Math.max(positionY, minY), maxY);
      
          if (clampedX !== positionX || clampedY !== positionY) {
            ref.setTransform(clampedX, clampedY, scale);
          }
        }}
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

                  const isHovered = hoveredMemberIds.includes(member.id);

                  let bubbleSrc = isHovered ? bubble0 : bubbleArr[i];

                  return (
                    <React.Fragment key={member.id}>
                      <img
                        src={mon}
                        alt={`monster-${member.name}`}
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

                        onMouseEnter={() => onHover(member.id, true)}
                        onMouseLeave={() => onHover(member.id, false)}

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

const FloatingContainer = styled.div`
  position: absolute;
  top: calc(5vh + 20px + 8px);
  left: 98vw;
  transform: translateX(-100%);
  width: 200px;
  padding: 16px;
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
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }
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
  padding: 4px 8px;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 20px;
  width: 100%;
`;

const TeamListFloating = ({ members, onHover, onOpenSkillCard }) => {
  const [expanded, setExpanded] = useState(false);

  const visibleCount = expanded ? members.length : Math.min(members.length, 4);

  return (
    <FloatingContainer>
      <Title>팀원 목록</Title>
      <MemberList>
        {members.slice(0, visibleCount).map((member) => (
          <MemberRow
            key={member.id}
            onMouseEnter={() => onHover(member.id, true)}
            onMouseLeave={() => onHover(member.id, false)}
          >
            <ProfileWrapper>
              <ProfileImage src={require(`../assets/${member.profile}`)} alt={member.name} />
              <MemberName>{member.name}</MemberName>
            </ProfileWrapper>
            <SkillButton onClick={() => onOpenSkillCard?.()}>역량카드</SkillButton>
          </MemberRow>
        ))}
      </MemberList>

      {members.length > 4 && (
        <ExpandButton onClick={() => setExpanded(!expanded)}>
          {expanded ? (
              <MdExpandLess />
          ) : (
              <MdExpandMore />
          )}
        </ExpandButton>
      )}
    </FloatingContainer>
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
  left: 97vw;
  top: 5vh;
  width: 40px;
  transform: translate(-70%, -50%);
`;

const RightBottomButton = styled.img`
  position: absolute;
  left: 97vw;
  top: 95vh;
  width: 30px;
  transform: translate(-50%, -50%);

  cursor: pointer;
`;

const LandPage = () => {

  const teamMembers = [
    { id: 1, profile: "profile.png", name: "강신엽" },
    { id: 2, profile: "profile.png", name: "강신엽" },
    { id: 3, profile: "profile.png", name: "지석영" },
    { id: 4, profile: "profile.png", name: "지석영" },
    { id: 5, profile: "profile.png", name: "정민찬" },

    { id: 6, profile: "profile.png", name: "정민찬" },
    { id: 7, profile: "profile.png", name: "정민찬" },
    { id: 8, profile: "profile.png", name: "정민찬" },
    { id: 9, profile: "profile.png", name: "정민찬" },



  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSkillCardOpen, setIsSkillCardOpen] = useState(false);
  const [hoveredMemberIds, setHoveredMemberIds] = useState([]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleConfirm = () => {
    setIsModalOpen(false);
    alert("팀에서 나갔습니다!");
  };

  const openSkillCard = () => setIsSkillCardOpen(true);

  const handleHover = (memberId, isHovered) => {
    setHoveredMemberIds((prev) => {
      if (isHovered) {
        if (!prev.includes(memberId)) {
          return [...prev, memberId];
        }
        return prev;
      } else {
        return prev.filter((id) => id !== memberId);
      }
    });
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#6C54F7" }}>
      <Land 
        teamMembers={teamMembers} 
        hoveredMemberIds={hoveredMemberIds}
        onHover={handleHover}
        onOpenSkillCard={openSkillCard}
      />

      <LandTitleDiv>
        <LandTitle>PARD</LandTitle>
        {/* <MdExpandMore /> */}
      </LandTitleDiv>

      <RightTopButton src={profile} onClick={() => setIsSkillCardOpen(true) } />
      <TeamListFloating
        members={teamMembers}
        onHover={handleHover}
        onOpenSkillCard={openSkillCard}
      />

      <RightBottomButton src={exit} onClick={handleOpenModal} />

      <ConfirmModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirm}
        title="팀을 나가시겠습니까?"
        message="팀을 나가면 진행 중인 활동에 더 이상 참여할 수 없습니다."
        cancelText="취소"
        confirmText="나가기"
        showOverlay={true}
      />


      <SkillCardModal
        isOpen={isSkillCardOpen}
        onClose={() => setIsSkillCardOpen(false)}
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