"use client";

import React, { useLayoutEffect, useRef } from "react";

const timelineData = [
  {
    id: 1,
    Year: 2015,
    image:
      "/assets/years-of-achivement-wpg/Beginning-of-Consulting-Journey.webp",
    title: "Beginning of Consulting Journey",
    description:
      "Sharath Ravikumar entered the business world as a digital marketing consultant, providing strategic marketing solutions for small brands to large enterprises. With this creative mind, he helped businesses navigate challenges with tailored strategies. Each successful outcome fuelled him to do something bigger. This marked the rise of a trusted digital marketing strategist.",
  },
  {
    id: 2,
    Year: 2016,
    image: "/assets/years-of-achivement-wpg/Launch-of-Webbombaa.webp",
    title: "Launch of Webbombaa",
    description:
      "Sharath Ravikumar founded Webboombaa with a bold vision to encourage brands to make noise in the digital world. Started off as a small team, then turned into a recognised digital marketing company that delivered measurable results. Webboombaa became a symbol of Sharath’s entrepreneurial drive.",
  },
  {
    id: 3,
    Year: 2017,
    image: "/assets/years-of-achivement-wpg/First-Client-Breakthrough.webp",
    title: "First Client Breakthrough",
    description:
      "Webboombaa proudly secured Hiranandhani as their first client. This marked the remarkable step towards the real estate industry. This milestone ignited a journey of growth and innovation with credibility. With this powerful start with successful campaigns, Sharath has set new benchmarks in the real estate industry.",
  },
  {
    id: 4,
    Year: 2018,
    image: "/assets/years-of-achivement-wpg/Steering-into-Success.webp",
    title: "Steering into Success",
    description:
      "Sharath entered the automobile sector with Webboombaa, earning prestigious clients like Volkswagen and Mercedes-Benz. This growth steered the ability to create impactful campaigns across industries that redefined creativity and digital excellence.",
  },
  {
    id: 5,
    Year: 2019,
    image: "/assets/years-of-achivement-wpg/Crowned-with-Recognition.webp",
    title: "Crowned with Recognition",
    description:
      "This year saw Webboombaa recognised as the Best Branding Company in Tamil Nadu by the central government. It also expanded its verticals into FMCG and retail industries, collaborating with Jeyachandran Textiles and The Chennai Silks, establishing strong connections with the industry.",
  },
  {
    id: 6,
    Year: 2020,
    image: "/assets/years-of-achivement-wpg/Won-Amid-Lockdown.webp",
    title: "Won Amid Lockdown",
    description:
      "Plot twist: Webboombaa crossed five crores in five years with years of dedication and commitment. We celebrated the win with Covid hitting, turning living rooms to office rooms during the lockdown. From Zoom calls to masked meetings, we had constant and unshakeable growth.",
  },
  {
    id: 7,
    Year: 2021,
    image: "/assets/years-of-achivement-wpg/Award-Winning-Expansion.webp",
    title: "Award-Winning Expansion",
    description:
      "Despite the peak of covid and chaos, Sharath acquired Webboombaa and expanded internationally. A milestone was reached when he partnered with the Brazilian government, and Phoenix Mall and Skyone Mall were on board, which expanded the company’s horizon with the launching of influencer marketing and winning the Best Creative of the Year award.",
  },
  {
    id: 8,
    Year: 2022,
    image: "/assets/years-of-achivement-wpg/Entry-into-Movie-Promotions.webp",
    title: "Entry into Movie Promotions",
    description:
      "Sharath expanded his venture by entering into movie promotions with Domybrand. The movie promotions reflected his expertise in digital marketing, branding strategies and digital campaigns, which created impactful promotions which connected the audiences to the film.",
  },
  {
    id: 9,
    Year: 2023,
    image: "/assets/years-of-achivement-wpg/New-Beginnings.webp",
    title: "New Beginnings",
    description:
      "Sharath exited Webboombaa and established a new brand, Webboombaa.org; this bold step marked a fresh chapter of creativity and growth. This brand was built with years of experience, a global outlook and cutting-edge digital services to deliver measurable impacts. He also established Great Indian Sweets and Great Indian Beverages, which expanded his entrepreneurship journey.",
  },
  {
    id: 10,
    Year: 2024,
    image: "/assets/years-of-achivement-wpg/Guiding-Future-Professionals.webp",
    title: "Guiding Future Professionals",
    description:
      "Sharath was invited as a guest lecturer for digital marketing and food and beverage management by Anna University in the master of business administration department. He shared his expertise with academic learning and practical insights that inspire the future MBA graduates.",
  },
  {
    id: 11,
    Year: 2025,
    image: "/assets/years-of-achivement-wpg/Your-Trusted-Digitalist.webp",
    title: "Your Trusted Digitalist",
    description:
      "Webboombaa.org expanded his horizon by entering into the hospital industry. The company proudly works with various sectors, from education and healthcare to real estate, delivering digital success. Webboombaa stands out in the industry as a leading digital marketing agency in Chennai.",
  },
];

