import { resolveMachineImage } from '../admin/services/machineService';

const DOMAIN = 'https://kmgmachineries.in';

// Helper to set or update meta tags dynamically
function setMetaTag(selector, attrName, attrVal, content) {
  let tag = document.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, attrVal);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

// Helper to set or update canonical link tag
function setCanonical(url) {
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', url);
}

/**
 * 1. Home Page SEO
 */
export function updateHomePageSEO() {
  const pageTitle = 'Food Processing Machinery Manufacturer in India | KMG Machineries';
  const cleanDesc = 'Leading manufacturer & exporter of spice processing machines, masala pulverizers, automatic powder packaging machines, liquid bottling lines, and dal mill machinery in India.';
  const canonicalUrl = `${DOMAIN}/spares-service/home`;

  document.title = pageTitle;

  setMetaTag('meta[name="description"]', 'name', 'description', cleanDesc);
  setMetaTag(
    'meta[name="keywords"]',
    'name',
    'keywords',
    'Food Processing Machinery Manufacturer India, Spice Processing Machine, Masala Pulverizer, Powder Packaging Machine, Liquid Bottling Line, Dal Mill Machinery, KMG Machineries'
  );
  setCanonical(canonicalUrl);

  setMetaTag('meta[property="og:title"]', 'property', 'og:title', pageTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', cleanDesc);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'website');
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', `${DOMAIN}/salvin_logo.png`);

  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', cleanDesc);
}

/**
 * 2. About Us Page SEO
 */
export function updateAboutPageSEO() {
  const pageTitle = 'About Us - Food Processing Machinery Manufacturer | KMG Machineries';
  const cleanDesc = 'Learn about KMG Machineries – 18+ years of engineering excellence in SS 304 food-grade processing machinery, spice mills, packaging plants, and industrial automation.';
  const canonicalUrl = `${DOMAIN}/spares-service/about`;

  document.title = pageTitle;

  setMetaTag('meta[name="description"]', 'name', 'description', cleanDesc);
  setMetaTag(
    'meta[name="keywords"]',
    'name',
    'keywords',
    'About KMG Machineries, Food Processing Equipment Manufacturer, Engineering Excellence, SS 304 Food Grade Machinery, Gujarat India'
  );
  setCanonical(canonicalUrl);

  setMetaTag('meta[property="og:title"]', 'property', 'og:title', pageTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', cleanDesc);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'article');
}

/**
 * 3. Machineries Catalog Page SEO
 */
export function updateMachineriesListSEO(machines = []) {
  const pageTitle = 'Food Processing & Packaging Machineries Manufacturer | KMG Machineries';
  const cleanDesc = 'Explore heavy-duty spice grinding mills, pulverizers, powder packaging lines, liquid filling bottling plants, and dal mill machinery manufactured by KMG Machineries.';
  const canonicalUrl = `${DOMAIN}/spares-service/machineries`;

  document.title = pageTitle;

  setMetaTag('meta[name="description"]', 'name', 'description', cleanDesc);
  setMetaTag(
    'meta[name="keywords"]',
    'name',
    'keywords',
    'Food Processing Machineries, Spice Pulverizer, Powder Packaging Machine, Liquid Bottling Line, Dal Mill Machinery, KMG Machineries'
  );
  setCanonical(canonicalUrl);

  // Schema.org ItemList for Catalog
  let scriptTag = document.getElementById('machineries-catalog-schema-jsonld');
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = 'machineries-catalog-schema-jsonld';
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }

  const itemListElements = (machines || []).slice(0, 20).map((m, idx) => ({
    '@type': 'ListItem',
    'position': idx + 1,
    'name': m.machine_name,
    'url': `${DOMAIN}/spares-service/machineries/${m.slug || m.id}`,
  }));

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'KMG Machineries Food Processing & Packaging Catalog',
    'description': cleanDesc,
    'url': canonicalUrl,
    'numberOfItems': machines.length,
    'itemListElement': itemListElements,
  };

  scriptTag.textContent = JSON.stringify(jsonLdData);
}

/**
 * 4. Machine Details Page SEO
 */
