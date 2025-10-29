"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Link from "next/link";
import slugify from "../../utils/slugify";
import BlogCard from "../../components/BlogCard";
import DateWithIcon from "../../components/DateWithIcon";

export default function BlogListing() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`)
      .then((res) => {
        const fetchedBlogs = res.data.map((b) => ({
          ...b,
          imgUrl: b.imgUrl || b.bannerUrl || "",
          description: b.description || "",
        }));
        setBlogs(fetchedBlogs);
      })
      .catch((err) => console.error(err));
  }, []);

  const categories = ["All", ...new Set(blogs.map((b) => b.category))];
  const featuredBlog = useMemo(() => blogs.find((b) => b.featured) || null, [blogs]);

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return blogs.filter(
      (b) =>
        b.id !== (featuredBlog?.id || null) &&
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, blogs, featuredBlog]);

  const categoryBlogs = useMemo(() => {
    if (searchTerm.trim()) return [];
    if (selectedCategory === "All")
      return blogs.filter((b) => b.id !== (featuredBlog?.id || null));
    return blogs.filter(
      (b) =>
        b.id !== (featuredBlog?.id || null) && b.category === selectedCategory
    );
  }, [selectedCategory, searchTerm, blogs, featuredBlog]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = categoryBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(categoryBlogs.length / blogsPerPage);

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 py-16 mt-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold">
            Our <span className="text-yellow-400">Blogs</span>
          </h1>
          <span className="block h-[3px] bg-yellow-400 w-40 mx-auto mt-4 animate-shrinkExpand"></span>
          <p className="text-gray-600 mt-4 text-xl">
            Explore our latest insights and tips across multiple domains.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-10 relative w-full max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search blogs by title..."
            className="border rounded-xl px-10 py-3 w-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Search Results */}
        {searchTerm.trim() !== "" && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-5">Search Results</h2>
            {searchResults.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {searchResults.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-lg text-center">
                No blogs found.
              </p>
            )}
          </div>
        )}

        {/* Featured Blog */}
        {searchTerm.trim() === "" ? (
          featuredBlog ? (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-5">Featured Blog</h2>
              <div className="h-100 overflow-hidden hover:shadow-xl transition flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/2 h-full">
                  <img
                    src={featuredBlog.imgUrl}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover transform transition duration-300 ease-in-out hover:scale-105"
                  />
                  {featuredBlog.featured && (
                    <span className="absolute top-3 left-3 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full shadow">
                      Featured
                    </span>
                  )}
                </div>

                <div className="p-12 flex flex-col justify-between md:w-1/2 relative">
                  <div>
                    <h3 className="text-4xl font-bold mt-3">
                      {featuredBlog.title}
                    </h3>
                    <p className="text-xl text-gray-600 mt-4">
                      {featuredBlog.description}
                    </p>
                    <span className="absolute top-3 right-3 bg-blue-800 text-white text-xs px-3 py-1 rounded-full shadow">
                      {featuredBlog.category}
                    </span>
                  </div>
                  <div className="mt-6 flex flex-col items-start gap-2">
                    <DateWithIcon date={featuredBlog.date} />
                    <Link
                      href={`/${slugify(featuredBlog.title)}`}
                      className="text-white bg-blue-800 mt-1 px-4 py-2 rounded-md hover:bg-blue-900 transition"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center mb-12">
              No featured blog available.
            </p>
          )
        ) : null}

        {/* Category Tabs */}
        {searchTerm.trim() === "" && (
          <div className="flex gap-4 mb-10 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-5 py-2 rounded-full border shadow-sm transition font-medium ${
                  selectedCategory === cat
                    ? "bg-blue-800 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Blog Grid + Pagination */}
        {searchTerm.trim() === "" && (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {currentBlogs.length > 0 ? (
                currentBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              ) : (
                <p className="text-center col-span-3 text-gray-500">
                  No blogs found.
                </p>
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 rounded-full border font-medium transition ${
                      currentPage === i + 1
                        ? "bg-blue-800 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Newsletter Section */}
      {/* <div className="w-full py-20 mt-16 bg-[#0A57B4]">
        <div className="flex flex-col items-center justify-center gap-6 px-4 max-w-3xl mx-auto">
          <div className="text-white text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold">
              Stay Updated with Latest Insights
            </h2>
            <p className="text-white text-lg">
              Subscribe to our newsletter and never miss an update.
            </p>
          </div>

          <form className="flex flex-col md:flex-row gap-4 w-full max-w-md">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="px-5 py-3 rounded-md text-white focus:outline-none w-full border border-white"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div> */}
    </div>
  );
}
