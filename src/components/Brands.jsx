'use client';

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const cardVariants = {
  hidden: { opacity: 0, x: 80 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { type: "spring", delay: i * 0.2 }
  })
};

const OurBrands = () => {
  return (
    <section className="max-w-6xl mx-auto py-0 md:py-6 px-6">
      <h2 className="text-3xl font-bold text-center">Our Brands</h2>
      <span className="block h-[2px] bg-yellow-400 w-6 mx-auto animate-shrinkExpand"></span>
      <div className="text-gray-600 font-medium mx-auto text-center mt-2 mb-8">Crafting experiences through a portfolio of brands that inspire, engage and deliver meaningful results.</div>
      <div className="grid grid-cols-2 mt-6 md:grid-cols-4 gap-8 items-center">
        
        <Link href="https://webboombaa.org" target="_blank" className="no-underline-effect" passHref>
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          className="bg-blue-800 bg-opacity-20 backdrop-blur-md shadow-lg rounded-xl flex items-center justify-center h-40 transition-transform transform hover:scale-105 border border-gray-200 dark:border-gray-600"
        >
          <img
            src="https://www.webboombaa.org/wp-content/uploads/2025/03/WBB-Logo-for-Animation-White-2.gif"
            alt="Brand 1"
            className="h-16 md:h-24 object-contain"
            loading="lazy"
          />
        </motion.div>
        </Link>
        <Link href="https://www.greatindiansweets.com/" className="no-underline-effect" target="_blank" passHref>
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          className="bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-xl flex items-center justify-center h-40 transition-transform transform hover:scale-105 border border-gray-200 dark:border-gray-600"
        >
          <img
            src="https://www.greatindiansweets.com/wp-content/uploads/2024/06/Main-Logo-Orange.png"
            alt="Brand 2"
            className="h-16 md:h-24 object-contain"
            loading="lazy"
          />
        </motion.div>
        </Link>
        <Link href="https://greatindianbeverages.com/" className="no-underline-effect" target="_blank" passHref>
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          className="bg-black bg-opacity-20 backdrop-blur-md shadow-lg rounded-xl flex items-center justify-center h-40 transition-transform transform hover:scale-105 border border-gray-200 dark:border-gray-600"
        >
          <img
            src="https://greatindianbeverages.com/wp-content/uploads/2023/03/gib-logo.png"
            alt="Brand 3"
            className="h-16 md:h-24 object-contain"
            loading="lazy"
          />
        </motion.div>
        </Link>
        <Link href="https://www.brandandmediaworks.com/" className="no-underline-effect" target="_blank" passHref>
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={cardVariants}
          className="bg-opacity-20 backdrop-blur-md shadow-lg rounded-xl flex items-center justify-center h-40 transition-transform transform hover:scale-105 border border-gray-200 dark:border-gray-600"
        >
          <Image
            src="/assets/home-page/BMW.webp"
            alt="Brand 4"
            fill
            className="h-12 md:h-12 object-contain rounded-xl"
            loading="lazy"
          />
        </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default OurBrands;
