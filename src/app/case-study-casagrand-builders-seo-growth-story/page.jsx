// app/blog/page.jsx
import CaseStudyone from "./CaseStudyone";
import { getMetaData } from "../lib/getMetaData";

export async function generateMetadata() {
  const meta = await getMetaData("case-study");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const ogImage = `${baseUrl}/assets/images/blog-og.jpg`;

  return {
    title: meta?.title || "case study | SRK",
    description: meta?.description || "SRK case study page description",
    keywords: meta?.keywords,
    alternates: { canonical: meta?.canonical || `${baseUrl}/blog` },
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      url: meta?.canonical || `${baseUrl}/blog`,
      siteName: "SRK Site",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: meta?.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.title,
      description: meta?.description,
      images: [ogImage],
      site: "@SRKSite",
      creator: "@ShanmugavelA",
    },
  };
}

export default function BlogPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Blog | SRK",
    description: "SRK Blog page description",
    url: `${baseUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: "SRK Site",
      logo: { "@type": "ImageObject", url: `${baseUrl}/assets/images/logo.png` },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyone />
    </>
  );
}
