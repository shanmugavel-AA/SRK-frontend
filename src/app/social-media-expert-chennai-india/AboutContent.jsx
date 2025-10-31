"use client";

import { useState, useRef, useEffect } from "react";
import Timeline from "../../components/Timeline";
import {
  CalendarDaysIcon,
  UsersIcon,
  ClipboardDocumentCheckIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Mail, Phone, ChevronRight, ChevronLeft } from "lucide-react";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
const clients = [
  "/assets/About-page/auto/Mercedez.webp",
  "/assets/About-page/ecommerce/Chennai Silks.webp",
  "/assets/About-page/food/Palmshore.webp",
  "/assets/About-page/real estate/VGN Homes.webp",
  "/assets/About-page/health care/kauvery_.webp",
  "/assets/About-page/mall webp/Palladium logo.webp",
  "/assets/About-page/real estate/hiranandani_.webp",
  "/assets/About-page/mall webp/Phoenix Marketcity logo300 resolution.webp",
  "/assets/About-page/auto/Volkwagen.webp"
];

const testimonials = [
  {
    name: "Mr. Arpit Singhal",
    title: "Manager",
    avatar:
      "/assets/About-page/tata homes.webp", // Replace with actual avatar path
    quote: `I first met this energetic team during my stint with Tata Valley Homes, their enthusiasm and fresh ideas truly stood out. Sharath and his team delivered exceptional results with creativity, dedication, and passion. It’s been a great experience working with such a committed group. Wishing them continued success ahead!`,
    accent: "Alphabet",
  },
  {
    name: "Mr. Ankit",
    title: "Managing Director",
    avatar:
      "/assets/About-page/Murari.webp",
    quote: `Sharath truly understand our requirements and deliver exactly what we expect. A day before our site launch, we needed urgent updates late at night — yet the team responded instantly and completed everything perfectly. Their dedication, strategy, and digital expertise helped us reach the right audience across India. Kudos to Sharath and team!`,
    accent: "Amazon",
  },
  {
    name: "Mr. Chellapermal",
    title: "DGM - Marketing",
    avatar:
      "/assets/About-page/sobha.webp",
    quote: `Sharath and his team are truly exceptional professionals—creative, dedicated, and results-driven. They clearly understand our brand goals, ensure every campaign reaches the right audience, and deliver outstanding outcomes with complete transparency and commitment. Highly recommended for impactful digital marketing results.`,
    accent: "Government",
  },
];

const cardData = [
  {
    img: "/assets/vaules-mission-growth-vission-wpg/vision.webp",
    verticalText: "VISION",
    hoverTitle: "Our Vision",
    hoverDesc: "Provide brands with expert insights and digital strategies.",
  },
  {
    img: "/assets/vaules-mission-growth-vission-wpg/mision.webp",
    verticalText: "MISSION",
    hoverTitle: "Our Mission",
    hoverDesc:
      "Encourage brands to achieve potential digital success with strategic marketing solutions.",
  },
  {
    img: "/assets/vaules-mission-growth-vission-wpg/values.webp",
    verticalText: "VALUES",
    hoverTitle: "Our Values",
    hoverDesc:
      "Driving lasting online growth with creativity, digital strategy and industry excellence.",
  },
  {
    img: "/assets/vaules-mission-growth-vission-wpg/growth.webp",
    verticalText: "GROWTH",
    hoverTitle: "Our Goal",
    hoverDesc:
      "It reflects innovation, commitment and customer-focused strategies.",
  },
];

const faqs = [
  {
    question: "What is the Way To Be a Social Media Expert?",
    answer:
      "Become a hands-on expert through operating various platforms, monitoring audience behaviour, keeping pace with the trends, and learning to use such tools as Meta Business Suite, Google Analytics, and Ads Manager.",
  },
  {
    question: "How Do I Measure ROI in Social Media?",
    answer:
      "Track like, shares, comments, conversions, web traffic and leads. Measure ROI with the help of analytics tools like Google analytics or platform insights.",
  },
  {
    question: "Why Should I Hire a Social Media Expert in Chennai?",
    answer:
      "Recruiting a local professional will assist in aiming the appropriate regional audience and knowing local trends, speaking both English and Tamil, and establishing effective relationships with the customers of the city.",
  },
  {
    question: "How Long Does it Take to See Results from Social Media Marketing?",
    answer:
      "There are results based on strategy and consistency. Targets to be achieved within 1-2 months are engagement and awareness, and a stronger lead in 3-6 months.",
  },
  {
    question: "How Can Sharath Ravi Kumar Help My Business Grow Online?",
    answer:
      "The Sharath Ravi Kumar and his team create data-driven social media plans that create brand awareness, leads, and engagement with the most measurable success in India.",
  },
];

