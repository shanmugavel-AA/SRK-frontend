"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [brandsDropdownOpen, setBrandsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => pathname === path;

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, transition: { duration: 0.2 } },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1, when: "beforeChildren" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, color: "#050505ff" },
  };

  return (
    <motion.header
      key="header"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ease-in-out ${
        scrolled ? "bg-white shadow-sm" : "bg-transparent"
      } text-gray-900`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Left Logo */}
        <Link
          href="/"
          className={`${
            isActive("/") ? "text-blue-600 font-bold" : "text-black hover:text-blue-600 mr-8"
          }`}
        >
          <img
            src="/assets/SRK-logo.png"
            alt="SRK Logo"
            className="h-16 w-auto object-contain cursor-pointer"
            draggable={false}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-lg text-gray-900">
          <Link
            href="/"
            className={`${isActive("/") ? "text-blue-600 font-bold" : "text-black hover:text-blue-600 mr-8"}`}
          >
            Home
          </Link>

          {/* About Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              href="/about-us"
              className={`${isActive("/about-us") ? "text-blue-600 font-bold" : "text-black hover:text-blue-600"}`}
            >
              About
            </Link>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  className="absolute left-0 mt-2 w-40 bg-white rounded shadow-lg origin-top"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                >
                  <motion.ul className="flex flex-col text-sm p-2 space-y-2 text-gray-900">
                    <motion.li variants={itemVariants} whileHover="hover" className="cursor-pointer p-2 rounded">
                      <Link href="/about-us" className={`${isActive("/about-us") ? "text-blue-600 font-bold" : "text-black hover:text-blue-600"}`}>
                        Who I Am
                      </Link>
                    </motion.li>
                    <motion.li variants={itemVariants} whileHover="hover" className="cursor-pointer p-2 rounded">
                      <Link href="/clients" className={`${isActive("/clients","/about-us") ? "text-blue-600 font-bold" : "text-black hover:text-blue-600"}`}>
                        Clients
                      </Link>
                    </motion.li>
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/consult"
            className={`${isActive("/consult") ? "text-blue-600 font-bold" : "text-black hover:text-blue-600 mr-8"}`}
          >
            Consult Sharath
          </Link>

          {/* Brands Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setBrandsDropdownOpen(true)}
            onMouseLeave={() => setBrandsDropdownOpen(false)}
          >
            <span className="cursor-pointer text-black hover:text-blue-600 transition-colors select-none">
              Brands
            </span>

            <AnimatePresence>
              {brandsDropdownOpen && (
                <motion.div
                  className="absolute left-0 mt-2 w-48 bg-white rounded shadow-lg origin-top"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={dropdownVariants}
                >
                  <motion.ul className="flex flex-col text-sm p-2 space-y-2 text-gray-900">
                    {[
                      ["https://webboombaa.org", "Webboombaa"],
                      ["https://www.brandandmediaworks.com/", "Brand and Media Works"],
                      ["https://www.greatindiansweets.com/", "Great Indian Sweets"],
                      ["https://greatindianbeverages.com/", "Great Indian Beverages"],
                    ].map(([url, label]) => (
                      <motion.li key={label} variants={itemVariants} whileHover="hover" className="cursor-pointer p-2 rounded">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="block hover:text-blue-600">
                          {label}
                        </a>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/blogs"
            className={`${isActive("/blogs") ? "text-blue-600 font-bold" : "text-black hover:text-blue-600"}`}
          >
            Blogs
          </Link>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-blue-600 focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          )}
        </button>

        {/* Right Contact Button */}
        <div className="hidden md:block">
          <button
            onClick={() => router.push("/contact")}
            className="bg text-black px-4 py-2 rounded-lg font-semibold"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 space-y-4 text-black">
              <li>
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block text-blue-600 hover:text-yellow-600">
                  Home
                </Link>
              </li>

              {/* About dropdown mobile */}
              <li>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex justify-between items-center text-blue-600 hover:text-yellow-600 font-semibold focus:outline-none"
                >
                  About
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      dropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-4 mt-2 flex flex-col space-y-2 text-sm"
                    >
                      <li>
                        <Link href="/about-us" onClick={() => setMobileMenuOpen(false)} className="block hover:text-yellow-600">
                          Who I Am
                        </Link>
                      </li>
                      <li>
                        <Link href="/clients" onClick={() => setMobileMenuOpen(false)} className="block hover:text-yellow-600">
                          Clients
                        </Link>
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              {/* Brands dropdown mobile */}
              <li>
                <button
                  onClick={() => setBrandsDropdownOpen(!brandsDropdownOpen)}
                  className="w-full flex justify-between items-center text-blue-600 hover:text-yellow-600 font-semibold focus:outline-none"
                >
                  Brands
                  <svg
                    className={`w-5 h-5 transform transition-transform duration-300 ${
                      brandsDropdownOpen ? "rotate-180" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <AnimatePresence>
                  {brandsDropdownOpen && (
                    <motion.ul
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pl-4 mt-2 flex flex-col space-y-2 text-sm"
                    >
                      {[
                        ["https://webboombaa.org", "Webboombaa"],
                        ["https://www.brandandmediaworks.com/", "Brand and Media Works"],
                        ["https://www.greatindiansweets.com/", "Great Indian Sweets"],
                        ["https://greatindianbeverages.com/", "Great Indian Beverages"],
                      ].map(([url, label]) => (
                        <li key={label}>
                          <a href={url} target="_blank" rel="noopener noreferrer" className="block hover:text-yellow-600">
                            {label}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <Link href="/consult" onClick={() => setMobileMenuOpen(false)} className="block text-blue-600 hover:text-yellow-600">
                  Consult Sharath
                </Link>
              </li>

              <li>
                <Link href="/blogs" onClick={() => setMobileMenuOpen(false)} className="block text-blue-600 hover:text-yellow-600">
                  Blogs
                </Link>
              </li>

              <li>
                <button
                  onClick={() => {
                    router.push("/contact");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full btn-cta-yellow text-black px-4 py-2 rounded font-semibold"
                >
                  Contact
                </button>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
