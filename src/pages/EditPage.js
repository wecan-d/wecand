import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import "../styles/CommonStyles.css";

const EditPage = () => {
  const { formData, setFormData } = useForm(); // 기존 데이터 사용
  const [updatedData, setUpdatedData] = useState({ ...formData }); // 수정 데이터 상태
  const navigate = useNavigate();

  // 데이터 변경 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMultiSelectChange = (category, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [category]: prevData[category].includes(value)
        ? prevData[category].filter((item) => item !== value)
        : [...prevData[category], value],
    }));
  };

  const handleSave = () => {
    // 데이터 저장
    setFormData(updatedData);
    alert("수정 내용이 저장되었습니다.");
    navigate("/register/4");
  };

  return (
    <div className="container">
      <div className="left">
        <div className="circle">수정</div>
        <h1 className="label1">역량 카드 수정</h1>
        <p className="label2">
          입력하신 내용을 수정하고 저장해주세요!
          <br />
          저장된 내용은 역량 카드로 반영됩니다.
        </p>
      </div>
      <div className="right">
        {/* 기본 정보 */}
        <div className="question">
          <label>이름:</label>
          <input
            type="text"
            name="name"
            value={updatedData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="question">
          <label>성별:</label>
          <div className="button-group">
            {["남", "여", "기타"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setUpdatedData((prevData) => ({ ...prevData, gender: option }))
                }
                className={updatedData.gender === option ? "active" : ""}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="question">
          <label>신분:</label>
          <div className="button-group">
            {["직장인", "취업준비생", "대학생"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() =>
                  setUpdatedData((prevData) => ({
                    ...prevData,
                    identity: option,
                  }))
                }
                className={updatedData.identity === option ? "active" : ""}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="question">
          <label>직종/학과:</label>
          <input
            type="text"
            name="major"
            value={updatedData.major}
            onChange={handleInputChange}
          />
        </div>
        <div className="question">
          <label>나이:</label>
          <input
            type="text"
            name="age"
            value={updatedData.age}
            onChange={handleInputChange}
          />
        </div>
        <div className="question">
          <label>전화번호:</label>
          <input
            type="text"
            name="phone"
            value={updatedData.phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="question">
          <label>이메일:</label>
          <input
            type="email"
            name="email"
            value={updatedData.email}
            onChange={handleInputChange}
          />
        </div>

        {/* 작업 역량 */}
        {[
          {
            label: "소통",
            category: "communication",
            options: ["비대면 소통을 선호해요", "대면 소통을 선호해요", "새벽 연락은 피해주세요"],
          },
          {
            label: "작업 스타일",
            category: "teamwork",
            options: ["다같이 작업하고 싶어요", "일을 나눠서 하고 싶어요", "평일에 하고 싶어요", "주말에 하고 싶어요"],
          },
          {
            label: "사고 방식",
            category: "thinking",
            options: ["논리적이에요", "비판적이에요", "창의적이에요", "결과 중심적이에요", "과정 중심적이에요"],
          },
          {
            label: "역할",
            category: "role",
            options: ["리더십이 있어요", "계획적이에요", "설득력이 있어요", "호기심이 많아요", "협력적이에요", "기록을 잘 남겨요"],
          },
          {
            label: "갈등 해결",
            category: "conflictResolution",
            options: ["바로 해결해요", "시간이 필요해요", "솔직하게 말해요", "먼저 다가가요", "혼자 해결해요"],
          },
          {
            label: "시간 선호",
            category: "timePreference",
            options: ["새벽(00~06시)", "아침(06-12)", "낮(12-18)", "저녁(18-00)"],
          },
          {
            label: "휴식 선호",
            category: "restPreference",
            options: ["짧게 자주 쉬고 싶어요", "한번에 푹 쉬고 싶어요"],
          },
          {
            label: "지원 목적",
            category: "goal",
            options: ["참여하는 것에 의의를 두고 싶어요", "함께 하는 것에 의의를 두고 싶어요", "즐기면서 하고 싶어요", "꼭 수상하고 싶어요"],
          },
        ].map((item) => (
          <div key={item.category} className="question">
            <label>{item.label}:</label>
            <div className="button-group">
              {item.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleMultiSelectChange(item.category, option)}
                  className={
                    updatedData[item.category]?.includes(option) ? "active" : ""
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* 경력/경험 */}
        <div className="question">
          <label>자격증:</label>
          <input
            type="text"
            name="certificates"
            value={updatedData.certificates}
            onChange={handleInputChange}
          />
        </div>
        <div className="question">
          <label>사용 가능한 툴:</label>
          <input
            type="text"
            name="tools"
            value={updatedData.tools}
            onChange={handleInputChange}
          />
        </div>
        <div className="question">
          <label>수상 경력:</label>
          <input
            type="text"
            name="awards"
            value={updatedData.awards}
            onChange={handleInputChange}
          />
        </div>
        <div className="question">
          <label>개인 작업물 URL:</label>
          <input
            type="text"
            name="portfolio"
            value={updatedData.portfolio}
            onChange={handleInputChange}
          />
        </div>
        <div className="question">
          <label>추가 정보:</label>
          <textarea
            name="additionalInfo"
            value={updatedData.additionalInfo}
            onChange={handleInputChange}
          />
        </div>

        {/* Footer */}
        <div className="footer">
          <button className="btn-prev" onClick={() => navigate("/register/4")}>
            취소
          </button>
          <button className="btn-next" onClick={handleSave}>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
