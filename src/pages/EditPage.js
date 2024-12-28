// EditPage.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useForm,
  getMembersAPI,
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
          const data = await getMembersAPI(); // 서버에서 데이터 가져오기
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
      const updatedArray = [...prev[fieldName]];
      updatedArray[index] = value;
      return { ...prev, [fieldName]: updatedArray };
    });
  };

  const handleAddArrayItem = (fieldName) => {
    setUpdatedData((prev) => ({
      ...prev,
      [fieldName]: [...(prev[fieldName] || []), ""],
    }));
  };

  const handleRemoveArrayItem = (fieldName, index) => {
    setUpdatedData((prev) => {
      const updatedArray = [...prev[fieldName]];
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
      {updatedData[fieldName]?.map((value, idx) => (
        <div
          key={idx}
          style={{ marginBottom: "8px", display: "inline-block", marginRight: "10px" }}
        >
          <input
            type="text"
            value={value}
            onChange={(e) => handleArrayChange(fieldName, idx, e.target.value)}
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => handleRemoveArrayItem(fieldName, idx)}
            style={{ marginLeft: "8px" }}
          >
            삭제
          </button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddArrayItem(fieldName)}>
        추가
      </button>
    </div>
  );

  return (
    <div className="container">
      <h1>수정 페이지</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        <div style={{ flex: "1 1 calc(33.33% - 20px)", minWidth: "300px" }}>
          {renderField("이름", "name")}
          {renderField("성별", "gender")}
          {renderField("신분", "identity")}
          {renderField("직종/학과", "major")}
          {renderField("나이", "age", "number")}
          {renderField("전화번호", "phone")}
          {renderField("이메일", "email", "email")}
          {renderField("중요한 것", "important")}
        </div>
        <div style={{ flex: "1 1 calc(33.33% - 20px)", minWidth: "300px" }}>
          {renderArrayField("소통 스타일", "communication", "소통 스타일 입력")}
          {renderArrayField("작업 스타일", "teamwork", "작업 스타일 입력")}
          {renderArrayField("사고 방식", "thinking", "사고 방식 입력")}
          {renderArrayField("역할", "role", "역할 입력")}
        </div>
        <div style={{ flex: "1 1 calc(33.33% - 20px)", minWidth: "300px" }}>
          {renderArrayField("갈등 해결 방법", "conflictResolution", "갈등 해결 입력")}
          {renderArrayField("시간 선호", "timePreference", "시간 선호 입력")}
          {renderArrayField("휴식 선호", "restPreference", "휴식 선호 입력")}
          {renderArrayField("친목 여부", "friendship", "친목 여부 입력")}
        </div>
        <div style={{ flex: "1 1 calc(33.33% - 20px)", minWidth: "300px" }}>
          {renderArrayField("자격증", "certificates", "자격증 입력")}
          {renderArrayField("사용 가능한 툴", "tools", "사용 가능한 툴 입력")}
          {renderArrayField("수상 경력", "awards", "수상 경력 입력")}
          {renderArrayField("URL", "url", "URL 입력")}
          {renderField("추가 정보", "additionalInfo", "textarea")}
        </div>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleSave} style={{ marginRight: "10px" }}>저장</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
    </div>
  );
};

export default EditPage;
