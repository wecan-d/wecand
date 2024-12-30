import React from "react";
import { useNavigate } from "react-router-dom";
import { postMemberAPI, useForm } from "../context/FormContext";
import "../styles/CommonStyles.css";
import SurveyIcon from "../assets/register.svg";
import { Container, LeftPanel, LeftPanelImage, LeftPanelText, LeftPanelTextBox, LeftPanelTitle, NextButton, ProgressBar, ProgressStepOff, ProgressStepOn, RightPanel, RightPanelTitle } from "../components/RegisterComponents";
import styled from "styled-components";


const RightPanel2 = styled(RightPanel)`
  width: 800px;
`;

const QuestionRow2 = styled.div`
  display: flex;
  flex-direction: column;
`;

const QuestionLabel2 = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

const QuestionButtonsDiv = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: nowrap;
  overflow-x: visible;
`;

const QuestionButton = styled.button`
  padding: 10px 20px; /* 버튼 크기 조정 */
  border: none;
  border-radius: 5px; /* 버튼 모서리 둥글게 */
  background-color: #f0f3fa; /* 버튼 배경색 (기본) */
  color: #4E5968; /* 버튼 텍스트 색상 */
  font-size: 17px; /* 버튼 텍스트 크기 */
  text-align: center;
  display: inline-block;

  cursor: pointer;

  &:hover, &.active {
    background-color: #6c54f7;
    color: white;
    font-weight: 600;
  };
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px; /* 입력 필드 높이 조정 */
  border: 1px solid #ddd;
  padding: 12px; /* 내부 패딩 줄임 */
  border-radius: 8px;
  font-size: 17px; /* 입력 텍스트 크기 조정 */
  margin-bottom: 50px;
`;


const RegisterPage2 = () => {
  const { formData, setFormData } = useForm();
  const navigate = useNavigate();

  const handleInputChange = (category, value) => {
    const singleSelectCategories = ["restPreference", "friendship"];

    if (singleSelectCategories.includes(category)) {
      // 단일 선택: 배열에는 항상 1개 값만
      setFormData((prevData) => ({
        ...prevData,
        [category]: [value],
      }));
    } else {
        setFormData((prevData) => ({
          ...prevData,
          [category]: prevData[category].includes(value)
            ? prevData[category].filter((item) => item !== value)
            : [...prevData[category], value],
        }));
      };
    }

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext =  () => {
    const {
      communication = "",
      teamwork = "",
      thinking = "",
      role = "",
      conflictResolution = "",
      timePreference = "",
      restPreference = "",
      friendship = "",
    } = formData;

    // 비어 있는 필수 항목 확인
    const missingFields = [];
    if (communication !== "") missingFields.push("소통");
    if (teamwork !== "") missingFields.push("작업 스타일");
    if (thinking !== "") missingFields.push("사고 방식");
    if (role !== "") missingFields.push("역할");
    if (conflictResolution !== "") missingFields.push("갈등 해결");
    if (timePreference !== "") missingFields.push("시간 선호");
    if (restPreference !== "") missingFields.push("휴식 선호");
    if (friendship !== "") missingFields.push("친목");

    // 누락된 항목이 있으면 알림 표시 후 종료
    if (!missingFields.length) {
      alert(`다음 항목을 입력해주세요: ${missingFields.join(", ")}`);
      return;
    }

    // 모든 필드가 입력된 경우에만 API 호출
    try {
      // const response =  postMemberAPI(formData);
      // console.log("RegisterPage2 POST response:", response.data); // 콘솔에 응답 데이터 출력
      // POST 성공 시 다음 단계로 이동
      navigate("/register/3");
    } catch (error) {
      // console.error("RegisterPage2 POST error:", error);
      // 필요한 경우, 에러가 나도 넘어가도록 하려면 여기서 navigate("/register/3")를 호출하거나
      // 사용자에게 메시지를 띄운 뒤 별도 처리를 해주면 됩니다.
    }
  };

  const handlePrevious = () => {
    navigate("/register/1");
  };

  const options = [
    { label: "어떤 연락 방식을 선호하나요?", category: "communication", options: ["비대면소통을 선호해요", "대면소통을 선호해요", "새벽연락은 피해주세요", "새벽연락도 가능해요"] },
    { label: "어떤 작업 방식을 선호하나요?", category: "teamwork", options: ["다같이 작업하고 싶어요", "일을 나눠서 하고 싶어요", "평일에 하고싶어요", "주말에 하고싶어요"] },
    { label: "작업이나 문제 해결 과정에서 본인의 사고 방식은 어떤가요?", category: "thinking", options: ["논리적이에요", "비판적이에요", "창의적이에요", "결과 중심적이에요", "과정 중심적이에요"] },
    { label: "본인이 가장 잘 발휘할 수 있는 강점이 무엇인가요?", category: "role", options: ["리더십이 있어요", "계획적이에요", "설득력이 있어요", "호기심이 많아요", "기록을 잘 남겨요"] },
    { label: "팀원 간의 갈등 상황에서 본인이 주로 선택하는 해결 방식은 무엇인가요?", category: "conflictResolution", options: ["바로 해결해요", "시간이 필요해요", "솔직하게 표현해요", "먼저 다가가요", "혼자 해결해요"] },
    { label: "작업할 때 가장 선호하는 시간대는 언제인가요?", category: "timePreference", options: ["새벽(00~06시)", "아침(06-12시)", "낮(12-18시)", "저녁(18-00시)"] },
    { label: "작업 중 휴식 스타일은 어떤 편인가요? (1개 선택)", category: "restPreference", options: ["짧게 자주 쉬고 싶어요", "한번에 푹 쉬고 싶어요"] },
    { label: "작업 동안 스타일은 어떤 편인가요? (1개 선택)", category: "friendship", options: ["친목시간도 가지고 싶어요", "작업에만 집중하고 싶어요"] },
  ];


  return (
    <Container>
      <LeftPanel>
        <LeftPanelTextBox>
          <LeftPanelImage src={SurveyIcon} alt="Survey Icon" />
          <LeftPanelTitle>작업 스타일이 궁금해요</LeftPanelTitle>

          <ProgressBar>
            <ProgressStepOn />
            <ProgressStepOn />
            <ProgressStepOff />
          </ProgressBar>

          <LeftPanelText>
            꼼꼼하게 선택할수록 자신에게 맞는 사람과
            <br />
            공모전에 참가할 수 있는 기회를 얻을 수 있어요!
          </LeftPanelText>
        </LeftPanelTextBox>
      </LeftPanel>

      <RightPanel2>
        <RightPanelTitle>작업 스타일을 선택해 주세요</RightPanelTitle>
        {options.map((item) => (
          <QuestionRow2 key={item.category} className="question2">
            <QuestionLabel2>{item.label}:</QuestionLabel2>
            <QuestionButtonsDiv>
              {item.options.map((option) => (
                <QuestionButton
                  key={option}
                  type="button"
                  onClick={() => {handleInputChange(item.category, option); }}
                  className={formData[item.category]?.includes(option) ? "active" : ""}
                >
                  {option}
                </QuestionButton>
              ))}
            </QuestionButtonsDiv>
          </QuestionRow2>
        ))}
        <QuestionLabel2>중요하게 생각해요 (선택):</QuestionLabel2>
        <TextArea
          name="important"
          placeholder="~은 꼭 지켜줬으면 좋겠어요."
          value={formData.important}
          onChange={handleTextChange}
        />
        <NextButton onClick={handleNext}>다음</NextButton>
      </RightPanel2>
    </Container>
  );
};

export default RegisterPage2;
