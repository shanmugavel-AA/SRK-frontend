"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const testimonials = [
  {
    id: 1,
    img: "/assets/consult-sharath/testimonials/ankit.webp",
    youtube: "https://www.youtube.com/embed/7AwF7P2gOKU",
  },
  {
    id: 2,
    img: "/assets/consult-sharath/testimonials/Arpitsinghal.webp",
    youtube: "https://www.youtube.com/embed/a8auY3N0pUE",
  },
  {
    id: 3,
    img: "/assets/consult-sharath/testimonials/Sidharath.webp",
    youtube: "https://www.youtube.com/embed/CtNwUZ3iVUQ",
  },
  {
    id: 4,
    img: "/assets/consult-sharath/testimonials/vimesh.webp",
    youtube: "https://www.youtube.com/embed/For6pBwGL8E",
  },
  {
    id: 5,
    img: "/assets/consult-sharath/testimonials/Yasoda.webp",
    youtube: "https://www.youtube.com/embed/0RRDWG-lLLo",
  },
];

export default function TestimonialCarousel() {
  const swiperRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const openVideo = (testimonial) => {
    setActiveVideo(testimonial);
    setIsExpanded(true);
    swiperRef.current?.autoplay.stop();
  };

  const closeVideo = () => {
    setIsExpanded(false);
    setTimeout(() => {
      setActiveVideo(null);
      swiperRef.current?.autoplay.start();
    }, 400);
  };

  return (
    <section
      style={{
        padding: "2rem 0",
        margin: "0 auto",
        maxWidth: "1200px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: "700", margin: 0 }}>
          Voices of Our Partners
        </h2>
        <p style={{ fontSize: "1rem", color: "#555", marginTop: "0.25rem" }}>
          Hear from our trusted partners across the world.
        </p>
      </div>

      <div
        onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        onMouseLeave={() => !isExpanded && swiperRef.current?.autoplay.start()}
      >
        <Swiper
          modules={[Autoplay]}
          loop={true}
          spaceBetween={32}
          slidesPerView={4}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          style={{ padding: "0 2rem" }}
          speed={700}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {testimonials.map((t) => (
            <SwiperSlide
              key={t.id}
              style={{
                borderRadius: 0,
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              className="testimonial-slide group relative"
            >
              {/* Thumbnail */}
              <img
                src={t.img}
                alt={`testimonial-${t.id}`}
                style={{
                  width: "100%",
                  height: 250,
                  objectFit: "cover",
                  display: "block",
                }}
                onClick={() => openVideo(t)}
              />

              {/* Hover Overlay */}
              <div
                className="absolute inset-0 bg-black/20 flex items-center justify-center 
             opacity-100 transition-opacity duration-300"
                onClick={() => openVideo(t)}
              >
                {/* Professional Play Button */}
                <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg border border-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-7 h-7 text-gray-800"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Animated video overlay container */}
      <AnimatePresence>
        {isExpanded && activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.75)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 9999,
              padding: "1rem",
            }}
            onClick={closeVideo}
          >
            <motion.div
              layoutId={`video-${activeVideo.id}`}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "90%",
                maxWidth: "960px",
                aspectRatio: "16/9",
                boxShadow: "0 0 48px rgba(0,0,0,0.6)",
                borderRadius: 12,
                overflow: "hidden",
                backgroundColor: "#000",
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src={`${activeVideo.youtube}?autoplay=1&controls=1`}
                title="Testimonial Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={closeVideo}
                style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  background: "rgba(255,255,255,0.9)",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  fontSize: 24,
                  cursor: "pointer",
                  lineHeight: 1,
                  padding: 0,
                }}
                aria-label="Close video"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
