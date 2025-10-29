'use client';
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion, AnimatePresence } from "framer-motion";
import "swiper/css";
import { Mail, Phone } from "lucide-react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Testimonials from "../../components/Testimonials";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  FiTrendingUp,
  FiSettings,
  FiTarget,
  FiTool,
  FiBarChart2,
  FiBriefcase,
  FiSearch,
  FiEdit,
  FiUsers,
  FiGlobe,
  FiZap,
  FiLock,
  FiPackage,
  FiSmile,
} from "react-icons/fi";
import { PhoneIcon } from "@heroicons/react/24/solid";

import { MdLightbulbOutline, MdRocketLaunch } from "react-icons/md";

const faqs = [
  {
    question: "What services do you offer?",
    answer:
      "I offer a range of frontend development services including React, Tailwind CSS, animation integration, and responsive design.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary, but most projects are completed within 4 to 8 weeks depending on scope and complexity.",
  },
  {
    question: "Do you provide post-launch support?",
    answer:
      "Yes, ongoing support and maintenance packages are available to ensure your digital assets perform optimally.",
  },
];

const caseStudies = [
  {
    id: 1,
    img: "/assets/consult-sharath/CASE-STUDY-CASEGRAND.webp",
    title: "Casagrand Builders – SEO Growth Story",
    link: "case-study-casagrand-builders-seo-growth-story",
    desc: "Casagrand, one of South India’s leading real estate developers, wanted to boost organic visibility and reduce ad dependency. Through precise SEO strategies, we transformed their digital presence across multiple cities.",
    stats: [
      {
        icon: <FiTrendingUp size={24} />,
        title: "Visibility Boost",
        content: "Top Rankings in 20+ Micro-Markets",
      },
      {
        icon: <FiSettings size={24} />,
        title: "Technical Excellence",
        content: "Fixed 300+ crawl errors",
      },
      {
        icon: <MdLightbulbOutline size={24} />,
        title: "Content Strategy",
        content: " 100+ optimized project pages",
      },
      {
        icon: <FiTarget size={24} />,
        title: "Lead Growth",
        content: "Organic leads 600+ per month",
      },
    ],
  },
  {
    id: 2,
    img: "/assets/consult-sharath/KAUVERY-HOSPITAL.webp",
    title: "Kauvery Hospital – SEO Transformation Story",
    desc: "Kauvery Hospital partnered with us to improve visibility for treatment-based and location-specific searches. Through strategic SEO, we strengthened their digital authority and increased qualified patient appointments across all branches.",
    link: "case-study-kauvery-hospital-seo-transformation-story",
    stats: [
      {
        icon: <MdRocketLaunch size={24} />,
        title: "Enhanced Visibility",
        content: "90+ medical keywords on Page 1",
      },
      {
        icon: <FiTool size={24} />,
        title: "Technical Excellence",
        content: "120+ issues fixed, 95+ mobile score",
      },
      {
        icon: <FiBarChart2 size={24} />,
        title: "Content Authority",
        content: "80+ optimized pages for top specialties",
      },
      {
        icon: <FiBriefcase size={24} />,
        title: "Patient Growth",
        content: "24,000+ monthly organic visits",
      },
    ],
  },
];

const brands = [
  {
    id: 1,
    name: "Brand 1",
    logo: "/assets/client-page/auto/Mercedez.webp",
  },
  {
    id: 2,
    name: "Brand 2",
    logo: "/assets/client-page/mall webp/Palladium logo.webp",
  },
  {
    id: 3,
    name: "Brand 3",
    logo: "/assets/client-page/mall webp/Phoenix Marketcity logo300 resolution.webp",
  },
  {
    id: 4,
    name: "Brand 4",
    logo: "/assets/client-page/ecommerce/Chennai Silks.webp",
  },
  {
    id: 5,
    name: "Brand 5",
    logo: "/assets/client-page/ecommerce/Jayachandran.webp",
  },
  {
    id: 6,
    name: "Brand 6",
    logo: "/assets/client-page/ecommerce/K fashions - Apparel & Retail.webp",
  },
  {
    id: 7,
    name: "Brand 7",
    logo: "/assets/client-page/real estate/hiranandani_.webp",
  },
  {
    id: 8,
    name: "Brand 8",
    logo: "/assets/client-page/food/Copper kitchen.webp",
  },
  {
    id: 9,
    name: "Brand 9",
    logo: "/assets/client-page/real estate/VGN Homes.webp",
  },
  {
    id: 10,
    name: "Brand 10",
    logo: "/assets/client-page/food/Palmshore.webp",
  },
  {
    id: 11,
    name: "Brand 11",
    logo: "/assets/client-page/health care/Apollo.webp",
  },
  {
    id: 12,
    name: "Brand 12",
    logo: "/assets/client-page/auto/Yamaha_Motor.webp",
  },
  {
    id: 13,
    name: "Brand 13",
    logo: "/assets/client-page/mall webp/PVR Grand Mall.webp",
  },
  {
    id: 14,
    name: "Brand 14",
    logo: "/assets/client-page/real estate/Tata Housing.webp",
  },
  {
    id: 15,
    name: "Brand 15",
    logo: "/assets/client-page/auto/Volkwagen.webp",
  },
  {
    id: 16,
    name: "Brand 16",
    logo: "/assets/client-page/health care/kauvery_.webp",
  },
];

