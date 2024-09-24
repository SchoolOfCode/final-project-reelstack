'use client';

import React from "react";
import { useState } from "react";
import movies from '../data/movies.json';
import reviews from '../data/reviews.json';

export default function MoviePage() {
    const [movieId, setMovieId] = useState(3) // Change this to the desired movie id
    const movie = movies.find((movie) => movie.id === movieId);

    const movieReviews = reviews.filter((review) => review.movie_id === movieId);
    return (
        <div>
            {movie ? (
                <>
                    <h1>{movie.title}</h1>
                    <p>{movie.overview}</p>
                    <p>Release Date: {movie.release_date}</p>
                    <img src={movie.poster_path} alt={movie.title} width="200" />
                </>
            ) : (
                <p>Movie not found</p>
            )}
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review) => (
                    <div key={review.review_id}>
                        <h3>{review.reviewer_name}</h3>
                        <p>{review.review}</p>
                        <p>{review.id}</p>
                    </div>
                ))
            ) : (
                <p>No reviews found</p>
            )}
        </div>
    );
    }



//Choose movie by id
//show movie details
//show movie reviews
//show movie cast