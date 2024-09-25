'use client';
import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
// import movies from '../mock_db/movies.json';
// import reviews from '../mock_db/reviews.json';
export default function MoviePage() {
  const [movieId, setMovieId] = useState(null); // Initial movie
  const [movieData, setMovieData] = useState(null);
  const [reviewData, setReviewData] = useState(null);
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTM5NTE2MmJjNDA5MzQ2MTMyNmM5NzUyZTBkZjMzZiIsIm5iZiI6MTcyNzI1NjM4Ny41OTcyMzYsInN1YiI6IjY2Y2RkOWM2NmZkMmYwN2FiNzlkYjE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n6Dhal1cf-trWSV3ewyYHw9HMouvYGBgv-pqFu3N2B0',
    },
  };
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        //console.log(data);
      })
      .catch((err) => console.error(err));
  }, [movieId]);
  const reviews = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTM5NTE2MmJjNDA5MzQ2MTMyNmM5NzUyZTBkZjMzZiIsIm5iZiI6MTcyNzI1NjM4Ny41OTcyMzYsInN1YiI6IjY2Y2RkOWM2NmZkMmYwN2FiNzlkYjE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n6Dhal1cf-trWSV3ewyYHw9HMouvYGBgv-pqFu3N2B0',
    },
  };
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews`, reviews)
      .then((response) => response.json())
      .then((data) => {
        setReviewData(data);
        //console.log(data);
      })
      .catch((err) => console.error(err));
  }, [movieId]);
  return (
    <div className={styles.wrapper}>
      {/* Movie Selector */}
      <div>
        <label>Select a movie: </label>
        <input type="text" value={movieId} onChange={(e) => setMovieId(Number(e.target.value))} />
      </div>
      {movieData ? (
        <div className={styles.text}>
          <img
            src={`https://image.tmdb.org/t/p/w200/${movieData.poster_path}`}
            alt={movieData.title}
            width="200"
          />
          <h1>{movieData.original_title}</h1>
          <p>{movieData.overview}</p>
          <p>Release Date: {movieData.release_date}</p>
        </div>
      ) : (
        <p>Movie not found</p>
      )}
      <div className={styles.wrapperReview}>
        <h2 className={styles.text}>Reviews</h2>
        <div className={styles.reviewScroll}>
          {reviewData && reviewData.results && reviewData.results.length > 0 ? (
            reviewData.results.map((review) => (
              <div className={styles.reviewCard} key={review.id}>
                <h3>{review.author}</h3>
                <h3>Rating: {review.author_details?.rating ?? 'No rating'}</h3>
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
            <p className={styles.text}>No reviews found for this movie</p>
          )}
        </div>
      </div>
    </div>
  );
}
