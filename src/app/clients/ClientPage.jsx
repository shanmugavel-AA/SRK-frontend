"use client";

import React, { useState } from "react";
import { Building2 , HeartPulse, ShoppingBag , BookOpenText , Car , ChefHat , Landmark , LibraryBig ,ShoppingCart , Cpu } from "lucide-react";
import Testimonials from "../../components/Testimonials";
import { motion , AnimatePresence} from "framer-motion";
import Image from "next/image";

const Clients = () => {
  const categories = [
    { name: "Real Estate", icon: Building2 },
    { name: "Healthcare", icon: HeartPulse },
    { name: "Education", icon: BookOpenText },
    { name: "Automobile", icon: Car },
    { name: "Mall", icon: ShoppingBag },
    { name: "Food & Beverage", icon: ChefHat },
    { name: "Banking", icon: Landmark },
    { name: "Political", icon: LibraryBig },
    { name: "E-commerce & Retail", icon: ShoppingCart },
    { name: "Information Technology", icon: Cpu },
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

  const handleCategoryClick = (name) =>{
    setActiveCategory((prev) => (prev === name ? null : name));
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1, duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <section className="relative h-[200px] bg-blue-600 flex items-center justify-center mt-20">
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
      <section className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Our Esteemed Clients
      </h2>

      <div className="space-y-6">
        {categories.map(({ name, icon: Icon }) => {
          const filteredBrands = brands.filter((b) => b.category === name);
          const isActive = activeCategory === name;

          return (
            <div key={name} className="border-b border-gray-200 pb-4">
              {/* Category Header */}
              <button
                onClick={() => handleCategoryClick(name)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-lg">{name}</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {isActive ? "−" : "+"}
                </span>
              </button>

              {/* Logos Section (Animated) */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mt-6 px-4">
                      {filteredBrands.map((brand) => (
                        <motion.div
                          key={brand.id}
                          whileHover={{ scale: 1.05 }}
                          className="flex flex-col items-center"
                        >
                          <div className="w-28 h-20 relative">
                            <Image
                              src={brand.logo}
                              alt={brand.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <p className="text-sm text-gray-600 mt-2 text-center">
                            {brand.name}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>

      <section>
        <Testimonials />
      </section>
    </div>
  );
};

export default Clients;
