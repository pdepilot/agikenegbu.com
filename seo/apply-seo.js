/**
 * Enterprise SEO injector for AG Ikenebgu & SDTG static HTML sites.
 * Run: node seo/apply-seo.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const siteConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'site-config.json'), 'utf8'));
const pagesAg = JSON.parse(fs.readFileSync(path.join(__dirname, 'pages-ag.json'), 'utf8'));
const pagesSdtg = JSON.parse(fs.readFileSync(path.join(__dirname, 'pages-sdtg.json'), 'utf8'));

const FAQS = {
  faqRegistration: [
    { q: 'Is registration for Send Down Thy Glory free?', a: 'Yes. Registration for Send Down Thy Glory 2026 is completely free for both in-person and online attendance.' },
    { q: 'Can I attend Send Down Thy Glory online?', a: 'Absolutely. You can register for online participation and watch the livestream from anywhere in the world on our Livestream page.' },
    { q: 'Is accommodation available for SDTG attendees?', a: 'We provide guidance on hotels, transport, and arrival tips for delegates traveling to Owerri. Visit our Registration page for travel and accommodation resources.' }
  ],
  faqDonate: {
    ag: [
      { q: 'How can I donate to AG Ikenebgu?', a: 'You can give online through our secure Give page using bank transfer or supported payment methods. Tithes, offerings, charity, and building fund gifts are welcome.' },
      { q: 'Are international donations accepted?', a: 'Yes. AG Ikenebgu accepts donations from partners in Nigeria and abroad. Contact us for international transfer details if needed.' }
    ],
    sdtg: [
      { q: 'How can I donate to Send Down Thy Glory?', a: 'Visit our Donate page to give securely online. Your gift supports crusades, evangelism, charity, media ministry, and community outreach.' },
      { q: 'Are international donations accepted?', a: 'Yes. Send Down Thy Glory welcomes partners and donors from Nigeria and around the world.' }
    ]
  },
  faqLivestream: [
    { q: 'How do I watch Send Down Thy Glory live?', a: 'Visit our Livestream page during the event dates. You can watch on YouTube, Facebook, and our official broadcast channels — no account required.' },
    { q: 'Will SDTG sessions be recorded?', a: 'Yes. Key sessions and worship moments are archived in our Gallery for replay after the live broadcast.' }
  ]
};

function absUrl(base, p) {
  if (!p) return base;
  if (p.startsWith('http')) return p;
  return base.replace(/\/$/, '') + (p.startsWith('/') ? p : '/' + p);
}

function buildMetaBlock(page, site, project) {
  const base = site.baseUrl;
  const canonicalPath = page.canonical || page.path;
  const canonical = absUrl(base, canonicalPath === '/' ? '/' : canonicalPath);
  const url = absUrl(base, page.path === '/' ? '/' : page.path);
  const image = absUrl(base, page.image || site.defaultImage);
  const robots = page.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const prefix = page.basePathPrefix || '';

  return `        <!-- SEO: ${project} -->
        <title>${page.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="${page.description}">
        <meta name="keywords" content="${page.keywords}">
        <meta name="robots" content="${robots}">
        <meta name="author" content="${site.siteName}">
        <link rel="canonical" href="${canonical}">
        <meta name="theme-color" content="${project === 'ag' ? '#1A2B5C' : '#1a0a2e'}">

        <!-- Open Graph -->
        <meta property="og:locale" content="${site.locale}">
        <meta property="og:type" content="${page.ogType || 'website'}">
        <meta property="og:site_name" content="${site.siteName}">
        <meta property="og:title" content="${page.title}">
        <meta property="og:description" content="${page.description}">
        <meta property="og:url" content="${url}">
        <meta property="og:image" content="${image}">
        <meta property="og:image:alt" content="${page.imageAlt || site.siteName}">

        <!-- Twitter / X -->
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${page.title}">
        <meta name="twitter:description" content="${page.description}">
        <meta name="twitter:image" content="${image}">
        <meta name="twitter:image:alt" content="${page.imageAlt || site.siteName}">

        <link rel="alternate" hreflang="en-ng" href="${url}">
        <link rel="alternate" hreflang="en" href="${url}">
        <link rel="alternate" hreflang="x-default" href="${url}">`;
}

function breadcrumbSchema(page, site) {
  const items = (page.breadcrumb || []).map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: b.name,
    item: absUrl(site.baseUrl, b.path)
  }));
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
}

function organizationSchema(site, project) {
  const s = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.siteName,
    url: site.baseUrl,
    logo: absUrl(site.baseUrl, site.logo),
    email: site.email,
    telephone: site.phone,
    sameAs: project === 'ag' ? Object.values(site.social || {}) : []
  };
  if (project === 'sdtg') {
    s.parentOrganization = {
      '@type': 'Organization',
      name: 'AG Ikenebgu Assemblies of God',
      url: siteConfig.ag.baseUrl
    };
  }
  return s;
}

function churchSchema(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    '@id': site.baseUrl + '/#church',
    name: site.siteName,
    description: 'A spirit-filled Assemblies of God church proclaiming the full Gospel in Port Harcourt, Nigeria.',
    url: site.baseUrl,
    telephone: site.phone,
    email: site.email,
    image: absUrl(site.baseUrl, site.defaultImage),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: 'NG'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude
    },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '08:00',
      closes: '13:00'
    }],
    denomination: 'Assemblies of God',
    hasMap: 'https://maps.google.com/?q=AG+Ikenegbu+Port+Harcourt+Nigeria'
  };
}

function localBusinessSchema(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': site.baseUrl + '/#localbusiness',
    name: site.siteName,
    image: absUrl(site.baseUrl, site.logo),
    url: site.baseUrl,
    telephone: site.phone,
    email: site.email,
    priceRange: 'Free',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: 'NG'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.latitude,
      longitude: site.geo.longitude
    }
  };
}

function websiteSchema(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': site.baseUrl + '/#website',
    name: site.siteName,
    url: site.baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: site.baseUrl + '/sermons?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };
}

function eventSchema(site) {
  const e = site.event;
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: e.name,
    description: 'Send Down Thy Glory International Music Crusade — worship, prayer, miracles, and transformation in Owerri, Nigeria.',
    startDate: e.startDate,
    endDate: e.endDate,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: e.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Owerri',
        addressRegion: 'Imo State',
        addressCountry: 'NG'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: e.latitude,
        longitude: e.longitude
      }
    },
    image: absUrl(site.baseUrl, site.defaultImage),
    organizer: {
      '@type': 'Organization',
      name: site.siteName,
      url: site.baseUrl
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'NGN',
      availability: 'https://schema.org/InStock',
      url: site.baseUrl + '/registration'
    }
  };
}

function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rev. Bethel Nwanebu',
    jobTitle: 'Founder & Convener',
    worksFor: {
      '@type': 'Organization',
      name: 'Send Down Thy Glory International Music Crusade'
    },
    description: 'Founder of Send Down Thy Glory, called to host international gospel crusades that awaken revival across Africa and the world.'
  };
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

function imageGallerySchema(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Send Down Thy Glory Gallery',
    description: 'Digital archive of worship, miracles, and testimonies from Send Down Thy Glory crusades.',
    url: site.baseUrl + '/gallery'
  };
}

function videoCollectionSchema(site, project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: project === 'ag' ? 'AG Ikenebgu Sermon Library' : 'Send Down Thy Glory Video Archive',
    description: project === 'ag' ? 'Sermons and Bible teachings from AG Ikenebgu.' : 'Worship highlights and crusade videos from SDTG.',
    url: site.baseUrl + (project === 'ag' ? '/sermons' : '/gallery')
  };
}

function videoBroadcastSchema(site) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BroadcastEvent',
    name: 'Send Down Thy Glory Live Broadcast',
    isLiveBroadcast: true,
    videoFormat: 'HD',
    broadcastOfEvent: {
      '@type': 'Event',
      name: site.event.name
    },
    publishedOn: {
      '@type': 'BroadcastService',
      name: site.siteName,
      url: site.baseUrl + '/livestream'
    }
  };
}

function buildJsonLd(page, site, project) {
  const schemas = [];
  const types = page.schemas || [];

  types.forEach(t => {
    switch (t) {
      case 'organization': schemas.push(organizationSchema(site, project)); break;
      case 'church': if (project === 'ag') schemas.push(churchSchema(site)); break;
      case 'localBusiness': if (project === 'ag') schemas.push(localBusinessSchema(site)); break;
      case 'website': schemas.push(websiteSchema(site)); break;
      case 'breadcrumb': if (page.breadcrumb?.length) schemas.push(breadcrumbSchema(page, site)); break;
      case 'event': schemas.push(eventSchema(site)); break;
      case 'person': schemas.push(personSchema()); break;
      case 'imageGallery': schemas.push(imageGallerySchema(site)); break;
      case 'videoCollection': schemas.push(videoCollectionSchema(site, project)); break;
      case 'videoBroadcast': schemas.push(videoBroadcastSchema(site)); break;
      case 'faqRegistration': schemas.push(faqSchema(FAQS.faqRegistration)); break;
      case 'faqLivestream': schemas.push(faqSchema(FAQS.faqLivestream)); break;
      case 'faqDonate': schemas.push(faqSchema(project === 'ag' ? FAQS.faqDonate.ag : FAQS.faqDonate.sdtg)); break;
    }
  });

  if (!schemas.length) return '';
  const graph = schemas.length === 1 ? schemas[0] : { '@context': 'https://schema.org', '@graph': schemas };
  return `\n    <script type="application/ld+json">${JSON.stringify(graph)}</script>`;
}

function injectSeo(filePath, page, site, project) {
  let html = fs.readFileSync(filePath, 'utf8');
  const metaBlock = buildMetaBlock(page, site, project);
  const jsonLd = buildJsonLd(page, site, project);

  // Replace from charset through first description/keywords/viewport block
  const headPatterns = [
    /(<meta charset="[^"]*">\s*)(?:<meta charset="[^"]*">\s*)?<title>[\s\S]*?<\/title>\s*(?:<meta[^>]*>\s*)*(?:<link rel="canonical"[^>]*>\s*)?(?:<!--[\s\S]*?-->\s*)*(?:<meta property="og:[\s\S]*?>\s*)*(?:<meta name="twitter:[\s\S]*?>\s*)*(?:<link rel="alternate"[\s\S]*?>\s*)*)/i,
    /(<meta charset="[^"]*">\s*)<title>[\s\S]*?<\/title>\s*<meta content="width=device-width[\s\S]*?<meta content="[^"]*" name="description">\s*/i,
    /(<meta charset="UTF-8">\s*)<meta name="viewport"[\s\S]*?<meta name="theme-color"[^>]*>\s*/i,
    /(<meta charset="UTF-8">\s*)<meta name="viewport"[\s\S]*?(?:<meta name="theme-color"[^>]*>\s*)?/i
  ];

  let replaced = false;
  for (const pat of headPatterns) {
    if (pat.test(html)) {
      html = html.replace(pat, `$1${metaBlock}\n\n`);
      replaced = true;
      break;
    }
  }
  if (!replaced) {
    console.warn('  Could not match head pattern:', filePath);
    return;
  }

  // Remove duplicate JSON-LD if re-running
  html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');

  // Inject JSON-LD before </head>
  if (jsonLd) {
    html = html.replace('</head>', `${jsonLd}\n</head>`);
  }

  // Add performance SEO script if missing
  const perfScript = project === 'ag'
    ? '<script src="js/seo-performance.js" defer></script>'
    : '<script src="js/seo-performance.js" defer></script>';
  const perfPath = project === 'ag' ? 'js/seo-performance.js' : 'js/seo-performance.js';
  const scriptTag = `<script src="${page.basePathPrefix || ''}${perfPath}" defer></script>`;

  if (!html.includes('seo-performance.js')) {
    html = html.replace('</head>', `    ${scriptTag}\n</head>`);
  }

  // Add geo meta for AG contact/index/about
  if (project === 'ag' && site.geo && !html.includes('geo.position')) {
    const geoBlock = `        <meta name="geo.region" content="NG-RI">\n        <meta name="geo.placename" content="${site.address.city}, ${site.address.region}, Nigeria">\n        <meta name="geo.position" content="${site.geo.latitude};${site.geo.longitude}">\n        <meta name="ICBM" content="${site.geo.latitude}, ${site.geo.longitude}">\n`;
    html = html.replace('<!-- SEO: ag -->', `<!-- SEO: ag -->\n${geoBlock}`);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('  ✓', path.relative(ROOT, filePath));
}

// Apply AG pages
console.log('Applying AG Ikenebgu SEO...');
Object.entries(pagesAg).forEach(([rel, page]) => {
  const fp = path.join(ROOT, rel);
  if (fs.existsSync(fp)) injectSeo(fp, page, siteConfig.ag, 'ag');
});

// Apply SDTG pages
console.log('Applying SDTG SEO...');
Object.entries(pagesSdtg).forEach(([rel, page]) => {
  const fp = path.join(ROOT, 'sdgt', rel);
  if (fs.existsSync(fp)) injectSeo(fp, page, siteConfig.sdtg, 'sdtg');
});

console.log('Done.');
