import './globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Signa Trademark App',
  description: 'Technical Test for SignaIP',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Toaster will handle all notifications */}
        <Toaster position="top-right" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}