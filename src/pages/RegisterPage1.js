import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { postMemberAPI, useForm } from "../context/FormContext";
import "../styles/CommonStyles.css";
import SurveyIcon from "../assets/register.svg";
import { Container, LeftPanel, LeftPanelImage, LeftPanelText, LeftPanelTextBox, LeftPanelTitle, NextButton, ProgressBar, ProgressStepOff, ProgressStepOn, PurpleText, QuestionBox, QuestionInput, QuestionLabel, QuestionRadioDiv, QuestionRadioInput, QuestionRadioLabel, QuestionRow, RightPanel, RightPanelText, RightPanelTitle } from "../components/RegisterComponents";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

const RightPanel1 = styled(RightPanel)`
  margin-right: 50px;
`;

const validatePhoneNumber = (phone) => /^\d{3}-\d{4}-\d{4}$/.test(phone);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);


const RegisterPage1 = () => {
  const { userInfo, handleLogout } = useContext(AuthContext);
  const userId = userInfo.token;

  const { formData, setFormData } = useForm();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  
  const handleNext = async () => {

    console.log("RegisterPage1 - 현재 userId:", userId);
    const { cardName, gender, identity, major, age, phone, email } = formData;

    const missingFields = [];
    if (!cardName) missingFields.push("이름");
    if (!gender) missingFields.push("성별");
    if (!identity) missingFields.push("신분");
    if (!major) missingFields.push("직종/학과");
    if (!email) missingFields.push("이메일");

    if (missingFields.length > 0) {
      alert(`다음 항목을 입력해주세요: ${missingFields.join(", ")}`);
      return;
    }

    if (phone && !validatePhoneNumber(phone)) {
      alert("전화번호 형식이 올바르지 않습니다.");
      return;
    }

    if (email && !validateEmail(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    if (age && isNaN(age)) {
      alert("나이는 숫자만 입력할 수 있습니다.");
      return;
    }
    console.log("RegisterPage1 저장된 데이터:", formData);
    navigate("/register/2");
  };

  return (
    <Container>
      <LeftPanel>
        <LeftPanelTextBox>
          <LeftPanelImage src={SurveyIcon} alt="Survey Icon" />
          <LeftPanelTitle>정보가 필요해요</LeftPanelTitle>

          <ProgressBar>
            <ProgressStepOn />
            <ProgressStepOff />
            <ProgressStepOff />
          </ProgressBar>

          <LeftPanelText>
            자신의 작업스타일과 경력/경험을 입력하면
            <br />
            자신의 역량 카드를 만들어 드려요!
            <br />
            <br />
            해당 역량카드로 사람들과 보다 적합한
            <br />
            팀 활동을 할 수 있어요
          </LeftPanelText>
        </LeftPanelTextBox>
      </LeftPanel>

      
      <RightPanel1>
        <RightPanelTitle>기본 정보를 입력해주세요</RightPanelTitle>
        <RightPanelText style={{"marginBottom": "28px"}}><PurpleText>*</PurpleText> 표시는 필수로 입력해 주세요</RightPanelText>
        
        <QuestionBox>
          <QuestionRow>
            <QuestionLabel>성별 <PurpleText>*</PurpleText></QuestionLabel>
            <QuestionRadioDiv>
              <QuestionRadioLabel>
                <QuestionRadioInput 
                  type="radio"
                  name="gender"
                  value="남자"
                  checked={formData.gender === "남자"}
                  onChange={handleInputChange}
                />
                남자
              </QuestionRadioLabel>
              <QuestionRadioLabel>
                <QuestionRadioInput 
                  type="radio"
                  name="gender"
                  value="여자"
                  checked={formData.gender === "여자"}
                  onChange={handleInputChange}
                />
                여자
              </QuestionRadioLabel>
            </QuestionRadioDiv>
          </QuestionRow>
          <QuestionRow>
            <QuestionLabel>이름 <PurpleText>*</PurpleText></QuestionLabel>
            <QuestionInput
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleInputChange}
              placeholder="이름을 입력해주세요"
            />
          </QuestionRow>
          <QuestionRow>
            <QuestionLabel>나이</QuestionLabel>
            <QuestionInput
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="나이를 입력해주세요"
            />
          </QuestionRow>
          <QuestionRow>
            <QuestionLabel>신분 <PurpleText>*</PurpleText></QuestionLabel>
            <QuestionInput
              type="text"
              name="identity"
              value={formData.identity}
              onChange={handleInputChange}
              placeholder="신분을 입력해주세요"
            />
          </QuestionRow>
          <QuestionRow>
            <QuestionLabel>직종/학과 <PurpleText>*</PurpleText></QuestionLabel>
            <QuestionInput
              type="text"
              name="major"
              value={formData.major}
              onChange={handleInputChange}
              placeholder="직종/학과를 입력해주세요"
            />
          </QuestionRow>
          <QuestionRow>
            <QuestionLabel>이메일 <PurpleText>*</PurpleText></QuestionLabel>
            <QuestionInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="이메일을 입력해주세요"
            />
          </QuestionRow>
          <QuestionRow>
            <QuestionLabel>전화번호</QuestionLabel>
            <QuestionInput
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="전화번호를 입력해주세요 (예: 010-1234-5678)"
            />
          </QuestionRow>
        </QuestionBox>
        
        <NextButton onClick={handleNext}>다음</NextButton>
      </RightPanel1>
    </Container>
  );
};

export default RegisterPage1;
