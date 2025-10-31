'use client';

import { useRef, useState, useEffect } from "react";

const achievementsData = [
  {
    img: "/assets/home-page/vasanth-srk.webp",
    title: "Notable Connection",
    description: "Wonderful interaction with Member of Parliament Vijay Vasanth.",
  },
  {
    img: "/assets/home-page/a2.webp",
    title: "FilmFlair",
    description: "Fully Filmy’s Anand Srinivasan Adds a Sweet Twist.",
  },
  {
    img: "/assets/home-page/a3.webp",
    title: "Wellness Impact",
    description: "Sweet Talk of Wellness with Dr.Arjun Vaidya.",
  },
  {
    img: "/assets/home-page/a4.webp",
    title: "Leadership Connect",
    description: "A great meeting with DMK IT Wing, Deputy Secretary Karhik Mohan.",
  },
  {
    img: "/assets/home-page/a5.webp",
    title: "Creative Excellence",
    description: "Proud moment winning three Maddy’s Awards in 2022.",
  },
  {
    img: "/assets/home-page/a6.webp",
    title: "Influencer Connect",
    description: "A great meeting with famous YouTuber and influencer Irfan.",
  },
  {
    img: "/assets/home-page/a7.webp",
    title: "Strategic Partnership",
    description: "Teaming up with DAC Developers founder Sathish Kumar Santhanam.",
  },
  {
    img: "/assets/home-page/a8.webp",
    title: "Leadership Milestone",
    description: "Proud recipient of the 2019 Business Leaders Award.",
  },
];

const FADE_DURATION = 300; // ms
const DISPLAY_DURATION = 3000; // ms

export default function Achievements() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [paused, setPaused] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [cardsPerView, setCardsPerView] = useState(4); // responsive control
  const timerRef = useRef(null);

  // 🔹 Detect screen size and adjust cards per view
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) {
        setCardsPerView(1); // mobile
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2); // tablet
      } else {
        setCardsPerView(4); // desktop
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Fade loop for auto-play
  useEffect(() => {
    if (paused) return;

    function fadeLoop() {
      timerRef.current = window.setTimeout(() => {
        setFade(false);
        setTimeout(() => {
          setIndex((prev) => (prev + cardsPerView) % achievementsData.length);
          setFade(true);
          fadeLoop();
        }, FADE_DURATION);
      }, DISPLAY_DURATION);
    }
    fadeLoop();

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [index, paused, cardsPerView]);

  // 🔹 Get current group of slides
  const currentSlides = [];
  for (let i = 0; i < cardsPerView; i++) {
    currentSlides.push(achievementsData[(index + i) % achievementsData.length]);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <h3 className="text-3xl font-bold mb-4">Our Recognitions</h3>
        <span className="block h-[3px] bg-yellow-400 w-40 mx-auto animate-shrinkExpand"></span>
        <p className="text-gray-700 font-medium mt-2 mb-8">
        Honoured by industry leaders for outstanding digital excellence and innovation.
        </p>
      </div>

      <div className="overflow-hidden py-8">
        <div
          className={`flex transition-opacity duration-1000 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          style={{ willChange: "opacity, transform" }}
        >
          {currentSlides.map((item, idx) => (
            <div
              key={idx}
              className={`bg-white overflow-hidden flex flex-col mx-2 
                w-full sm:max-w-xs md:max-w-sm lg:max-w-md 
                transform transition-all duration-300
                ${
                  hoveredCard === idx
                    ? "scale-105 z-10"
                    : hoveredCard !== null
                    ? ""
                    : ""
                }`}
              onMouseEnter={() => {
                setPaused(true);
                setHoveredCard(idx);
                clearTimeout(timerRef.current);
              }}
              onMouseLeave={() => {
                setPaused(false);
                setHoveredCard(null);
              }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-110 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
