import React, { Component } from 'react';
import '../styles/SearchInput.css';

interface SearchInputState {
  searchTerm: string;
}

interface SearchInputProps {
  onSearch: (searchTerm: string) => void;
}

class SearchInput extends Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);
    this.state = {
      searchTerm: '',
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm });
    }
  }

  handleSearch = () => {
    const { searchTerm } = this.state;
    localStorage.setItem('searchTerm', searchTerm.trim());
    this.props.onSearch(searchTerm.trim());
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  render() {
    const { searchTerm } = this.state;
    return (
      <div className="search-input">
        <input
          className="search-input__input"
          type="text"
          placeholder="Search for Vader ..."
          value={searchTerm}
          onChange={this.handleChange}
        />
        <button className="search-input__button" onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default SearchInput;
