import { getMetaData } from "../lib/getMetaData";
import ThankYouPage from "./ThankYouContent";

export async function generateMetadata() {
  const meta = await getMetaData("thankyou");
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const ogImage = `${baseUrl}/assets/images/thankyou-og.jpg`;

  return {
    title: meta?.title || "Blog | SRK",
    description: meta?.description || "SRK Blog page description",
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
  name: "thankyou | SRK",
  description: "SRK thankyou page description",
  url: `${baseUrl}/thank-you`,
  publisher: {
    "@type": "Organization",
    name: "SRK Site",
    logo: { "@type": "ImageObject", url: `${baseUrl}/assets/images/logo.png` },
  },
  potentialAction: {
    "@type": "ViewAction",
    target: `${baseUrl}/contact`,
    name: "Return to Contact Page"
  }
};


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ThankYouPage />
    </>
  );
}
