import React from 'react'

export default function Results({ movies }) {
    return (
      <p className="num-results">
        Found <strong>{!movies ? 0 : movies.length}</strong> results
      </p>
    );
  }