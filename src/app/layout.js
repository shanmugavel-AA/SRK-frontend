import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop"
import StickyCtaForm from "../components/StickyCtaForm"
import FormPopup from "../components/FormPopup";
import { Poppins  } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>

      </head>
      <body className={poppins.className}>
        <Header />
        <FormPopup/>
        {children}
        <Analytics />
        <Footer />
        <ScrollToTop/>
        <StickyCtaForm/>
        
      </body>
    </html>
  );
}
