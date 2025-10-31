// app/blog/[slug]/page.jsx
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailingClient";
import axios from "axios";

export async function generateMetadata({ params }) {
  const { slug } = await params; // no await needed
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
  const blog = res.data.find((b) => b.slug === slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sharathravikumar.com";
  const blogUrl = `${siteUrl}/${slug}`;

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "This blog could not be found.",
      canonical: blogUrl,
    };
  }

  const ogImage = blog.bannerUrl || blog.imgUrl;

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.description,
    keywords: blog.keywords,
    alternates: { canonical: blogUrl },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.description,
      url: blogUrl,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: blog.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.description,
      images: [ogImage],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs`);
  const blog = res.data.find((b) => b.slug === slug);

    if(!blog){
      notFound();
    }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const blogUrl = `${siteUrl}/blog/${slug}`;
  const ogImage = blog.bannerUrl || blog.imgUrl;

  // BlogPosting JSON-LD
  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": blogUrl },
    headline: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.description,
    image: ogImage,
    author: { "@type": "Organization", name: "SRK Site" },
    publisher: {
      "@type": "Organization",
      name: "SRK Site",
      logo: { "@type": "ImageObject", url: `${siteUrl}/assets/images/logo.png` },
    },
    datePublished: blog.date,
    dateModified: blog.date,
  };

 const faqArray = blog.faqJson ? JSON.parse(blog.faqJson) : [];

const faqLd = faqArray.length > 0
  ? {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqArray.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    }
  : null;


  return (
    <>
      {/* BlogPosting JSON-LD */}
      <script
        id={`blog-${slug}-json-ld`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
      />
      {/* FAQ JSON-LD */}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
    
      
      <BlogDetailClient blog={blog} />
    </>
  );
}
