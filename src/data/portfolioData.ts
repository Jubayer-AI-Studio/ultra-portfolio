export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'saas' | 'b2b' | 'ai-system' | 'e-commerce' | 'interactive' | 'publishing';
  tags: string[];
  githubUrl?: string;
  liveUrl: string;
  featured?: boolean;
  platform: 'Vercel' | 'Cloudflare Pages' | 'Cloudflare Tunnel';
  metrics?: string;
  badge?: string;
}

export interface FilmItem {
  id: string;
  chapter: string;
  title: string;
  tagline: string;
  synopsis: string;
  status: 'Completed' | 'In Production';
  tools: string[];
  directorCredit: string;
  youtubeUrl: string;
  characters: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: 'Jubayer Ahmad',
    englishSpelling: 'JUBAYER',
    bengaliName: 'Jubayer Ahmad',
    role: 'Full-Stack Software Developer & AI Systems Architect',
    location: 'Dhaka, Bangladesh',
    bio: 'Software engineer and system architect specializing in enterprise full-stack web applications, SaaS platforms, high-performance edge systems on Cloudflare & Vercel, and interactive 3D WebGL experiences.',
    creativeCredit: 'Engineered by Jubayer Ahmad',
    status: 'Available for Full-Stack Architecture & Cloud Engineering',
    github: 'https://github.com/Jubayer-AI-Studio',
    youtube: 'https://www.youtube.com/@jubayeraispecialist',
    instagram: 'https://www.instagram.com/jubayer_ahmad_2002/',
    email: 'jubayerahmad2002@gmail.com',
    avatar: '/avatar.jpg',
  },

  skills: {
    coreLanguages: ['TypeScript', 'JavaScript', 'Python', 'HTML5 / CSS3', 'SQL'],
    frontendFrameworks: ['Next.js 15 (App Router)', 'React 19', 'Vite', 'Astro v5', 'Tailwind CSS', 'Three.js / WebGL'],
    backendDev: ['Node.js & Express', 'Cloudflare Pages & Workers', 'Cloudflare Zero Trust Tunnel', 'PostgreSQL / Prisma', 'REST APIs', 'RBAC Security'],
    cloudDeployment: ['Cloudflare Edge Network', 'Vercel Production', 'GitHub Actions CI/CD', 'DNS & Edge Caching'],
    aiAndTools: ['Google Gemini API', 'Veo 3.1', 'Google Flow', 'Hugging Face', 'Antigravity'],
  },

  featuredSaaS: {
    id: 'noorhub',
    title: 'NOORHUB SaaS',
    subtitle: 'Comprehensive Madrasa & Institute Management Cloud SaaS',
    description: 'An enterprise-grade educational administration SaaS platform engineered with Next.js 15 App Router, TypeScript, and Node.js. Features complete student and teacher administration, RBAC security, automated monthly fee invoicing, and local-to-cloud sync via Cloudflare Zero Trust Tunnel.',
    tags: ['Next.js 15 App Router', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Cloudflare Tunnel', 'RBAC Security'],
    githubUrl: 'https://github.com/Jubayer-AI-Studio/NoorHub-Madrasa-Management-SaaS',
    liveUrl: 'https://noorhub.vercel.app',
    platform: 'Vercel + Cloudflare Tunnel',
    features: [
      'Complete Student & Faculty Lifecycle Administration',
      'PostgreSQL Database Architecture with Role-Based Access Control',
      'Automated Monthly Fee Invoicing & Financial Accounting Ledger',
      'Zero-Trust Cloudflare Tunnel Edge Integration',
    ],
  },

  // 100% Real, Active, Live Production Systems with Verified URLs
  productionSystems: [
    {
      id: 'rihlah-gadget',
      title: 'Rihlah Gadget Shop',
      subtitle: 'Modern PWA E-Commerce Platform on Cloudflare Edge',
      description: 'Production PWA e-commerce platform for tech accessories and modern lifestyle gadgets. Engineered with Next.js 15 and deployed on Cloudflare Pages for ultra-low latency, instant cart state, and seamless mobile checkout.',
      category: 'e-commerce' as const,
      tags: ['Next.js 15', 'React 19', 'Cloudflare Pages', 'PWA', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/rihlah-gadget-shop',
      liveUrl: 'https://rihlah-gadget-shop.pages.dev',
      featured: true,
      platform: 'Cloudflare Pages' as const,
      badge: 'Edge Deployed',
    },
    {
      id: 'electronics-importers',
      title: 'Electronics Importers BD',
      subtitle: 'B2B Electronic Components & Hardware Procurement',
      description: 'Full-stack B2B procurement and supply-chain portal connecting industrial manufacturers with electronic component importers across Bangladesh with real-time product catalogues.',
      category: 'b2b' as const,
      tags: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'B2B Procurement', 'Vercel'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/electronics-importers-bd',
      liveUrl: 'https://electronics-importers-bd.vercel.app',
      featured: true,
      platform: 'Vercel' as const,
      badge: 'B2B Enterprise',
    },
    {
      id: 'mesk-prokashon',
      title: 'Mesk Publications (Mesk Prokashon)',
      subtitle: 'Official Islamic Bookstore & WhatsApp Order Automation',
      description: 'Official digital bookstore and publishing platform of author Maulana Muhammad Zainul Abedin. Features a 100+ book catalogue, dynamic discount offers, automated WhatsApp AI ordering, and responsive reader interface.',
      category: 'publishing' as const,
      tags: ['Next.js 15', 'WhatsApp AI Bot', 'Tailwind CSS', 'Vercel'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/mesk',
      liveUrl: 'https://mesk-nine.vercel.app',
      featured: true,
      platform: 'Vercel' as const,
      badge: 'WhatsApp Bot',
    },
    {
      id: 'amar-world-map',
      title: 'Amar World Map (Interactive Geo)',
      subtitle: 'Bangladesh 64 Districts & World Visual Travel Tracker',
      description: 'High-performance interactive geo-spatial web tool tracking visits across all 64 districts of Bangladesh and 195+ world nations with custom typography, visit analytics, and instant Facebook export.',
      category: 'interactive' as const,
      tags: ['React', 'HTML5 Canvas', 'GeoJSON', 'Vite', 'PWA'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/amar-world-map',
      liveUrl: 'https://amar-world-map.vercel.app',
      featured: true,
      platform: 'Vercel' as const,
      badge: 'Interactive Map',
    },
    {
      id: 'special-agent',
      title: 'Jubayer AI Hunter & Special Agent',
      subtitle: 'Autonomous AI Remote Intelligence & Task Engine',
      description: 'Autonomous remote AI intelligence platform performing automated research, structured data extraction, and multi-step pipeline workflow execution.',
      category: 'ai-system' as const,
      tags: ['Autonomous AI', 'Python', 'Node.js', 'Vercel'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/special-agent',
      liveUrl: 'https://special-agent-one.vercel.app',
      featured: true,
      platform: 'Vercel' as const,
      badge: 'Autonomous AI',
    },
    {
      id: 'affan-labib',
      title: 'Affan Labib Literary Studio',
      subtitle: 'Author Web Magazine & Cloudflare Edge Publishing',
      description: 'High-speed literary journal and editorial magazine powered by Astro v5 and Cloudflare Pages KV with edge SSR and high-contrast typography.',
      category: 'publishing' as const,
      tags: ['Astro v5', 'Cloudflare Pages', 'Cloudflare KV', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/affan-labib-blog',
      liveUrl: 'https://affan-labib.pages.dev',
      platform: 'Cloudflare Pages' as const,
      badge: 'Cloudflare Edge',
    },
    {
      id: 'max-portfolio',
      title: 'Max Interactive 3D Portfolio',
      subtitle: 'Three.js WebGL Interactive Showroom & PWA',
      description: 'Showcase portfolio built with Three.js WebGL, 3D interactive physics, custom camera choreography, and offline progressive web app support.',
      category: 'interactive' as const,
      tags: ['Three.js', 'WebGL', 'PWA', 'Vite', 'Tailwind CSS'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/max-portfolio',
      liveUrl: 'https://max-portfolio-eta.vercel.app',
      platform: 'Vercel' as const,
      badge: '3D WebGL',
    },
    {
      id: 'ibrahim-studio',
      title: 'Ibrahim Creative Studio',
      subtitle: 'Creative Agency Web Platform & Digital Showcase',
      description: 'Modern digital agency website featuring high-conversion landing page architecture, typography systems, and responsive layout engineering.',
      category: 'saas' as const,
      tags: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/ibrahim-studio',
      liveUrl: 'https://ibrahim-jade.vercel.app',
      platform: 'Vercel' as const,
      badge: 'Creative Agency',
    },
    {
      id: 'kawsar-suite',
      title: 'Kawsar Professional Suite',
      subtitle: 'Engineering Consultancy & Brand Showcase',
      description: 'Professional engineering consultancy web portal with service portfolios, project case studies, and fast client communication channel.',
      category: 'saas' as const,
      tags: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/kawsar-portfolio',
      liveUrl: 'https://kawsar-seven.vercel.app',
      platform: 'Vercel' as const,
      badge: 'Consultancy',
    },
  ],

  // Verified Interactive 3D Experience (No fake games)
  interactive3D: {
    id: 'bruno-city-world',
    title: 'Bruno Simon 3D Interactive City World',
    subtitle: 'Full-Featured Three.js WebGL Driving Simulation',
    description: 'An interactive 3D WebGL urban environment built directly into this portfolio. Drive the Ferrari roadster with real physics, cross the river bridge, crash through wooden crate pyramids, and visit 4 Tech Factory Campuses to launch live production systems.',
    tags: ['Three.js', 'WebGL Physics', 'Procedural 3D City', 'Interactive Audio'],
  },

  films: [
    {
      id: 'icon-2030-ch1',
      chapter: 'Chapter 01',
      title: 'ICON 2030: The Assault',
      tagline: 'When the unsinkable becomes a battleground.',
      synopsis: 'A high-tech luxury vessel faces an unexpected assault in deep waters. Amid catastrophic damage, three survivors—Ryan, Adam, and James—embark on a survival odyssey.',
      status: 'Completed',
      tools: ['Google Gemini', 'Google Flow', 'CapCut'],
      directorCredit: 'Directed by Jubayer Ahmad',
      youtubeUrl: 'https://www.youtube.com/@jubayeraispecialist',
      characters: ['Ryan', 'Adam', 'James'],
    },
    {
      id: 'icon-2030-ch2',
      chapter: 'Chapter 02',
      title: 'ICON 2030: Realm of Ice, Fire & Iron',
      tagline: 'Surviving three untamed elemental worlds.',
      synopsis: 'The survivors traverse three perilous territories: the Frozen Monster Peaks, the Domain of Fire, and the Iron Stronghold, battling for a route back to ocean coordinates.',
      status: 'Completed',
      tools: ['Google Gemini', 'Google Flow', 'CapCut', 'Kling'],
      directorCredit: 'Directed by Jubayer Ahmad',
      youtubeUrl: 'https://www.youtube.com/@jubayeraispecialist',
      characters: ['Ryan', 'Adam', 'James'],
    },
    {
      id: 'icon-2030-ch3',
      chapter: 'Chapter 03',
      title: 'ICON 2030: The Abyss & Avatar Realm',
      tagline: 'In the darkest depths, a luminous new universe awakens.',
      synopsis: 'Aboard the state-of-the-art 2030 flagship with glass decks and proud AI systems, disaster strikes reminiscent of Titanic. Tragedy claims loved ones, and the survivors are pulled into a breathtaking bioluminescent underwater realm.',
      status: 'Completed',
      tools: ['Google Flow', 'Gemini 10s Continuity', 'CapCut'],
      directorCredit: 'Directed by Jubayer Ahmad',
      youtubeUrl: 'https://www.youtube.com/@jubayeraispecialist',
      characters: ['Ryan (with Jack)', 'Adam (with Emma)', 'James (with Sammy)'],
    },
  ],

  publishing: {
    title: 'Affan Labib Web Magazine & Mesk Prokashon',
    category: 'Digital Publishing & Edge Web Platforms',
    description: 'Modern, high-performance web publishing platforms. Includes Affan Labib Literary Studio on Cloudflare Pages and Mesk Prokashon Islamic Digital Bookstore on Vercel with WhatsApp AI order automation.',
    tags: ['Next.js 15', 'Astro v5', 'Cloudflare Pages', 'WhatsApp AI Bot', 'Tailwind CSS'],
    githubUrl: 'https://github.com/Jubayer-AI-Studio/affan-labib-blog',
    liveUrl: 'https://affan-labib.pages.dev',
    meskLiveUrl: 'https://mesk-nine.vercel.app',
    affanPagesUrl: 'https://affan-labib.pages.dev',
  },

  credentials: [
    {
      year: '2026',
      title: 'AWS Skill Development — Operations & Automation',
      issuer: 'AWS Training Program',
      category: 'Cloud & Infrastructure',
      highlight: 'Certified training covering automated workflows, cloud operations, and deployment.',
    },
    {
      year: '2026',
      title: 'Takhmil Graduate',
      issuer: 'Jamiya Qasem Nanutawi, Dhaka',
      board: 'Al-Haiatul Ulya Board',
      category: 'Education & Classical Studies',
      highlight: 'Classical scholarship, ethics, Arabic linguistics, and disciplined analytical rigor.',
    },
    {
      year: '2026',
      title: '28+ Production Repositories & Live Cloud Deployments',
      issuer: 'Jubayer-AI-Studio',
      category: 'Production Software & Cloud Systems',
      highlight: 'Full-stack SaaS (NOORHUB), Cloudflare Pages e-commerce (Rihlah Gadget), Vercel B2B (Electronics Importers BD), 3D WebGL simulation, and autonomous AI systems.',
    },
  ],
};
