import './globals.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Reel Magic', // Changed this to match what the test is expecting
  description: 'The home of movie reviews you can trust',
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" className={poppins.className}>
        <body>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
