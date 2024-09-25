
'use client';
import React, { useState , useEffect } from "react";
import movies from '../mock_db/movies.json';
import reviews from '../mock_db/reviews.json';

export default function MoviePage() {
    const [movieId, setMovieId] = useState(null); // Initial movie
    const [movieData, setMovieData] = useState(null);
    // const movie = movies.find((movie) => movie.id === movieId);
    const movieReviews = reviews.filter((review) => review.movie_id === movieId);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4OTM5NTE2MmJjNDA5MzQ2MTMyNmM5NzUyZTBkZjMzZiIsIm5iZiI6MTcyNzI1NjM4Ny41OTcyMzYsInN1YiI6IjY2Y2RkOWM2NmZkMmYwN2FiNzlkYjE3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.n6Dhal1cf-trWSV3ewyYHw9HMouvYGBgv-pqFu3N2B0'
  }
};

useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, options)
    .then(response => response.json())
    .then(data => {
        setMovieData(data);
        console.log(data);
    })
    .catch(err => console.error(err));    
}, [movieId]);


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
            {movieData ? (
                <>
                    <h1>{movieData.original_title}</h1>
                    <p>{movieData.overview}</p>
                    <p>Release Date: {movieData.release_date}</p>
                    <img src={`https://image.tmdb.org/t/p/w200/${movieData.poster_path}`} alt={movieData.title} width="200" />
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
