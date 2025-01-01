import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateMemberAPI, useForm } from "../context/FormContext";
import SurveyIcon from "../assets/register.svg";
import { Container, LeftPanel, LeftPanelImage, LeftPanelText, LeftPanelTextBox, LeftPanelTitle, mainColorPurple, NextButton, ProgressBar, ProgressStepOn, QuestionBox, QuestionLabel, QuestionRow, RightPanel, RightPanelTitle, TextArea, PreviousButton } from "../components/RegisterComponents";
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  gap: 20px;
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

const FileInputWrapper = styled.div`
  display: flex;
`;

const HiddenInput = styled.input`
  display: block;
  width: 0;
  height: 0;
  overflow: hidden;
`;

const Label = styled.label`
  width: 120px;
  height: 50px;
  line-height: 30px;
  background-color: grey;
  /* background: ${mainColorPurple}; */
  border-radius: 3px;

  color: white;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 10px;
  cursor: pointer;
`;

const FileNameSpan = styled.span`
  padding-left: 15px;

  display: flex;
  align-items: center;

  width: 100%;
  border: 1px solid #e7e7e7;
  border-radius: 3px;

  font-weight: 400;
  font-size: 17px;
  color: grey;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  }, [setFormData]);

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
  const [ fileName, setFileName ] = useState('선택된 파일이 없습니다');
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, file }));
    setFileName((file ? file.name: "선택된 파일이 없습니다."));
  };

  /**
   * '다음' 버튼 클릭 시 로직
   */
  const handleNext = async () => {
    // 200자 제한 체크
    if (formData.additionalInfo?.length > 200) {
      alert("추가 작성란은 200자 이내로 작성해 주세요.");
      return;
    }

    try {
      // PATCH 요청으로 수정 (기존 데이터를 업데이트)
      const response = await updateMemberAPI(formData.id, formData);  // formData.id와 업데이트할 formData 전달
      console.log("RegisterPage3 PATCH response:", response.data);
    } catch (error) {
      console.error("RegisterPage3 PATCH error:", error);
    }

    navigate("/register/4");
  };

  const handlePrevious = () => {
    navigate("/register/2");
  };

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 가장 상단으로 이동
  }, []);

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
                &times;
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
        {renderArrayField("사용 가능한 툴을 입력해 주세요", "tools", "사용 가능한 툴을 입력해주세요")}
        {renderArrayField("소지하신 자격증을 입력해 주세요", "certificates", "자격증을 입력해주세요")}
        {renderArrayField("수상 경력을 입력해 주세요", "awards", "수상 경력을 입력해주세요")}
        {renderArrayField("개인 작업물 링크를 첨부해 주세요 (URL)", "url", "개인 작업물 URL을 입력해주세요")}

        <QuestionBox3>
          <QuestionLabel>개인 작업물 파일을 첨부해주세요 (PDF)</QuestionLabel>
          <FileInputWrapper>
            <HiddenInput 
              id="file" 
              type="file" 
              onChange={handleFileChange} 
            />
            <Label htmlFor="file">파일선택</Label>
            <FileNameSpan>{fileName}</FileNameSpan>
          </FileInputWrapper>

          {/* <FileInput type="file" name="file" onChange={handleFileChange} /> */}
        </QuestionBox3>

        <QuestionBox3>
          <QuestionLabel>경험/ 경력관련 추가 설명글이 있다면 작성해 주세요. (최대 200자)</QuestionLabel>
          <TextArea
            name="additionalInfo"
            value={formData.additionalInfo || ""}
            onChange={handleInputChange}
            maxLength={200}
            placeholder="자유롭게 작성해주세요"
          />
        </QuestionBox3>

        <ButtonWrapper>
          <PreviousButton onClick={handlePrevious}>이전</PreviousButton>
          <NextButton onClick={handleNext}>다음</NextButton>
        </ButtonWrapper>
      </RightPanel>
    </Container>
  );
};

export default RegisterPage3;
