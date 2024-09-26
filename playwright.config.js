// // playwright.config.js
// import { defineConfig } from '@playwright/test';
// import dotenv from 'dotenv';

// // Load environment variables from a .env file
// dotenv.config();

// export default defineConfig({
//   testDir: './tests',
//   timeout: 30000,
//   retries: 1,
//   use: {
//     headless: true,
//     baseURL: 'http://localhost:3000',
//     screenshot: 'only-on-failure',
//     video: 'retain-on-failure',
//     env: {
//       NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
//     },
//   },
//   webServer: {
//     command: 'npm run dev',
//     port: 3000,
//     timeout: 120 * 1000,
//   },
// });
