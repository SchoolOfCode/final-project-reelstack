import Image from 'next/image';


'use client';
import React, { useState } from "react";
import movies from '../mock_db/movies.json';
import reviews from '../mock_db/reviews.json';
export default function MoviePage() {
    const [movieId, setMovieId] = useState(null); // Initial movie
    const movie = movies.find((movie) => movie.id === movieId);
    const movieReviews = reviews.filter((review) => review.movie_id === movieId);
    return (
        <div>
            {/* Movie Selector */}
            <div>
                <label>Select a movie: </label>
                <select value={movieId} onChange={(e) => setMovieId(Number(e.target.value))}>
                    {movies.map((movie) => (
                        <option key={movie.id} value={movie.id}>
                            {movie.title}
                        </option>
                    ))}
                </select>
            </div>
            {movie ? (
                <>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <p>Release Date: {movie.release_date}</p>
                    <Image src={movie.poster_path} alt={movie.title} width="200" />
                </>
            ) : (
                <p>Movie not found</p>
            )}
            <h2>Reviews</h2>
            {movieReviews.length > 0 ? (
                movieReviews.map((review) => (
                    <div key={review.review_id}>
                        <h3>{review.reviewer_name}</h3>
                        <p>{review.review}</p>
                    </div>
                ))
            ) : (
                <p>No reviews found for this movie</p>
            )}
        </div>
    );
}
