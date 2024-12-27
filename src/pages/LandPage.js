import React, { useState } from "react";
import { TransformWrapper, TransformComponent, KeepScale } from "react-zoom-pan-pinch";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import styled from "styled-components";

import bgsvg from "../assets/LandPage/background.svg";
import mon from "../assets/LandPage/human.svg";
import bubble0 from "../assets/LandPage/bubble0.svg";
import bubble1 from "../assets/LandPage/bubble1.svg";
import exit from "../assets/icon_exit.png";
import home from "../assets/icon_home.png";
import profile from "../assets/profile.png";

import ConfirmModal from "../components/modals/ConfirmModal";
import SkillCardModal from "../components/modals/SkillCardModal";


// TODO: LandTitleDiv 기능
// TODO: bubble 높이 조절
// TODO: 


const SCR_HEIGHT = window.screen.height - (window.outerHeight - window.innerHeight);
const SCR_WIDTH = window.screen.width - (window.outerWidth - window.innerWidth);
const BG_RATIO = 1.82;

const Land = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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


                <img src={mon} alt="monster" style={{ width: `${SCR_HEIGHT * 0.038}px`, position: "absolute", top: "32%", left: "50.5%", transform: "translate(-50%, -50%)" }} />
                <div style={{ position: "absolute", top: "32%", left: "50.5%", transform: `translate(-50%, calc(-50% - ${SCR_HEIGHT * 0.038 * 1.011}px))`, zIndex: 2 }}>
                  <KeepScale style={{transformOrigin: "center bottom"}}>
                    <div>
                      <img 
                        src={isHovered ? bubble0 : bubble1} 
                        alt="pin" 
                        style={{ width: "50px", pointerEvents: "auto", cursor: "pointer" }} 
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                  </KeepScale>
                </div>



              </div>
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );

}

const LandTitleDiv = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  align-items: center;
  background-color: black;
  color: white;

  margin: 10px; // TODO: margin
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
  transform: translate(-50%, -50%);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSkillCardOpen, setIsSkillCardOpen] = useState(false);

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

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", backgroundColor: "#6C54F7" }}>
      <Land />
      <LandTitleDiv>
        <LandTitle>PARD</LandTitle>
        <MdExpandMore />
      </LandTitleDiv>
      <RightTopButton src={profile} onClick={() => setIsSkillCardOpen(true) } />
      <RightBottomButton src={exit} />
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
          profileImage: profile,
          name: "홍길동",
          age: 21,
          gender: "남성",
          affiliation: "서울대학교 컴퓨터공학과 3학년",
          email: "hong@hong.com",
          workStyle: "주 1회 오프라인, Git/GitHub 협업",
          hardSkills: ["React", "Node.js", "AWS"],
        }}

        // 원하는 위치 지정
        positionTop="200px"       // top: 200px
        positionLeft="300px"      // left: 300px
        centerByTransform={false} // 중앙정렬 off -> (200px, 300px)이 좌상단 기준 위치
      />
    </div>
  )
}

export default LandPage;

