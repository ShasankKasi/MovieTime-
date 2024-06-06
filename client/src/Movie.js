import React from 'react'

export default function Movie({ movie, handleSelect }) {
    return (
      <li key={movie.imdbID} onClick={() => handleSelect(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>Released : </span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    );
  }
