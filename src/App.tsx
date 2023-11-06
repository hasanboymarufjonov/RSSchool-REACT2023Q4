import React, { useState, useEffect } from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';
import Details from './components/Details';
import { Routes, Route, Outlet } from 'react-router-dom'; // Import Routes, Route, and Outlet

interface SearchResult {
  name: string;
  height: string;
  mass: string;
}

const App: React.FC<Record<string, never>> = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      setSearchTerm(savedSearchTerm);
      fetchData(savedSearchTerm);
    } else {
      fetchData('');
    }
  }, []);

  const fetchData = (searchTerm: string) => {
    setLoading(true);

    fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data.results);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleSearch = (searchTerm: string) => {
    setLoading(true);
    fetchData(searchTerm);
    localStorage.setItem('searchTerm', searchTerm);
  };

  const throwError = () => {
    throw new Error('Test error');
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Star Wars Search</h1>
      <SearchInput onSearch={handleSearch} />
      <button className="error-button" onClick={throwError}>
        Throw Error
      </button>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<SearchResults results={results} />} />
          <Route path="/details/:itemId" element={<Outlet />}>
            {/* Define nested routes */}
            {/* <Route
              index
              element={
                <div className="loading-message">
                  Select an item to see details.
                </div>
              }
            /> */}
            <Route index element={<Details />} />
          </Route>
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
