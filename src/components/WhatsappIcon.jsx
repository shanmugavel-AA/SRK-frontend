'use client';

import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappIcon() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {visible && (
        <button
          onClick={() =>
            window.open(
              "https://wa.me/919884986088?text=Hi!%20I%20have%20a%20query.",
              "_blank"
            )
          }
          aria-label="Chat on WhatsApp"
          className="fixed bottom-6 left-6 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-transform hover:scale-110 z-50 cursor-pointer"
        >
          <FaWhatsapp className="text-2xl" />
        </button>
      )}
    </>
  );
}
