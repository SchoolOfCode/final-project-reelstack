'use client'
import styles from "./SearchBar.module.css";
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);
  const router = useRouter();//initialize router
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Define highlightedIndex state

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';//change size as needed

  const movieSearch = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTM5NTE2MmJjNDA5MzQ2MTMyNmM5NzUyZTBkZjMzZiIsIm5iZiI6MTcyNzI1NjM4Ny41OTcyMzYsInN1YiI6IjY2Y2RkOWM2NmZkMmYwN2FiNzlkYjE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n6Dhal1cf-trWSV3ewyYHw9HMouvYGBgv-pqFu3N2B0',
    },
  };

  useEffect(() => {
    if (inputRef.current) {
    inputRef.current.focus();
  }
 }, []);

  useEffect(() => {
    if (query.trim() === "") {
        setResults([]);
        return;
  }

  if (debounceTimeout.current) {
    clearTimeout(debounceTimeout.current);
  }

  debounceTimeout.current = setTimeout(() => {
    fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US`, movieSearch)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.results) {
            setResults(data.results.slice(0, 10));// Limit to 10 results
        } else {
            setResults([]);
        }
    })
    .catch((err) => {
        console.error('Error fetching movie data:', err);
        setResults([]);
    });
  }, 300);

  return () => {
    clearTimeout(debounceTimeout.current);
  };
}, [query]);

const handleInputChange = (e) => {
    setQuery(e.target.value);
    setHighlightedIndex(-1); // Reset highlighted index on input change
};

const handleSelect = (movie) => {
    console.log("Selected movie:", movie);
    setQuery(movie.title);
    setResults([]);
    onClose();//optional
    router.push(`/movies/${movie.id}`);

};

const handleSubmit = (e) => {
    e.preventDefault();
  // Handle form submission if needed
  if (highlightedIndex >= 0 && highlightedIndex < results.length) {
    handleSelect(results[highlightedIndex]);
  } else if (results.length > 0) {
    handleSelect(results[0]); // If no index is highlighted, select the first result
  }
};


const handleKeyDown = (e) => {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    setHighlightedIndex((prevIndex) =>
      prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex
    );
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    setHighlightedIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : -1
    );
  } else if (e.key === 'Enter') {
    if (highlightedIndex >= 0 && highlightedIndex < results.length) {
      handleSelect(results[highlightedIndex]);
    } else if (results.length > 0) {
      handleSelect(results[0]);
    }
  } else if (e.key === 'Escape') {
    onClose();
  }
};


  return (
    <form className={styles.searchBar} onSubmit={handleSubmit} >
      <input 
        type="text" 
        value={query} 
        onChange={handleInputChange} 
        onKeyDown={handleKeyDown}
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
      {/* <button 
        type="submit" 
        className={styles.submitButton}
        aria-label="Submit search"
      >
        {/* icon removed */}
      {/* </button> */}
      {results.length > 0 && (
        <ul className={styles.resultsList}>
          {results.map((movie, index) => (
            <li 
              key={movie.id} 
              className={`${styles.resultItem} ${index === highlightedIndex ? styles.highlighted : ''}`}
              onClick={() => handleSelect(movie)}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(-1)}
            >
              <img 
                src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '/no-image-available.png'} 
                alt={movie.title} 
                className={styles.posterImage}
              />
              <span className={styles.movieTitle}>{movie.title}</span>
            </li>
          ))}
        </ul>
      )}
        {query.trim() !== "" && results.length === 0 && (
        <p className={styles.noResults}>No results found.</p>
      )}
    </form>
  );
}

//   useEffect(() => {
//     fetch(`https://api.themoviedb.org/3/search/movie?query=${movieTitle}&language=en-US`, movieSearch)
//       .then((response) => response.json())
//       .then((data) => {
//         setMovieTitle(data);
//         console.log(data);
//       })
//       .catch((err) => console.error(err));
//   }, [movieTitle]);


// debounceTimeout.current = setTimeout(() => {
//   fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US`, movieSearch)
//     .then((response) => response.json())
//     .then((data) => {
//       if (data && data.results) {
//           setResults(data.results.slice(0, 10));// Limit to 10 results
//       } else {
//           setResults([]);
//       }
//   })
//   .catch((err) => {
//       console.error(err);
//       setResults([]);
//   });
// }, 300);