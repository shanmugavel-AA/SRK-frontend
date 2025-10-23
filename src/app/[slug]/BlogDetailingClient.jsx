"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BlogCard from "../../components/BlogCard";
import {
  Facebook,
  Twitter,
  Linkedin,
  User,
  MessageCircle,
  Tag,
  Calendar,
  Share2,
} from "lucide-react";
import FAQ from "../../components/FAQ";
import axios from "axios";
import slugify from "../../utils/slugify";

export default function BlogDetail() {
  const { slug } = useParams();
  const containerRef = useRef(null);
  const headingRefs = useRef([]);
  const [currentUrl, setCurrentUrl] = useState("");
  const router = useRouter();


  const [blogDetail, setBlogDetail] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const handleGetInTouch = () => {
    router.push("/contact");
  };
  useEffect(() => {
  if (typeof window !== "undefined") {
    setCurrentUrl(window.location.href);
  }
}, []);

  // Fetch blog from backend
  useEffect(() => {
    // 1. Fetch all blogs to find the ID for the slug
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`)
      .then((res) => {
        // Find blog with matching slug
        const foundBlog = res.data.find((b) => slugify(b.title) === slug);
        if (!foundBlog) {
          // Blog not found, you could redirect or show error
          setBlogDetail(null);
          return;
        }
        // 2. Fetch blog details by ID
        return axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${foundBlog.id}`
        );
      })
      .then((res) => {
        if (res && res.data) {
          const data = res.data;

          // Parse content HTML to content array same as before
          // Parse content HTML to content array
          // Parse content HTML to content array
          let contentArray = [];
          if (data.contentHtml) {
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = data.contentHtml;

            tempDiv.childNodes.forEach((node) => {
              if (node.tagName === "H1") {
                contentArray.push({ type: "headings", text: node.innerText });
              } else if (node.tagName === "H2") {
                contentArray.push({ type: "heading", text: node.innerText });
              } else if (node.tagName === "P") {
                // Handle anchor (<a>) tags inside paragraphs as rich HTML
                contentArray.push({ type: "paragraph", html: node.innerHTML });
              } else if (node.tagName === "IMG") {
                contentArray.push({ type: "image", src: node.src });
              } else if (node.tagName === "UL") {
                const items = [];
                node.querySelectorAll("li").forEach((li) => {
                  items.push(li.innerHTML); // keep HTML, including links
                });
                contentArray.push({ type: "list", items });
              } else if (node.tagName === "A") {
                // Direct <a> tags at root level
                contentArray.push({
                  type: "link",
                  href: node.getAttribute("href"),
                  title: node.getAttribute("title"),
                  target: node.getAttribute("target"),
                  text: node.innerText,
                });
              }
            });
          }

          // Parse FAQ JSON if exists
          const faqArray = data.faqJson ? JSON.parse(data.faqJson) : [];

          setBlogDetail({ ...data, content: contentArray, faq: faqArray });

          // Fetch related blogs (same category)
          axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`)
            .then((res) => {
              const related = res.data
                .filter((b) => b.id !== data.id && b.category === data.category)
                .slice(0, 3);
              setRelatedBlogs(related);
            });
        }
      })
      .catch((err) => {
        console.error(err);
        setBlogDetail(null);
      });
  }, [slug]);

  // Extract headings for TOC
  const headings = blogDetail?.content
    ? blogDetail.content
        .map((c, idx) =>
          c.type === "heading"
            ? { id: `section-${idx}`, text: c.text, index: idx }
            : null
        )
        .filter(Boolean)
    : [];

  headingRefs.current = headingRefs.current.slice(0, headings.length);

  // GSAP ScrollTrigger effect
  useLayoutEffect(() => {
    if (!containerRef.current || !blogDetail) return;

    let ctx;

    (async () => {
      const gsapModule = await import("gsap");
      const ScrollTriggerModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = ScrollTriggerModule.ScrollTrigger;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const leftPanel = containerRef.current.querySelector(".left-panel");
        const rightPanel = containerRef.current.querySelector(".right-panel");
        const lastHeadingElement =
          headingRefs.current[headingRefs.current.length - 2];

        if (!leftPanel) return;

        // Pin left panel
        ScrollTrigger.create({
          trigger: leftPanel,
          start: "top-=100 top",
          end: () => {
            if (lastHeadingElement) {
              const rect = lastHeadingElement.getBoundingClientRect();
              return rect.bottom + window.scrollY + 20;
            }
            if (rightPanel) {
              return rightPanel.getBoundingClientRect().height + window.scrollY;
            }
            return "+=1000";
          },
          pin: true,
          invalidateOnRefresh: true,
          pinSpacing: true,
        //   markers: true,
          pinType: "fixed",
          refreshPriority: 1,
        });

        // TOC highlight
        const tocLinks = document.querySelectorAll(".toc-link");
        headings.forEach((h, idx) => {
          const el = headingRefs.current[idx];
          if (!el) return;

          ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              tocLinks.forEach((link) =>
                link.classList.remove("text-yellow-400", "font-semibold")
              );
              document
                .getElementById(`toc-${idx}`)
                ?.classList.add("text-yellow-400", "font-semibold");
            },
            onEnterBack: () => {
              tocLinks.forEach((link) =>
                link.classList.remove("text-yellow-400", "font-semibold")
              );
              document
                .getElementById(`toc-${idx}`)
                ?.classList.add("text-yellow-400", "font-semibold");
            },
          });
        });
      }, containerRef);
      setTimeout(() => {
  import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
    ScrollTrigger.refresh();
  });
}, 100); // tune delay as needed
    })();

    return () => {
      if (ctx) ctx.revert();
    };
  }, [slug, headings, blogDetail]);

  useEffect(() => {
  // Wait for all DOM paint/layout (especially after async data and images)
  setTimeout(() => {
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });
  }, 100); // 100ms is often enough, but tune as needed
}, [blogDetail, headings]);

useEffect(() => {
  function refreshOnResize() {
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh();
    });
  }

  window.addEventListener("resize", refreshOnResize);
  return () => window.removeEventListener("resize", refreshOnResize);
}, []);

  

  if (!blogDetail) {
    return (
      <div className="flex justify-center items-center h-96">
        <p className="text-gray-600 text-lg">Loading blog...</p>
      </div>
    );
  }

  return (
    <>

      

    <div className="w-full" ref={containerRef}>
      {/* Hero Image */}
      <div className="w-full mt-16 sm:mt-20">
        <img
          src={blogDetail.bannerUrl || blogDetail.imgUrl}
//           onLoad={() => {
//     import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => ScrollTrigger.refresh());
//   }}
          alt={blogDetail.title}
          className="w-full h-60 sm:h-80 md:h-[500px] object-cover"
        />
      </div>

      {/* Meta Info */}
      <div className="max-w-5xl mx-auto py-6 flex flex-col md:flex-row md:items-center md:justify-between text-gray-700 text-sm sm:text-base border-b gap-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-8">
          <span className="flex items-center gap-2">
            <User size={18} className="text-green-600" />
            <span className="font-medium">Sharath Ravikumar</span>
          </span>
          <span className="flex items-center gap-2">
            <Tag size={18} className="text-blue-500" />
            <span>{blogDetail.category}</span>
          </span>
          <span className="flex items-center gap-2">
            <Calendar size={18} className="text-gray-500" />
            <span>{blogDetail.date}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="flex items-center gap-2 font-medium text-gray-600">
            <Share2 size={18} className="text-gray-500" />
            Share:
          </span>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook
              size={22}
              className="cursor-pointer text-blue-600 hover:scale-125 transition"
            />
          </a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              blogDetail.title + " " + currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle
              size={22}
              className="cursor-pointer text-green-500 hover:scale-125 transition"
            />
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              currentUrl
            )}&text=${encodeURIComponent(blogDetail.title)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter
              size={22}
              className="cursor-pointer text-sky-500 hover:scale-125 transition"
            />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
              currentUrl
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin
              size={22}
              className="cursor-pointer text-blue-700 hover:scale-125 transition"
            />
          </a>
        </div>
      </div>

      {/* 2 Column Layout */}
      <div className="grid-layout max-w-7xl mx-auto py-8 sm:py-10 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-start">
        {/* Left Sidebar */}
        <aside className="left-panel col-span-1 hidden md:block">
          <div className="space-y-10">
            {/* CTA */}
            <div className="p-6 rounded-lg shadow-lg bg-white">
              <h3 className="font-bold text-2xl">Get in Touch</h3>
              <p className="text-gray-800 mt-2 text-sm">
                Have questions or feedback? Reach out to us anytime.
              </p>
              <button
                onClick={handleGetInTouch}
                className="mt-3 w-full bg-blue-800 text-white py-2 px-4 rounded-lg"
              >
                Contact Us
              </button>
            </div>

            {/* TOC */}
            <div className="p-6 rounded-lg shadow-lg bg-white">
              <h3 className="font-bold text-2xl mb-4">Table of Contents</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                {headings.map((h, idx) => (
                  <li key={h.id}>
                    <button
                      id={`toc-${idx}`}
                      onClick={() => {
                        const el = headingRefs.current[idx];
                        if (!el) return;
                        const topOffset = 100;
                        const elementPosition = el.getBoundingClientRect().top;
                        const offsetPosition =
                          elementPosition + window.scrollY - topOffset;
                        window.scrollTo({
                          top: offsetPosition,
                          behavior: "smooth",
                        });
                      }}
                      className="toc-link text-left w-full hover:text-yellow-400"
                    >
                      {h.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Right Content */}
        <article className="right-panel col-span-1 md:col-span-3 space-y-4 sm:space-y-6 [&_a]:text-blue-600 [&_a:hover]:text-blue-800 [&_a]:underline">
          {blogDetail.content.map((c, idx) => {
            if (c.type === "headings") {
              const headingIndex = headings.findIndex((h) => h.index === idx);
              return (
                <h1
                  key={idx}
                  ref={(el) => (headingRefs.current[headingIndex] = el)}
                  id={`section-${headingIndex}`}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 sm:mt-6"
                >
                  {c.text}
                </h1>
              );
            }
            if (c.type === "heading") {
              const headingIndex = headings.findIndex((h) => h.index === idx);
              return (
                <h2
                  key={idx}
                  ref={(el) => (headingRefs.current[headingIndex] = el)}
                  id={`section-${headingIndex}`}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4 sm:mt-6"
                >
                  {c.text}
                </h2>
              );
            }

            if (c.type === "paragraph")
              return (
                <p
                  key={idx}
                  className="text-base sm:text-lg leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: c.html }} // ✅ supports <strong>
                />
              );

            if (c.type === "image")
              return (
                <img
                  key={idx}
                  src={c.src}
                  alt="blog-content"
                  className="max-w-3xl h-[400px] object-cover mx-12"
                />
              );

            if (c.type === "list")
              return (
                <ul
                  key={idx}
                  className="list-disc list-inside ml-6 space-y-2"
                >
                  {c.items.map((item, liIdx) => (
                    <li
                      key={liIdx}
                      dangerouslySetInnerHTML={{ __html: item }} // ✅ keeps <strong>
                    />
                  ))}
                </ul>
              );
            if (c.type === "link") {
              // Safely render anchor tag
              return (
                <a
                  key={idx}
                  href={c.href}
                  title={c.title || undefined}
                  target={c.target || "_blank"}
                  rel={
                    c.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                  className="text-blue-600 underline hover:text-blue-800 transition-colors duration-200"
                >
                  {c.text}
                </a>
              );
            }

            return null;
          })}

          {blogDetail.faq && blogDetail.faq.length > 0 && <FAQ faqs={blogDetail.faq} />}
        </article>
      </div>

      {/* Related Blogs Section */}
      <div className="max-w-7xl mx-auto py-8 sm:py-10 px-4 sm:px-0">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">
          Related Blogs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {relatedBlogs.length > 0 ? (
            relatedBlogs.map((post) => <BlogCard key={post.id} blog={post} />)
          ) : (
            <p className="text-gray-600 text-base sm:text-lg text-center mt-6">
              No related blogs found.
            </p>
          )}
        </div>
      </div>
    </div>
        </>
  );
}
