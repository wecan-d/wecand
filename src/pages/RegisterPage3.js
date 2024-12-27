import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import "../styles/CommonStyles.css"; // CSS 파일 연결

const RegisterPage3 = () => {
  const { formData, setFormData } = useForm();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, file }));
  };

  const handleNext = () => {
    const { additionalInfo } = formData;

    if (additionalInfo.length > 200) {
      alert("추가 작성란은 200자 이내로 작성해 주세요.");
      return;
    }

    navigate("/register/4");
  };

  const handlePrevious = () => {
    navigate("/register/2");
  };

  return (
    <div className="container">
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
      <div className="right">
          <div className="progress-bar">
            <div className="progress-step"></div>
            <div className="progress-step"></div>
            <div className="progress-step active"></div>
          </div>
        <div className="question">
          <label>자격증:</label>
          <input
            type="text"
            name="certificates"
            value={formData.certificates}
            onChange={handleInputChange}
            placeholder="자격증을 입력해주세요"
          />
        </div>
        <div className="question">
          <label>사용 가능한 툴:</label>
          <input
            type="text"
            name="tools"
            value={formData.tools}
            onChange={handleInputChange}
            placeholder="사용 가능한 툴을 입력해주세요"
          />
        </div>
        <div className="question">
          <label>수상 경력:</label>
          <input
            type="text"
            name="awards"
            value={formData.awards}
            onChange={handleInputChange}
            placeholder="수상 경력을 입력해주세요"
          />
        </div>
        <div className="question">
          <label>개인 작업물 URL:</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            placeholder="URL을 입력해주세요"
          />
        </div>
        <div className="question">
          <label>추가 작성란:</label>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            maxLength={200}
            placeholder="추가적으로 입력할 내용을 적어주세요 (200자 이내)"
          />
        </div>
        <div className="question">
          <label>파일 첨부:</label>
          <input type="file" name="file" onChange={handleFileChange} />
        </div>
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
