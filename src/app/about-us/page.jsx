import AboutContent from "./AboutContent";
import { getMetaData } from "../lib/getMetaData";

export async function generateMetadata() {
  const meta = await getMetaData("about");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:5173";

  const ogImage = `${baseUrl}/assets/images/about-og.jpg`;

  return {
    title: meta?.title || "About SRK",
    description: meta?.description || "About SRK default description",
    keywords: meta?.keywords,
    alternates: { canonical: meta?.canonical || `${baseUrl}/about` },
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      url: meta?.canonical || `${baseUrl}/about`,
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

export default function AboutPage() {

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About | SRK",
    description: "About SRK site description",
    url: `${baseUrl}/about`,
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
      <AboutContent />
    </>
  );
}
