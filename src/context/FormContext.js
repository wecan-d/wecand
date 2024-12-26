import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/CommonStyles.css";

// API Configuration
const server = "https://672819eb270bd0b975546065.mockapi.io/api/v1";

export const postMemberAPI = async (data) => {
  try {
    const response = await axios.post(`${server}/register`, data);
    console.log("API 전송 데이터:", data); // 디버깅용
    return response;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
};

export const getMembersAPI = async () => {
  try {
    const response = await axios.get(`${server}/register`);
    console.log("서버 응답 데이터:", response.data); // 디버깅용
    return response.data;
  } catch (error) {
    console.error("데이터 가져오기 에러:", error);
    throw error;
  }
};

// Form Context
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    const parsedData = savedData ? JSON.parse(savedData) : null;
    console.log("초기 formData:", parsedData); // 디버깅용
    return (
      parsedData || {
        name: "",
        gender: "",
        identity: "",
        major: "",
        age: 20,
        phone: "",
        email: "",
        communication: [],
        teamwork: [],
        thinking: [],
        role: [],
        conflictResolution: [],
        timePreference: [],
        restPreference: [],
        goal: "",
        important: "",
        certificates: "",
        tools: "",
        awards: "",
        portfolio: "",
        additionalInfo: "",
        file: null,
        url: "",
      }
    );
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