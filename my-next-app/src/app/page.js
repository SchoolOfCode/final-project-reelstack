'use client';

import React from 'react';
import { useState, useEffect } from 'react'
import styles from './page.module.css';
import reviews from './mock_db/reviews.json';
import moviesjson from './mock_db/movies.json';

export default function Homepage() {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTM5NTE2MmJjNDA5MzQ2MTMyNmM5NzUyZTBkZjMzZiIsIm5iZiI6MTcyNzI1NjM4Ny41OTcyMzYsInN1YiI6IjY2Y2RkOWM2NmZkMmYwN2FiNzlkYjE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n6Dhal1cf-trWSV3ewyYHw9HMouvYGBgv-pqFu3N2B0'
    }
  };
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => setMovies(data.results))
        .catch(err => console.error(err));
    }, []);

  return (
    <>
      <hr className={styles.hr}></hr>
      <section className={styles.heroSection}>
        <h1>Welcome to Reel Magic, the home of movie reviews you can trust.</h1>
        <h2>Join the Reel Revolution!</h2>
      </section>
      <hr className={styles.hr}></hr>

      <section>
        <h3>Popular Movies</h3>
        <div className={styles.carousel}>
          {Array.isArray(movies) && movies.map((movie, movie_id) => {
            return (
              <div key={movie_id} className={styles.movieBox}>
                <div className={styles.poster}>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                </div>
                <div className={styles.movieInfo}>
                  <p>{movie.title}</p>
            <p>{'⭐️'.repeat(movie.rating)}</p>
          </div>
        </div>
             );
          })}

        </div>
      </section>
      <hr className={styles.hr}></hr>
      <section className={styles.reviewsSection}>
      <h3>Check out the hottest reviews from the community...</h3>
        <div className={styles.reviewsContainer}>
          {reviews.map((review, review_id) => {
            return (
              <div key={review_id} className={styles.reviewCard}>
                <h4 className={styles.reviewerName}>{review.reviewer_name}</h4>
                {moviesjson.map((movie, movie_id) => {
                  return movie.id === review.movie_id && <h5 className={styles.movieTitle} key={movie_id}>{movie.title}</h5>;
                })}
                <div className={styles.starsWrapper}>
                {[...Array(review.star_rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
                </div>
                <p>
                  {review.review}
                </p>
                <div className={styles.voteContainer}>
                  <span>
                    {review.weighting > 0 ? review.weighting : 0}{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#d7dae3"
                    >
                      <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
                    </svg>
                  </span>
                  <span>
                    {review.weighting < 0 ? Math.abs(review.weighting) : 0}{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#d7dae3"
                    >
                      <path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" />
                    </svg>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
