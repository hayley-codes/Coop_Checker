import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState('');
  const [postings, setPostings] = useState(10);
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    axios.post('http://localhost:5000/api/search', { query, postings })
      .then(response => {
        setResults(response.data);
      })
      .catch(error => {
        console.error("There was an error making the request!", error);
      });
  };

  return (
    <div className="App">
      <h1>Job Search</h1>
      <input 
        type="text" 
        placeholder="Search your program, related jobs, etc." 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <input 
        type="number" 
        placeholder="Number of responses" 
        value={postings}
        onChange={(e) => setPostings(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <div>
        {results.map((result, index) => (
          <div key={index}>
            <h2>{result.title}</h2>
            <a href={result.url} target="_blank" rel="noopener noreferrer">
              {result.url}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;