const Timeline = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);
  const contentRefs = useRef([]);
  const visibleRef = useRef([]);

  useLayoutEffect(() => {
    let ctx;
    let gsapRef, ScrollTriggerRef;

    (async () => {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      gsapRef = gsapModule.default;
      ScrollTriggerRef = ScrollTriggerModule.ScrollTrigger;
      gsapRef.registerPlugin(ScrollTriggerRef);

      ctx = gsapRef.context(() => {
        const mm = gsapRef.matchMedia();

        mm.add("(min-width: 768px)", () => setupAnimations(false));
        mm.add("(max-width: 767px)", () => setupAnimations(true));

        function setupAnimations(isMobile = false) {
          const container = containerRef.current;
          const lineEl = lineRef.current;
          const items = (itemsRef.current || []).filter(Boolean);
          const contents = (contentRefs.current || []).filter(Boolean);
          const arrowEl = container?.querySelector("#lineArrow");

          if (!container || !lineEl || items.length === 0) return;

          visibleRef.current = items.map(() => false);

          const DUR_IN = isMobile ? 0.18 : 0.28;
          const DUR_OUT = isMobile ? 0.15 : 0.22;
          const X_OFFSET = isMobile ? 14 : 24;
          const HYSTERESIS = 10;

          gsapRef.set(items, { autoAlpha: 0, x: -X_OFFSET });
          gsapRef.set(contents, { autoAlpha: 0, x: X_OFFSET });

          const itemTop = (el) => (el ? el.offsetTop : 0);
          const lastMid = () => {
            const last = items[items.length - 1];
            return last
              ? (last.offsetTop || 0) + (last.offsetHeight || 0) + 50
              : 0;
          };

          const updateVisibility = (currentHeight) => {
            items.forEach((item, idx) => {
              const content = contents[idx];
              if (!item || !content) return;
              const top = itemTop(item);
              const isVisible = visibleRef.current[idx];
              if (!isVisible && currentHeight >= top + HYSTERESIS) {
                visibleRef.current[idx] = true;
                gsapRef.to([item, content], {
                  autoAlpha: 1,
                  x: 0,
                  duration: DUR_IN,
                  ease: "power2.out",
                  overwrite: "auto",
                  stagger: 0.05,
                });
              } else if (isVisible && currentHeight < top - HYSTERESIS) {
                visibleRef.current[idx] = false;
                gsapRef.to([item, content], {
                  autoAlpha: 0,
                  x: idx % 2 ? X_OFFSET : -X_OFFSET,
                  duration: DUR_OUT,
                  ease: "power2.in",
                  overwrite: "auto",
                  stagger: 0.03,
                });
              }
            });
          };

          gsapRef.fromTo(
            lineEl,
            { height: 0 },
            {
              height: lastMid,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: isMobile ? "top top+=200" : "top top+=300",
                end: () => `+=${lastMid()}`,
                scrub: true,
                invalidateOnRefresh: true,
                autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
                onUpdate: (self) => {
                  const h = self.progress * lastMid();
                  updateVisibility(h);
                  if (arrowEl) gsapRef.set(arrowEl, { y: h - 12 });
                },
                onRefresh: (self) => {
                  const h = self.progress * lastMid();
                  updateVisibility(h);
                  if (arrowEl) gsapRef.set(arrowEl, { y: h - 12 });
                },
              },
            }
          );
        }
      }, containerRef);
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section className="relative max-w-7xl mx-auto px-2">
      <div ref={containerRef} className="relative">
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 w-px h-full">
          <div className="absolute top-0 bottom-0 w-px" />
          <div
            ref={lineRef}
            className="absolute top-0 w-1/2 bg-blue-600 origin-top"
            style={{ height: 0, transformOrigin: "top" }}
          />
          <svg
            id="lineArrow"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute w-5 h-5 text-blue-600"
            style={{ top: 8, left: "-9px" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 5v14m0 0l-6-6m6 6l6-6"
            />
          </svg>
        </div>

        {timelineData.map(({ id, image, Year, title, description }, index) => (
          <div
            key={id}
            className="flex flex-col md:flex-row items-center md:items-start py-10 md:py-16 space-y-8 md:space-y-0"
          >
            <div
              ref={(el) => (itemsRef.current[index] = el)}
              className="w-full md:w-1/2 flex justify-center md:justify-end pr-0 md:pr-16 opacity-0 -translate-x-6"
            >
              <div className="w-3/4 sm:w-1/2 md:w-130 md:h-80 overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="hidden md:block w-1 mx-3" />

            <div
              ref={(el) => (contentRefs.current[index] = el)}
              className="w-full md:w-1/2 bg-white px-6 md:px-0 md:p-8 translate-x-6 text-center md:text-left"
            >
              <h2 className="text-5xl text-[#00458fe9] font-extrabold tracking-wider">
                {Year}
              </h2>
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                {title}
              </h3>
              <p className="text-gray-700">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
