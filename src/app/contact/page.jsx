// app/blog/page.jsx
import ContactClient from "./ContactClient";
import { getMetaData } from "../lib/getMetaData";

export async function generateMetadata() {
  const meta = await getMetaData("contact");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const ogImage = `${baseUrl}/assets/images/contact-og.jpg`;

  return {
    title: meta?.title || "contact | SRK",
    description: meta?.description || "SRK case study page description",
    keywords: meta?.keywords,
    alternates: { canonical: meta?.canonical || `${baseUrl}/contact` },
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      url: meta?.canonical || `${baseUrl}/contact`,
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
    name: "contact | SRK",
    description: "SRK Blog page description",
    url: `${baseUrl}/contact`,
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
      <ContactClient />
    </>
  );
}
