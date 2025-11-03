// app/consult/page.jsx
import ConsultContent from "./ConsultSharathClient";
import { getMetaData } from "../lib/getMetaData";

export async function generateMetadata() {
  const meta = await getMetaData("consult");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const ogImage = `${baseUrl}/assets/images/consult-og.jpg`;

  return {
    title: meta?.title || "Consult | SRK",
    description: meta?.description || "SRK Consult page",
    keywords: meta?.keywords,
    alternates: { canonical: meta?.canonical || `${baseUrl}/consult` },
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      url: meta?.canonical || `${baseUrl}/consult`,
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

export default function ConsultPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Consult | SRK",
    description: "SRK Consult page description",
    url: `${baseUrl}/consult`,
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
      <ConsultContent />
    </>
  );
}
