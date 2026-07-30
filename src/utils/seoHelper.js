import { resolveMachineImage } from '../admin/services/machineService';

/**
 * Updates DOM head metadata and injects Schema.org JSON-LD structured data
 * for Machine Details Page (e.g. /spares-service/machineries/cup-filling-sealing-machine)
 */
export function updateMachineDetailsSEO(machine, currentSlug) {
  if (!machine) return;

  const machineName = machine.machine_name || 'Food Processing Machine';
  const categoryName = machine.category_name || 'Food Machinery';
  const rawDesc = machine.description || `High efficiency ${machineName} manufactured by Salvin Industries.`;
  const cleanDesc = rawDesc.replace(/<[^>]*>?/gm, '').slice(0, 160);

  const pageTitle = `${machineName} - ${categoryName} Manufacturer | Salvin Industries`;
  const canonicalUrl = `https://spares.salvinindia.com/spares-service/machineries/${machine.slug || currentSlug}`;
  const imageUrl = resolveMachineImage(machine.image_url || machine.image);

  // 1. Update Title
  document.title = pageTitle;

  // 2. Helper to set or create meta tags
  const setMetaTag = (selector, attrName, attrVal, content) => {
    let tag = document.querySelector(selector);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attrName, attrVal);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  // 3. Set standard meta tags
  setMetaTag('meta[name="description"]', 'name', 'description', cleanDesc);
  setMetaTag(
    'meta[name="keywords"]',
    'name',
    'keywords',
    `${machineName}, ${categoryName}, Food Processing Machinery, Packaging Machine Manufacturer, Salvin Industries Ahmedabad`
  );

  // 4. Set Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // 5. OpenGraph & Twitter Meta Tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', pageTitle);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', cleanDesc);
  setMetaTag('meta[property="og:image"]', 'property', 'og:image', imageUrl);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', canonicalUrl);
  setMetaTag('meta[property="og:type"]', 'property', 'og:type', 'product');

  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', cleanDesc);
  setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl);

  // 6. Schema.org JSON-LD Structured Data Injection for Googlebot
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
          'name': 'Salvin Industries',
        },
        'manufacturer': {
          '@type': 'Organization',
          'name': 'Salvin Industries',
          'url': 'https://spares.salvinindia.com',
          'logo': 'https://spares.salvinindia.com/salvin_logo.png',
        },
        'offers': {
          '@type': 'Offer',
          'priceCurrency': 'INR',
          'availability': 'https://schema.org/InStock',
          'seller': {
            '@type': 'Organization',
            'name': 'Salvin Industries',
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
            'item': 'https://spares.salvinindia.com/spares-service/home',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Machineries',
            'item': 'https://spares.salvinindia.com/spares-service/machineries',
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
 * Updates DOM head metadata and Schema.org for Machineries Listing Page (/spares-service/machineries)
 */
export function updateMachineriesListSEO(machines = []) {
  const pageTitle = 'Food Processing & Packaging Machineries Manufacturer | Salvin Industries';
  const cleanDesc = 'Explore heavy-duty spice grinding mills, pulverizers, powder packaging lines, liquid filling bottling plants, and dal mill machinery manufactured by Salvin Industries.';
  const canonicalUrl = 'https://spares.salvinindia.com/spares-service/machineries';

  document.title = pageTitle;

  const setMetaTag = (selector, attrName, attrVal, content) => {
    let tag = document.querySelector(selector);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attrName, attrVal);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  setMetaTag('meta[name="description"]', 'name', 'description', cleanDesc);
  setMetaTag(
    'meta[name="keywords"]',
    'name',
    'keywords',
    'Food Processing Machineries, Spice Pulverizer, Powder Packaging Machine, Liquid Bottling Line, Dal Mill Machinery, Salvin Industries'
  );

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);

  // Schema.org ItemList for Machineries Catalog
  let scriptTag = document.getElementById('machineries-catalog-schema-jsonld');
  if (!scriptTag) {
    scriptTag = document.createElement('script');
    scriptTag.id = 'machineries-catalog-schema-jsonld';
    scriptTag.type = 'application/ld+json';
    document.head.appendChild(scriptTag);
  }

  const itemListElements = machines.slice(0, 15).map((m, idx) => ({
    '@type': 'ListItem',
    'position': idx + 1,
    'name': m.machine_name,
    'url': `https://spares.salvinindia.com/spares-service/machineries/${m.slug || m.id}`,
  }));

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'name': 'Salvin Industries Food Processing & Packaging Machineries',
    'description': cleanDesc,
    'url': canonicalUrl,
    'numberOfItems': machines.length,
    'itemListElement': itemListElements,
  };

  scriptTag.textContent = JSON.stringify(jsonLdData);
}
