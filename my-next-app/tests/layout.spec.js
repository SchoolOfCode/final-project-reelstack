// Ensure that the layout components (Header, Footer) are correctly rendered across different pages.

// const { test, expect } = require('@playwright/test');

// test('Header and footer are visible on all pages', async ({ page }) => {
//   await page.goto('http://localhost:3000/');

//   // Check if the header is visible
//   const header = page.locator('header');
//   await expect(header).toBeVisible();

//   // Check if the footer is visible
//   const footer = page.locator('footer');
//   await expect(footer).toBeVisible();

//   // Navigate to a movie detail page and check again
//   const movieLink = page.locator('img').first();
//   await movieLink.click();
//   await expect(header).toBeVisible();
//   await expect(footer).toBeVisible();
// });
