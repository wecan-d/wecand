import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postMemberAPI, useForm } from "../context/FormContext";
import "../styles/CommonStyles.css"; // CSS 파일 연결
import SurveyIcon from "../assets/register.svg";
import { Container, LeftPanel, LeftPanelImage, LeftPanelText, LeftPanelTextBox, LeftPanelTitle, NextButton, ProgressBar, ProgressStepOff, ProgressStepOn, QuestionBox, QuestionInput, QuestionLabel, QuestionRow, RightPanel, RightPanelTitle } from "../components/RegisterComponents";
import styled from "styled-components";


const QuestionBox3 = styled(QuestionBox)`
  gap: 15px;
`;
const AnswerAddButton = styled.button`
  background: none;
  border: none;
  color: #4e5968;
  font-size: 17px;;

  cursor: pointer;
`;

const AddInput = styled.input`
  width: 100%;
  height: 50px; /* 입력 필드 높이 조정 */
  border: 1px solid #ddd;
  padding: 0 12px; /* 내부 패딩 줄임 */
  border-radius: 5px;
  font-size: 17px; /* 입력 텍스트 크기 조정 */
  box-sizing: border-box;
`;

const RegisterPage3 = () => {
  const { formData, setFormData } = useForm();
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      certificates: prevData.certificates?.length > 0 ? prevData.certificates : [""],
      tools: prevData.tools?.length > 0 ? prevData.tools : [""],
      awards: prevData.awards?.length > 0 ? prevData.awards : [""],
      url: prevData.url?.length > 0 ? prevData.url : [""],
    }));
  }, []);

  const navigate = useNavigate();

  /**
   * 배열 필드의 특정 index 값 변경
   */
  const handleArrayChange = (fieldName, index, newValue) => {
    setFormData((prevData) => {
      const updatedArray = [...prevData[fieldName]];
      updatedArray[index] = newValue; // 해당 index의 값을 교체
      return { ...prevData, [fieldName]: updatedArray };
    });
  };

  /**
   * 배열 필드에 새 항목 추가
   */
  const handleAddItem = (fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: Array.isArray(prevData[fieldName]) ? [...prevData[fieldName], ""] : [""],    }));
  };

  /**
   * 배열 필드의 특정 index 항목 삭제
   */
  const handleRemoveItem = (fieldName, index) => {
    setFormData((prevData) => {
      const updatedArray = [...prevData[fieldName]];
      updatedArray.splice(index, 1); // index 위치의 항목 제거
      return { ...prevData, [fieldName]: updatedArray };
    });
  };

  /**
   * 일반 text/textarea 필드 (배열이 아닌 단일 필드)의 값 변경
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  /**
   * 파일 선택 시
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, file }));
  };

  /**
   * '다음' 버튼 클릭 시 로직
   */
  const handleNext = () => {
    // 200자 제한 체크
    if (formData.additionalInfo?.length > 200) {
      alert("추가 작성란은 200자 이내로 작성해 주세요.");
      return;
    }

    try {
      // const response = postMemberAPI(formData);
      // console.log("RegisterPage3 POST response:", response.data);
    } catch (error) {
      // console.error("RegisterPage3 POST error:", error);
    }

    navigate("/register/4");
  };


  // 인풋+X버튼 묶음을 간단히 재사용하기 위한 함수
  const renderArrayField = (
    label,           // 라벨 이름 (ex: "자격증:")
    fieldName,       // formData에서 사용할 키 (ex: "certificates")
    placeholderText  // placeholder (ex: "자격증을 입력해주세요")
  ) => {
    const fieldData = Array.isArray(formData[fieldName]) ? formData[fieldName] : []; // 배열이 아니면 빈 배열로 설정

    return (
      <QuestionBox3>

        <QuestionRow>
          <QuestionLabel>{label}</QuestionLabel>
          
          <AnswerAddButton type="button" onClick={() => handleAddItem(fieldName)}>
            추가하기
          </AnswerAddButton>
        </QuestionRow>
        
        {fieldData.map((value, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "100%",
              marginBottom: "8px",
            }}
          >
            <AddInput
              type="text"
              value={value}
              onChange={(e) => handleArrayChange(fieldName, index, e.target.value)}
              placeholder={placeholderText}
            />
            {/* 삭제 버튼: 배열이 1개 이상일 때만 표시할지 여부 결정 */}
            {fieldData.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveItem(fieldName, index)}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "8px",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  lineHeight: 1,
                }}
              >
                &times;  {/* '×' 아이콘 */}
              </button>
            )}
          </div>
        ))}
      </QuestionBox3>
    );
  };

  return (
    <Container>

      <LeftPanel>
        <LeftPanelTextBox>
          <LeftPanelImage src={SurveyIcon} alt="Survey Icon" />
          <LeftPanelTitle>경험/경력이 궁금해요</LeftPanelTitle>

          <ProgressBar>
            <ProgressStepOn />
            <ProgressStepOn />
            <ProgressStepOn />
          </ProgressBar>

          <LeftPanelText>
            나의 강점을 알려주세요!
            <br />
            협업에 도움이 될 만한 경력과 경험을 공유하면
            <br />
            나의 역할이 더 돋보일 거에요
          </LeftPanelText>
        </LeftPanelTextBox>
      </LeftPanel>

      {/* 오른쪽 레이아웃 */}
      <RightPanel>
        <RightPanelTitle>경험/경력을 입력해 주세요</RightPanelTitle>
        {/* 자격증 (배열) */}


        {/* 사용 가능한 툴 (배열) */}
        {renderArrayField("사용 가능한 툴을 입력해 주세요", "tools", "사용 가능한 툴을 입력해주세요")}

        {renderArrayField("소지하신 자격증을 입력해 주세요", "certificates", "자격증을 입력해주세요")}
        {/* 수상 경력 (배열) */}
        {renderArrayField("수상 경력을 입력해 주세요", "awards", "수상 경력을 입력해주세요")}

        {/* 개인 작업물 URL (배열) */}
        {renderArrayField("개인 작업물 링크를 첨부해 주세요 (URL)", "url", "개인 작업물 URL을 입력해주세요")}


        {/* 파일 첨부 */}
        <div className="question">
          <label>파일 첨부:</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>

        {/* 추가 작성란 (단일 textArea) */}
        <div className="question">
          <label>추가 작성란:</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo || ""}
            onChange={handleInputChange}
            maxLength={200}
            placeholder="추가적으로 입력할 내용을 적어주세요 (200자 이내)"
          />
        </div>


        <NextButton onClick={handleNext}>저장</NextButton>
      </RightPanel>
    </Container>
  );
};

export default RegisterPage3;
