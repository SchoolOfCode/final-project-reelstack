// Check if individual movie detail pages display the correct information (e.g., title, release date, rating, and poster).

// const { test, expect } = require('@playwright/test');

// test('Movie detail page should load and display the movie data', async ({ page }) => {
//   await page.goto('http://localhost:3000/movies/2'); // Replace "2" with an actual movie ID

//   const movieTitle = page.locator('h1');
//   await expect(movieTitle).toHaveText('My Spy'); // Replace 'My Spy' with an actual movie title

//   const moviePoster = page.locator('img');
//   await expect(moviePoster).toBeVisible();

//   const releaseDate = page.locator('p', { hasText: 'Release Date:' });
//   await expect(releaseDate).toBeVisible();

//   const movieRating = page.locator('p', { hasText: 'Rating:' });
//   await expect(movieRating).toBeVisible();
// });
