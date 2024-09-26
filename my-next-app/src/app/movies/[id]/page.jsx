'use client';

import { useParams } from 'next/navigation';
import React, { useState, useEffect, useMemo } from 'react';
import styles from './page.module.css'; // Ensure the correct import path
import Image from 'next/image';

export default function MoviePage() {
  const params = useParams(); // Access route parameters
  const { id } = params || {}; // Destructure 'id' safely

  const [movieData, setMovieData] = useState(null);
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const options = useMemo(
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
    if (!id) return; // Wait until 'id' is available

    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options,
        );
        if (!response.ok) {
          throw new Error(`Movie HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMovieData(data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError(err.message);
      }
    };

    fetchMovieData();
  }, [id, options]);

  useEffect(() => {
    if (!id) return; // Wait until 'id' is available

    const fetchReviewData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US`,
          options,
        );
        if (!response.ok) {
          throw new Error(`Reviews HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setReviewData(data.results || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewData();
  }, [id, options]);

  if (loading) return <p className={styles.text}>Loading...</p>;
  if (error) return <p className={styles.text}>Error: {error}</p>;
  if (!movieData) return <p className={styles.text}>No movie data available.</p>;

  return (
    <div className={styles.wrapper}>
      {/* Movie Details */}
      <h1 className={styles.text}>{movieData.title}</h1>
      <div className={styles.movieBox}>
        <div className={styles.posterContainer}>
          <Image
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/w300${movieData.poster_path}`
                : '/no-image-available.png'
            }
            alt={movieData.title}
            className={styles.poster}
            width={200}
            height={300}
            priority={true}
          />
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.text}>
            <strong>Release Date:</strong> {movieData.release_date}
          </p>
          <p className={styles.text}>
            <strong>Rating:</strong> {movieData.vote_average} 
            <img src="/star.svg" alt="Star" width={20} height={20} />
          </p>
          <p className={styles.text}>
            <strong>Overview:</strong> {movieData.overview}
          </p>
        </div>
      </div>
      {/* Reviews Section */}
      <div className={styles.wrapperReview}>
        <h2 className={styles.text}>Reviews</h2>
        <div className={styles.reviewScroll}>
          {reviewData.length > 0 ? (
            reviewData.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <h3>{review.author}</h3>
                <h4>Rating: {review.author_details?.rating ?? 'No rating'}</h4>
                <p>
                  {review.content.split('\n').map((paragraph, index) => (
                    <React.Fragment key={index}>
                      {paragraph}
                      <br />
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))
          ) : (
            <p className={styles.text}>No reviews found for this movie.</p>
          )}
        </div>
      </div>
    </div>
  );
}
