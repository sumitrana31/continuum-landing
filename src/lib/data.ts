// =============================================
// CONTINUUM - SINGLE SOURCE OF TRUTH
// All copy, content, and sample data
// =============================================

export const brand = {
  name: "Continuum",
  tagline: "Training people actually finish.",
  mission:
    "We deliver premium training assets at production speed so teams stay compliant without wasting time.",
  heroEyebrow: "Compliance Training Studio",
  heroSubhead:
    "Cinematic, scenario-based modules delivered in days. Script, video, deck, PDF, and captions in one LMS-ready pack.",
  primaryCta: "Book a 15-min call",
  secondaryCta: "See sample modules",
  // Placeholder: Replace with actual Calendly or booking link
  bookingUrl: "#book-a-call",
};

export const proofChips = [
  { label: "48-hour first cut", icon: "clock" },
  { label: "LMS-ready asset pack", icon: "check" },
  { label: "2 revision rounds", icon: "refresh" },
];

export const navLinks = [
  { label: "Videos", href: "#videos" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Pilot Kit", href: "#book-a-call" },
  { label: "FAQ", href: "#faq" },
];

export const problemCards = [
  {
    id: "too-long",
    title: "Too long",
    description: "Completion drops after 3 minutes when modules run long.",
    stat: "70%",
    statLabel: "drop-off rate",
  },
  {
    id: "too-dull",
    title: "Too dull",
    description: "Slides and stock footage lose attention fast.",
    stat: "12%",
    statLabel: "retention after 24hrs",
  },
  {
    id: "too-slow",
    title: "Too slow",
    description: "Months-long production cycles kill momentum.",
    stat: "4-6",
    statLabel: "months average",
  },
];

export const audienceSegments = [
  "L&D teams",
  "People Ops",
  "Compliance",
  "IT Security",
  "Operations",
];

export const differentiators = [
  {
    title: "Story-first scripts",
    description:
      "We shape scripts around real scenarios so people recognize the moment and act on it.",
  },
  {
    title: "Production-grade visuals",
    description:
      "Cinematic editing, tight pacing, and purposeful sound design keep attention locked in.",
  },
  {
    title: "LMS-ready packaging",
    description:
      "Video, deck, PDF, and captions delivered together so launch is painless.",
  },
];

export const outcomeStats = [
  { value: "90-180 sec", label: "Module length" },
  { value: "48h", label: "First cut" },
  { value: "~3 days", label: "Typical delivery" },
  { value: "2 rounds", label: "Revisions included" },
];

export const deliverables = [
  { id: "video", label: "Video", icon: "video" },
  { id: "pdf", label: "PDF", icon: "document" },
  { id: "powerpoint", label: "PowerPoint", icon: "presentation" },
  { id: "stills", label: "Stills", icon: "image" },
  { id: "captions", label: "Captions", icon: "captions" },
  { id: "scripts", label: "Scripts", icon: "script" },
];

export const styleOptions = [
  {
    id: "cinematic",
    label: "Cinematic",
    gradient: "linear-gradient(135deg, #0b0f14 0%, #122032 50%, #0a0f1a 100%)",
    accent: "#59d6ff",
  },
  {
    id: "hyperreal",
    label: "Hyperreal",
    gradient: "linear-gradient(135deg, #1a0f0a 0%, #2b1d12 50%, #120a08 100%)",
    accent: "#ff7a5c",
  },
  {
    id: "anime",
    label: "Anime",
    gradient: "linear-gradient(135deg, #0b1a14 0%, #10251b 50%, #0a120f 100%)",
    accent: "#b6ff7a",
  },
  {
    id: "motion-graphics",
    label: "Motion Graphics",
    gradient: "linear-gradient(135deg, #11161f 0%, #182233 50%, #0b111a 100%)",
    accent: "#ffd166",
  },
];

export const workSamples = [
  {
    id: 1,
    title: "Fire Safety: Evacuation in 90 Seconds",
    description:
      "A fast-paced, scenario-driven module showing proper evacuation procedures. Cinematic visuals with clear call-outs and real-world scenarios.",
    formats: ["video", "pdf", "presentation"],
    duration: "1:30",
    style: "Cinematic",
    deliverables: [
      "HD video with burned-in captions",
      "Trainer guide PDF",
      "Slide deck for live sessions",
      "5 key-frame stills",
    ],
  },
  {
    id: 2,
    title: "GDPR Essentials: Data Handling",
    description:
      "Interactive module covering data protection fundamentals. Uses real workplace scenarios to demonstrate proper data handling procedures.",
    formats: ["video", "pdf", "presentation"],
    duration: "2:15",
    style: "Motion Graphics",
    deliverables: [
      "Animated explainer video",
      "Quick reference PDF",
      "Assessment deck",
      "Policy summary sheet",
    ],
  },
  {
    id: 3,
    title: "Cybersecurity: Phishing Awareness",
    description:
      "Engaging module teaching employees to identify and respond to phishing attempts through realistic email simulations.",
    formats: ["video", "pdf"],
    duration: "1:45",
    style: "Hyperreal",
    deliverables: [
      "Video with interactive elements",
      "Pocket guide PDF",
      "Email examples collection",
      "Reporting flowchart",
    ],
  },
  {
    id: 4,
    title: "Workplace Harassment Prevention",
    description:
      "Sensitive, scenario-based training covering recognition, prevention, and reporting of workplace harassment.",
    formats: ["video", "pdf", "presentation"],
    duration: "3:00",
    style: "Cinematic",
    deliverables: [
      "Multi-part video series",
      "Manager toolkit PDF",
      "Workshop slides",
      "Resource directory",
    ],
  },
  {
    id: 5,
    title: "Health & Safety: Manual Handling",
    description:
      "Practical demonstration of proper lifting techniques and ergonomic principles for warehouse and office environments.",
    formats: ["video", "pdf"],
    duration: "2:00",
    style: "Anime",
    deliverables: [
      "Technique demonstration video",
      "Illustrated guide PDF",
      "Assessment checklist",
      "Poster set",
    ],
  },
  {
    id: 6,
    title: "DEI Fundamentals: Inclusive Workplace",
    description:
      "Foundation module on diversity, equity, and inclusion principles with practical workplace applications.",
    formats: ["video", "pdf", "presentation"],
    duration: "2:30",
    style: "Motion Graphics",
    deliverables: [
      "Animated overview video",
      "Discussion guide PDF",
      "Facilitator deck",
      "Action planning worksheet",
    ],
  },
];

export const processSteps = [
  {
    id: 1,
    title: "Brief",
    duration: "15-30 min",
    description: "We capture your objectives, audience, and tone in a focused kickoff call.",
    deliverables: ["Objectives document", "Audience profile", "Tone guidelines"],
  },
  {
    id: 2,
    title: "Script + Storyboard",
    duration: "Same day",
    description: "We draft the narrative and visual approach for your approval checkpoint.",
    deliverables: ["Full script", "Visual storyboard", "Asset list"],
  },
  {
    id: 3,
    title: "First Cut",
    duration: "48 hours",
    description: "A cinematic draft with placeholder audio, ready for your first feedback round.",
    deliverables: ["Draft video", "Feedback form", "Revision checklist"],
  },
  {
    id: 4,
    title: "Final Pack",
    duration: "~3 business days",
    description: "Polished exports and all supporting assets, packaged for your LMS.",
    deliverables: ["Final video (MP4)", "Subtitle files (SRT/VTT)", "PDF assets", "Source files"],
  },
];

export const pricingPlans = [
  {
    id: "pilot",
    name: "Pilot",
    description: "Test the waters with a single module and full asset pack.",
    features: [
      "1 video module (up to 3 min)",
      "Full asset pack included",
      "Script + storyboard",
      "Two revision rounds",
      "All export formats",
    ],
    cta: "Book a call",
    price: "Pilot pricing",
    popular: false,
  },
  {
    id: "project",
    name: "Project",
    description: "Bundle of modules for a complete training pathway.",
    features: [
      "3–10 video modules",
      "Pathway planning session",
      "Consistent brand style",
      "Full asset packs per module",
      "Two revision rounds per module",
      "Priority scheduling",
    ],
    cta: "Book a call",
    price: "Volume pricing",
    popular: true,
  },
  {
    id: "retainer",
    name: "Retainer",
    description: "Ongoing monthly output with priority queue.",
    features: [
      "Monthly module allocation",
      "Priority production queue",
      "Dedicated account manager",
      "Consistent brand style",
      "Rollover unused modules",
      "Quarterly planning calls",
    ],
    cta: "Book a call",
    price: "Monthly pricing",
    popular: false,
  },
];

export const pricingIncludes = [
  "Script and storyboard",
  "Brand-matched visual style",
  "Captions and transcripts",
  "LMS-ready exports",
  "Two revision rounds",
];

export const leadMagnet = {
  title: "Pilot kit + 15-min fit check",
  bullets: [
    "Core compliance topic map",
    "Microlearning storyboard template",
    "Pilot brief checklist",
    "Module length and pacing guide",
    "Example production timeline",
  ],
  successMessage:
    "Thanks! Check your inbox for your pilot kit and next steps.",
};

export const faqs = [
  {
    question: "What does a pilot include?",
    answer:
      "One focused module (up to 3 minutes) with the full asset pack: video, deck, PDF, captions, and stills. Script and storyboard included.",
  },
  {
    question: "Do you provide an LMS?",
    answer:
      "No. We produce training assets (videos, PDFs, decks, images) that are compatible with any LMS. You deploy them through your existing platform or internal channels.",
  },
  {
    question: "How fast can you deliver?",
    answer:
      "First cut in 48 hours. Typical final delivery in approximately 3 business days, depending on feedback turnaround and complexity.",
  },
  {
    question: "Can you work with our existing materials?",
    answer:
      "Yes. We can adapt your decks, policies, and SME notes or build a new script from scratch.",
  },
  {
    question: "How many revisions are included?",
    answer:
      "Two revision rounds are included in every project. Additional rounds can be added at a clearly quoted rate.",
  },
  {
    question: "Can you match our brand?",
    answer:
      "Absolutely. Provide your brand kit (logos, colors, fonts, tone guidelines) and we'll create training that feels native to your organisation.",
  },
  {
    question: "What formats do you deliver?",
    answer:
      "Standard deliverables include MP4 video (with burned-in captions), separate SRT/VTT subtitle files, PDF documents, PPTX decks, and PNG/JPG stills.",
  },
  {
    question: "Do you do voiceover?",
    answer:
      "Yes. We offer professional voiceover options including male/female voices, multiple accents, and AI-generated voice with human direction.",
  },
  {
    question: "Can you handle sensitive topics?",
    answer:
      "Yes. We work from your approved policies and briefing documents to ensure accuracy and appropriate tone for sensitive subjects like harassment, discrimination, and mental health.",
  },
  {
    question: "What do you need from us?",
    answer:
      "At minimum: your audience, learning objectives, key constraints, and any reference materials. A brand kit and existing policies help us move faster.",
  },
];

export const footer = {
  tagline: "Training people actually finish.",
  disclaimer:
    "Continuum delivers training assets; your organisation remains responsible for compliance decisions and deployment.",
  copyright: `© ${new Date().getFullYear()} Continuum. All rights reserved.`,
};

// =============================================
// VIDEO LIBRARY
// Compliance Video Content by Grade Level
// =============================================

export type GradeLevel = "elementary" | "middle-school" | "high-school";

export interface Video {
  title: string;
  youtubeUrl: string;
  youtubeId: string;
}

export interface Pillar {
  id: string;
  name: string;
  icon: string;
  videos: Video[];
}

export interface GradeLevelContent {
  id: GradeLevel;
  name: string;
  description: string;
  pillars: Pillar[];
}

// Helper to extract YouTube ID from URL
const getYouTubeId = (url: string): string => {
  const match = url.match(/youtu\.be\/([^?]+)/);
  return match ? match[1] : "";
};

export const videoLibrary: GradeLevelContent[] = [
  {
    id: "elementary",
    name: "Elementary",
    description: "Age-appropriate digital citizenship and safety content for younger learners",
    pillars: [
      {
        id: "cybersecurity-basics",
        name: "Cybersecurity Basics",
        icon: "shield",
        videos: [
          { title: "Don't Click That!", youtubeUrl: "https://youtu.be/_wfhLZSPyCo", youtubeId: "_wfhLZSPyCo" },
          { title: "Phishing Made Simple", youtubeUrl: "https://youtu.be/c0gxVlk4tf4", youtubeId: "c0gxVlk4tf4" },
        ],
      },
      {
        id: "data-privacy",
        name: "Data Privacy & Protection",
        icon: "lock",
        videos: [
          { title: "Personal Info: What's Okay to Share?", youtubeUrl: "https://youtu.be/9_vzp9eRaRw", youtubeId: "9_vzp9eRaRw" },
          { title: "The Digital Trail You Leave Behind", youtubeUrl: "https://youtu.be/qsqN-myEWyc", youtubeId: "qsqN-myEWyc" },
        ],
      },
      {
        id: "device-security",
        name: "Device/Account Security",
        icon: "device",
        videos: [
          { title: "Taking Care of Your Device", youtubeUrl: "https://youtu.be/wIiwxYz8Jk0", youtubeId: "wIiwxYz8Jk0" },
          { title: "Sharing Accounts Isn't Sharing Toys", youtubeUrl: "https://youtu.be/Yc4IEqBqGcA", youtubeId: "Yc4IEqBqGcA" },
        ],
      },
      {
        id: "ai-safety",
        name: "Engaging AI Safely",
        icon: "ai",
        videos: [
          { title: "Is that a Robot or a Person?", youtubeUrl: "https://youtu.be/HOqhcPtlLfQ", youtubeId: "HOqhcPtlLfQ" },
        ],
      },
      {
        id: "healthy-tech",
        name: "Healthy Tech Use",
        icon: "heart",
        videos: [
          { title: "When Tech Makes You Tired", youtubeUrl: "https://youtu.be/1oUAt0gbbb0", youtubeId: "1oUAt0gbbb0" },
          { title: "Focus First, Fun Later", youtubeUrl: "https://youtu.be/U6Ow_fsOcFU", youtubeId: "U6Ow_fsOcFU" },
          { title: "Screen Time Balance", youtubeUrl: "https://youtu.be/z12Zdt43DgI", youtubeId: "z12Zdt43DgI" },
        ],
      },
      {
        id: "media-literacy",
        name: "Media Literacy",
        icon: "search",
        videos: [
          { title: "Check with a Grown Up", youtubeUrl: "https://youtu.be/RsEQy6fTd-4", youtubeId: "RsEQy6fTd-4" },
          { title: "Can You Believe Everything Online?", youtubeUrl: "https://youtu.be/Vth9XGLfLn4", youtubeId: "Vth9XGLfLn4" },
        ],
      },
      {
        id: "safe-behavior",
        name: "Safe Online Behavior",
        icon: "users",
        videos: [
          { title: "Kindness Counts Online", youtubeUrl: "https://youtu.be/3pJPAB9Z9-s", youtubeId: "3pJPAB9Z9-s" },
          { title: "Classroom Technology Rules", youtubeUrl: "https://youtu.be/Ry7CNS2ZAP4", youtubeId: "Ry7CNS2ZAP4" },
        ],
      },
    ],
  },
  {
    id: "middle-school",
    name: "Middle School",
    description: "Intermediate content addressing real-world digital challenges for teens",
    pillars: [
      {
        id: "cybersecurity-basics",
        name: "Cybersecurity Basics",
        icon: "shield",
        videos: [
          { title: "The Dangers of Piracy & 'Free' Streaming", youtubeUrl: "https://youtu.be/JEWh3iu2GxQ", youtubeId: "JEWh3iu2GxQ" },
          { title: "Don't Get Hooked: Phishing & QR Code Traps", youtubeUrl: "https://youtu.be/pg5c92hdpro", youtubeId: "pg5c92hdpro" },
          { title: "Financial Scams on Venmo, Depop, and Cash App", youtubeUrl: "https://youtu.be/VfWbXWWaHLE", youtubeId: "VfWbXWWaHLE" },
        ],
      },
      {
        id: "data-privacy",
        name: "Data Privacy & Protection",
        icon: "lock",
        videos: [
          { title: "Your Digital Footprint & Personal Security", youtubeUrl: "https://youtu.be/KvWl_6dtRjQ", youtubeId: "KvWl_6dtRjQ" },
          { title: "Privacy on Social Media: Stop Oversharing", youtubeUrl: "https://youtu.be/O_2DwwNue4c", youtubeId: "O_2DwwNue4c" },
          { title: "What is Doxxing? How Your Info Is Used Against You", youtubeUrl: "https://youtu.be/pDoQNrfa3uA", youtubeId: "pDoQNrfa3uA" },
        ],
      },
      {
        id: "device-security",
        name: "Device/Account Security",
        icon: "device",
        videos: [
          { title: "Passwords & MFA for Social/Game Accounts", youtubeUrl: "https://youtu.be/fMM37BXlbis", youtubeId: "fMM37BXlbis" },
          { title: "Mobile Phone Security 101", youtubeUrl: "https://youtu.be/iUyUNOqR9Uo", youtubeId: "iUyUNOqR9Uo" },
          { title: "Safe Online Gaming: Protect Your Account", youtubeUrl: "https://youtu.be/X4liKSE5rPw", youtubeId: "X4liKSE5rPw" },
        ],
      },
      {
        id: "ai-safety",
        name: "Engaging AI Safely",
        icon: "ai",
        videos: [
          { title: "AI Can Help, But Don't Copy/Paste", youtubeUrl: "https://youtu.be/QTARzS1yb_g", youtubeId: "QTARzS1yb_g" },
          { title: "AI Knows A Lot, But Not Everything", youtubeUrl: "https://youtu.be/W1kCMhKzNQA", youtubeId: "W1kCMhKzNQA" },
        ],
      },
      {
        id: "healthy-tech",
        name: "Healthy Tech Use",
        icon: "heart",
        videos: [
          { title: "Why Apps Hook You: The Science of Digital Addiction", youtubeUrl: "https://youtu.be/HNR6C4WRF5w", youtubeId: "HNR6C4WRF5w" },
          { title: "Screen Time and Digital Balance: Taking Control", youtubeUrl: "https://youtu.be/s0gkpGGyMfs", youtubeId: "s0gkpGGyMfs" },
        ],
      },
      {
        id: "media-literacy",
        name: "Media Literacy",
        icon: "search",
        videos: [
          { title: "Echo Chambers & Filter Bubbles: Breaking Out of Your Feed", youtubeUrl: "https://youtu.be/0AOWMq_uM-4", youtubeId: "0AOWMq_uM-4" },
          { title: "Hidden Agendas: Ads, Clickbait, and Sponsored Content", youtubeUrl: "https://youtu.be/1Vjj3_J5JZM", youtubeId: "1Vjj3_J5JZM" },
          { title: "Spotting Fake News & Misinformation", youtubeUrl: "https://youtu.be/735ffirbdms", youtubeId: "735ffirbdms" },
        ],
      },
      {
        id: "safe-behavior",
        name: "Safe Online Behavior",
        icon: "users",
        videos: [
          { title: "Online Challenges and Risky Trends: What's the Real Cost?", youtubeUrl: "https://youtu.be/KI5D4hcNlAQ", youtubeId: "KI5D4hcNlAQ" },
          { title: "AI Friends: What's the Catch?", youtubeUrl: "https://youtu.be/lBGQ9_qNHfU", youtubeId: "lBGQ9_qNHfU" },
          { title: "Cyberbullying & Harassment: A Security Risk", youtubeUrl: "https://youtu.be/URAV9AX0woI", youtubeId: "URAV9AX0woI" },
        ],
      },
    ],
  },
  {
    id: "high-school",
    name: "High School",
    description: "Advanced content preparing students for real-world digital citizenship",
    pillars: [
      {
        id: "cybersecurity-basics",
        name: "Cybersecurity Basics",
        icon: "shield",
        videos: [
          { title: "The Dangers of Piracy & 'Free' Streaming", youtubeUrl: "https://youtu.be/JEWh3iu2GxQ", youtubeId: "JEWh3iu2GxQ" },
          { title: "Don't Get Hooked: Phishing & QR Code Traps", youtubeUrl: "https://youtu.be/pg5c92hdpro", youtubeId: "pg5c92hdpro" },
          { title: "Financial Scams on Venmo, Depop, and Cash App", youtubeUrl: "https://youtu.be/VfWbXWWaHLE", youtubeId: "VfWbXWWaHLE" },
        ],
      },
      {
        id: "data-privacy",
        name: "Data Privacy & Protection",
        icon: "lock",
        videos: [
          { title: "Your Digital Footprint & Personal Security", youtubeUrl: "https://youtu.be/KvWl_6dtRjQ", youtubeId: "KvWl_6dtRjQ" },
          { title: "Privacy on Social Media: Stop Oversharing", youtubeUrl: "https://youtu.be/O_2DwwNue4c", youtubeId: "O_2DwwNue4c" },
          { title: "What is Doxxing? How Your Info Is Used Against You", youtubeUrl: "https://youtu.be/pDoQNrfa3uA", youtubeId: "pDoQNrfa3uA" },
        ],
      },
      {
        id: "device-security",
        name: "Device/Account Security",
        icon: "device",
        videos: [
          { title: "Passwords & MFA for Social/Game Accounts", youtubeUrl: "https://youtu.be/fMM37BXlbis", youtubeId: "fMM37BXlbis" },
          { title: "Mobile Phone Security 101", youtubeUrl: "https://youtu.be/iUyUNOqR9Uo", youtubeId: "iUyUNOqR9Uo" },
          { title: "Safe Online Gaming: Protect Your Account", youtubeUrl: "https://youtu.be/X4liKSE5rPw", youtubeId: "X4liKSE5rPw" },
        ],
      },
      {
        id: "ai-safety",
        name: "Engaging AI Safely",
        icon: "ai",
        videos: [
          { title: "AI Can Help, But Don't Copy/Paste", youtubeUrl: "https://youtu.be/QTARzS1yb_g", youtubeId: "QTARzS1yb_g" },
          { title: "AI Knows A Lot, But Not Everything", youtubeUrl: "https://youtu.be/W1kCMhKzNQA", youtubeId: "W1kCMhKzNQA" },
        ],
      },
      {
        id: "healthy-tech",
        name: "Healthy Tech Use",
        icon: "heart",
        videos: [
          { title: "Why Apps Hook You: The Science of Digital Addiction", youtubeUrl: "https://youtu.be/HNR6C4WRF5w", youtubeId: "HNR6C4WRF5w" },
          { title: "Screen Time and Digital Balance: Taking Control", youtubeUrl: "https://youtu.be/s0gkpGGyMfs", youtubeId: "s0gkpGGyMfs" },
        ],
      },
      {
        id: "media-literacy",
        name: "Media Literacy",
        icon: "search",
        videos: [
          { title: "Echo Chambers & Filter Bubbles: Breaking Out of Your Feed", youtubeUrl: "https://youtu.be/0AOWMq_uM-4", youtubeId: "0AOWMq_uM-4" },
          { title: "Hidden Agendas: Ads, Clickbait, and Sponsored Content", youtubeUrl: "https://youtu.be/1Vjj3_J5JZM", youtubeId: "1Vjj3_J5JZM" },
          { title: "Spotting Fake News & Misinformation", youtubeUrl: "https://youtu.be/735ffirbdms", youtubeId: "735ffirbdms" },
        ],
      },
      {
        id: "safe-behavior",
        name: "Safe Online Behavior",
        icon: "users",
        videos: [
          { title: "Online Challenges and Risky Trends: What's the Real Cost?", youtubeUrl: "https://youtu.be/KI5D4hcNlAQ", youtubeId: "KI5D4hcNlAQ" },
          { title: "AI Friends: What's the Catch?", youtubeUrl: "https://youtu.be/lBGQ9_qNHfU", youtubeId: "lBGQ9_qNHfU" },
          { title: "Cyberbullying & Harassment: A Security Risk", youtubeUrl: "https://youtu.be/URAV9AX0woI", youtubeId: "URAV9AX0woI" },
        ],
      },
    ],
  },
];

// =============================================
// ANALYTICS PLACEHOLDER
// Replace with your analytics implementation
// =============================================

export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  // PLACEHOLDER: Connect to GA4, Segment, Mixpanel, etc.
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("[Analytics]", eventName, properties);
  }
  // Example implementations:
  // window.gtag?.('event', eventName, properties);
  // window.analytics?.track(eventName, properties);
};

// =============================================
// FORM SUBMISSION PLACEHOLDER
// Replace with your email provider
// =============================================

export const submitLeadForm = async (data: {
  name: string;
  email: string;
  company: string;
  topic?: string;
}): Promise<{ success: boolean; message: string }> => {
  // PLACEHOLDER: Connect to email provider (ConvertKit, Mailchimp, etc.)
  // Example:
  // const response = await fetch('/api/subscribe', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(data),
  // });
  // return response.json();

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For demo purposes, always succeed
  console.log("[Lead Form Submission]", data);
  return {
    success: true,
    message: "Thanks! Check your inbox for your modernisation kit.",
  };
};
