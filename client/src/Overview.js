import React, { useEffect, useState } from 'react'
import { useKey } from './useKey';
import Loader from './Loader';
import StarRating from './StarRating';
const key = "14e32f1";


export default function Overview({ id, handleClose, handleAddWatch, watched }) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");
    const isWatched = watched.map((movie) => movie.imdbID).includes(id);
    const watchedUserRating = watched.find(
      (mov) => mov.imdbID === id
    )?.userRating;
    const {
      Title: title,
      Year: year,
      Poster: poster,
      Runtime: runtime,
      imdbRating,
      Plot: plot,
      Released: released,
      Actors: actors,
      Director: director,
      Genre: genre,
    } = movie;
    function handleAdd() {
      const newMovie = {
        imdbID: id,
        title,
        year,
        poster,
        imdbRating: Number(imdbRating),
        runtime: Number(runtime.split("").at(0)),
        userRating,
      };
      handleAddWatch(newMovie);
      handleClose();
    }
    useKey('Escape',handleClose);
    
    useEffect(
      function () {
        async function get() {
          setIsLoading(true);
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&i=${id}`
          );
          const data = await res.json();
          setMovie(data);
          setIsLoading(false);
        }
        get();
      },
      [id]
    );
  
    useEffect(
      function () {
        if (!title) return;
        document.title = `Movie | ${title}`;
        return function () {
          document.title = "MovieTime";
        };
      },
      [title]
    );
    return (
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={handleClose}>
                &larr;
              </button>
              <img src={poster} alt={`Poster of ${title} movie`} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released} &bull; {runtime}
                </p>
                <p>{genre}</p>
                <p>
                  <span>⭐ {imdbRating} IMDB rating</span>
                </p>
              </div>
            </header>
            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      rating={userRating}
                      setRating={setUserRating}
                    />
                    {userRating > 0 && (
                      <button
                        className="btn-add"
                        onClick={handleAdd}
                        // onSetRating={setUserRating}
                      >
                        + Add to List{" "}
                      </button>
                    )}
                  </>
                ) : (
                  <p>You rated the movie already ⭐{watchedUserRating} ⭐ </p>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    );
  }