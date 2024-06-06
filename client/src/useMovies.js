
import { useEffect,useState } from "react";
const key = "14e32f1";

export  function useMovies(query) {
    const [movies, setMovies] = useState("");
  const [Loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
    
   useEffect(
     function () {
       const controller = new AbortController();
       async function fetchMovies() {
         try {
           setErr("");
           setLoading(true);
           setErr("");
           const res = await fetch(
             `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
             { signal: controller.signal }
           );
           if (!res.ok) throw new Error("Something went wrong");
           const data = await res.json();
           setMovies(data.Search);
           setErr("");
         } catch (e) {
           if (e.name !== "AbortError") setErr(e.message);
         } finally {
           setLoading(false);
         }
       }
       if (query.length < 3) {
         setMovies([]);
         setErr("");
         return;
       }
    //    handleClose();
       fetchMovies();
       return function () {
         controller.abort();
       };
     },
     [query]
   );
   return {movies,Loading,err};
}
