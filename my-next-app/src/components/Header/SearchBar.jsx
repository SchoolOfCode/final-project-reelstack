// my-next-app/src/components/SearchBar.jsx
'use client'
import styles from "./SearchBar.module.css";
import { useState, useEffect, useRef } from 'react';

export default function SearchBar({ onClose }) {
//   const [query, setQuery] = useState("");
  const [movieTitle, setMovieTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const movieSearch = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTM5NTE2MmJjNDA5MzQ2MTMyNmM5NzUyZTBkZjMzZiIsIm5iZiI6MTcyNzI1NjM4Ny41OTcyMzYsInN1YiI6IjY2Y2RkOWM2NmZkMmYwN2FiNzlkYjE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n6Dhal1cf-trWSV3ewyYHw9HMouvYGBgv-pqFu3N2B0',
    },
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${movieTitle}&language=en-US`, movieSearch)
      .then((response) => response.json())
      .then((data) => {
        setMovieTitle(data);
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, [movieTitle]);

  return (
    <form className={styles.searchBar} >
      <input 
        type="text" 
        value={setMovieTitle} 
        // onChange={(e) => setMovieTitle(e.target.value)} 
        placeholder="Search..." 
        className={styles.input}
        ref={inputRef}
      />
      <button 
        type="button" 
        className={styles.closeButton} 
        onClick={onClose}
        aria-label="Close search"
      >
      <svg xmlns="http://www.w3.org/2000/svg" 
      height="24px" 
      viewBox="0 -960 960 960" 
      width="24px" 
      fill="#ff6d00">
      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
      </svg>
      </button>
      <button 
        type="submit" 
        className={styles.submitButton}
        aria-label="Submit search"
      >
        {/* icon removed */}
      </button>
    </form>
  );
}