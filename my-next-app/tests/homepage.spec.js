// Make sure the homepage loads, displays popular movies, and reviews section is visible.

// const { test, expect } = require('@playwright/test');

// test('Homepage should load and display movies and reviews', async ({ page }) => {
//   await page.goto('http://localhost:3000/');

//   // Check homepage title
//   await expect(page).toHaveTitle(/Reel Magic/);

//   // Check if "Popular Movies" section is visible
//   const moviesSection = page.locator('h3:has-text("Popular Movies")');
//   await expect(moviesSection).toBeVisible();

//   // Increase the timeout for the movie poster visibility check
//   const moviePoster = page.locator('img');
//   await expect(moviePoster.first()).toBeVisible({ timeout: 10000 }); // 10 seconds timeout

//   // Check if the reviews section is visible
//   const reviewsSection = page.locator('h3:has-text("Check out the hottest reviews")');
//   await expect(reviewsSection).toBeVisible();
// });
