import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ---------------------- 서버 주소 & API ----------------------
// const server = "http://172.30.1.32:8080/card/3";
const server = process.env.REACT_APP_SERVER;
// const server = "https://672819eb270bd0b975546065.mockapi.io/api/v1/register";
const userId = 2;
// (1) 생성(POST)
export const postMemberAPI = async (data) => {
  try {
    const response = await axios.post(`${server}/card/${userId}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("API 호출 에러(POST):", error.response?.data || error.message);
    throw error;
  }
};

// (2) 조회(GET)
export const getMembersAPI = async () => {
  try {
    const response = await axios.get(`${server}/card/${userId}`);
    return response.data;
  } catch (error) {
    console.error("API 호출 에러(GET):", error);
    throw error;
  }
};

// (3) 수정(PATCH)
export const updateMemberAPI = async (id, data) => {
  try {
    const response = await axios.patch(`${server}/card/${userId}`, id, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("API 호출 에러(PATCH):", error);
    throw error;
  }
};

// (4) 삭제(DELETE)
export const deleteMemberAPI = async (id) => {
  try {
    const response = await axios.delete(`${server}/${id}`);
    return response;
  } catch (error) {
    console.error("API 호출 에러(DELETE):", error);
    throw error;
  }
};

// ---------------------- FormContext ----------------------
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : {
      // id: "",
      name: "",
      gender: "",
      identity: "",
      major: "",
      age: 0,
      phone: "",
      email: "",
      communication: [],
      teamwork: [],
      thinking: [],
      role: [],
      conflictResolution: [],
      timePreference: [],
      restPreference: [],
      friendship: [],
      important: "",
      certificates: [],
      tools: [],
      awards: [],
      url: [],
      additionalInfo: "",
      file: null,
    };
  });

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => useContext(FormContext);

// import React, { createContext, useContext, useState, useEffect } from "react";

// // ---------------------- 더미 데이터 ----------------------
// const dummyData = [
//   {
//     id: "1",
//     name: "지석영",
//     gender: "남자",
//     identity: "리ㅏㄴㅁ얼",
//     major: "컴공",
//     age: 20,
//     phone: "",
//     email: "23289312@naver.ocm",
//     communication: ["새벽연락은 피해주세요", "새벽연락도 가능해요"],
//     teamwork: ["주말에 하고싶어요", "평일에 하고싶어요"],
//     thinking: ["결과 중심적이에요", "과정 중심적이에요"],
//     role: ["설득력이 있어요", "호기심이 많아요"],
//     conflictResolution: ["먼저 다가가요", "솔직하게 표현해요"],
//     timePreference: ["아침(06-12시)", "낮(12-18시)"],
//     restPreference: ["한번에 푹 쉬고 싶어요"],
//     friendship: ["친목시간도 가지고 싶어요"],
//     important: "AAdF",
//     certificates: ["string"],
//     tools: ["string"],
//     awards: ["string"],
//     url: ["string"],
//     additionalInfo: "",
//     file: null,
//   },
//   {
//     id: "2",
//     name: "김지현",
//     gender: "여자",
//     identity: "학생",
//     major: "디자인",
//     age: 22,
//     phone: "",
//     email: "kimjihyun@naver.com",
//     communication: ["비대면소통을 선호해요"],
//     teamwork: ["다같이 작업하고 싶어요"],
//     thinking: ["창의적이에요"],
//     role: ["계획적이에요"],
//     conflictResolution: ["솔직하게 표현해요"],
//     timePreference: ["저녁(18-00시)"],
//     restPreference: ["짧게 자주 쉬고 싶어요"],
//     friendship: ["작업에만 집중하고 싶어요"],
//     important: "시간 준수",
//     certificates: ["디자인 자격증"],
//     tools: ["Photoshop"],
//     awards: ["디자인 공모전 우승"],
//     url: ["http://portfolio.com"],
//     additionalInfo: "",
//     file: null,
//   },
//   {
//     id: "3",
//     name: "박민호",
//     gender: "남자",
//     identity: "개발자",
//     major: "소프트웨어 공학",
//     age: 28,
//     phone: "",
//     email: "parkminho@naver.com",
//     communication: ["대면소통을 선호해요"],
//     teamwork: ["일을 나눠서 하고 싶어요"],
//     thinking: ["논리적이에요"],
//     role: ["리더십이 있어요"],
//     conflictResolution: ["바로 해결해요"],
//     timePreference: ["낮(12-18시)"],
//     restPreference: ["한번에 푹 쉬고 싶어요"],
//     friendship: ["친목시간도 가지고 싶어요"],
//     important: "문제 해결",
//     certificates: ["Java 자격증"],
//     tools: ["VS Code", "Git"],
//     awards: ["우수 개발자"],
//     url: ["http://github.com/minho"],
//     additionalInfo: "",
//     file: null,
//   },
//   {
//     id: "4",
//     name: "이수연",
//     gender: "여자",
//     identity: "기획자",
//     major: "경영학",
//     age: 24,
//     phone: "",
//     email: "leesooyeon@naver.com",
//     communication: ["새벽연락도 가능해요"],
//     teamwork: ["평일에 하고싶어요"],
//     thinking: ["결과 중심적이에요"],
//     role: ["설득력이 있어요"],
//     conflictResolution: ["먼저 다가가요"],
//     timePreference: ["아침(06-12시)"],
//     restPreference: ["짧게 자주 쉬고 싶어요"],
//     friendship: ["작업에만 집중하고 싶어요"],
//     important: "효율성",
//     certificates: ["경영 자격증"],
//     tools: ["Excel", "PowerPoint"],
//     awards: ["기획 공모전 수상"],
//     url: ["http://portfolio.com"],
//     additionalInfo: "",
//     file: null,
//   }
// ];

// // ---------------------- 서버 주소 & API ----------------------
// const server = "http://192.168.1.24:8080/card/3";

// // (1) 생성(POST) - 더미 데이터로 처리
// export const postMemberAPI = async (data) => {
//   try {
//     console.log("POST 전송 데이터:", data); // 디버깅용
//     // 더미 데이터 추가
//     const newData = { ...data, id: `${dummyData.length + 1}` }; // id는 더미 데이터의 갯수 기반으로 설정
//     dummyData.push(newData); // 더미 데이터에 추가
//     return { data: newData }; // 응답으로 추가된 데이터 반환
//   } catch (error) {
//     console.error("API 호출 에러(POST):", error.message);
//     throw error;
//   }
// };

// // (2) 조회(GET) - 더미 데이터로 처리
// export const getMembersAPI = async () => {
//   try {
//     return dummyData; // 더미 데이터를 반환
//   } catch (error) {
//     console.error("API 호출 에러(GET):", error);
//     throw error;
//   }
// };

// // (3) 수정(PATCH) - 더미 데이터로 처리
// export const updateMemberAPI = async (id, data) => {
//   try {
//     const index = dummyData.findIndex(item => item.id === id);
//     if (index === -1) throw new Error("데이터가 존재하지 않습니다.");
//     dummyData[index] = { ...dummyData[index], ...data }; // 해당 데이터 업데이트
//     return { data: dummyData[index] }; // 업데이트된 데이터 반환
//   } catch (error) {
//     console.error("API 호출 에러(PATCH):", error);
//     throw error;
//   }
// };

// // (4) 삭제(DELETE) - 더미 데이터로 처리
// export const deleteMemberAPI = async (id) => {
//   try {
//     const index = dummyData.findIndex(item => item.id === id);
//     if (index === -1) throw new Error("데이터가 존재하지 않습니다.");
//     dummyData.splice(index, 1); // 해당 데이터 삭제
//     return { message: "삭제 완료" }; // 삭제 완료 메시지 반환
//   } catch (error) {
//     console.error("API 호출 에러(DELETE):", error);
//     throw error;
//   }
// };

// // ---------------------- FormContext ----------------------
// const FormContext = createContext();

// export const FormProvider = ({ children }) => {
//   const [formData, setFormData] = useState(() => {
//     const savedData = localStorage.getItem("formData");
//     return savedData ? JSON.parse(savedData) : {
//       name: "",
//       gender: "",
//       identity: "",
//       major: "",
//       age: 0,
//       phone: "",
//       email: "",
//       communication: [],
//       teamwork: [],
//       thinking: [],
//       role: [],
//       conflictResolution: [],
//       timePreference: [],
//       restPreference: [],
//       friendship: [],
//       important: "",
//       certificates: [],
//       tools: [],
//       awards: [],
//       url: [],
//       additionalInfo: "",
//       file: null,
//     };
//   });

//   useEffect(() => {
//     localStorage.setItem("formData", JSON.stringify(formData));
//   }, [formData]);

//   return (
//     <FormContext.Provider value={{ formData, setFormData }}>
//       {children}
//     </FormContext.Provider>
//   );
// };

// export const useForm = () => useContext(FormContext);