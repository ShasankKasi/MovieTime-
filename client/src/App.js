import { useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState"; //CustomHook
import Overview from "./Overview";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import Main from "./Main";
import Box from "./Box";
import WatchList from "./WatchList";
import WatchSummary from "./WatchSummary";
import MovieList from "./MovieList";
import Results from "./Results";
import Navbar from "./Navbar";

export default function App() {
  const [query, setQuery] = useState("");
  const { movies, Loading, err } = useMovies(query);
  const [select, setSelect] = useState("");
  function handleAddWatch(movie) {
    if (!watched.find((m) => m.imdbID === movie.imdbID)) {
      setWatched((watched) => [...watched, movie]);
    }
  }

  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleDelete(id) {
    setWatched((w) => w.filter((movie) => movie.imdbID !== id));
  }

  function handleSelect(id) {
    select === id ? setSelect(null) : setSelect(id);
  }
  function handleClose() {
    setSelect(null);
  }
  return (
    <>
      <>
        <Navbar query={query} setQuery={setQuery} handleClose={handleClose}>
          <Results movies={movies} />
        </Navbar>
        <Main>
          <Box>
            {Loading && <Loader />}
            {!Loading && !err && (
              <MovieList movies={movies} handleSelect={handleSelect} />
            )}
            {err && <ErrorMessage erro={err} />}
          </Box>
          <Box>
            {select ? (
              <Overview
                handleClose={handleClose}
                id={select}
                key={select}
                handleAddWatch={handleAddWatch}
                watched={watched}
              />
            ) : (
              <>
                <WatchSummary watched={watched} />
                <WatchList watched={watched} handleDelete={handleDelete} />
              </>
            )}
          </Box>
        </Main>
      </>
    </>
  );
}
