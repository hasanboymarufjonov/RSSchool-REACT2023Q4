import { Component } from 'react';
import './App.css';
import SearchInput from './components/SearchInput';
import SearchResults from './components/SearchResults';
import ErrorBoundary from './components/ErrorBoundary';

interface SearchResult {
  name: string;
  height: string;
  mass: string;
}

interface AppState {
  searchTerm: string;
  results: SearchResult[];
  loading: boolean;
  error: Error | null;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm');
    if (savedSearchTerm) {
      this.setState({ searchTerm: savedSearchTerm }, () => {
        this.fetchData(savedSearchTerm);
      });
    } else {
      this.fetchData('');
    }
  }

  fetchData = (searchTerm: string) => {
    this.setState({ loading: true });

    fetch(`https://swapi.dev/api/people/?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ results: data.results, loading: false });
      })
      .catch((error) => {
        this.setState({ error, loading: false });
      });
  };

  handleSearch = (searchTerm: string) => {
    this.setState({ loading: true });

    this.fetchData(searchTerm);

    localStorage.setItem('searchTerm', searchTerm);
  };

  throwError = () => {
    throw new Error('Test error');
  };

  render() {
    const { results, loading, error } = this.state;

    return (
      <div className="app-container">
        <h1 className="app-title">Star Wars Search</h1>
        <SearchInput onSearch={this.handleSearch} />
        <button className="error-button" onClick={this.throwError}>
          Throw Error
        </button>
        <ErrorBoundary>
          {loading ? (
            <div className="loading-message">Loading...</div>
          ) : error ? (
            <div className="error-message">Error: {error.message}</div>
          ) : (
            <SearchResults results={results} />
          )}
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
