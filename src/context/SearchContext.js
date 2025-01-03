import React, { createContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

export const SearchContext = createContext();

const server = process.env.REACT_APP_SERVER;



export const SearchProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]); // 전체 데이터
  const [filteredData, setFilteredData] = useState([]); // 필터링된 데이터
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  useEffect(() => {
    

    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/post`);
        // const response = await axios.get("https://676e83a3df5d7dac1ccae100.mockapi.io/post");
        setData(response.data); // 전체 데이터 저장
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // 검색어에 따라 데이터를 필터링
    const currentSearch = searchParams.get("search") || "";
    if (currentSearch === "") {
      setFilteredData(data); // 검색어가 없으면 전체 데이터 반환
    } else {
      const filtered = data.filter((item) =>
        item.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
        item.category.toLowerCase().includes(currentSearch.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchParams, data]); // URL 파라미터 변경 시 필터링

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, filteredData }}>
      {children}
    </SearchContext.Provider>
  );
};