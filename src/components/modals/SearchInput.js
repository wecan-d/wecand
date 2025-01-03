import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const encodedSearch = encodeURIComponent(searchInput.trim());
    navigate(`/recruiting?searchword=${encodedSearch}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="검색어를 입력하세요"
      />
      <button type="submit">검색</button>
    </form>
  );
};

export default SearchInput;