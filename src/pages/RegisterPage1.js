import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import "../styles/CommonStyles.css";

const validatePhoneNumber = (phone) => /^\d{3}-\d{4}-\d{4}$/.test(phone);
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const RegisterPage1 = () => {
  const { formData, setFormData } = useForm();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    const { name, gender, identity, major, age, phone, email } = formData;

    const missingFields = [];
    if (!name) missingFields.push("이름");
    if (!gender) missingFields.push("성별");
    if (!identity) missingFields.push("신분");
    if (!major) missingFields.push("직종/학과");
    if (!age) missingFields.push("나이");

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

    if (isNaN(age)) {
      alert("나이는 숫자만 입력할 수 있습니다.");
      return;
    }

    navigate("/register/2");
  };

  return (
    <div className="container">
      <div className="left">
        <div className="circle">1</div>
        <h1 className="label1">기본정보</h1>
        <p className="label2">
          기본적인 정보를 입력해주세요!
          <br />
          이름부터 간단한 소속까지, 기본 정보를 적어주시면
          <br />
          협업이 한층 더 쉬워져요!
          <br />
          역량 카드에 소개할 나의 기본 정보를 작성해볼까요?
        </p>
        <div className="image-placeholder"></div>
      </div>
      <div className="right">
        <div className="progress-bar">
          <div className="progress-step active"></div>
          <div className="progress-step"></div>
          <div className="progress-step"></div>
        </div>
        <div className="question">
          <label>이름 (필수):</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div className="question">
          <label>성별 (필수):</label>
          <div className="button-group">
            {["남", "여"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormData((prevData) => ({ ...prevData, gender: option }))}
                className={formData.gender === option ? "active" : ""}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="question">
          <label>신분 (필수):</label>
          <div className="button-group">
            {["직장인", "취업준비생", "대학생"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormData((prevData) => ({ ...prevData, identity: option }))}
                className={formData.identity === option ? "active" : ""}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="question">
          <label>직종/학과 (필수):</label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleInputChange}
            placeholder="직업/학과를 입력해주세요"
          />
        </div>
        <div className="question">
          <label>나이 (필수):</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="나이를 입력해주세요"
          />
        </div>
        <div className="question">
          <label>전화번호 (선택):</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="전화번호를 입력해주세요 (예: 010-1234-5678)"
          />
        </div>
        <div className="question">
          <label>이메일 (선택):</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div className="footer-buttons">
          <button className="btn-next" onClick={handleNext}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage1;
