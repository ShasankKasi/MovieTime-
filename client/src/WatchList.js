import React from 'react'
import WatchedMovieList from './WatchedMovieList';

export default function WatchList({ watched, handleDelete }) {
  return (
    <ul className="list">
      {watched &&
        watched.map((movie) => (
          <WatchedMovieList
            movie={movie}
            key={movie.imdbID}
            handleDelete={handleDelete}
          />
        ))}
    </ul>
  );
}