const awards = [
  {
    imgSrc:
      "/assets/About-page/award1.jpg",
    alt: "Award 1",
  },
  {
    imgSrc:
      "https://img.freepik.com/premium-photo/elegant-gold-winners-trophy-with-shooting-stars-be-awarded-first-place-competition_851674-72517.jpg",
    alt: "Award 2",
  },
  {
    imgSrc:
      "https://tse4.mm.bing.net/th/id/OIP.1cqDwFv-UHQI2UJcrWvaTQAAAA?r=0&w=474&h=316&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Award 3",
  },
  {
    imgSrc:
      "https://globalhydraulics.com.sg/wp-content/uploads/2021/10/award-2018.jpg",
    alt: "Award 4",
  },
  {
    imgSrc:
      "https://tse3.mm.bing.net/th/id/OIP.UTTJWXg65CgNU13kels_0QHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Award 5",
  },
  {
    imgSrc:
      "https://tse1.mm.bing.net/th/id/OIP.r8i8cbecdMBP3O8W_fA8cQAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3",
    alt: "Award 6",
  },
];

const steps = [
  {
    title: "years",
    desc: "Gromadzisz dane podatkowe w jednym",
    number: 10,
    icon: <CalendarDaysIcon className="w-8 h-8 text-black" />, // represents years/time
  },
  {
    title: "Clients",
    desc: "Sprawdzasz i wiesz, że dane są poprawne",
    number: 100,
    icon: <UsersIcon className="w-8 h-8 text-black" />, // represents people/clients
  },
  {
    title: "projects",
    desc: "Tworzysz własny schemat kalkulacji",
    number: 300,
    icon: <ClipboardDocumentCheckIcon className="w-8 h-8 text-black" />, // represents projects/documents checked
  },
  {
    title: "Industries",
    desc: "Zrealizuj szybkie deklaracje wybrane ",
    number: 20,
    icon: <BuildingOfficeIcon className="w-8 h-8 text-black" />, // represents industries/buildings
  },
];

