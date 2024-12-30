import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import styled from "styled-components";
import Register4SVG from "../assets/register4.svg";

const RegisterPage4 = () => {
  // const { formData } = useForm();
  // const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  /**
   * 모달 열기
   */
  // const handleViewCard = () => {
  //   setShowModal(true);
  // };

  /**
   * 수정하기 버튼 → /edit (예시)
   */
  // const handleEdit = () => {
  //   setShowModal(false);
  //   navigate("/register/edit");
  // };

  return (
    <ResultPage>
      <ResultTitle>역량 카드가 완료되었어요!</ResultTitle>
      <ResultDescription>
        답변해주신 답변으로 역량 카드 생성이 완료되었어요
        <br />
        만들어진 역량 카드를 바탕으로 모집중인 공고에 지원해보세요!
      </ResultDescription>
      <PageInfo>
        <PageText>
          역량카드는{" "}
          <span className="highlight" onClick={() => navigate("/mypage")}>
            마이페이지
          </span>
          에서 확인 가능해요
        </PageText>
        <NavigateButton onClick={() => navigate("/mypage")}>{">"}</NavigateButton>
      </PageInfo>
      
      {/* 버튼들 사이 간격 추가 */}
      <ButtonContainer>
        <Button className="btn-home" onClick={() => navigate("/home")}>
          홈으로 이동
        </Button>
        <Button className="btn-recruiting" onClick={() => navigate("/recruiting")}>
          공모전 보러가기
        </Button>
      </ButtonContainer>

      {/* 이미지 아래와 버튼 사이 간격을 30px로 설정 */}
      <ResultImage>
        <img src={Register4SVG} alt="Register Illustration" />
      </ResultImage>
    </ResultPage>
  );
};



const ResultPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  margin-top: 70px;
  /* min-height: 100vh; */
`;

const ResultTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const ResultDescription = styled.p`
  margin: 10px 0;
  font-size: 16px;
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PageText = styled.p`
  font-size: 16px;
  margin-right: 5px;

  .highlight {
    color: #6a1b9a; /* 보라색 */
    cursor: pointer;

  }
`;

const NavigateButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  color: #ddd;
  cursor: pointer;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px; /* 버튼 사이의 간격을 설정 */
  margin: 20px 0; /* 이미지와 버튼 간의 간격 설정 */
`;

const Button = styled.button`
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  width: 120px; /* 버튼 너비를 100px로 설정 */
  height: 40px;

  &.btn-home {
    background-color: #ddd; /* 버튼 배경 */
  }

  &.btn-recruiting {
    background-color: #ddd; /* 버튼 배경 */
  }
`;

const ResultImage = styled.div`
  width: 100%;
  margin: 0; /* 30px 간격 추가 */
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: -150px;

  z-index: -1;
  img {
    width: 100%;
    height: auto;
  }
