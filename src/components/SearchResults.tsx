import React from 'react';

interface SearchResult {
  name: string;
  height: string;
  mass: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
      {results.map((item, index) => (
        <div key={index}>
          <h3>{item.name}</h3>
          <p>
            {item.height}cm and {item.mass}kg
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
