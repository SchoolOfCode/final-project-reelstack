'use client';
import styles from './Header.module.css'; // Import CSS Modules
import { useState } from 'react';
import SearchBar from './SearchBar.jsx';
import Image from 'next/image';

export default function Header() {
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchClick = () => {
    setIsSearchActive(true);
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Image
          src="/reelstacklcolor.png"
          alt="Reel Magic Logo"
          width={35}
          height={35}
          className={styles.logo}
        />
        <h1 className={styles.title}> Reel Magic </h1>
      </div>
      <div className={styles.searchContainer}>
        {!isSearchActive && (
          <button
            aria-label="Search"
            className={`${styles.searchButton} ${isSearchActive ? styles.searchActive : ''}`}
            onClick={!isSearchActive ? handleSearchClick : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle className={styles.iconStroke} cx="10" cy="10" r="7" />
              <line className={styles.iconStroke} x1="21" y1="21" x2="15" y2="15" />
            </svg>
          </button>
        )}
        {isSearchActive && <SearchBar onClose={handleCloseSearch} />}
      </div>
    </header>
  );
}
