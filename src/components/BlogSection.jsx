'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import slugify from "../utils/slugify";
import DateWithIcon from "../components/DateWithIcon";

const BlogSection = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleBlogs = () => {
    router.push("/blog");
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`
        );
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const latestBlogs = [...res.data]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 2);
          setRecentBlogs(latestBlogs);
        } else {
          setRecentBlogs([]);
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Server error: unable to fetch blogs");
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left column: content */}
        <div className="flex flex-col justify-center p-6 md:h-100 w-full">
          <h2 className="text-3xl text-gray-600 font-extrabold mb-2">
            Recent Blogs
          </h2>
          <span className="block h-[3px] bg-yellow-400 w-40 mb-2 animate-shrinkExpand"></span>
          <p className="text-gray-700 font-medium mb-6 md:max-w-md">
            Read our blogs to stay informed with expert insights, helpful tips and guides
          </p>
          <button
            onClick={handleBlogs}
            className="relative overflow-hidden w-24 border-2 border-gray-200 p-2 font-semibold text-gray-800 text-xs rounded-lg"
          >
            View All <span className="inline-block ml-1">→</span>
          </button>
        </div>

        {/* Right side: Recent blogs */}
        {error ? (
          <div className="col-span-2 text-red-500 font-semibold flex justify-center items-center">
            {error}
          </div>
        ) : recentBlogs.length === 0 ? (
          <div className="col-span-2 text-gray-500 font-medium flex justify-center items-center">
            No blogs available
          </div>
        ) : (
          recentBlogs.map((blog) => (
            <div
              key={blog.id}
              className="overflow-hidden hover:shadow-lg transition duration-300 flex flex-col"
            >
              {/* Image section same as BlogCard */}
              <div className="relative w-full h-48 overflow-hidden">
                <Image
                  src={blog.imgUrl}
                  alt={blog.title}
                  title={blog.title}
                  fill
                  loading="lazy"
                  className="w-full h-full object-cover transform transition duration-300 ease-in-out hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-blue-800 text-white text-xs px-3 py-1 rounded-full shadow">
                  {blog.category}
                </span>
              </div>

              {/* Content section same style */}
              <div className="p-4 flex flex-col flex-grow">
                <p className="text-gray-600 text-sm mb-3 flex-grow">
                  {blog.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <DateWithIcon date={blog.date} />
                  <Link
                    href={`/${slugify(blog.title)}`}
                    className="text-blue-800 text-sm font-semibold hover:underline hover:text-yellow-400 transition duration-300 flex items-center gap-1"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14m0 0l-4-4m4 4l-4 4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default BlogSection;
