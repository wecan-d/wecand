import React from "react";
import { TransformWrapper, TransformComponent, KeepScale } from "react-zoom-pan-pinch";
import styled from "styled-components";
import bgsvg from "../assets/background_v1.svg";
import mon from "../assets/monster.svg";
import chatpin from "../assets/chat.png";


const Land = () => {

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}>
    <TransformWrapper
      initialScale={1}
      initialPositionX={-20}
      initialPositionY={-50}
      minScale={0.8}
      maxScale={3}
      limitToBounds={true}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <button onClick={() => zoomIn()}>+</button>
            <button onClick={() => zoomOut()}>-</button>
            <button onClick={() => resetTransform()}>x</button>
          </div>
          <TransformComponent>
            <div style={{ position: "relative", width: "100vw", height: "100vh", display: "flex", justifyContent: "center" }}>
              <img src={bgsvg} alt="background" style={{ width: "75%" }} />
              <img src={mon} alt="monster" style={{ width:"40px", position: "absolute", top: "0", left: "0"}} />

              <img src={mon} alt="monster" style={{ width:"40px", position: "absolute", top: "25%", left: "25%" }} />
              <div style={{ position: "absolute", top: "25%", left: "25%", zIndex: 2, }}>
                <KeepScale>
                  <div>
                    <img src={chatpin} alt="pin" style={{ width: "50px", transform: "translate(10px, -30px)" }} />
                  </div>  
                </KeepScale>
              </div>


              <img src={mon} alt="monster" style={{ width:"40px", position: "absolute", top: "50%", left: "50%"}} />
              <img src={mon} alt="monster" style={{ width:"40px", position: "absolute", top: "75%", left: "75%"}} />
              <img src={mon} alt="monster" style={{ width:"40px", position: "absolute", top: "100%", left: "100%"}} />
            </div>
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
    </div>
  );

}

const LandTitle = styled.h1`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  pointer-events: none;
`;


const LandPage = () => {

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Land/>
      <LandTitle>Hello!</LandTitle>
    </div>
  )
}

export default LandPage;

