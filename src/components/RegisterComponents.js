import styled from "styled-components";

export const mainColorPurple = "#6C54F7";
export const mainColorGrey = "#F0F3FA";
export const PurpleText = styled.span`
  color: ${mainColorPurple};
`;

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  
  background-color: #ffffff;
  align-items: flex-start;
  padding: 60px 100px 0 0;
  box-sizing: border-box;
  position: relative;

  padding-bottom: 150px;
  gap: 40px;
`;

export const LeftPanel = styled.div`
  /* min-width: 40%; */
  width: 45%;

  position: sticky; /* 고정 위치 설정 */
  top: 50px; /* 화면의 최상단에 더 가깝게 이동 */
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  
  box-sizing: border-box;
  border-radius: 10px; /* 둥근 모서리 */
  padding-top: 50px;
`;

export const LeftPanelTextBox = styled.div`
  width: 400px;
  position: relative;
  align-self: flex-end;
  margin-right: 80px;
`;

export const LeftPanelImage = styled.img`
  position: absolute;
  left: -70px; /* 이미지의 수평 위치 조정 */
  top: -50px; /* 이미지의 수직 위치 조정 */
  width: 100px; /* 이미지 크기 설정 */
  height: 100px; /* 이미지 크기 설정 */
`;

export const LeftPanelTitle = styled.h2`
  margin-bottom: 12px;
  font-size: 28px; /* 텍스트 크기를 줄임 */
  font-weight: bold;
  text-align: left; /* 텍스트를 왼쪽 정렬 */
  line-height: 1.4; /* 줄 간격 조정 */
  color: ${mainColorPurple};
`;

export const ProgressBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
  box-sizing: border-box;
`;

export const ProgressStepOff = styled.div`
  flex: 1;
  height: 12px;
  border-radius: 8px;
  background-color: ${mainColorGrey};
`;

export const ProgressStepOn = styled(ProgressStepOff)`
  background-color: ${mainColorPurple};
`;

export const LeftPanelText = styled.p`
  line-height: 1.5; /* 줄 간격 조정 */
  color: "#4E5968";
  text-align: left;
`;

export const RightPanel = styled.div`
  width: 650px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 500;
`;

export const RightPanelTitle = styled.h3`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 30px;
`;

export const RightPanelText = styled.p`
  font-size: 18px;
  margin: 0;
`;

export const QuestionBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  margin-bottom: 40px;
`

export const QuestionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
`;

export const QuestionLabel = styled.label`
  flex: 1;
  font-size: 18px;
  margin-right: 20px;
`;

export const QuestionInput = styled.input`
  flex: 2;
  width: 400px;
  height: 50px; /* 입력 필드 높이 조정 */
  border: 1px solid #ddd;
  padding: 0 12px; /* 내부 패딩 줄임 */
  border-radius: 5px;
  font-size: 17px; /* 입력 텍스트 크기 조정 */
  box-sizing: border-box;
`;

export const QuestionRadioDiv = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const QuestionRadioLabel = styled.label`
  font-size: 17px;
  display: flex;
  align-items: center;
`;

export const QuestionRadioInput = styled.input`
  width: 18px; /* 네모난 체크박스 크기 */
  height: 18px; /* 네모난 체크박스 크기 */
  border-radius: 0; /* 체크박스를 네모로 설정 */
  border: 1px solid #ddd; /* 테두리 추가 */
  margin-right: 12px;
`;

export const NextButton = styled.button`
  align-self: flex-end;
  background-color: ${mainColorGrey};
  color: #111;

  padding: 15px 40px; /* 버튼 크기 조정 */
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #fff;
    background-color: ${mainColorPurple};
  }
`;

export const PreviousButton = styled.button`
  align-self: flex-end;
  background-color: ${mainColorGrey};
  color: #111;

  padding: 15px 40px; /* 버튼 크기 조정 */
  border: none;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;

  &:hover {
    color: #fff;
    background-color: ${mainColorPurple};
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px; /* 입력 필드 높이 조정 */
  border: 1px solid #ddd;
  padding: 12px; /* 내부 패딩 줄임 */
  border-radius: 8px;
  font-size: 17px; /* 입력 텍스트 크기 조정 */
  margin-bottom: 50px;
`;