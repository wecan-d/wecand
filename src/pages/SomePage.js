import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { useSearchParams } from "react-router-dom";
import SearchResults from "../context/SearchResults";

const SomePage = () => {
  const [searchParams] = useSearchParams();
  const { data } = useContext(SearchContext);

  const searchTerm = searchParams.get("search") || ""; // URL에서 검색어 가져오기

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>검색 결과</h1>
      <SearchResults data={filteredData} />
    </div>
  );
};

export default SomePage;