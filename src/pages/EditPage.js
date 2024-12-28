import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../context/FormContext";
import "../styles/CommonStyles.css";

const EditPage = () => {
  const { formData, setFormData } = useForm(); // 기존 데이터 사용
  const [updatedData, setUpdatedData] = useState(null); // 수정 데이터 상태
  const navigate = useNavigate();

  // 데이터 초기화
  useEffect(() => {
    if (formData) {
      setUpdatedData({ ...formData });
    }
  }, [formData]);

  // 데이터가 로드되지 않았을 때 로딩 표시
  if (!updatedData) {
    return <div>로딩 중...</div>;
  }

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
            value={updatedData.name || ""}
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
            value={updatedData.major || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="question">
          <label>나이:</label>
          <input
            type="text"
            name="age"
            value={updatedData.age || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="question">
          <label>전화번호:</label>
          <input
            type="text"
            name="phone"
            value={updatedData.phone || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="question">
          <label>이메일:</label>
          <input
            type="email"
            name="email"
            value={updatedData.email || ""}
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
          // ... 나머지 항목 생략
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
