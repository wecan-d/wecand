import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ---------------------- 서버 주소 & API ----------------------
const server = "https://672819eb270bd0b975546065.mockapi.io/api/v1/register";

// (1) 생성(POST)
export const postMemberAPI = async (data) => {
  try {
    const response = await axios.post(server, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("API 호출 에러(POST):", error);
    throw error;
  }
};

// (2) 조회(GET)
export const getMembersAPI = async () => {
  try {
    const response = await axios.get(server);
    return response.data;
  } catch (error) {
    console.error("API 호출 에러(GET):", error);
    throw error;
  }
};

// (3) 수정(UPDATE)
export const updateMemberAPI = async (id, data) => {
  try {
    const response = await axios.put(`${server}/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response;
  } catch (error) {
    console.error("API 호출 에러(PUT):", error);
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
      id: "",
      name: "",
      gender: "",
      identity: "",
      major: "",
      age: "",
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
