import ClientContent from "./ClientPage";
import { getMetaData } from "../lib/getMetaData";

export async function generateMetadata() {
  const meta = await getMetaData("client");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const ogImage = `${baseUrl}/assets/images/client-og.jpg`;

  return {
    title: meta?.title || "Client | SRK",
    description: meta?.description || "SRK Client page description",
    keywords: meta?.keywords,
    alternates: { canonical: meta?.canonical || `${baseUrl}/client` },
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      url: meta?.canonical || `${baseUrl}/client`,
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

export default function ClientPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Client | SRK",
    description: "SRK Client page description",
    url: `${baseUrl}/client`,
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
      <ClientContent />
    </>
  );
}
