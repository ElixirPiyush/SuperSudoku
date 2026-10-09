import { SITE } from "@/lib/site";

/** Renders schema.org structured data. No ratings: only facts we can keep true. */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Our own constant content; "<" is escaped so it can't close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** The publisher, Elixir Infotech. */
const ORGANIZATION = {
  "@type": "Organization",
  name: SITE.developer,
  logo: `${SITE.url}/images/elixir-infotech-512.png`,
  email: SITE.email,
  telephone: SITE.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.country,
  },
};

/** Site-wide entities: the website, its publisher and the Android app. */
export const SITE_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    publisher: ORGANIZATION,
  },
  {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: SITE.storeTitle,
    alternateName: SITE.name,
    operatingSystem: "Android",
    applicationCategory: "GameApplication",
    applicationSubCategory: "Puzzle",
    url: SITE.url,
    installUrl: SITE.playUrl,
    image: `${SITE.url}/images/app-icon-512.png`,
    author: ORGANIZATION,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
];
