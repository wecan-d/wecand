import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

// ---------------------- 서버 주소 & API ----------------------
// const server = "http://172.30.1.32:8080/card/3";
const server = process.env.REACT_APP_SERVER;



// const server = "https://672819eb270bd0b975546065.mockapi.io/api/v1/register";
// (1) 생성(POST)
export const PostMemberAPI = async (userId, data) => {

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
export const GetMembersAPI = async () => {
  const { userInfo, handleLogout } = useContext(AuthContext);
  const userId = userInfo.token;
  
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
  if (!id) {
    throw new Error("ID가 필요합니다. 데이터 업데이트를 중단합니다.");
  }

  try {
    const response = await axios.patch(`${server}/card/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("API 호출 에러(PATCH):", error);
    console.error("서버 응답 데이터:", error.response?.data);
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
  // const { userInfo, handleLogout } = useContext(AuthContext);
  // const userId = userInfo.token; 
  // console.log(userId+"는 입니다");

  const [formData, setFormData] = useState(() => {


    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : {
      // id: "",
      cardName: "",
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
      url: "",
      additionalInfo: "",
      fileUrl: "",
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