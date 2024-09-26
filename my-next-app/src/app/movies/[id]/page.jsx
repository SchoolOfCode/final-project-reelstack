'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function MovieDetail() {
  const params = useParams(); // Access route parameters
  const { id } = params || {}; // Destructure 'id' safely

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Wait until 'id' is available

    const fetchMovieDetail = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTM5NTE2MmJjNDA5MzQ2MTMyNmM5NzUyZTBkZjMzZiIsIm5iZiI6MTcyNzI1NjM4Ny41OTcyMzYsInN1YiI6IjY2Y2RkOWM2NmZkMmYwN2FiNzlkYjE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n6Dhal1cf-trWSV3ewyYHw9HMouvYGBgv-pqFu3N2B0',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <p className={styles.p2}>Loading...</p>;
  if (error) return <p className={styles.p2}>Error: {error}</p>;
  if (!movie) return <p className={styles.p2}>No movie data available.</p>;

  return (
    <div className={styles.container2}>
      <h1 className={styles.steph1}>{movie.title}</h1>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w300${movie.poster_path}` : '/no-image-available.png'}
        alt={movie.title}
        className={styles.posteridsection}
      />
      <p className={styles.p2}><strong className={styles.strongidsection}>Release Date:</strong> {movie.release_date}</p>
      <p className={styles.p2}><strong className={styles.strongidsection}>Rating:</strong> {movie.vote_average} ⭐️</p>
      <p className={styles.p2}><strong className={styles.strongidsection}>Overview:</strong> {movie.overview}</p>
      {/* Add more details as desired */}
    </div>
  );
}