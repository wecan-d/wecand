// context/SearchContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [data, setData] = useState([]); // 서버에서 받아온 데이터
  const [filteredData, setFilteredData] = useState([]); // 검색어에 따른 필터링된 데이터


  useEffect(() => {
    // 서버 데이터 가져오기
    const fetchData = async () => {
      try {
        // const response = await axios.get("https://676e83a3df5d7dac1ccae100.mockapi.io/post");
        const response = await axios.get("http://172.30.1.44:8080/post");
        
        setData(response.data); // 원본 데이터 저장
        setFilteredData(response.data); // 초기 데이터 설정
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // 검색어에 따라 데이터 필터링
    if (searchTerm === "") {
      setFilteredData(data); // 검색어 없으면 전체 데이터 표시
    } else {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, filteredData }}>
      {children}
    </SearchContext.Provider>
  );
};