const services = [
  {
    id: 1,
    img: "/assets/consult-sharath/CONSULTING-Services.webp",
    title: "CONSULTING",
    desc: "Expert insights and strategic guidance to unlock potential ROI.",
  },
  {
    id: 2,
    img: "/assets/consult-sharath/marketing-services.webp",
    title: "MARKETING",
    desc: "Expert marketing strategies that optimise digital campaigns to stand out in the digital world.",
  },
  {
    id: 3,
    img: "/assets/consult-sharath/design-Services.webp",
    title: "DESIGN",
    desc: "Visual creatives that narrate your brand’s story to the audience.",
  },
  {
    id: 4,
    img: "/assets/consult-sharath/development-Services.webp",
    title: "DEVELOPMENT",
    desc: "Strong, secure and user-friendly websites and apps tailored to business needs.",
  },
  {
    id: 5,
    img: "/assets/consult-sharath/SUPPORT-Services.webp",
    title: "SUPPORT",
    desc: "Round the clock digital support and digital services that safeguard and optimise your website.",
  },
  {
    id: 6,
    img: "/assets/consult-sharath/analytic-services.webp",
    title: "ANALYTICS",
    desc: "Data-driven insights and access to analytic tools to track the performance.",
  },
];

export default function HeroSection() {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [openFormId, setOpenFormId] = useState(null); // track which slide’s form is open
  const router = useRouter();

  //consulting form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // payload format matches backend model
      const payload = {
        formType: "Consulting", // or any identifier for this form
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        additionalData: {
          message: formData.message,
        },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forms/submit`,
        payload
      ); // backend endpoint

      router.push("/thank-you");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        alert(err.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  //case-study form
  const [form2Data, setForm2Data] = useState({
    name: "",
    email: "",
    phone: "",
    additionalData: {}
  });

  const handleform2Change = (e) => {
    setForm2Data({ ...form2Data, [e.target.name]: e.target.value });
  };

  const handleform2Submit = async (e, link ,caseStudyId) => {
    e.preventDefault();
    setLoading(true);

    try {
      // payload format matches backend model
      const payload = {
        formType: "case-study", // or any identifier for this form
        name: form2Data.name,
        email: form2Data.email,
        phone: form2Data.phone,
        additionalData: {
    caseStudyId: caseStudyId,
  },
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/forms/submit`,
        payload
      ); // backend endpoint

      if (link) window.location.href = link;

      setForm2Data({ name: "", email: "", phone: "" });
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        alert(err.response.data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGetInTouch = () => {
    router.push("/contact"); // Navigate to contact us page
  };

  const handleScheduleCall = () => {
    window.location.href = "tel:+917200701455"; // Replace with your phone number
  };

  const [openIndex, setOpenIndex] = useState(0); // First question answer open initially
  const refs = useRef([]);

  const toggleAnswer = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <>
      
      {/* hero section */}
      <div className="w-full bg-white">
        <section className="relative h-[auto] md:h-[480px] mt-20">
          {/* Background Image */}
          <img
            src="/assets/consult-sharath/consult-banner.webp"
            alt="About Hero"
            className="absolute inset-0 w-full h-full object-cover md:h-[480px]"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-30"></div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row items-start md:items-center">
            {/* Mobile Heading Only */}

            {/* Full Left Content - hidden on mobile */}
            <div className="md:flex flex-1 flex-col justify-center max-w-xl text-white">
              <h1 className="text-3xl font-extrabold mb-4">
                Consult{" "}
                <span className="text-5xl text-yellow-400 leading-tight">
                  Sharath Ravikumar
                </span>
              </h1>
              <p className="text-gray-200 text-lg leading-relaxed mb-6">
                Get a consultation from Sharath Ravikumar to gain easy
                navigation in digital marketing. With 100+ clients and years of
                digital expertise, he designs tailored strategies that deliver
                measurable results. Connecting with Sharath ensures your brand
                reaches potential online growth with his industrial insights and
                entrepreneurial vision.
              </p>
              <button
                className="group flex items-center mb-2 md:mb-0 bg w-45 text-black px-2 py-3 rounded-md font-medium shadow overflow-hidden relative hover:bg-yellow-500"
                aria-label="Call Us"
                onClick={() => (window.location.href = "tel:+917200701455")}
              >
                <PhoneIcon className="w-5 h-5 ml-2" />
                <span>+91 7200701455</span>
              </button>
            </div>

            {/* Form */}
            <div className="w-full md:w-[360px] bg-white rounded-lg p-8 shadow-lg md:ml-40 flex flex-col justify-center">
              <form className="space-y-5" onSubmit={handleSubmit}>
                <input
                  name="name"
                  type="text"
                  placeholder="Name *"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Mobile Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition-colors duration-300 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
      <section className="flex flex-col md:flex-row items-center max-w-7xl mx-auto px-6 py-16 bg-white gap-10">
        {/* Left Side: Large Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/assets/consult-sharath/Hire-A-Digital-Marketing-Consultant.webp"
            alt="Business Visual"
            className="w-full md:h-[500px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Right Side: Centered Content */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-start md:items-start text-left px-2 md:px-8">
          <h2 className="text-3xl lg:text-3xl font-bold text-gray-800 mb-6">
            Hire a <span className="text-yellow-400">Digital Marketing </span>
            Consultant
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg font-medium">
            Partnering with a digital marketing consultant grows your brand by
            engaging and connecting with the target audience. A marketing
            consultant helps to achieve measurable outcomes with digital
            expertise, practical insights and tailored digital solutions. With
            over a decade of experience, Sharath explores and discovers
            possibilities that internal teams may ignore across multiple
            industries.
          </p>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg font-medium">
            Sharath stays updated with current trends and digital technologies,
            which makes his work stand out in the industry. With his data-driven
            and performance-driven strategies, companies can optimise their
            marketing campaigns that deliver maximum ROI.
          </p>
        </div>
      </section>

      {/* brands */}
      <section className="max-w-7xl mx-auto px-6 py-12">
  <div className="text-center mb-4">
    <h2 className="text-4xl text-gray-700 font-bold mb-2">Our Brands</h2>
    <p className="text-lg text-gray-600">
      Proud portfolio with distinguished brands
    </p>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
    {brands.map(({ id, logo, name }) => (
      <div
        key={id}
        className="relative flex items-center justify-center p-4 group overflow-hidden"
      >
        {/* Logo Image */}
        <img
          src={logo}
          alt={name}
          className="max-h-20 w-full object-contain 
                     transition-all duration-500 ease-in-out 
                     grayscale group-hover:grayscale-0 
                     scale-95 group-hover:scale-100"
        />
      </div>
    ))}
  </div>
</section>


      {/* case Studies */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 relative">
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          navigation={{
            prevEl,
            nextEl,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevEl;
            swiper.params.navigation.nextEl = nextEl;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
        >
          {caseStudies.map((cs) => (
            <SwiperSlide key={cs.id}>
              <div className="h-auto md:h-[400px] rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center relative">
                {/* Left image */}
                <div className="w-full h-56 md:h-auto">
                  <img
                    src={cs.img}
                    alt={cs.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Right content */}
                <div className="flex flex-col h-full justify-between space-y-4 md:space-y-0">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                      {cs.title}
                    </h2>
                    <p className="text-gray-600 text-base md:text-md mb-4 md:mb-6 w-full md:w-[500px]">
                      {cs.desc}
                    </p>

                    <div className="flex flex-col space-y-2">
                      {cs.stats.map(
                        ({ icon, title: statTitle, content }, i) => (
                          <div
                            key={i}
                            className="flex items-center space-x-3 text-gray-800"
                          >
                            <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                              {icon}
                            </div>
                            <div className="flex space-x-1 text-sm md:text-base">
                              <span className="text-md md:text-lg text-yellow-400">
                                {statTitle}
                              </span>
                              <span className="mt-1">:</span>
                              <span className="text-md md:text-lg text-gray-600">
                                {content}
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Bottom: View Case Study Button */}
                  <div className="self-start md:self-end mb-2 relative">
                    <button
                      onClick={() => setOpenFormId(cs.id)}
                      className="inline-block w-full md:w-44 bg text-gray-800 font-semibold py-3 px-4 rounded transition"
                    >
                      View Case Study
                    </button>

                    {/* Animated Form */}
                    <AnimatePresence>
                      {openFormId === cs.id && (
                        <motion.div
                          className="fixed inset-0 flex items-center justify-center z-50 px-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.div
                            onClick={() => setOpenFormId(null)}
                            className="absolute inset-0 bg-black/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                          ></motion.div>

                          <motion.div
                            className="relative bg-white rounded-2xl p-6 md:p-8 w-full max-w-md shadow-xl z-50"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 120 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              onClick={() => setOpenFormId(null)}
                              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                            >
                              ✕
                            </button>
                            <h3 className="text-xl md:text-2xl font-bold mb-4 text-yellow-700">
                              Case Study Form
                            </h3>
                            <form
                              className="flex flex-col gap-2"
                              onSubmit={(e) => handleform2Submit(e, cs.link, cs.id)}
                            >
                              {/* Name */}
                              <div className="flex flex-col text-left">
                                <label className="text-gray-700 font-medium">
                                  Your Name
                                </label>
                                <input
                                  name="name"
                                  type="text"
                                  placeholder="Enter your full name"
                                  value={form2Data.name}
                                  onChange={handleform2Change}
                                  required
                                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-sm"
                                />
                              </div>

                              {/* Email */}
                              <div className="flex flex-col text-left">
                                <label className="text-gray-700 font-medium">
                                  Email Address
                                </label>
                                <input
                                  name="email"
                                  type="email"
                                  placeholder="example@email.com"
                                  value={form2Data.email}
                                  onChange={handleform2Change}
                                  required
                                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-sm"
                                />
                              </div>

                              {/* Mobile Number */}
                              <div className="flex flex-col text-left">
                                <label className="text-gray-700 font-medium">
                                  Mobile Number
                                </label>
                                <input
                                  name="phone"
                                  type="text"
                                  placeholder="+91 98765 43210"
                                  value={form2Data.phone}
                                  onChange={handleform2Change}
                                  required
                                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none shadow-sm"
                                />
                              </div>

                              {/* Button */}
                              <motion.button
                                type="submit"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-lg py-3 font-semibold shadow-md hover:shadow-lg transition-all"
                              >
                                Go to Case Study
                              </motion.button>
                            </form>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation */}
        <div className="flex justify-center gap-6 md:gap-8 mt-4 md:mt-6">
          <button
            ref={setPrevEl}
            className="text-lg md:text-xl font-bold px-3 py-1 rounded border border-gray-400 hover:bg-blue-200"
            aria-label="Previous Slide"
          >
            ←
          </button>
          <button
            ref={setNextEl}
            className="text-lg md:text-xl font-bold px-3 py-1 rounded border border-gray-400 hover:bg-blue-200"
            aria-label="Next Slide"
          >
            →
          </button>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h2 className="font-bold text-4xl text-gray-600">Our Services</h2>
          <p className="text-lg text-gray-600">
            Smart digital services that elevate your brand’s presence.
          </p>
        </div>
        <section className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:grid grid-cols-3 grid-rows-2 gap-4 h-[900px] md:h-[500px]">
            {services.map(({ id, img, title, desc }) => (
              <div
                key={id}
                className="relative w-full h-full overflow-hidden cursor-pointer group"
              >
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover block transition-transform duration-300 ease-in-out group-hover:scale-105"
                />

                {/* Overlay for title and description */}
                <div className="absolute bottom-0 left-0 w-full bg-blue-700/60 text-white px-3 py-2 text-center z-20 transition-all duration-300 ease-in-out">
                  <h3 className="font-bold text-lg transform transition-transform duration-300 ease-in-out">
                    {title}
                  </h3>
                  <p className="text-sm mt-1 opacity-0 max-h-0 overflow-hidden transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:max-h-24">
                    {desc || "This is a description that appears on hover."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="bg">
        <div className="w-full py-12 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between mx-auto max-w-5xl">
          {/* Left side content */}
          <div className="mb-6 md:mb-0 md:flex-1">
            <h3 className="text-2xl font-semibold text-white mb-2">
              Time to elevate your brand presence.
            </h3>
            <p className="text-white">
              Let’s collaborate to build your brand a strong online presence.
            </p>
          </div>

          {/* Right side buttons with hover expand and icons */}
          <div className="flex gap-2 md:flex-none">
            <button
              className="group flex items-center bg-yellow-400 text-black px-2 py-3 rounded-md font-medium shadow overflow-hidden relative hover:bg-yellow-500"
              aria-label="Call Us"
              onClick={() => (window.location.href = "tel:+917200701455")}
            >
              <PhoneIcon className="w-5 h-5 ml-2" />
              <span>+91 7200701455</span>
            </button>
          </div>
        </div>
      </section>

      <section className="flex justify-center items-center">
        <div className="flex flex-col md:flex-row bg-white shadow-md p-8 md:p-12 max-w-5xl w-full min-h-[500px] items-center">
          {/* Left: Image (taller, can overflow if desired) */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10 flex justify-center items-center w-full md:w-2/5 h-full overflow-visible">
            <img
              src="https://images.pexels.com/photos/842567/pexels-photo-842567.jpeg?auto=compress&cs=tinysrgb&h=350"
              alt="Anna White standing in a field"
              className="object-cover w-64 md:w-100 h-[500px] self-center md:-mt-16 md:-mr-6"
            />
          </div>
          {/* Right: Text */}
          <div className="flex flex-col justify-center w-full md:w-3/5 h-full">
            <h1 className="font-handwriting text-lg md:text-lg font-semibold text-gray-700 mb-4">
              Why{" "}
              <span className="font-bold text-yellow-400 text-4xl">
                Sharath Ravikumar
              </span>
            </h1>
            <p className="text-base text-gray-800 mb-2 font-medium">
              {" "}
              Sharath Ravikumar is a brand strategist and digital marketing
              expert. He navigated businesses across various industries,
              delivering desired results. With his digital expertise, he comes
              up with unique and smart marketing strategies that create
              impactful online growth.Being the founder of Webboombaa.org, Great
              Indian Beverages and Great Indian Sweets, he transfers
              entrepreneurship insights to build successful brands across
              industries. His digital strategies are customised to meet the
              brand’s needs and reach the potential audiences. With Sharath as
              your digital marketing consultant, your brand can achieve ultimate
              online presence, online traffic and conversion.
            </p>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left side: title and description */}
          <div className="pr-6 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-6 font-display text-foreground dark:text-blue-800">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-700 leading-relaxed">
              Here are answers to some of the most common queries. Feel free to
              reach out if you don’t see your question listed.
            </p>
          </div>

          {/* Right side: FAQ questions and answers */}
          <div className="divide-y">
            {faqs.map((faq, index) => (
              <div key={index} className="py-4">
                <button
                  className="w-full flex justify-between items-center font-semibold text-lg text-foreground dark:text-gray-800 hover:text-blue-800 transition-colors focus:outline-none"
                  onClick={() => toggleAnswer(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  {faq.question}
                  <span
                    className={`transform transition-transform duration-300 text-2xl ${
                      openIndex === index ? "rotate-45 text-black" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  ref={(el) => (refs.current[index] = el)}
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out mt-2 px-1 ${
                    openIndex === index ? "max-h-80" : "max-h-0"
                  }`}
                  style={{ color: "var(--muted-foreground, #646262ff)" }}
                >
                  <p className="mb-0">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg">
        <div className="px-4">
          <div className="max-w-6xl mx-auto">
            <div className="overflow-hidden relative text-white">
              <div className="absolute inset-0"></div>
              <div className="p-8 md:p-12 relative z-10">
                <div className="text-center mb-8">
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 font-display">
                    Looking to grow your brand online?
                  </h3>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Talk to us and explore tailored digital strategies to create a large impact online.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <button
                    type="button"
                    onClick={handleGetInTouch}
                    className="flex items-center justify-center px-6 py-3 text-lg font-semibold rounded bg-yellow-400 text-black"
                  >
                    <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                    Get In Touch
                  </button>
                  <button
                    type="button"
                    onClick={handleScheduleCall}
                    className="flex items-center justify-center px-6 py-3 text-lg font-semibold rounded border border-white/30 bg-white/10 text-white hover:bg-white/20 min-w-[200px] transition-colors duration-300"
                  >
                    <Phone className="mr-2 h-5 w-5" aria-hidden="true" />
                    Schedule a Call
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </>
  );
}
