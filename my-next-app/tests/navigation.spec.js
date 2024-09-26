//Ensure users can click on a movie and navigate to the movie's detail page.

// const { test, expect } = require('@playwright/test');

// test('Navigation between homepage and movie detail pages works', async ({ page }) => {
//   await page.goto('http://localhost:3000/');

//   // Click on the first movie poster to navigate to its detail page
//   const movieLink = page.locator('img').first();
//   await movieLink.click();

//   // Verify the movie detail page URL and check if the title is visible
//   await expect(page).toHaveURL(/\/movies\/[0-9]+/);
//   const movieTitle = page.locator('h1');
//   await expect(movieTitle).toBeVisible();
// });
