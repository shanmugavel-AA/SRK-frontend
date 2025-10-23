import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop"
import StickyCtaForm from "../components/StickyCtaForm"


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>

      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollToTop/>
        <StickyCtaForm/>
      </body>
    </html>
  );
}
