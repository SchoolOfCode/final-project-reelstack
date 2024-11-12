'use client';
import styles from './SearchBar.module.css';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const debounceTimeout = useRef(null);
  const router = useRouter(); //initialize router
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Define highlightedIndex state

  const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200'; //change size as needed

  const movieSearch = useMemo(
    () => ({
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }),
    [],
  );

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US`,
        movieSearch,
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.results) {
            setResults(data.results.slice(0, 10)); // Limit to 10 results
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
  }, [query, movieSearch]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setHighlightedIndex(-1); // Reset highlighted index on input change
  };

  const handleSelect = (movie) => {
    setQuery(movie.title);
    setResults([]);
    onClose(); //optional
    router.push(`/movies/${movie.id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (highlightedIndex >= 0 && highlightedIndex < results.length) {
      handleSelect(results[highlightedIndex]);
    } else if (results.length > 0) {
      handleSelect(results[0]); // If no index is highlighted, select the first result
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => {
        const newIndex = prevIndex < results.length - 1 ? prevIndex + 1 : prevIndex;
        console.log('New Highlighted Index (ArrowDown):', newIndex); // Log the new index when ArrowDown is pressed
        return newIndex;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => {
        const newIndex = prevIndex > 0 ? prevIndex - 1 : -1;
        console.log('New Highlighted Index (ArrowUp):', newIndex); // Log the new index when ArrowUp is pressed
        return newIndex;
      });
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
    <form className={styles.searchBar} onSubmit={handleSubmit}>
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#ff6d00"
        >
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
        </svg>
      </button>
      {results.length > 0 && (
        <ul className={styles.resultsList}>
          {results.map((movie, index) => (
            <li
              key={movie.id}
              className={`${styles.resultItem} ${index === highlightedIndex ? styles.highlighted : ''}`}
              data-testid={index === highlightedIndex ? 'highlighted-item' : ''}
              onClick={() => handleSelect(movie)}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(-1)}
            >
              <Image
                src={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : '/no-image-available.png'
                }
                alt={movie.title}
                className={styles.posterImage}
                width={75}
                height={100}
              />
              <span className={styles.movieTitle}>{movie.title}</span>
            </li>
          ))}
        </ul>
      )}
      {query.trim() !== '' && results.length === 0 && (
        <p className={styles.noResults}>No results found.</p>
      )}
    </form>
  );
}