`;

export default RegisterPage4;


      // {/* 역량 카드 보기 */}
      // {/* <button className="btn-card" onClick={handleViewCard}>
      //   역량 카드 보러가기
      // </button> */}

      // {/* {showModal && (
      //   <div className="modal">
      //     <div className="modal-content" style={{ maxHeight: "80vh", overflowY: "auto" }}>
      //       <h2>역량 카드</h2>
      //       <div style={{ textAlign: "left" }}>
      //         {/* [RegisterPage1] */}
      //         {/* <p>
      //           <strong>이름:</strong> {formData.name}
      //         </p>
      //         <p>
      //           <strong>성별:</strong> {formData.gender}
      //         </p>
      //         <p>
      //           <strong>신분:</strong> {formData.identity}
      //         </p>
      //         <p>
      //           <strong>직종/학과:</strong> {formData.major}
      //         </p>
      //         <p>
      //           <strong>나이:</strong> {formData.age}세
      //         </p>
      //         <p>
      //           <strong>전화번호:</strong>{" "}
      //           {formData.phone || "없음"}
      //         </p>
      //         <p>
      //           <strong>이메일:</strong>{" "}
      //           {formData.email || "없음"}
      //         </p>

      //         {/* [RegisterPage3]에서 url 배열 */}
      //         {/* <p>
      //           <strong>개인 작업물 URL:</strong>{" "}
      //           {formData.url && formData.url.length
      //             ? formData.url.join(", ")
      //             : "없음"}
      //         </p> */}

      //         {/* 파일 첨부 */}
      //         {/* <p>
      //           <strong>파일:</strong>{" "}
      //           {formData.file instanceof Blob ? (
      //             <a
      //               href={URL.createObjectURL(formData.file)}
      //               target="_blank"
      //               rel="noopener noreferrer"
      //             >
      //               {formData.file.name}
      //             </a>
      //           ) : (
      //             "없음"
      //           )}
      //         </p> */}

      //         {/* <hr />
      //         <h3>작업 역량 (RegisterPage2)</h3>
      //         <p>
      //           <strong>소통:</strong>{" "}
      //           {formData.communication?.length
      //             ? formData.communication.join(", ")
      //             : "없음"}
      //         </p>
      //         <p>
      //           <strong>작업 스타일:</strong>{" "}
      //           {formData.teamwork?.length
      //             ? formData.teamwork.join(", ")
      //             : "없음"}
      //         </p>
      //         <p>
      //           <strong>사고 방식:</strong>{" "}
      //           {formData.thinking?.length
      //             ? formData.thinking.join(", ")
      //             : "없음"}
      //         </p>
      //         <p>
      //           <strong>역할:</strong>{" "}
      //           {formData.role?.length
      //             ? formData.role.join(", ")
      //             : "없음"}
      //         </p>
      //         <p>
      //           <strong>갈등 해결:</strong>{" "}
      //           {formData.conflictResolution?.length
      //             ? formData.conflictResolution.join(", ")
      //             : "없음"}
      //         </p>
      //         <p>
      //           <strong>시간 선호:</strong>{" "}
      //           {formData.timePreference?.length
      //             ? formData.timePreference.join(", ")
      //             : "없음"}
      //         </p>
      //         <p>
      //           <strong>휴식 선호:</strong>{" "}
      //           {formData.restPreference?.length
      //             ? formData.restPreference.join(", ")
      //             : "없음"}
      //         </p>
      //         <p>
      //           <strong>친목:</strong>{" "}
      //           {formData.friendship?.length
      //             ? formData.friendship.join(", ")
      //             : "없음"}
      //         </p>
      //         <p>
      //           <strong>중요하게 생각하는 것:</strong>{" "}
      //           {formData.important || "없음"}
      //         </p>

      //         <hr />
      //         <h3>경력/경험 (RegisterPage3)</h3> */}
      //         {/* 배열 필드들 → .join(", ")로 표시 */}
      //         {/* <p>
      //           <strong>자격증:</strong>{" "}
      //           {formData.certificates && formData.certificates.length
      //             ? formData.certificates.join(", ")
      //             : "없음"}
      //         </p>
      //         <p>
      //           <strong>사용 가능한 툴:</strong>{" "}
      //           {formData.tools && formData.tools.length
      //             ? formData.tools.join(", ")
      //             : "없음"}
      //         </p>
      //         <p>
      //           <strong>수상 경력:</strong>{" "}
      //           {formData.awards && formData.awards.length
      //             ? formData.awards.join(", ")
      //             : "없음"}
      //         </p>
      //         <p>
      //           <strong>추가 작성란:</strong>{" "}
      //           {formData.additionalInfo || "없음"}
      //         </p>
      //       </div> */}

      //       {/* 모달 내 버튼들 */}
      //       {/* <div className="modal-buttons">
      //       //   <button className="btn-edit" onClick={handleEdit}>
      //       //     수정하기
      //       //   </button>
      //       //   <button className="btn-close" onClick={() => setShowModal(false)}>
      //       //     닫기
      //       //   </button>
      //       // </div> */}
      //     {/* </div>
      //   </div>
      // )} */}