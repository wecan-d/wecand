import React from "react";
import { useNavigate } from "react-router-dom";
import { postMemberAPI, useForm } from "../context/FormContext";
import "../styles/CommonStyles.css";

const RegisterPage2 = () => {
  const { formData, setFormData } = useForm();
  const navigate = useNavigate();

  const handleInputChange = (category, value) => {
    const singleSelectCategories = ["restPreference", "friendship"];

    if (singleSelectCategories.includes(category)) {
      // 단일 선택: 배열에는 항상 1개 값만
      setFormData((prevData) => ({
        ...prevData,
        [category]: [value],
      }));
    } else {
        setFormData((prevData) => ({
          ...prevData,
          [category]: prevData[category].includes(value)
            ? prevData[category].filter((item) => item !== value)
            : [...prevData[category], value],
        }));
      };
    }

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNext =  () => {
    const {
      communication,
      teamwork,
      thinking,
      role,
      conflictResolution,
      timePreference,
      restPreference,
      friendship,
    } = formData;

    // 비어 있는 필수 항목 확인
    const missingFields = [];
    if (!communication.length) missingFields.push("소통");
    if (!teamwork.length) missingFields.push("작업 스타일");
    if (!thinking.length) missingFields.push("사고 방식");
    if (!role.length) missingFields.push("역할");
    if (!conflictResolution.length) missingFields.push("갈등 해결");
    if (!timePreference.length) missingFields.push("시간 선호");
    if (!restPreference.length) missingFields.push("휴식 선호");
    if (!friendship.length) missingFields.push("친목");

    // 누락된 항목이 있으면 알림 표시 후 종료
    if (missingFields.length) {
      alert(`다음 항목을 입력해주세요: ${missingFields.join(", ")}`);
      return;
    }

    // 모든 필드가 입력된 경우에만 API 호출
    try {
      const response =  postMemberAPI(formData);
      console.log("RegisterPage2 POST response:", response.data); // 콘솔에 응답 데이터 출력
      // POST 성공 시 다음 단계로 이동
      navigate("/register/3");
    } catch (error) {
      console.error("RegisterPage2 POST error:", error);
      // 필요한 경우, 에러가 나도 넘어가도록 하려면 여기서 navigate("/register/3")를 호출하거나
      // 사용자에게 메시지를 띄운 뒤 별도 처리를 해주면 됩니다.
    }
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
          작업 스타일을 알려주세요!<br />
          작업 스타일로 자신에게 맞는 사람과 공모전에<br />
          참가할 수 있는 기회를 얻을 수 있어요!
        </p>
        <div className="image-placeholder"></div>
      </div>
      <div className="right">
        <div className="progress-bar">
          <div className="progress-step"></div>
          <div className="progress-step active"></div>
          <div className="progress-step"></div>
        </div>
        {[
          { label: "소통", category: "communication", options: ["비대면 소통을 선호해요", "대면 소통을 선호해요", "새벽 연락은 피해주세요", "새벽연락도 가능해요"] },
          { label: "작업", category: "teamwork", options: ["다같이 작업하고 싶어요", "일을 나눠서 하고 싶어요", "평일에 하고 싶어요", "주말에 하고 싶어요"] },
          { label: "사고", category: "thinking", options: ["논리적이에요", "비판적이에요", "창의적이에요", "결과 중심적이에요", "과정 중심적이에요"] },
          { label: "역할", category: "role", options: ["리더십이 있어요", "계획적이에요", "설득력이 있어요", "호기심이 많아요", "기록을 잘 남겨요"] },
          { label: "갈등 해결", category: "conflictResolution", options: ["바로 해결해요", "시간이 필요해요", "솔직하게 말해요", "먼저 다가가요", "혼자 해결해요"] },
          { label: "시간", category: "timePreference", options: ["새벽(00~06시)", "아침(06-12시)", "낮(12-18시)", "저녁(18-00시)"] },
          { label: "휴식", category: "restPreference", options: ["짧게 자주 쉬고 싶어요", "한번에 푹 쉬고 싶어요"] },
          { label: "친목", category: "friendship", options: ["작업에만 집중하고 싶어요", "친목시간도 가지고 싶어요"] },
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
          <label>중요하게 생각해요 (선택):</label>
          <textarea
            name="important"
            placeholder="~은 꼭 지켜줬으면 좋겠어요."
            value={formData.important}
            onChange={handleTextChange}
          />
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

export default RegisterPage2;
