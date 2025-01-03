import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useForm,
  GetMembersAPI,
  updateMemberAPI,
  deleteMemberAPI,
} from "../context/FormContext";
import "../styles/CommonStyles.css";

const EditPage = () => {
  const { id } = useParams(); // URL에서 ID 추출
  const { formData, setFormData } = useForm();
  const [updatedData, setUpdatedData] = useState(null); // 수정할 데이터 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const data = await GetMembersAPI(); // 서버에서 데이터 가져오기
          const targetData = data.find((item) => String(item.id) === id); // 해당 ID의 데이터 찾기
          if (targetData) {
            setUpdatedData(targetData);
          } else {
            alert("해당 ID의 데이터를 찾을 수 없습니다.");
            navigate("/register/1"); // 데이터가 없으면 첫 페이지로 이동
          }
        } else {
          setUpdatedData(formData); // 로컬 데이터를 사용
        }
      } catch (error) {
        console.error("데이터 로드 에러:", error);
        alert("데이터를 가져오는 중 문제가 발생했습니다.");
      }
    };

    fetchData();
  }, [id, formData, navigate]);

  if (!updatedData) {
    return <div>로딩 중...</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (fieldName, index, value) => {
    setUpdatedData((prev) => {
      const updatedArray = Array.isArray(prev[fieldName]) ? [...prev[fieldName]] : [];
      updatedArray[index] = value;
      return { ...prev, [fieldName]: updatedArray };
    });
  };

  const handleAddArrayItem = (fieldName) => {
    setUpdatedData((prev) => ({
      ...prev,
      [fieldName]: Array.isArray(prev[fieldName]) ? [...prev[fieldName], ""] : [""],
    }));
  };

  const handleDeleteArrayItem = (fieldName, index) => {
    setUpdatedData((prev) => {
      const updatedArray = Array.isArray(prev[fieldName]) ? [...prev[fieldName]] : [];
      updatedArray.splice(index, 1);
      return { ...prev, [fieldName]: updatedArray };
    });
  };

  const handleSave = async () => {
    try {
      await updateMemberAPI(id, updatedData);
      alert("데이터가 수정되었습니다.");
      setFormData(updatedData);
      navigate("/home");
    } catch (error) {
      console.error("저장 중 에러:", error);
      alert("저장 중 문제가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMemberAPI(id);
      alert("데이터가 삭제되었습니다.");
      navigate("/register/1");
    } catch (error) {
      console.error("삭제 중 에러:", error);
      alert("삭제 중 문제가 발생했습니다.");
    }
  };

  const renderField = (label, name, type = "text") => (
    <div className="question">
      <label>{label}:</label>
      <input
        type={type}
        name={name}
        value={updatedData[name] || ""}
        onChange={handleInputChange}
      />
    </div>
  );

  const renderArrayField = (label, fieldName, placeholder) => (
    <div className="question">
      <label>{label}:</label>
      <div>
        {Array.isArray(updatedData[fieldName]) ? (
          updatedData[fieldName]?.map((value, idx) => (
            <div key={idx} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
              <input
                type="text"
                value={value}
                onChange={(e) => handleArrayChange(fieldName, idx, e.target.value)}
                placeholder={placeholder}
                style={{ marginRight: "10px" }}
              />
              <button
                type="button"
                onClick={() => handleDeleteArrayItem(fieldName, idx)}
              >
                삭제
              </button>
            </div>
          ))
        ) : (
          <p>유효한 데이터가 없습니다.</p>
        )}
        <button type="button" onClick={() => handleAddArrayItem(fieldName)}>
          추가
        </button>
      </div>
    </div>
  );

  const renderButtonGroup = (label, category, options) => (
    <div className="question">
      <label>{label}:</label>
      <div className="button-group">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleInputChange({ target: { name: category, value: option } })}
            className={updatedData[category]?.includes(option) ? "active" : ""}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container" style={{ flexDirection: "column" }}>
      <h1>수정 페이지</h1>
      {renderField("이름", "name")}
      {renderButtonGroup("성별", "gender", ["남성", "여성"])}
      {renderField("신분", "identity")}
      {renderField("직종/학과", "major")}
      {renderField("나이", "age", "number")}
      {renderField("전화번호", "phone")}
      {renderField("이메일", "email", "email")}
      {renderField("중요한 것", "important")}
      {renderButtonGroup("소통", "communication", [
        "비대면 소통을 선호해요",
        "대면 소통을 선호해요",
        "새벽 연락은 피해주세요",
        "새벽연락도 가능해요",
      ])}
      {renderButtonGroup("작업", "teamwork", [
        "다같이 작업하고 싶어요",
        "일을 나눠서 하고 싶어요",
        "평일에 하고 싶어요",
        "주말에 하고 싶어요",
      ])}
      {renderButtonGroup("사고", "thinking", [
        "논리적이에요",
        "비판적이에요",
        "창의적이에요",
        "결과 중심적이에요",
        "과정 중심적이에요",
      ])}
      {renderButtonGroup("역할", "role", [
        "리더십이 있어요",
        "계획적이에요",
        "설득력이 있어요",
        "호기심이 많아요",
        "기록을 잘 남겨요",
      ])}
      {renderButtonGroup("갈등 해결", "conflictResolution", [
        "바로 해결해요",
        "시간이 필요해요",
        "솔직하게 말해요",
        "먼저 다가가요",
        "혼자 해결해요",
      ])}
      {renderButtonGroup("시간", "timePreference", [
        "새벽(00~06시)",
        "아침(06-12시)",
        "낮(12-18시)",
        "저녁(18-00시)",
      ])}
      {renderButtonGroup("휴식", "restPreference", [
        "짧게 자주 쉬고 싶어요",
        "한번에 푹 쉬고 싶어요",
      ])}
      {renderButtonGroup("친목", "friendship", [
        "작업에만 집중하고 싶어요",
        "친목시간도 가지고 싶어요",
      ])}
      {renderArrayField("사용 가능한 툴", "tools", "사용 가능한 툴 입력")}
      {renderArrayField("수상 경력", "awards", "수상 경력 입력")}
      {renderArrayField("URL", "url", "URL 입력")}
      {renderField("추가 정보", "additionalInfo", "textarea")}
      <div className="footer-buttons">
        <button
          onClick={handleSave}
          style={{ backgroundColor: "#4CAF50", color: "white", padding: "10px 20px" }}
        >
          저장
        </button>
        <button
          onClick={handleDelete}
          style={{ backgroundColor: "#f44336", color: "white", padding: "10px 20px" }}
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default EditPage;
