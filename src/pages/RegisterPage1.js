import React from "react";
import { useNavigate } from "react-router-dom";
import { postMemberAPI, useForm } from "../context/FormContext";
import "../styles/CommonStyles.css";
import SurveyIcon from "../assets/register.svg";

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

    try {
      const response = postMemberAPI(formData);
      console.log("RegisterPage1 POST response:", response.data);
    } catch (error) {
      console.error("RegisterPage1 POST error:", error);
    }

    navigate("/register/2");
  };

  return (
    <div className="container">
      <div className="left">
        <div className="title-wrapper">
          <img src={SurveyIcon} alt="Survey Icon" className="survey-icon" />
          <h1 className="label1">설문이 필요해요</h1>
        </div>
        <div className="progress-bar">
          <div className="progress-step active"></div>
          <div className="progress-step"></div>
          <div className="progress-step"></div>
        </div>
        <p className="label2">
          자신의 작업스타일과 경력/경험을 입력하면
          <br />
          자신의 역량 카드를 만들어 드려요!
          <br />
          <br />
          해당 역량카드로 사람들과 보다 나은
          <br />
          팀활동을 할 수 있어요
        </p>
      </div>
      <div className="r1">
        <h2>기본 정보를 입력해주세요</h2>
        <p>*표시는 필수로 입력해 주세요</p>
        <br />
        <div className="question">
          <label>성별 <span className="required">*</span></label>
          <div className="checkbox-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="남자"
                checked={formData.gender === "남자"}
                onChange={handleInputChange}
              />
              남자
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="여자"
                checked={formData.gender === "여자"}
                onChange={handleInputChange}
              />
              여자
            </label>
          </div>
        </div>
        <div className="question">
          <label>이름 <span className="required">*</span></label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="이름을 입력해주세요"
          />
        </div>
        <div className="question">
          <label>나이</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="나이를 입력해주세요"
          />
        </div>
        <div className="question">
          <label>신분 <span className="required">*</span></label>
          <input
            type="text"
            name="identity"
            value={formData.identity}
            onChange={handleInputChange}
            placeholder="신분을 입력해주세요"
          />
        </div>
        <div className="question">
          <label>직종/학과 <span className="required">*</span></label>
          <input
            type="text"
            name="major"
            value={formData.major}
            onChange={handleInputChange}
            placeholder="직종/학과를 입력해주세요"
          />
        </div>
        <div className="question">
          <label>이메일 <span className="required">*</span></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div className="question">
          <label>전화번호</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="전화번호를 입력해주세요 (예: 010-1234-5678)"
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
