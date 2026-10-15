import { ReelItem, ServiceCategory, ProcessStep, RatePackage } from '../types';

// Image and video assets for Main Character Media
export const ASSETS = {
  heroBanner: '/src/assets/images/hero_cinematic_moment_1792055917139.jpg',
  founderPortrait: '/src/assets/images/founder_prachi_portrait_1792055917956.jpg',
  reelPoster1: '/reels/poster_5608.png',
  reelPoster2: '/reels/poster_5609.png',
  reelPoster3: '/reels/poster_5610.png',
  reelPoster4: '/reels/poster_5611.png',
};

export const siteConfig = {
  brandName: 'The Main Character Media',
  tagline: "Life doesn't happen in perfect takes.",
  heroSubcopy:
    "And honestly, that's the best part. We capture the unfiltered emotions, spontaneous moments, and unforgettable energy that make every celebration yours.",
  about: {
    title: 'Stories With A Personality',
    tagline: 'CREATIVE CONTENT PRODUCTION',
    body: 'Main Character Media is a creative content production brand specialising in weddings, celebrations, and events. We shoot and edit videos that capture real emotions, unforgettable moments, and the energy of every occasion.',
  },
  founder: {
    name: 'Prachi Pamnani',
    age: 21,
    role: 'Founder & Creative Lead',
    paragraphs: [
      'Some people collect memories. I collect moments, camera shots, and approximately a million creative ideas.',
      "I'm Prachi Pamnani, 21, and I'm building The Main Character Media — where storytelling meets a little madness, creativity has no off switch, and every frame has a reason to exist.",
      "From wedding chaos to brand magic, I love creating visuals that don't just look good on your feed but actually make you stop scrolling.",
      "I'm here to experiment, create, mess around with ideas, and build something that feels a little different from the usual.",
      'No boring frames. No copy-paste creativity. Just stories with a personality.',
    ],
  },
  contact: {
    whatsappNumber: '918446646306',
    displayPhone: '84466 46306',
    instagramUrl: '', // Example: 'https://instagram.com/themaincharactermedia'
    email: '', // Example: 'hello@maincharactermedia.com'
    locationNotice: 'Available for celebrations across India & destination events worldwide',
  },
};

