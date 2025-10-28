'use client';

import React, { useState } from "react";
import { GraduationCap, HeartPulse, ShoppingBag } from "lucide-react";
import Testimonials from "../../components/Testimonials";

const Clients = () => {
  const categories = [
    { name: "Real Estate", icon: GraduationCap },
    { name: "Healthcare", icon: HeartPulse },
    { name: "Education", icon: ShoppingBag },
    { name: "Automobile", icon: ShoppingBag },
    { name: "Mall", icon: ShoppingBag },
    { name: "Food & Beverage", icon: ShoppingBag },
    { name: "Banking", icon: ShoppingBag },
    { name: "Political", icon: ShoppingBag },
    { name: "E-commerce & Retail", icon: ShoppingBag },
    { name: "Information Technology", icon: ShoppingBag },
  ];

  const brands = [
    {
      id: 1,
      name: "Casagrand",
      logo: "/assets/client-page/real estate/Casagrand.webp",
      link: null,
      category: "Real Estate",
    },
    {
      id: 2,
      name: "Dac Developers",
      logo: "/assets/client-page/real estate/Dac Developers.webp",
      link: null,
      category: "Real Estate",
    },
    {
      id: 3,
      name: "Gsquare",
      logo: "/assets/client-page/real estate/Gsquare.webp",
      link: null,
      category: "Real Estate",
    },
    {
      id: 4,
      name: "Hiranandani",
      logo: "/assets/client-page/real estate/hiranandani_.webp",
      link: null,
      category: "Real Estate",
    },
    {
      id: 5,
      name: "Sobha Reality",
      logo: "/assets/client-page/real estate/Sobha Reality.webp",
      link: null,
      category: "Real Estate",
    },
    {
      id: 6,
      name: "Tata Housing",
      logo: "/assets/client-page/real estate/Tata Housing.webp",
      link: null,
      category: "Real Estate",
    },
    {
      id: 7,
      name: "VGN Homes",
      logo: "/assets/client-page/real estate/VGN Homes.webp",
      link: null,
      category: "Real Estate",
    },
    {
      id: 8,
      name: "Apollo",
      logo: "/assets/client-page/health care/Apollo.webp",
      link: null,
      category: "Healthcare",
    },
    {
      id: 9,
      name: "Chennai Liver Foundation",
      logo: "/assets/client-page/health care/Chennai Liver foundation.webp",
      link: null,
      category: "Healthcare",
    },
    {
      id: 10,
      name: "kauvery",
      logo: "/assets/client-page/health care/kauvery_.webp",
      link: null,
      category: "Healthcare",
    },
    {
      id: 11,
      name: "Parvathi",
      logo: "/assets/client-page/health care/Parvathi.webp",
      link: null,
      category: "Healthcare",
    },
    {
      id: 12,
      name: "Radian Dental",
      logo: "/assets/client-page/health care/Radian Dental.webp",
      link: null,
      category: "Healthcare",
    },
    {
      id: 13,
      name: "Mercedez",
      logo: "/assets/client-page/auto/Mercedez.webp",
      link: null,
      category: "Automobile",
    },
    {
      id: 14,
      name: "Volkswagen",
      logo: "/assets/client-page/auto/Volkwagen.webp",
      link: null,
      category: "Automobile",
    },
    {
      id: 15,
      name: "Yamaha",
      logo: "/assets/client-page/auto/Yamaha_Motor.webp",
      link: null,
      category: "Automobile",
    },
    {
      id: 16,
      name: "Grandsquare Mall Velachery",
      logo: "/assets/client-page/mall webp/Grandsquare Mall Velachery.webp",
      link: null,
      category: "Mall",
    },
    {
      id: 17,
      name: "Palladium",
      logo: "/assets/client-page/mall webp/Palladium logo.webp",
      link: null,
      category: "Mall",
    },
    {
      id: 18,
      name: "Phoenix Marketcity",
      logo: "/assets/client-page/mall webp/Phoenix Marketcity logo300 resolution.webp",
      link: null,
      category: "Mall",
    },
    {
      id: 19,
      name: "PVR Grand Mall",
      logo: "/assets/client-page/mall webp/PVR Grand Mall.webp",
      link: null,
      category: "Mall",
    },
    {
      id: 20,
      name: "Skyone Double Tripple",
      logo: "/assets/client-page/mall webp/Skyone Double Tripple.webp",
      link: null,
      category: "Mall",
    },
    {
      id: 21,
      name: "Copper kitchen",
      logo: "/assets/client-page/food/Copper kitchen.webp",
      link: null,
      category: "Food & Beverage",
    },
    {
      id: 22,
      name: "Manoj bhavan",
      logo: "/assets/client-page/food/Manoj bhavan_.webp",
      link: null,
      category: "Food & Beverage",
    },
    {
      id: 23,
      name: "Palmshore",
      logo: "/assets/client-page/food/Palmshore.webp",
      link: null,
      category: "Food & Beverage",
    },
    {
      id: 24,
      name: "Rain tree",
      logo: "/assets/client-page/food/rain tree.webp",
      link: null,
      category: "Food & Beverage",
    },
    {
      id: 25,
      name: "Restrobar",
      logo: "/assets/client-page/food/restobar.webp",
      link: null,
      category: "Food & Beverage",
    },
    {
      id: 26,
      name: "The Belstead",
      logo: "/assets/client-page/food/the-belstead-logo.webp",
      link: null,
      category: "Food & Beverage",
    },
    {
      id: 27,
      name: "SBI Home Loans",
      logo: "/assets/client-page/sbi webp/SBI Home Loas.webp",
      link: null,
      category: "Banking",
    },
    {
      id: 28,
      name: "Chennai Silks",
      logo: "/assets/client-page/ecommerce/Chennai Silks.webp",
      link: null,
      category: "E-commerce & Retail",
    },
  {
      id: 29,
      name: "K Fashions",
      logo: "/assets/client-page/ecommerce/K fashions - Apparel & Retail.webp",
      link: null,
      category: "E-commerce & Retail",
    },
    {
      id: 30,
      name: "Sri Kumaran Thangamaligai",
      logo: "/assets/client-page/ecommerce/Sri Kumaran Thangamaligai.webp",
      link: null,
      category: "E-commerce & Retail",
    },
    {
      id: 31,
      name: "Jayachandran",
      logo: "/assets/client-page/ecommerce/Jayachandran.webp",
      link: null,
      category: "E-commerce & Retail",
    },
    {
      id: 32,
      name: "Buhari",
      logo: "/assets/client-page/food/buhari.webp",
      link: null,
      category: "Food & Beverage",
    },
    {
      id: 33,
      name: "DBS",
      logo: "/assets/client-page/sbi webp/DBS.webp",
      link: null,
      category: "Banking",
    },
    {
      id: 34,
      name: "Chennai institute of technology",
      logo: "/assets/client-page/Education/Chennai Institute of Tech.webp",
      link: null,
      category: "Education",
    },
    {
      id: 35,
      name: "Anna University",
      logo: "/assets/client-page/Education/ANNAUNIVERSITYLOGO.webp",
      link: null,
      category: "Education",
    },
    {
      id: 36,
      name: "Sairam",
      logo: "/assets/client-page/Education/Sairam.webp",
      link: null,
      category: "Education",
    },
    {
      id: 37,
      name: "Vels University",
      logo: "/assets/client-page/Education/vels_.webp",
      link: null,
      category: "Education",
    },
    {
      id: 38,
      name: "DMK",
      logo: "/assets/client-page/Political/DMK.webp",
      link: null,
      category: "Political",
    },
    {
      id: 39,
      name: "Makkal Needhi Maiam",
      logo: "/assets/client-page/Political/Makkal Needhi Maiam.webp",
      link: null,
      category: "Political",
    },
    {
      id: 40,
      name: "L&T Reality",
      logo: "/assets/client-page/IT/L&T Reality.webp",
      link: null,
      category: "Information Technology",
    },
    {
      id: 41,
      name: "Zappy works",
      logo: "/assets/client-page/IT/Zappy works.webp",
      link: null,
      category: "Information Technology",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("Real Estate");

  const filteredBrands = brands.filter(
    (brand) => brand.category === activeCategory
  );

  return (
    <div>
      {/* Flip effect styles */}
      <style>{`
        .perspective {
          perspective: 1000px;
        }
        .flip-card {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .group:hover .flip-card {
          transform: rotateY(180deg);
        }
        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          top: 0;
          left: 0;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative h-[300px] bg-blue-600 flex items-center justify-center mt-20">
        <div className="absolute inset-0 bg-blue-800/60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Our Clients
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80">
            Trusted by businesses worldwide
          </p>
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-6 gap-10">
        {/* Left Column (Enhanced Categories) */}
        <div className="md:col-span-2 backdrop-blur-md p-6">
          <h3 className="text-2xl font-bold mb-6 text-blue-700">
            Our Clients
          </h3>
          <ul className="space-y-4">
            {categories.map(({ name, icon: Icon }) => (
              <li key={name}>
                <button
                  onClick={() => setActiveCategory(name)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition font-medium ${
                    activeCategory === name
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon
                    size={18}
                    className={`${
                      activeCategory === name ? "text-white" : "text-gray-500"
                    }`}
                  />
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column (Client Grid) */}
        <div className="md:col-span-4">
  <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))]">
    {filteredBrands.map(({ id, logo, name, link }) => (
      <div
        key={id}
        className={`relative w-full max-w-xs ${link ? "group perspective cursor-pointer" : ""} min-h-36 flex items-stretch`}
      >
        {link ? (
          <div className="flip-card h-full">
            <div className="flip-card-front flex items-center justify-center bg-white p-2 h-full">
              <img
                src={logo}
                alt={name}
                className="max-h-20 object-contain w-full"
              />
            </div>
            <a
              href={link}
              className="flip-card-back flex items-center justify-center bg-blue-600 text-white font-semibold text-lg rounded-xl shadow h-full"
            >
              View Case Study
            </a>
          </div>
        ) : (
          <div className="flex items-center justify-center bg-white p-2 h-full w-full">
            <img
              src={logo}
              alt={name}
              className="max-h-20 object-contain w-full"
            />
          </div>
        )}
      </div>
    ))}
  </div>
</div>

      </div>

      <section>
        <Testimonials />
      </section>
    </div>
  );
};

export default Clients;
