export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'saas' | 'ai-app' | 'game' | 'film' | 'automation';
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
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
    role: 'Full-Stack Software Developer & AI Specialist',
    location: 'Dhaka, Bangladesh',
    bio: 'Software Developer specializing in Full-Stack web architectures, SaaS platforms, browser games, and AI-assisted creative technologies. Passionate about building high-performance, living digital systems.',
    creativeCredit: 'Directed by JUBAYER AI Specialist',
    status: 'Available for Software Architecture & Creative Tech',
    github: 'https://github.com/Jubayer-AI-Studio',
    youtube: 'https://www.youtube.com/@jubayeraispecialist',
    instagram: 'https://www.instagram.com/jubayer_ahmad_2002/',
    email: 'monisharani333022@gmail.com',
    avatar: '/avatar.jpg',
  },

  skills: {
    coreLanguages: ['TypeScript', 'JavaScript', 'Python', 'HTML5', 'CSS3/Tailwind'],
    frontendFrameworks: ['Next.js (App Router)', 'React 19', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    backendDev: ['Node.js', 'Express', 'Cloudflare Tunnel', 'REST APIs', 'Role-Based Access Control (RBAC)'],
    aiAndTools: ['Google Gemini API', 'Veo 3.1', 'Google Flow', 'Kling AI', 'CapCut', 'Hugging Face', 'Antigravity'],
    gameEngines: ['2D Arcade Engines', '3D WebGL / Android Studio', 'Canvas Interactive Mechanics'],
  },

  featuredSaaS: {
    id: 'noorhub',
    title: 'NOORHUB',
    subtitle: 'Complete Madrasa & Institute Management SaaS',
    description: 'An enterprise-grade educational institute management SaaS built with Next.js App Router, TypeScript, and Node.js. Features full student/teacher record administration, RBAC security, automated monthly fee invoicing, and local-to-cloud sync via Cloudflare Tunnel.',
    tags: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Cloudflare Tunnel', 'RBAC Security'],
    githubUrl: 'https://github.com/Jubayer-AI-Studio/NoorHub-Madrasa-Management-SaaS',
    features: [
      'Student & Teacher Lifecycle Management',
      'Database-backed records with Role-Based Access Control',
      'Automated Monthly Fee Invoicing & Financial Accounting',
      'Local-to-Cloud deployment infrastructure via Cloudflare Tunnel',
    ],
  },

  softwareProjects: [
    {
      id: 'two-friends-video-studio',
      title: 'Two Friends: Driving Masters Studio',
      subtitle: 'AI Video Generation & Story Engine',
      description: 'Web studio animating photos into cinematic racing videos powered by Google Veo 3.1, Gemini 3.7 Flash story generator, and Gemini Flash TTS audio narration.',
      category: 'ai-app',
      tags: ['Google Veo 3.1', 'Gemini 3.7 Flash', 'React 19', 'Vite', 'Node.js', 'Web Audio'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Two-Friends-Driving-Masters-Video-Studio',
      featured: true,
      badge: 'Veo 3.1 Powered',
    },
    {
      id: 'nasrullah',
      title: 'Nasrullah (নাসরুল্লাহ)',
      subtitle: 'Smart Islamic Expense & Life Companion',
      description: 'Intelligent expense tracking with category budgeting in Taka, overspending alerts, Gemini receipt scanning, bill tracking, Namaz prayer times, and Zakat management.',
      category: 'ai-app',
      tags: ['AI Studio', 'Gemini Vision', 'Android Studio', 'Islamic FinTech', 'Budgeting'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Nasrullah-Islamic-Expense-Companion',
      liveUrl: 'https://ai.studio/apps/b164edd9-53c9-49da-904f-039560e0746b',
      featured: true,
      badge: 'Live App',
    },
    {
      id: 'shono-ai',
      title: 'Shono AI (Bangladeshi Jarvis)',
      subtitle: 'Bangla Conversational Voice Assistant',
      description: 'Localized Bangla AI assistant designed for smart voice interactions, contextual task handling, and intelligent automation.',
      category: 'ai-app',
      tags: ['Python', 'Bangla NLP', 'Voice Assistant', 'AI Automation'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Shono-AI-Bangladeshi-Jarvis',
      badge: 'Open Source',
    },
    {
      id: 'madrasa-mgmt',
      title: 'Madrasa Management System',
      subtitle: 'Institutional Administration Software',
      description: 'Comprehensive software solution for academic institutions to manage admissions, student attendance, examination results, and accounts.',
      category: 'saas',
      tags: ['TypeScript', 'React', 'Node.js', 'Database Architecture'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/madrasa-managment-software',
    },
    {
      id: 'youtube-bot',
      title: 'YouTube Automation Bot',
      subtitle: 'Content Pipeline & Upload Workflow',
      description: 'Automated video scheduling, metadata generation, and video pipeline automation for YouTube creators.',
      category: 'automation',
      tags: ['Python', 'YouTube Data API', 'Automation', 'Workflow'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/YouTube-Automation-Bot',
    },
  ],

  games: [
    {
      id: 'iron-strike',
      title: 'Iron Strike',
      genre: '2D Arcade Fighting Game',
      description: 'Intense arcade martial arts combat featuring responsive combos, special move gauges, multiple battle arenas, and fluid hitboxes.',
      tags: ['2D Arcade', 'Combat Engine', 'AI Studio', 'Combo System'],
      liveUrl: 'https://ai.studio/apps/45effe9f-8244-49d3-a401-e4a0e09f9e90',
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Iron-Strike-2D-Fighter',
      badge: 'Arcade Fighter',
    },
    {
      id: 'shafin-nafis-racing-3d',
      title: 'Shafin & Nafis Racing 3D',
      genre: 'High-Octane Android 3D Racer',
      description: 'Fast-paced 3D mobile racing game with smooth touch steering, nitro boosts, vehicle unlocks, and custom player stats.',
      tags: ['Android Studio', '3D Racing', 'Nitro Boost', 'Vehicle Physics'],
      liveUrl: 'https://ai.studio/apps/24f3c1f3-62f7-47d2-a4c1-7e95961a9120',
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Shafin-and-Nafis-Racing-3D',
      badge: '3D Mobile',
    },
    {
      id: 'dhaka-open-world',
      title: 'Dhaka Open World Racing',
      genre: 'Open-World Urban Driving Simulation',
      description: 'Explore 10+ authentic Dhaka drive routes featuring realistic vehicle damage physics, dynamic weather changes, and multi-camera perspectives.',
      tags: ['Open World', 'Dhaka Routes', 'Dynamic Weather', 'Vehicle Damage'],
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Dhaka-Open-World-Racing',
      badge: 'Dhaka 10+ Routes',
    },
    {
      id: 'jubayer-legends',
      title: 'Jubayer Legends',
      genre: 'Cinematic 3D Cyber Endless Runner',
      description: 'Sprint, jump, and take flight across futuristic neon skylines featuring characters Shafin, Nafis, and police officer Jubayer.',
      tags: ['3D Endless Runner', 'Cyberpunk Neon', 'Sky Flight', 'AI Studio'],
      liveUrl: 'https://ai.studio/apps/8bc3f588-063b-4d86-85fc-f9115b059d7a',
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Jubayer-Legends-3D-Runner',
      badge: 'Endless Runner',
    },
    {
      id: 'shafin-blade-fighter',
      title: 'Safin: Blade Fighter',
      genre: 'Martial Arts Sword Combat Game',
      description: 'Epic sword fighting and martial arts duel across 10 dazzling arenas with legendary warriors Shafin and Nafis.',
      tags: ['Sword Combat', '10 Arenas', 'Martial Arts', 'AI Studio'],
      liveUrl: 'https://ai.studio/apps/df184bde-b04f-4b98-bc85-dd5ccfde4eb3',
      githubUrl: 'https://github.com/Jubayer-AI-Studio/Shafin-Blade-Fighter-Game',
      badge: 'Sword Battle',
    },
  ],

  films: [
    {
      id: 'icon-2030-ch1',
      chapter: 'Chapter 01',
      title: 'ICON 2030: The Assault',
      tagline: 'When the unsinkable becomes a battleground.',
      synopsis: 'A high-tech luxury vessel faces an unexpected assault in deep waters. Amid catastrophic damage, three survivors—Ryan, Adam, and James—embark on a survival odyssey.',
      status: 'Completed',
      tools: ['Google Gemini', 'Google Flow', 'CapCut'],
      directorCredit: 'Directed by JUBAYER AI Specialist',
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
      directorCredit: 'Directed by JUBAYER AI Specialist',
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
      directorCredit: 'Directed by JUBAYER AI Specialist',
      youtubeUrl: 'https://www.youtube.com/@jubayeraispecialist',
      characters: ['Ryan (with Jack)', 'Adam (with Emma)', 'James (with Sammy)'],
    },
  ],

  publishing: {
    title: 'Affan Labib Web Magazine',
    category: 'Digital Publishing & Web Magazine',
    description: 'A modern, responsive web publishing platform designed to showcase curated articles, thought leadership, and client-provided editorial content with high-contrast typography.',
    tags: ['Next.js', 'Editorial Layout', 'Tailwind CSS', 'Digital Magazine'],
    githubUrl: 'https://github.com/Jubayer-AI-Studio/affan-labib-blog-v2',
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
      title: '21+ Production Repositories on GitHub',
      issuer: 'Jubayer-AI-Studio',
      category: 'Open Source Software',
      highlight: 'Full-stack SaaS, Android games, video generation engines, and AI automation tooling.',
    },
  ],
};
