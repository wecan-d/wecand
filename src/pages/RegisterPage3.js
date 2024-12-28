import React from "react";
import { useNavigate } from "react-router-dom";
import { postMemberAPI, useForm } from "../context/FormContext";
import "../styles/CommonStyles.css"; // CSS 파일 연결

const RegisterPage3 = () => {
  const { formData, setFormData } = useForm();
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
      [fieldName]: [...prevData[fieldName], ""], // 빈 문자열 하나 추가
    }));
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
      const response = postMemberAPI(formData);
      console.log("RegisterPage3 POST response:", response.data);
    } catch (error) {
      console.error("RegisterPage3 POST error:", error);
    }

    navigate("/register/4");
  };

  /**
   * '이전' 버튼 클릭 시
   */
  const handlePrevious = () => {
    navigate("/register/2");
  };

  // 인풋+X버튼 묶음을 간단히 재사용하기 위한 함수
  const renderArrayField = (
    label,           // 라벨 이름 (ex: "자격증:")
    fieldName,       // formData에서 사용할 키 (ex: "certificates")
    placeholderText  // placeholder (ex: "자격증을 입력해주세요")
  ) => {
    return (
      <div className="question">
        <label>{label}</label>
        {formData[fieldName]?.map((value, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "400px", // 적절히 수정
              marginBottom: "8px",
            }}
          >
            <input
              type="text"
              value={value}
              onChange={(e) => handleArrayChange(fieldName, index, e.target.value)}
              placeholder={placeholderText}
              style={{
                width: "100%",
                boxSizing: "border-box",
                paddingRight: "30px", // 오른쪽 공간 확보
              }}
            />
            {/* 삭제 버튼: 배열이 1개 이상일 때만 표시할지 여부 결정 */}
            {formData[fieldName].length > 1 && (
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
        {/* 추가 버튼 */}
        <button type="button" onClick={() => handleAddItem(fieldName)}>
          추가
        </button>
      </div>
    );
  };

  return (
    <div className="container">
      {/* 왼쪽 레이아웃 */}
      <div className="left">
        <div className="circle">3</div>
        <h1 className="label1">경력/경험</h1>
        <p className="label2">
          나의 강점을 알려주세요!
          <br />
          협업에 도움이 될 만한 경력과 경험을 공유하면
          <br />
          나의 역할이 더 돋보일 거예요
        </p>
        <div className="image-placeholder"></div>
      </div>

      {/* 오른쪽 레이아웃 */}
      <div className="right">
        {/* 진행 바 */}
        <div className="progress-bar">
          <div className="progress-step"></div>
          <div className="progress-step"></div>
          <div className="progress-step active"></div>
        </div>

        {/* 자격증 (배열) */}
        {renderArrayField("자격증:", "certificates", "자격증을 입력해주세요")}

        {/* 사용 가능한 툴 (배열) */}
        {renderArrayField("사용 가능한 툴:", "tools", "사용 가능한 툴을 입력해주세요")}

        {/* 수상 경력 (배열) */}
        {renderArrayField("수상 경력:", "awards", "수상 경력을 입력해주세요")}

        {/* 개인 작업물 URL (배열) */}
        {renderArrayField("개인 작업물 URL:", "url", "개인 작업물 URL을 입력해주세요")}

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

        {/* 파일 첨부 */}
        <div className="question">
          <label>파일 첨부:</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>

        {/* 이전/다음 버튼 */}
        <div className="footer-buttons">
          <button className="btn-prev" onClick={handlePrevious}>
            이전
          </button>
          <button className="btn-next" onClick={handleNext}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage3;
