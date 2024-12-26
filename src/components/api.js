import axios from "axios";

const server = "https://672819eb270bd0b975546065.mockapi.io/api/v1";

export const postMemberAPI = async (data) => {
  try {
    const response = await axios.post(`${server}/register`, data);
    return response; // 서버 응답 반환
  } catch (error) {
    console.error("Error posting user data:", error);
    throw error;
  }
};

export const getMembersAPI = async () => {
  try {
    const response = await axios.get(`${server}/register`);
    return response.data; // 서버에서 받은 데이터 반환
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
