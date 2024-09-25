// my-next-app/src/components/SearchBar.jsx
'use client'
import styles from "./SearchBar.module.css";
import { useState, useEffect, useRef } from "react";

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: ${query}`);
    // Implement actual search logic here
    onClose();
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
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