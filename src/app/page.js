// app/page.jsx
import HomeContent from "../components/Home";
import { getMetaData } from "./lib/getMetaData";

export async function generateMetadata() {
  const meta = await getMetaData("home");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const ogImage = `${baseUrl}/assets/images/home-og.jpg`;

  return {
    title: meta?.title || "Home | SRK",
    description: meta?.description || "SRK Home default description",
    keywords: meta?.keywords,
    alternates: { canonical: meta?.canonical || `${baseUrl}/` },
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      url: meta?.canonical || `${baseUrl}/`,
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

export default function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Home | SRK",
    description: "SRK Home default description",
    url: `${baseUrl}/`,
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
      <HomeContent />
    </>
  );
}
