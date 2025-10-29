'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

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

        {/* Center + Right columns mapped dynamically */}
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
  className="relative w-full h-48 overflow-hidden rounded-lg shadow-md"
>
  <Image
    src={blog.imgUrl}
    alt={blog.title}
    title={blog.title}
    fill
    loading="lazy"
    className="w-full h-full object-cover transform transition duration-300 ease-in-out hover:scale-105"
  />
  <div className="absolute bottom-0 left-0 bg-white/90 px-3 py-2 max-w-[290px]">
    <p className="text-lg md:text-xl font-bold text-gray-700">
      {blog.title}
    </p>
  </div>
</div>


          ))
        )}
      </div>
    </section>
  );
};

export default BlogSection;
