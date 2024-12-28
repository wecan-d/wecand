import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import "../styles/CommonStyles.css";

const RegisterPage4 = () => {
  const { formData } = useForm();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  /**
   * 모달 열기
   */
  const handleViewCard = () => {
    setShowModal(true);
  };

  /**
   * 수정하기 버튼 → /edit (예시)
   */
  const handleEdit = () => {
    setShowModal(false);
    navigate("/register/edit");
  };

  return (
    <div className="result-page">
      <h1 className="result-title">설문이 완료되었어요!</h1>
      <p className="result-description">
        답변해주신 답변으로 역량 카드 생성이 완료되었어요
        <br />
        만들어진 역량 카드를 바탕으로 모집중인 공고에 지원해보세요!
      </p>
      <div className="image-placeholder result-image"></div>

      {/* 홈으로 이동 */}
      <button className="btn-home" onClick={() => navigate("/home")}>
        홈으로 이동하기
      </button>
      {/* 역량 카드 보기 */}
      <button className="btn-card" onClick={handleViewCard}>
        역량 카드 보러가기
      </button>

      {showModal && (
        <div className="modal">
          <div className="modal-content" style={{ maxHeight: "80vh", overflowY: "auto" }}>
            <h2>역량 카드</h2>
            <div style={{ textAlign: "left" }}>
              {/* [RegisterPage1] */}
              <p>
                <strong>이름:</strong> {formData.name}
              </p>
              <p>
                <strong>성별:</strong> {formData.gender}
              </p>
              <p>
                <strong>신분:</strong> {formData.identity}
              </p>
              <p>
                <strong>직종/학과:</strong> {formData.major}
              </p>
              <p>
                <strong>나이:</strong> {formData.age}세
              </p>
              <p>
                <strong>전화번호:</strong>{" "}
                {formData.phone || "없음"}
              </p>
              <p>
                <strong>이메일:</strong>{" "}
                {formData.email || "없음"}
              </p>

              {/* [RegisterPage3]에서 url 배열 */}
              <p>
                <strong>개인 작업물 URL:</strong>{" "}
                {formData.url && formData.url.length
                  ? formData.url.join(", ")
                  : "없음"}
              </p>

              {/* 파일 첨부 */}
              <p>
                <strong>파일:</strong>{" "}
                {formData.file instanceof Blob ? (
                  <a
                    href={URL.createObjectURL(formData.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {formData.file.name}
                  </a>
                ) : (
                  "없음"
                )}
              </p>

              <hr />
              <h3>작업 역량 (RegisterPage2)</h3>
              <p>
                <strong>소통:</strong>{" "}
                {formData.communication?.length
                  ? formData.communication.join(", ")
                  : "없음"}
              </p>
              <p>
                <strong>작업 스타일:</strong>{" "}
                {formData.teamwork?.length
                  ? formData.teamwork.join(", ")
                  : "없음"}
              </p>
              <p>
                <strong>사고 방식:</strong>{" "}
                {formData.thinking?.length
                  ? formData.thinking.join(", ")
                  : "없음"}
              </p>
              <p>
                <strong>역할:</strong>{" "}
                {formData.role?.length
                  ? formData.role.join(", ")
                  : "없음"}
              </p>
              <p>
                <strong>갈등 해결:</strong>{" "}
                {formData.conflictResolution?.length
                  ? formData.conflictResolution.join(", ")
                  : "없음"}
              </p>
              <p>
                <strong>시간 선호:</strong>{" "}
                {formData.timePreference?.length
                  ? formData.timePreference.join(", ")
                  : "없음"}
              </p>
              <p>
                <strong>휴식 선호:</strong>{" "}
                {formData.restPreference?.length
                  ? formData.restPreference.join(", ")
                  : "없음"}
              </p>
              <p>
                <strong>친목:</strong>{" "}
                {formData.friendship?.length
                  ? formData.friendship.join(", ")
                  : "없음"}
              </p>
              <p>
                <strong>중요하게 생각하는 것:</strong>{" "}
                {formData.important || "없음"}
              </p>

              <hr />
              <h3>경력/경험 (RegisterPage3)</h3>
              {/* 배열 필드들 → .join(", ")로 표시 */}
              <p>
                <strong>자격증:</strong>{" "}
                {formData.certificates && formData.certificates.length
                  ? formData.certificates.join(", ")
                  : "없음"}
              </p>
              <p>
                <strong>사용 가능한 툴:</strong>{" "}
                {formData.tools && formData.tools.length
                  ? formData.tools.join(", ")
                  : "없음"}
              </p>
              <p>
                <strong>수상 경력:</strong>{" "}
                {formData.awards && formData.awards.length
                  ? formData.awards.join(", ")
                  : "없음"}
              </p>
              <p>
                <strong>추가 작성란:</strong>{" "}
                {formData.additionalInfo || "없음"}
              </p>
            </div>

            {/* 모달 내 버튼들 */}
            <div className="modal-buttons">
              <button className="btn-edit" onClick={handleEdit}>
                수정하기
              </button>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegisterPage4;
