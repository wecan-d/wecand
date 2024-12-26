import React from 'react';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import bgsvg from "../assets/background_v1.svg";

const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="tools">
      <button onClick={zoomIn}>+</button>
      <button onClick={zoomOut}>-</button>
      <button onClick={resetTransform}>x</button>
    </div>
  );
};

function LandPage() {
  return (
    <div style={{"backgroundColor": "skyblue", "width": "100%", "height":"780px"}}>
      <TransformWrapper
        initialScale={1}
        initialPositionX={200}
        initialPositionY={100}
      >

      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <Controls
            zoomIn={zoomIn}
            zoomOut={zoomOut}
            resetTransform={resetTransform}
          />
          <TransformComponent>
            <div style={{"width": "100%", "height":"780px"}}>
              <img src={bgsvg} alt="background" style={{ width: "100%", height: "100%" }} />
            </div>
          </TransformComponent>
        </>
      )}
    </TransformWrapper>
    </div>
  );
}

export default LandPage;