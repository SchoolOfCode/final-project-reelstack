import styles from './Header.module.css'; // Import CSS Modules

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>📽️Reel Magic📽️</h1>
            <button aria-label="Search" className={styles.searchButton}>
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
                  This removes searchbar circle fill so the background is black
                    <circle className={styles.iconStroke} cx="10" cy="10" r="7"  />
                    <line className={styles.iconStroke} x1="21" y1="21" x2="15" y2="15" />
                </svg>
            </button>
        </header>
    );
  }