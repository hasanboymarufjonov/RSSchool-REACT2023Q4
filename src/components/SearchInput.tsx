import React, { useState, useEffect } from 'react';
import '../styles/SearchInput.css';

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
    }
  }, []);

  const handleSearch = () => {
    localStorage.setItem('searchTerm', searchTerm.trim());
    onSearch(searchTerm.trim());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-input">
      <input
        className="search-input__input"
        type="text"
        placeholder="Search for Vader ..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button className="search-input__button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchInput;
