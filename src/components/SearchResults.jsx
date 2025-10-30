import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for: "{query}"
      </h1>
      <p>Displaying search results for: {query}</p>
    </div>
  );
};

export default SearchResults;