export const portfolioReels: ReelItem[] = [
  {
    id: 'reel-5608',
    reelId: 'IMG_5608',
    title: 'The Golden Hour Groom Arrival',
    category: 'Groom Entry & Celebrations',
    instagramUrl: 'https://www.instagram.com/',
    directVideoUrl: '/reels/IMG_5608.MP4',
    posterImage: ASSETS.reelPoster1,
    description:
      'Golden hour warmth, classic vintage car arrival, and the electrifying anticipation before celebrations ignite.',
    date: 'Selected Reel',
    duration: '0:53',
    location: 'Rajasthan',
  },
  {
    id: 'reel-5609',
    reelId: 'IMG_5609',
    title: 'Just Married Midnight Walk',
    category: 'Cocktail & Couple Stories',
    instagramUrl: 'https://www.instagram.com/',
    directVideoUrl: '/reels/IMG_5609.MP4',
    posterImage: ASSETS.reelPoster2,
    description:
      'Unfiltered smiles, electric chemistry, and the celebratory newlywed exit under dramatic cinematic lighting.',
    date: 'Selected Reel',
    duration: '0:34',
    location: 'Palace Courtyard',
  },
  {
    id: 'reel-5610',
    reelId: 'IMG_5610',
    title: 'Behrana Sahib Sacred Festivities',
    category: 'Sacred Rituals & Heritage',
    instagramUrl: 'https://www.instagram.com/',
    directVideoUrl: '/reels/IMG_5610.MP4',
    posterImage: ASSETS.reelPoster3,
    description:
      'Soulful hymns, sacred flames, floral offerings, and authentic cultural roots captured in rich cinematic detail.',
    date: 'Selected Reel',
    duration: '1:03',
    location: 'Traditional Heritage',
  },
  {
    id: 'reel-5611',
    reelId: 'IMG_5611',
    title: 'Sacred Vows & Bridal Grace',
    category: 'Wedding Ceremonies & Love',
    instagramUrl: 'https://www.instagram.com/',
    directVideoUrl: '/reels/IMG_5611.MP4',
    posterImage: ASSETS.reelPoster4,
    description:
      'Intimate bridal emotions, delicate chooda & ritual details, and timeless wedding promises surrounded by family.',
    date: 'Selected Reel',
    duration: '1:27',
    location: 'Wedding Pavilion',
  },
];

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'weddings-love',
    title: 'Weddings & Love',
    subtitle: 'Full-spectrum celebration & ritual storytelling',
    description:
      'From intimate pre-wedding moments to high-octane sangeet nights and sacred rituals. We capture the pulse of your wedding without making you pose uncomfortably.',
    items: [
      'Weddings & pre-wedding shoots',
      'Engagements & Roka ceremonies',
      'Haldi & Mehendi festivities',
      'Sangeet & Cocktail nights',
      'Garba & Raas celebrations',
      'Mameru & Pithi rituals',
      'Wedding ceremonies & Pheras',
      'Bridal & Groom candid moments',
    ],
  },
  {
    id: 'little-beginnings',
    title: 'Little Beginnings',
    subtitle: 'Priceless milestones of new chapters',
    description:
      'Gentle, heartfelt frames celebrating new arrivals, family beginnings, and precious early milestones.',
    items: [
      'Baby showers & Godh Bharai',
      'Baby welcome home celebrations',
      'Naming ceremonies (Naamkaran)',
      'Newborn & hospital homecoming moments',
      'First birthdays & cake smashes',
    ],
  },
  {
    id: 'lifes-celebrations',
    title: "Life's Celebrations",
    subtitle: 'Milestones that deserve main-character spotlight',
    description:
      'Birthdays that turn legendary, silver anniversaries, and personal triumphs captured with vibrant, modern storytelling.',
    items: [
      'Milestone birthdays & surprise parties',
      'Anniversaries & vow renewals',
      'Graduation & personal achievement bashes',
      'Curated private dinner parties & gatherings',
    ],
  },
  {
    id: 'brands-events',
    title: 'Brands & Events',
    subtitle: 'Social-first commercial & experience visuals',
    description:
      'Content that makes audiences stop scrolling. Tailored for modern lifestyle brands, dynamic pop-ups, product launches, and corporate experiences.',
    items: [
      'Brand events & experiential pop-ups',
      'Corporate galas & annual conventions',
      'Product launches & gallery exhibitions',
      'Brand aesthetic shoots & campaigns',
      'Social media Reels & high-retention stories',
    ],
  },
];

export const specialCapabilities = [
  {
    title: 'Wedding Content Creation',
    description: 'Dedicated iPhone & cinematic shooter capturing vertical video for instant sharing.',
  },
  {
    title: 'Behind-The-Scenes (BTS)',
    description: 'Raw, unscripted moments of getting ready, family banter, and candid interactions.',
  },
  {
    title: 'Instagram Reels & Trending Formats',
    description: 'Snappy edits synchronized to contemporary soundtracks and trending aesthetic rhythms.',
  },
  {
    title: 'Real-Time Wedding Stories',
    description: 'Same-day unedited snippets and fast turnaround drops so guests relive the moment live.',
  },
  {
    title: 'Wedding Social Media Management',
    description: 'End-to-end takeover of your wedding hashtag, stories, and feed curation during festivities.',
  },
  {
    title: 'Creative Content Planning',
    description: 'Moodboards, shotlists, audio curation, and timeline coordination beforehand.',
  },
];

export const creativeProcess: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    tagline: 'Getting to know your vision',
    description:
      'We understand the client, the occasion, the creative vision, and the specific deliverables you desire.',
    highlights: ['Vibe & aesthetic alignment', 'Deliverable scope clarification', 'Moodboarding & music preferences'],
  },
  {
    number: '02',
    title: 'Plan',
    tagline: 'Coordinating the blueprint',
    description:
      'We coordinate functions, locations, timelines, and content requirements so everything flows effortlessly.',
    highlights: ['Function-by-function schedule', 'Key family & friend priority list', 'Real-time sharing timeline'],
  },
  {
    number: '03',
    title: 'Create',
    tagline: 'Capturing unfiltered magic',
    description:
      'We capture the agreed moments on ground and produce the agreed content with an eye for spontaneous energy.',
    highlights: ['Discreet, unobtrusive presence', 'High-res vertical & cinematic capture', 'Zero awkward posing demands'],
  },
  {
    number: '04',
    title: 'Deliver',
    tagline: 'Reliving the celebration',
    description:
      'We edit and deliver according to the confirmed scope and timeline, ready for your feed and family archives.',
    highlights: ['Color grading & audio sync', 'Reels, raw reels archives & recap cuts', 'Cloud gallery access'],
  },
];

