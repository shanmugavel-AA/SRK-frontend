export const CONFIG = {
  BASE_URL: "https://example.com",
  siteName: "SRK Site",
  authors: "Shanmugavel A, Team",
};

export const SEO_DATA = {
  home: {
    title: "SRK Home - Best Services",
    description: "Welcome to SRK site offering the best services.",
    keywords: "SRK, services, solutions",
    canonical: `${CONFIG.BASE_URL}`,
    ogImage: `${CONFIG.BASE_URL}/assets/images/home-og.jpg`,
  },
  about: {
    title: "About Us - SRK",
    description: "Learn more about SRK and our mission.",
    keywords: "About SRK, SRK team, company",
    canonical: `${CONFIG.BASE_URL}/about`,
    ogImage: `${CONFIG.BASE_URL}/assets/images/about-og.jpg`,
  },
  blog: {
    title: "Blog - SRK",
    description: "Read latest updates, articles, and tutorials.",
    keywords: "SRK blog, tutorials, news",
    canonical: `${CONFIG.BASE_URL}/blog`,
    ogImage: `${CONFIG.BASE_URL}/assets/images/blog-og.jpg`,
  },
};
