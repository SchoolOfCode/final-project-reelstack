'use client';
import React, { useState, useEffect, useMemo } from 'react';
import styles from './page.module.css';
import reviewsData from './mock_db/reviews.json';
import HeroSection from '@/components/HeroSection/HeroSection';
import Image from 'next/image';
import Link from 'next/link'
import Modal from '../components/Modal/Modal.jsx'

export default function Homepage() {
  
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
    fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
      .then((response) => response.json())
      .then((data) => setMovies(data.results))
      .catch((err) => console.error(err));
  }, [options]);

  const [movies, setMovies] = useState([]);
  const [reviews, setReviews] = useState(reviewsData);
  const [votedReviews, setVotedReviews] = useState(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  const handleReviewClick = (review) => {
    setSelectedReview(review);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };
  
  const upvoteReview = (reviewId, event) => {
    event.stopPropagation();
    if (votedReviews.get(reviewId) === 'upvote') {
      // Remove upvote
      setVotedReviews((prevVotedReviews) => {
        const newVotedReviews = new Map(prevVotedReviews);
        newVotedReviews.delete(reviewId);
        return newVotedReviews;
      });
      setReviews((prevReviews) => {
        return prevReviews.map((review) =>
          review.review_id === reviewId
            ? { ...review, weighting: parseInt(review.weighting) - 1 }
            : review,
        );
      });
    } else {
      // Add upvote
      setVotedReviews((prevVotedReviews) => {
        const newVotedReviews = new Map(prevVotedReviews);
        newVotedReviews.set(reviewId, 'upvote');
        return newVotedReviews;
      });
      setReviews((prevReviews) => {
        return prevReviews.map((review) =>
          review.review_id === reviewId
            ? { ...review, weighting: parseInt(review.weighting) + 1 }
            : review,
        );
      });
    }
  };
  
  const downvoteReview = (reviewId, event) => {
    event.stopPropagation();
    if (votedReviews.get(reviewId) === 'downvote') {
      // Remove downvote
      setVotedReviews((prevVotedReviews) => {
        const newVotedReviews = new Map(prevVotedReviews);
        newVotedReviews.delete(reviewId);
        return newVotedReviews;
      });
      setReviews((prevReviews) => {
        return prevReviews.map((review) =>
          review.review_id === reviewId
            ? { ...review, weighting: parseInt(review.weighting) + 1 }
            : review,
        );
      });
    } else {
      // Add downvote
      setVotedReviews((prevVotedReviews) => {
        const newVotedReviews = new Map(prevVotedReviews);
        newVotedReviews.set(reviewId, 'downvote');
        return newVotedReviews;
      });
      setReviews((prevReviews) => {
        return prevReviews.map((review) =>
          review.review_id === reviewId
            ? { ...review, weighting: parseInt(review.weighting) - 1 }
            : review,
        );
      });
    }
  };

  const sortedReviews = reviews.sort((a, b) => b.weighting - a.weighting);
  
  const renderStars = (rating) => {
    return [...Array(Math.round(rating / 2))].map((_, i) => (
      <StarIcon key={i} className={styles.star} />
    ));
  };
  return (
    <>
      <HeroSection />
      <section className={styles.popularSection}>
        <h3>Popular Movies</h3>
        <div className={styles.carousel}>
        {Array.isArray(movies) &&
            movies.map((movie, index) => (
              <Link key={index} href={`/movies/${movie.id}`} className={styles.movieBox} style={{ textDecoration: 'none', color: '#d7dae3' }}>
                <div className={styles.poster}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                    alt={movie.title}
                    width={184}
                    height={256}
                    priority={index === 0}
                  />
                </div>
                <div className={styles.movieInfo}>
                  <p>{movie.title}</p>
                  <p className={styles.posterStars}>{renderStars(movie.vote_average)}</p>
                </div>
              </Link>
            ))}
        </div>
      </section>
      <hr className={styles.hr}></hr>
      <section className={styles.reviewsSection}>
        <h3>Check out the hottest reviews from the community...</h3>
        <div className={styles.reviewsContainer}>
          {sortedReviews.map((review) => (
            <div key={review.review_id} className={styles.reviewCard} onClick={() => handleReviewClick(review)}>
              <h4 className={styles.reviewerName}>{review.reviewer_name}</h4>
              <h5 className={styles.movieTitle}>{review.movie_name}</h5>
              <div className={styles.starsWrapper}>{renderStars(review.star_rating)}</div>
              <p className={styles.review}>{review.review}</p>
              <div className={styles.voteContainer}>
                <span>
                  {review.weighting > 0 ? review.weighting : 0}{' '}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill={votedReviews.get(review.review_id) === 'upvote' ? '#ff9e00' : '#d7dae3' }
                    onClick={(event) => upvoteReview(review.review_id, event)}
                  >
                    <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
                  </svg>
                </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill={votedReviews.get(review.review_id) === 'downvote' ? '#ff9e00' : '#d7dae3' }
                    onClick={(event) => downvoteReview(review.review_id, event)}
                  >
                    <path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" />
                  </svg>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedReview && (
          <div>
            <h3>{selectedReview.reviewer_name}</h3>
            <h4>{selectedReview.movie_name}</h4>
            <div>{renderStars(selectedReview.star_rating)}</div>
            <p>{selectedReview.review}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
const StarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="18px"
    viewBox="0 -960 960 960"
    width="18px"
    fill="#FF6D00"
  >
    <path d="m305-704 112-145q12-16 28.5-23.5T480-880q18 0 34.5 7.5T543-849l112 145 170 57q26 8 41 29.5t15 47.5q0 12-3.5 24T866-523L756-367l4 164q1 35-23 59t-56 24q-2 0-22-3l-179-50-179 50q-5 2-11 2.5t-11 .5q-32 0-56-24t-23-59l4-165L95-523q-8-11-11.5-23T80-570q0-25 14.5-46.5T135-647l170-57Zm49 69-194 64 124 179-4 191 200-55 200 56-4-192 124-177-194-66-126-165-126 165Zm126 135Z" />
  </svg>
);