export const ratePackages: RatePackage[] = [
  {
    id: 'wedding-essentials',
    name: 'Wedding Content Essentials',
    category: 'Weddings & Celebrations',
    priceNote: 'Every celebration is different. Tell us about your plans for a personalised quote.',
    description:
      'Ideal for single-day weddings or key ceremonies requiring social-first content creation and prompt reel drops.',
    coverage: 'Up to 8 hours single-day coverage',
    functions: '1–2 continuous functions (e.g., Haldi + Wedding or Sangeet only)',
    deliverables: [
      '2–3 fully edited, high-retention Instagram Reels',
      'All raw video snippets delivered via Cloud drive within 24 hours',
      'Real-time raw story drops during the event for instant posting',
      'Curated audio selection & aesthetic color grading',
    ],
    addons: ['Additional function coverage', 'Express same-night highlight drop', 'Drone candid clips'],
    termsNote: 'Travel and accommodation for destination events billed at actuals upon agreement.',
  },
  {
    id: 'multi-function-signature',
    name: 'Multi-Function Signature',
    category: 'Full Wedding Celebration',
    popular: true,
    priceNote: 'Every celebration is different. Tell us about your plans for a personalised quote.',
    description:
      'Comprehensive multi-day coverage designed for the complete wedding journey, capturing rituals from Roka to Vidaai.',
    coverage: '2–3 days comprehensive multi-function coverage',
    functions: 'Up to 4–5 functions (Mehendi, Haldi, Sangeet/Cocktail, Ceremony & Reception)',
    deliverables: [
      '5–7 bespoke cinematic Instagram Reels',
      'Comprehensive raw library organized by ceremony',
      'Dedicated behind-the-scenes moments with bride, groom & close crew',
      'Real-time daily story drops for couple & family social channels',
      '1 Extended celebration recap reel',
    ],
    addons: ['Pre-wedding couple reel', 'Second content creator shooter', 'Dedicated social manager'],
    termsNote: 'Dates are secured upon confirmed agreement. Flexible itinerary changes supported.',
  },
  {
    id: 'social-director',
    name: 'Social Media Management & BTS',
    category: 'Content Creation & Live Management',
    priceNote: 'Every celebration is different. Tell us about your plans for a personalised quote.',
    description:
      'Hands-off peace of mind for couples who want their social channels managed effortlessly while they immerse in the moment.',
    coverage: 'Full celebration duration with active feed & story updates',
    functions: 'All agreed celebration festivities',
    deliverables: [
      'Complete wedding Instagram account takeover / coordination',
      'Continuous story posting with custom wedding typography & branding',
      'Trend-adapted vertical reels edited during celebrations',
      'Archived digital album with all guest interactions',
    ],
    addons: ['Collaborative QR code guest collection page', 'Custom event filter coordination'],
    termsNote: 'Requires delegate access to designated Instagram account or co-author collaboration.',
  },
  {
    id: 'brand-events-showcase',
    name: 'Brands & Commercial Events',
    category: 'Corporate & Brand Storytelling',
    priceNote: 'Every celebration is different. Tell us about your plans for a personalised quote.',
    description:
      'High-impact visual narratives for experiential launches, corporate celebrations, pop-ups, and brand campaigns.',
    coverage: 'Half-day or full-day commercial event coverage',
    functions: 'Product launch, pop-up, corporate summit, or exhibition',
    deliverables: [
      '2–4 polished commercial vertical reels optimized for reach & engagement',
      '1 Horizontal event recap video for company channels',
      'High-resolution raw B-roll and speaker/attendee candid moments',
      'Commercial usage license for brand social channels',
    ],
    addons: ['Same-day press teaser cut', 'Multi-camera keynotes coverage'],
    termsNote: 'Commercial licensing terms tailored to distribution platforms.',
  },
];
