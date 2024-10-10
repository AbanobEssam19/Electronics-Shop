import localFont from "next/font/local";
import "./globals.css";
import Nav from "./components/Nav/nav";
import Footer from "./components/Footer/footer";
import 'bootstrap/dist/css/bootstrap.min.css';

import ClientProvider from "./clientProvider";
import Modal from "./components/Modal/modal";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "AB Electronics",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ClientProvider>
            <Nav />
            {children}
            <Footer />
            <Modal />
        </ClientProvider>
      </body>
    </html>
  );
}
