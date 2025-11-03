"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const clients = [
  "/assets/About-page/auto/Mercedez.webp",
  "/assets/About-page/ecommerce/Chennai Silks.webp",
  "/assets/About-page/food/Palmshore.webp",
  "/assets/About-page/real estate/VGN Homes.webp",
  "/assets/About-page/health care/kauvery_.webp",
  "/assets/About-page/mall webp/Palladium logo.webp",
  "/assets/About-page/real estate/hiranandani_.webp",
  "/assets/About-page/mall webp/Phoenix Marketcity logo300 resolution.webp",
  "/assets/About-page/auto/Volkwagen.webp",
  "/assets/client-page/real estate/VGN Homes.webp",
  "/assets/About-page/real estate/Dac Developers.webp",
  "/assets/About-page/auto/Yamaha_Motor.webp",
  "/assets/About-page/ecommerce/K fashions - Apparel & Retail.webp",
  "/assets/About-page/ecommerce/Sri Kumaran Thangamaligai.webp",
  "/assets/About-page/food/the-belstead-logo.webp",
  "/assets/About-page/health care/kauvery_.webp",
  "/assets/About-page/real estate/Casagrand.webp",
  "/assets/About-page/mall webp/PVR Grand Mall.webp",
];

// Desktop positions
const desktopPositions = [
  { top: "5%", left: "50%", translate: "-50%, 0" },         // Top center
  { top: "10%", left: "20%", translate: "-50%, -50%" },     // Top left
  { top: "10%", right: "20%", translate: "50%, -50%" },     // Top right
  { top: "25%", left: "5%", translate: "-50%, -50%" },     // Upper far left
  { top: "25%", right: "10%", translate: "50%, -50%" },     // Upper far right
  { top: "35%", left: "30%", translate: "-50%, -50%" },     // Mid-left
  { top: "35%", right: "30%", translate: "50%, -50%" },     // Mid-right
  { top: "50%", left: "8%", translate: "-50%, -50%" },      // Middle-left edge
  { top: "50%", right: "8%", translate: "50%, -50%" },      // Middle-right edge
  { bottom: "15%", left: "5%", translate: "-50%, 50%" },   // Lower left
  { bottom: "25%", right: "5%", translate: "50%, 50%" },   // Lower right
  { bottom: "15%", left: "30%", translate: "-50%, 50%" },   // Bottom mid-left
  { bottom: "15%", right: "30%", translate: "50%, 50%" },   // Bottom mid-right
  { bottom: "5%", left: "50%", translate: "-50%, 50%" },    // Bottom center
  { top: "60%", left: "20%", translate: "-50%, -50%" },     // Mid-lower left
  { top: "60%", right: "20%", translate: "50%, -50%" },     // Mid-lower right
  { top: "18%", left: "35%", translate: "-50%, -50%" },     // Between top & mid-left
  { top: "18%", right: "35%", translate: "50%, -50%" },     // Between top & mid-right
];


// Mobile positions
const mobilePositions = [
  { top: "5%", left: "50%", translate: "-50%, 0" },
  { top: "15%", left: "20%", translate: "-50%, -50%" },
  { top: "25%", right: "20%", translate: "50%, -50%" },
  { top: "38%", left: "10%", translate: "-50%, -50%" },
  { top: "38%", right: "10%", translate: "50%, -50%" },
  { bottom: "28%", left: "20%", translate: "-50%, 50%" },
  { bottom: "28%", right: "20%", translate: "50%, 50%" },
  { bottom: "15%", left: "50%", translate: "-50%, 50%" },
  { bottom: "5%", left: "30%", translate: "-50%, 50%" },
  { bottom: "5%", right: "30%", translate: "50%, 50%" },
];

export default function ClientHeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size on mount
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayClients = isMobile ? clients.slice(0, 10) : clients;
  const positions = isMobile ? mobilePositions : desktopPositions;

  return (
    <section className="relative flex items-center mt-14 justify-center min-h-[90vh] bg-white overflow-hidden">
      {/* Center text */}
      <motion.h2
        className="text-3xl md:text-5xl font-extrabold text-gray-900 text-center z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        Trusted by Leading Brands
      </motion.h2>

      {/* Static positioned, softly moving logos */}
      {displayClients.map((logo, index) => {
        const pos = positions[index % positions.length];
        return (
          <motion.img
            key={index}
            src={logo}
            alt={`Client logo ${index + 1}`}
            className="absolute w-[128px] h-[80px] object-contain"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              transform: `translate(${pos.translate})`,
              willChange: "transform",
            }}
            animate={{ y: [0, -10, 12, 0] }}
            transition={{
              duration: 6 + index * 0.3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
        );
      })}
    </section>
  );
}