const AboutHero = () => {

  const handleScheduleCall = () => {
    window.location.href = "tel:+1234567890"; // Replace with your phone number
  };

  const [openIndex, setOpenIndex] = useState(0); // First question answer open initially
  const refs = useRef([]);

  const toggleAnswer = (index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  const [activeIndex, setActiveIndex] = useState(0);

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[activeIndex];

  useEffect(() => {
    refs.current.forEach((ref, i) => {
      if (!ref) return;
      ref.style.maxHeight = openIndex === i ? ref.scrollHeight + "px" : "0px";
    });
  }, [openIndex]);

  return (
    <>
      <div className="w-full bg-white">
        {/* Hero Section Always Visible */}
        <section className="relative w-full h-120 mt-20">
          {/* Background Image */}
          <img
            src="/assets/About-page/about-banner.webp"
            alt="About Hero"
            className="md:block hidden absolute inset-0 w-full h-full object-cover"
          />

          <img
            src="/assets/About-page/mobile-background.webp"
            alt="About Hero"
            className="md:hidden block absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black opacity-0"></div>

          {/* Content */}
          <div className="relative z-10 flex items-center justify-end md:mr-40 h-full px-8">
            <div className="max-w-lg p-8 rounded-lg">
              <h1 className="text-xl font-extrabold text-white mb-4">
                About{" "}
                <span className="text-4xl text-yellow-400">
                  Sharath Ravikumar
                </span>
              </h1>
              <p className="text-gray-200 text-lg leading-relaxed mb-6">
                Sharath Ravikumar is a digital growth strategist, entrepreneur,
                speaker, mentor, and business consultant with a record of
                successful campaigns with impactful results.
              </p>
              <Link
                href="/contact"
                className="no-underline-effect inline-block w-60 px-6 py-3 font-semibold rounded-lg bg text-white hover:bg-blue-700 transition-colors duration-300"
              >
                Get Sharath’s Insights
              </Link>
            </div>
          </div>
        </section>
      </div>

      <section className="max-w-7xl mx-auto overflow-hidden py-4">
        <h2 className="text-center text-4xl text-gray-700 font-bold mb-12">
          Our Clients
        </h2>
        <div className="relative w-full">
          <motion.div
            className="flex gap-10"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...clients, ...clients, ...clients].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-32 h-20 flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt={`Client ${index}`}
                  className="object-contain h-full w-full"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto mt-12 mb-10 px-4">
        <div className="items-center">
          <h2 className="text-center text-4xl text-gray-600 font-bold mb-3">
            About the Strategist
          </h2>
          <p className="md:w-[900px] mx-auto text-center text-lg text-gray-600">
            Sharath Ravikumar’s unwavering focus on quality, creativity, and
            determination inspires businesses to grow, innovate, and succeed in
            a competitive digital landscape. With extensive expertise in digital
            marketing, he helps companies unlock new opportunities, achieve
            measurable results, and strengthen their brand presence. Over the
            years, Sharath has guided multiple brands and organizations toward
            sustainable growth through his excellence, innovative strategies,
            and forward-thinking approach. He continuously explores new ideas,
            shares actionable insights, and fosters learning to empower teams
            and individuals, helping them navigate the evolving digital space
            and achieve long-term success.
          </p>
        </div>
      </section>

      <section className="w-full py-10">
        <div className="max-w-5xl mx-auto px-20">
          <div className="flex flex-col md:flex-row items-center md:justify-center gap-y-2 md:gap-x-10">
            {steps.map((step,id) => (
              <div key={id} className="bg-yellow-400 rounded-xl shadow-lg flex flex-col items-center justify-center w-32 h-32 text-black text-center">
                {/* Icon at top */}
                <div className="w-8 h-8 mb-1">{step.icon}</div>
                {/* Number in center */}
                <div className="text-3xl font-bold text-black">
                  {step.number}
                </div>
                {/* Title at bottom */}
                <div className="text-base mt-1">{step.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 md:h-[400px] p-8 gap-8">
          {/* Left: Vision & Mission */}
          <div className="col-span-4 md:col-span-2 flex flex-col justify-center px-4 py-8">
            <h2 className="text-4xl font-bold text-gray-600 mb-4 tracking-widest">
              Our Vision and Mission
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              To lead the digital marketing industry by empowering businesses to
              achieve measurable impact and offering brands tailored digital
              strategies to succeed online with innovative campaigns and expert
              guidance. Drive impactful digital growth with innovative marketing
              solutions that increase the audience engagement.
            </p>
          </div>

          {/* Right: Cards - hidden on mobile */}
          <div className="hidden md:block col-span-2">
            <div className="container">
              {cardData.map((card, index) => (
                <div
                  key={index}
                  className="card relative overflow-hidden group"
                >
                  {/* Image */}
                  <img
                    src={card.img}
                    title={card.hoverTitle}
                    alt={card.hoverTitle}
                    className="w-full h-full object-cover"
                  />

                  {/* Initial blue overlay with vertical text */}
                  <div className="absolute inset-0 bg-blue-800/50 flex justify-center items-center transition-transform duration-700 ease-in-out group-hover:-translate-y-full">
                    <p className="text-white text-2xl font-bold rotate-90 tracking-widest">
                      {card.verticalText}
                    </p>
                  </div>

                  {/* Hover content */}
                  <div className="absolute inset-0 bg-blue-700/50 flex flex-col justify-center items-center text-center text-white scale-100 translate-y-full transition-transform duration-700 ease-in-out group-hover:translate-y-0 group-hover:scale-100">
                    <h3 className="text-lg font-semibold mb-2">
                      {card.hoverTitle}
                    </h3>
                    <p className="text-sm px-4">{card.hoverDesc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MemoryLane timeline below AboutHero */}
      <Timeline />

      {/* <section class="max-w-7xl mx-auto grid grid-cols-2 gap-6 h-100">
  <div></div>

  <div class="flex flex-col justify-center">
   <div class="bg-gray-200 rounded-lg shadow-md grid grid-cols-[1fr_2fr] items-center gap-6">
      
      <div class="flex justify-start">
        <img src="https://i.pinimg.com/736x/0a/fc/36/0afc366471d266251cf806d41a70e8da.jpg" 
             alt="Profile"
             class="w-52 h-52 rounded-full object-cover -ml-20" />
      </div>

      <div class="text-left">
        <h2 class="text-xl font-bold mb-2">Centered Content</h2>
        <p class="text-gray-700">
          This is the content area with a gray background. It’s aligned next to the image.
        </p>
      </div>

    </div>
  </div>
</section> */}

      <section className="bg">
        <div className="w-full py-12 px-6 md:px-20 flex flex-col md:flex-row items-center justify-between mx-auto max-w-5xl">
          {/* Left side content */}
          <div className="mb-6 md:mb-0 md:flex-1">
            <h3 className="text-2xl font-semibold text-white mb-2">
              Ready to get started?
            </h3>
            <p className="text-white">
              Let's connect and help you achieve your goals with a tailored
              solution.
            </p>
          </div>

          {/* Right side buttons with hover expand and icons */}
          <div className="flex gap-2 md:flex-none">
            <button
              className="cursor-pointer group flex items-center bg-yellow-400 text-black px-2 py-3 rounded-md font-medium shadow overflow-hidden relative hover:bg-yellow-500"
              aria-label="Call Us"
              onClick={() => (window.location.href = "tel:+917200701455")}
            >
              <PhoneIcon className="w-5 h-5 ml-2" />
              <span>+91 7200701455</span>
            </button>
          </div>
        </div>
      </section>

      {/* <section className="w-full py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">
            Awards
          </h2>
          <span className="block h-[3px] bg-yellow-400 w-40 mx-auto animate-shrinkExpandSmall"></span>
          <p className="text-lg text-gray-500 mb-10 text-center">
            Milestones that reflect our innovation and digital excellence across
            various industries.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {awards.map((award, idx) => (
              <div
                key={idx}
                className="bg-white w-full h-60 overflow-hidden flex justify-center items-center"
              >
                <img
                  src={award.imgSrc}
                  alt={award.alt}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section className="flex justify-center items-center bg-gray-50 min-h-[600px]">
        <div className="flex flex-col md:flex-row bg-white shadow-md p-8 md:p-12 max-w-5xl w-full min-h-[500px] items-center">
          {/* Left: Image (taller, can overflow if desired) */}
          <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10 flex justify-center items-center w-full md:w-2/5 h-full overflow-visible">
            <img
              src="/assets/consult-sharath/WHYY-Sarath.webp"
              alt="Anna White standing in a field"
              className="object-cover w-100 md:w-100 h-[500px] self-center md:-mt-16 md:-mr-6"
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
            <p className="text-base font-medium text-gray-800 mb-2">
              {" "}
              Sharath is a digitalist with over a decade of expertise in digital
              marketing and brand building with a proven record of measurable
              ROI. He has guided various businesses across multiple industries,
              delivering potential digital growth and presence. His brands
              showcase his entrepreneurial acumen and ability to create
              successful ventures. Choosing Sharath as your trusted digital
              partner will give you access to digital expertise and strategic
              insights with innovative entrepreneurial vision, which offers
              sustainable digital growth with increased brand visibility that
              lasts longer online.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-16">
        <div className="max-w-5xl mx-auto rounded-3xl bg-white/70 shadow-xl p-8 md:p-12">
          {/* Section Heading */}
          <h2 className="text-3xl md:text-4xl font-bold text-center font-display text-foreground">
            Testimonials
          </h2>
          <span className="block h-[3px] bg-yellow-400 w-40 mb-10 mt-2 mx-auto animate-shrinkExpand"></span>

          {/* Main Testimonial Highlight with Carousel */}
          <div className="relative flex flex-col md:flex-row items-center md:items-start justify-center gap-8 min-h-[280px]">
            {/* Avatar and left button */}
            <div className="relative flex-shrink-0">
              <img
                src={active.avatar}
                alt={active.name}
                className="w-52 h-60 object-cover md:-mt-10"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /> */}
              {/* <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-white text-sm px-4 py-1">
                {active.name}
              </div> */}
              {/* Left button fixed */}
              <button
                className="absolute left-[-38px] top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-200 rounded-full p-2 shadow transition"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
                style={{ zIndex: 2 }}
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
            </div>

            {/* Testimonial text */}
            <div className="flex-1 flex items-center">
              <div>
                <blockquote className="text-lg italic leading-relaxed text-foreground mb-4">
                  {active.quote}
                </blockquote>
                <div className="font-semibold text-black">
                  ★ {active.title}
                </div>
              </div>
            </div>

            {/* Right button absolutely positioned to section, not content */}
            <button
              className="absolute right-2 md:-right-5 top-28 transform -translate-y-1/2 bg-white hover:bg-gray-200 rounded-full p-2 shadow transition"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              style={{ zIndex: 2 }}
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>
      </section>

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
                  className="w-full flex justify-between items-start text-left gap-4 font-semibold text-lg text-foreground dark:text-gray-800 hover:text-blue-800 transition-colors focus:outline-none"
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
                    Ready to Transform Your Digital Presence?
                  </h3>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Connect with us to create campaigns that transform your
                    online presence into lasting digital success.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Link
                    href="/contact"
                    className="no-underline-effect flex items-center justify-center px-6 py-3 text-lg font-semibold rounded bg-yellow-400 text-black"
                  >
                    <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                    Get In Touch
                  </Link>
                  <button
                    type="button"
                    onClick={handleScheduleCall}
                    className="cursor-pointer flex items-center justify-center px-6 py-3 text-lg font-semibold rounded border border-white/30 bg-white/10 text-white hover:bg-white/20 min-w-[200px] transition-colors duration-300"
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
};

export default AboutHero;
