import React, { useState } from "react";
import axios from "axios";

const server = "https://67625e5846efb373237455b0.mockapi.io/gemlense";

export const postMemberAPI = async (data) => {
  try {
    const response = await axios.post(`${server}/post`, data);
    return response;
  } catch (error) {
    console.error("Error posting user data:", error);
    throw error;
  }
};

const MakeTeam = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    member: "",
    url: "",
    memo: "",
    img: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    "디자인",
    "개발",
    "마케팅",
    "영상",
    "사진",
    "문학",
    "음악",
    "사회봉사",
    "IT",
    "기타",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, img: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.category || !formData.date) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    const payload = {
      ...formData,
      img: imagePreview,
    };

    try {
      const response = await postMemberAPI(payload);
      alert("작성 완료! MockAPI에 성공적으로 업로드되었습니다.");
      console.log("Uploaded Data:", response.data);

      setFormData({
        title: "",
        category: "",
        date: "",
        member: "",
        url: "",
        memo: "",
        img: null,
      });
      setImagePreview(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("데이터 업로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <h1 style={styles.title}>공모전 글 작성하기</h1>
        <div
          style={styles.imageUpload}
          onClick={() => document.getElementById("imageInput").click()}
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" style={styles.image} />
          ) : (
            <span style={styles.plusSign}>+</span>
          )}
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.fileInput}
          />
        </div>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>제목</label>
          <input
            type="text"
            name="title"
            placeholder="공모전 이름을 입력해주세요."
            value={formData.title}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputRow}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>카테고리</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option value="">카테고리를 선택해주세요</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>모집 마감 날짜</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>모집 인원</label>
            <input
              type="number"
              name="member"
              placeholder="모집 인원을 입력해주세요."
              value={formData.member}
              onChange={handleInputChange}
              style={styles.input}
            />
          </div>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>URL 링크</label>
          <input
            type="text"
            name="url"
            placeholder="공모전 링크를 첨부해주세요."
            value={formData.url}
            onChange={handleInputChange}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>추가 설명</label>
          <textarea
            name="memo"
            placeholder="공모전 모집에 대해 더 설명해보세요."
            value={formData.memo}
            onChange={handleInputChange}
            style={styles.textarea}
          />
        </div>
        <button onClick={handleSubmit} style={styles.submitButton}>
        작성 완료
      </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    gap: "2rem",
    padding: "2rem",
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  leftPanel: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
  },
  title: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  imageUpload: {
    width: "200px",
    height: "200px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    border: "2px dashed #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  plusSign: {
    fontSize: "2rem",
    color: "#aaa",
  },
  fileInput: {
    display: "none",
  },
  rightPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontWeight: "bold",
  },
  input: {
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "100%",
  },
  select: {
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "5px",
    width: "100%",
  },
  textarea: {
    padding: "0.5rem",
    border: "1px solid #ddd",
    borderRadius: "5px",
    resize: "none",
    height: "80px",
  },
  submitButton: {
    padding: "0.8rem 2rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    alignSelf: "center",
    marginTop: "2rem",
  },
  inputRow: {
    display: "flex",
    gap: "1rem",
    width: "100%",
  },
};

export default MakeTeam;
