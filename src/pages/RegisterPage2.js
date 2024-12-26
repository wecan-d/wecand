import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import "../styles/CommonStyles.css";

const RegisterPage2 = () => {
  const { formData, setFormData } = useForm();
  const navigate = useNavigate();

  const handleInputChange = (category, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [category]: prevData[category].includes(value)
        ? prevData[category].filter((item) => item !== value)
        : [...prevData[category], value],
    }));
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext = () => {
    const {
      communication,
      teamwork,
      thinking,
      role,
      conflictResolution,
      timePreference,
      restPreference,
      goal,
      important,
    } = formData;

    if (
      !communication.length ||
      !teamwork.length ||
      !thinking.length ||
      !role.length ||
      !conflictResolution.length ||
      !timePreference.length ||
      !restPreference.length ||
      !goal ||
      !important
    ) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    navigate("/register/3");
  };

  const handlePrevious = () => {
    navigate("/register/1");
  };

  return (
    <div className="container">
      <div className="left">
        <div className="circle">2</div>
        <h1 className="label1">작업 스타일</h1>
        <p className="label2">
        작업 스타일을 알려주세요!<br/>
        작업 스타일로 자신에게 맞는 사람과 공모전에<br/>
        참가할 수 있는 기회를 얻을 수 있어요!
        </p>
        <div className="image-placeholder"></div>
      </div>
      <div className="right">
        {[
          { label: "소통", category: "communication", options: ["비대면 소통을 선호해요", "대면 소통을 선호해요", "새벽 연락은 피해주세요"] },
          { label: "작업", category: "teamwork", options: ["다같이 작업하고 싶어요", "일을 나눠서 하고 싶어요", "평일에 하고 싶어요", "주말에 하고 싶어요"] },
          { label: "사고", category: "thinking", options: ["논리적이에요", "비판적이에요", "창의적이에요", "결과 중심적이에요", "과정 중심적이에요"] },
          { label: "역할", category: "role", options: ["리더십이 있어요", "계획적이에요", "설득력이 있어요", "호기심이 많아요", "협력적이에요", "기록을 잘 남겨요"] },
          { label: "갈등 해결", category: "conflictResolution", options: ["바로 해결해요", "시간이 필요해요", "솔직하게 말해요", "먼저 다가가요", "혼자 해결해요"] },
          { label: "시간", category: "timePreference", options: ["새벽(00~06시)", "아침(06-12)", "낮(12-18)", "저녁(18-00)"] },
          { label: "휴식", category: "restPreference", options: ["짧게 자주 쉬고 싶어요", "한번에 푹 쉬고 싶어요"] },
          { label: "지원 목적", category: "goal", options: ["참여하는 것에 의의를 두고 싶어요", "함께 하는 것에 의의를 두고 싶어요", "즐기면서 하고 싶어요", "꼭 수상하고 싶어요", "많은 시간과 노력을 부으며 하고 싶어요"] },
        ].map((item) => (
          <div key={item.category} className="question">
            <label>{item.label}:</label>
            <div className="button-group">
              {item.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleInputChange(item.category, option)}
                  className={formData[item.category]?.includes(option) ? "active" : ""}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
        <div className="question">
            <label>중요하게 생각해요:</label>
            <textarea
                name="important"
                placeholder="~은 꼭 지켜줬으면 좋겠어요."
                value={formData.important}
                onChange={handleTextChange}
            />
        </div>

        <div className="footer">
          <div className="progress-bar">
            <div className="progress-step"></div>
            <div className="progress-step active"></div>
            <div className="progress-step"></div>
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
    </div>
  );
};

export default RegisterPage2;
