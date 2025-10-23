'use client';

import React, { useState } from "react";
import { GraduationCap, HeartPulse, ShoppingBag } from "lucide-react";
import Testimonials from "../../components/Testimonials";

const Clients = () => {
  const categories = [
    { name: "Educational", icon: GraduationCap },
    { name: "Healthcare", icon: HeartPulse },
    { name: "Retail", icon: ShoppingBag },
  ];

  const brands = [
    {
      id: 1,
      name: "Brand 1",
      logo: "https://www.webboombaa.org/wp-content/uploads/2025/09/LVB.png",
      link: "/case-study/1",
      category: "Educational",
    },
    {
      id: 2,
      name: "Brand 2",
      logo: "https://www.webboombaa.org/wp-content/uploads/2025/09/LVB.png",
      link: null,
      category: "Healthcare",
    },
    {
      id: 3,
      name: "Brand 3",
      logo: "https://www.webboombaa.org/wp-content/uploads/2025/09/LVB.png",
      link: "/case-study/3",
      category: "Retail",
    },
    {
      id: 4,
      name: "Brand 4",
      logo: "https://www.webboombaa.org/wp-content/uploads/2025/09/LVB.png",
      link: null,
      category: "Educational",
    },
    {
      id: 5,
      name: "Brand 3",
      logo: "https://www.webboombaa.org/wp-content/uploads/2025/09/LVB.png",
      link: "/case-study/3",
      category: "Educational",
    },
    {
      id: 6,
      name: "Brand 3",
      logo: "https://www.webboombaa.org/wp-content/uploads/2025/09/LVB.png",
      link: "/case-study/3",
      category: "Retail",
    },
    {
      id: 7,
      name: "Brand 3",
      logo: "https://www.webboombaa.org/wp-content/uploads/2025/09/LVB.png",
      link: "/case-study/3",
      category: "Retail",
    },
    {
      id: 8,
      name: "Brand 3",
      logo: "https://www.webboombaa.org/wp-content/uploads/2025/09/LVB.png",
      link: "/case-study/3",
      category: "Retail",
    },
    {
      id: 9,
      name: "Brand 3",
      logo: "https://www.webboombaa.org/wp-content/uploads/2025/09/LVB.png",
      link: "/case-study/3",
      category: "Retail",
    },
    {
      id: 10,
      name: "Brand 3",
      logo: "https://www.webboombaa.org/wp-content/uploads/2025/09/LVB.png",
      link: "/case-study/3",
      category: "Retail",
    },
    {
      id: 11,
      name: "Brand 3",
      logo: "https://www.webboombaa.org/wp-content/uploads/2025/09/LVB.png",
      link: "/case-study/3",
      category: "Retail",
    },
    {
      id: 12,
      name: "Brand 3",
      logo: "https://www.webboombaa.org/wp-content/uploads/2025/09/LVB.png",
      link: "/case-study/3",
      category: "Retail",
    },
  ];

  const [activeCategory, setActiveCategory] = useState("Educational");

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
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Left Column (Enhanced Categories) */}
        <div className="md:col-span-1 backdrop-blur-md p-6">
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
