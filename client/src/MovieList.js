import React from 'react'
import Movie from './Movie';

export default function MovieList({ movies, handleSelect }) {
    return (
      <ul className="list list-movies">
        {movies &&
          movies.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} handleSelect={handleSelect} />
          ))}
      </ul>
    );
  }