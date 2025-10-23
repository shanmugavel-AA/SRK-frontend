export async function getMetaData(pageKey) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const res = await fetch(`${baseUrl}/api/meta/${pageKey}`, {
      // SSR + incremental revalidation
      next: { revalidate: 3600 }, // 1 hour cache
    });

    if (!res.ok) {
      console.warn(`Meta fetch failed for ${pageKey}:`, res.status);
      return null;
    }

    const meta = await res.json();
    return meta;
  } catch (err) {
    console.error("Error fetching meta tags:", err);
    return null;
  }
}