export function updateMachineDetailsSEO(machine, currentSlug) {
  if (!machine) return;

  const machineName = machine.machine_name || 'Food Processing Machine';
  const categoryName = machine.category_name || 'Food Machinery';
  const rawDesc = machine.description || `High efficiency ${machineName} manufactured by KMG Machineries.`;
  const cleanDesc = rawDesc.replace(/<[^>]*>?/gm, '').slice(0, 160);

  const pageTitle = `${machineName} - ${categoryName} Manufacturer | KMG Machineries`;
  const canonicalUrl = `${DOMAIN}/spares-service/machineries/${machine.slug || currentSlug}`;
  const imageUrl = resolveMachineImage(machine.image_url || machine.image);

  document.title = pageTitle;

  setMetaTag('meta[name="description"]', 'name', 'description', cleanDesc);
  setMetaTag(
    'meta[name="keywords"]',
    'name',
    'keywords',
    `${machineName}, ${categoryName}, Food Processing Machinery, Packaging Machine Manufacturer, KMG Machineries India`
  );
  setCanonical(canonicalUrl);

  setMetaTag('meta[property="og:title"]', 'property', 'og:title', pageTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', cleanDesc);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'product');

  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', cleanDesc);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);

  // Schema.org Product & Breadcrumb Injection
  let scriptTag = document.getElementById('machine-schema-jsonld');
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = 'machine-schema-jsonld';
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${canonicalUrl}#product`,
        'url': canonicalUrl,
        'name': machineName,
        'image': [imageUrl],
        'description': cleanDesc,
        'category': categoryName,
        'brand': {
          '@type': 'Brand',
          'name': 'KMG Machineries',
        },
        'manufacturer': {
          '@type': 'Organization',
          'name': 'KMG Machineries',
          'url': DOMAIN,
          'logo': `${DOMAIN}/salvin_logo.png`,
        },
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'INR',
          'availability': 'https://schema.org/InStock',
          'seller': {
            '@type': 'Organization',
            'name': 'KMG Machineries',
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': `${DOMAIN}/spares-service/home`,
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Machineries',
            'item': `${DOMAIN}/spares-service/machineries`,
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': machineName,
            'item': canonicalUrl,
          },
        ],
      },
    ],
  };

  scriptTag.textContent = JSON.stringify(jsonLdData);
}

/**
 * 5. Products & Spares Listing Page SEO
 */
export function updateProductsListSEO() {
  const pageTitle = 'Industrial Automation & Machinery Spares Parts | KMG Machineries';
  const cleanDesc = 'Genuine SS 304 food machinery spare parts, pneumatic automation components, pulverizer blades, packaging sensors, and maintenance spares by KMG Machineries.';
  const canonicalUrl = `${DOMAIN}/spares-service/products`;

  document.title = pageTitle;

  setMetaTag('meta[name="description"]', 'name', 'description', cleanDesc);
  setMetaTag(
    'meta[name="keywords"]',
    'name',
    'keywords',
    'Industrial Spares Parts, Packaging Machine Spares, Pulverizer Blades, Pneumatic Components, KMG Machineries'
  );
  setCanonical(canonicalUrl);

  setMetaTag('meta[property="og:title"]', 'property', 'og:title', pageTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', cleanDesc);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
}

/**
 * 6. Contact Us Page SEO
 */
export function updateContactPageSEO() {
  const pageTitle = 'Contact Us - Food Processing Machinery Inquiry | KMG Machineries';
  const cleanDesc = 'Get in touch with KMG Machineries for food processing machinery quotes, plant layout consultation, spice mills, and packaging machinery inquiries.';
  const canonicalUrl = `${DOMAIN}/spares-service/service`;

  document.title = pageTitle;

  setMetaTag('meta[name="description"]', 'name', 'description', cleanDesc);
  setMetaTag(
    'meta[name="keywords"]',
    'name',
    'keywords',
    'Contact KMG Machineries, Food Machinery Quote, Spice Processing Machinery Inquiry, Ahmedabad Gujarat'
  );
  setCanonical(canonicalUrl);

  setMetaTag('meta[property="og:title"]', 'property', 'og:title', pageTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', cleanDesc);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
}
