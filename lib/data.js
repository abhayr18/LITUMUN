// ============================================
// LITUMUN 2026 — Dynamic Data Configuration
// Source: Official LITUMUN 2026 Brochure
// ============================================

export const SITE_CONFIG = {
  name: "LITUMUN",
  fullName: "LITUMUN 2026",
  edition: "8th Edition",
  tagline: "Where Every Voice Shapes Tomorrow's World",
  subTagline: "Learn • Introspect • Transform",
  description:
    "Laxminarayan Innovation Technological University's premier Model United Nations conference. Two days of diplomacy, debate, and leadership in Nagpur.",
  college: "Laxminarayan Innovation Technological University (LITU), Nagpur",
  collegeShort: "LITU, Nagpur",
  eventDate: "2026-08-16T09:00:00",
  eventEndDate: "2026-08-17T18:00:00",
  venue: "LIT University Campus, Nagpur",
  email: "litumun2024@gmail.com",
  phone: "+91 90750 85019",
  instagram: "https://instagram.com/litumun",
  facebook: "https://facebook.com/LIT MUN",
  website: "www.litumun.in",
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "Schedule", href: "/schedule" },
  { name: "Register", href: "/register" },
];

export const HIGHLIGHTS = [
  { number: "7", label: "Committees" },
  { number: "2", label: "Days" },
  { number: "8th", label: "Edition" },
  { number: "2026", label: "Year" },
];

export const EVENTS = [
  {
    id: "unga-disec",
    name: "UN General Assembly — DISEC",
    shortName: "UNGA-DISEC",
    category: "mun",
    description:
      "The United Nations General Assembly First Committee (DISEC) focuses on maintaining international peace and security by addressing global disarmament and security challenges. DISEC develops policies and treaties to reduce threats from nuclear, chemical, and biological weapons.",
    agenda:
      "Regulating the development and deployment of Lethal Autonomous Weapons Systems (LAWS) and their ethical implications in modern warfare",
    image: "/events/disec.jpg",
    fee: 1000,
    capacity: 50,
    difficulty: "Intermediate",
    chairperson: "To be announced",
    highlights: [
      "Preventing proliferation of weapons of mass destruction",
      "Regulating trade of small arms and light weapons",
      "Strengthening global arms control mechanisms",
      "Addressing terrorism and regional conflicts",
    ],
  },
  {
    id: "unga-legal",
    name: "UN General Assembly — Legal",
    shortName: "UNGA-LEGAL",
    category: "mun",
    description:
      "The United Nations General Assembly Sixth Committee (UNGA Legal) is the primary forum for addressing legal questions within the General Assembly. It promotes the development and codification of international law, ensuring legal consistency across UN operations.",
    agenda:
      "Strengthening international legal frameworks on counter-terrorism, state responsibility, and the rule of law in conflict zones",
    image: "/events/legal.jpg",
    fee: 1000,
    capacity: 50,
    difficulty: "Advanced",
    chairperson: "To be announced",
    highlights: [
      "Counter-terrorism law",
      "Diplomatic relations and state responsibility",
      "International criminal justice",
      "Treaty law and peacekeeping operations",
    ],
  },
  {
    id: "lok-sabha",
    name: "Lok Sabha",
    shortName: "Lok Sabha",
    category: "mun",
    description:
      "Imagine India's House of the People, where 543 voices from across the country gather to shape the future of over a billion people. As a delegate, you'll become a leader, lawmaker, and voice of the people — championing real issues, debating the future of education, employment, environment, safety, and more.",
    agenda:
      "Deliberating on critical national issues including education policy, employment generation, and environmental legislation",
    image: "/events/loksabha.jpg",
    fee: 1000,
    capacity: 60,
    difficulty: "Intermediate",
    chairperson: "To be announced",
    highlights: [
      "Representing constituencies across India",
      "Debating education and employment policy",
      "Environmental and safety legislation",
      "Voice of the underrepresented",
    ],
  },
  {
    id: "cabinet-mission-1946",
    name: "Cabinet Mission 1946",
    shortName: "Cabinet Mission",
    category: "historical",
    description:
      "In 1946, India was on the brink of independence. The British government sent three top officers — the Cabinet Mission — to negotiate the transfer of power. As a delegate, you will take on the role of a real historical leader: Nehru, Jinnah, Sardar Patel, Maulana Azad, Lord Pethick-Lawrence, Sir Stafford Cripps, or A.V. Alexander.",
    agenda:
      "Negotiating the framework for Indian independence — unity vs. partition, constitutional structure, and the transfer of power from British rule",
    image: "/events/cabinet.jpg",
    fee: 1000,
    capacity: 40,
    difficulty: "Advanced",
    chairperson: "To be announced",
    highlights: [
      "Role-play as Nehru, Jinnah, Patel, or Azad",
      "Debate the future of a unified India",
      "Navigate British-Indian negotiations",
      "Historical immersion in 1946",
    ],
  },
  {
    id: "mahabharat",
    name: "Mahabharat",
    shortName: "Mahabharat",
    category: "specialized",
    description:
      "Set in the ancient land of Bharata, within the grand Sabha of Hastinapur, where the epic Mahabharat unfolds. The Kurukshetra war is a battle of ideologies, interpretation, and conscience. Delegates will embody characters like Krishna, Bhishma, Draupadi, Karna, and Duryodhana, navigating complex moral landscapes.",
    agenda:
      "Can the Sabha of Hastinapur find a path to peace? Reimagining the Mahabharat — dharma, power, and the fate of an empire on the brink of war",
    image: "/events/mahabharat.jpg",
    fee: 1000,
    capacity: 40,
    difficulty: "All Levels",
    chairperson: "To be announced",
    highlights: [
      "Embody iconic historical characters",
      "Navigate dharma vs. adharma",
      "Can Draupadi's voice for justice be heard?",
      "Let every voice rise in vision, not violence",
    ],
  },
  {
    id: "ipl-auction",
    name: "IPL Auction Committee",
    shortName: "IPL Auction",
    category: "specialized",
    description:
      "Welcome to the IPL Auction Committee — where team owners, analysts, cricket icons, and fans come together to design the future of sports, equity, and world harmony. This unique committee combines the excitement of the IPL auction with a creative spin, focusing on shaping the sports industry and promoting positive change.",
    agenda:
      "Shaping the future of cricket through equitable bidding, promoting diversity and inclusion in the IPL, and redefining the role of sports in social change",
    image: "/events/ipl.jpg",
    fee: 1000,
    capacity: 40,
    difficulty: "Beginner",
    chairperson: "To be announced",
    highlights: [
      "Bid, debate, and negotiate as team owners",
      "Promote diversity and inclusion in sports",
      "Power meets passion",
      "Shape cricket's future",
    ],
  },
  {
    id: "press",
    name: "International & National Press",
    shortName: "Press Corps",
    category: "mun",
    description:
      "The national and international press plays a vital role at LITUMUN 2026, providing accurate and insightful coverage of debates and developments. Beyond reporting, the press engages in analysis, elevating conversations and highlighting critical issues. Consisting of journalists, photographers, and caricaturists.",
    agenda: "Covering all committee proceedings across LITUMUN 2026",
    image: "/events/press.jpg",
    fee: 1000,
    capacity: 20,
    difficulty: "All Levels",
    chairperson: "To be announced",
    highlights: [
      "Journalists, photographers, and caricaturists",
      "Cover all committee proceedings",
      "Shape conference narrative",
      "Voice diverse perspectives",
    ],
  },
];

export const SCHEDULE = {
  day1: {
    date: "August 16, 2026",
    title: "Day 1 — Opening Ceremony & Committee Sessions",
    events: [
      {
        time: "08:00 AM",
        title: "Registration & Check-in",
        description: "Collect your delegate kits, ID badges, and get settled.",
        location: "Main Foyer",
      },
      {
        time: "09:30 AM",
        title: "Opening Ceremony",
        description:
          "Welcome address by the Secretary-General, message from Director Dr. N.M. Patil, and keynote.",
        location: "Main Auditorium",
      },
      {
        time: "11:00 AM",
        title: "Committee Session I",
        description:
          "Roll call, opening speeches, and setting of the agenda across all 7 committees.",
        location: "Respective Committee Rooms",
      },
      {
        time: "01:00 PM",
        title: "Lunch Break",
        description: "Networking lunch for all delegates.",
        location: "Cafeteria",
      },
      {
        time: "02:00 PM",
        title: "Committee Session II",
        description: "Moderated and unmoderated caucuses begin.",
        location: "Respective Committee Rooms",
      },
      {
        time: "04:30 PM",
        title: "Social Night / Stargazing",
        description:
          "Informal networking, cultural interactions, and stargazing for delegates.",
        location: "Open Air Area",
      },
    ],
  },
  day2: {
    date: "August 17, 2026",
    title: "Day 2 — Final Deliberations & Closing Ceremony",
    events: [
      {
        time: "09:00 AM",
        title: "Committee Session III",
        description: "Draft resolutions, working papers, and intense debate.",
        location: "Respective Committee Rooms",
      },
      {
        time: "11:30 AM",
        title: "Committee Session IV",
        description:
          "Voting procedures, amendments, and finalising resolutions.",
        location: "Respective Committee Rooms",
      },
      {
        time: "01:00 PM",
        title: "Lunch Break",
        description: "Final networking opportunity for delegates.",
        location: "Cafeteria",
      },
      {
        time: "02:00 PM",
        title: "Committee Session V (Final)",
        description:
          "Last deliberations, resolution voting, and committee wrap-up.",
        location: "Respective Committee Rooms",
      },
      {
        time: "04:00 PM",
        title: "Closing Ceremony",
        description:
          "Awards distribution, Best Delegate recognition, and farewell address.",
        location: "Main Auditorium",
      },
      {
        time: "05:30 PM",
        title: "Photo Session & Farewell",
        description: "Group photos with secretariat and fellow delegates.",
        location: "Main Building",
      },
    ],
  },
};

export const SPONSORS = [];

export const ABOUT_CONTENT = {
  about:
    "LITU-MUN, now in its 8th edition and 2nd as a university-level conference, is a prestigious Model United Nations conference hosted by Laxminarayan Innovation Technological University (LITU). Originally launched in 2016, the event has evolved in scale and impact. With seven diverse committees and the theme 'Where Every Voice Shapes Tomorrow's World,' LITUMUN 2026 continues its legacy of empowering voices and shaping futures.",

  vision:
    "To create a platform where every delegate's voice drives change, challenges norms, and inspires new ideas — cultivating the next generation of diplomats, policymakers, and global changemakers.",

  mission:
    "To organize an inclusive, intellectually stimulating, and professionally managed Model United Nations conference that provides delegates with immersive experience in international diplomacy, negotiation, and critical thinking.",

  theme:
    "Where Every Voice Shapes Tomorrow's World — emphasizing the power of individual perspectives and collective action. At LITUMUN, every delegate's voice has the potential to drive change, challenge norms, and inspire new ideas.",

  aboutMUN:
    "Model United Nations (MUN) is a simulation where students take on roles of delegates from various countries to debate and find solutions to global issues. Participants develop critical thinking, public speaking, writing, research, teamwork, and leadership skills. Delegates represent specific countries in UN committees, studying their assigned country's views and preparing positions. Through speeches, discussions, lobbying, and negotiation, delegates present and develop policy ideas.",

  aboutLIT:
    "Laxminarayan Innovation Technological University (LITU) is a premier institute dedicated to excellence in Chemical Engineering, Chemical Technology, and Applied Sciences. Established in 1942 and recognized as a University in 2023, LITU has evolved into a hub of innovation, research, and technological advancement. LITU's future-focused approach integrates foundational science with real-world application, fostering creativity alongside discipline. The university offers advanced laboratories, experienced faculty, and a vibrant student culture that prepares graduates to make lasting contributions in national and global contexts.",

  values: [
    {
      title: "Diplomacy",
      description:
        "We believe in the power of dialogue and negotiation to resolve conflicts and build consensus across nations.",
    },
    {
      title: "Inclusivity",
      description:
        "Where Every Voice Matters — we welcome delegates from all backgrounds, experience levels, and perspectives.",
    },
    {
      title: "Leadership",
      description:
        "We cultivate leaders who speak with confidence, listen with intent, and lead with integrity.",
    },
    {
      title: "Excellence",
      description:
        "We strive for the highest standards in academic content, logistics, and the overall conference experience.",
    },
  ],

  team: [
    {
      name: "Kartik Kumavat",
      role: "Secretary General",
      phone: "9075085019",
    },
    {
      name: "Adarsh Rangare",
      role: "Director General",
      phone: "9098124901",
    },
    {
      name: "Ashish Wagh",
      role: "Dy. Secretary General",
      phone: "8459405837",
    },
    {
      name: "Janhavi Manjule",
      role: "Dy. Director General",
      phone: "7588097915",
    },
    {
      name: "Tejas Zade",
      role: "Treasurer",
      phone: "7775965801",
    },
    {
      name: "Mayur Channe",
      role: "Management Attaché",
      phone: "9356702714",
    },
  ],

  faculty: [
    {
      name: "Dr. N.M. Patil",
      role: "Director, Board of Students Development",
      institution: "LIT University, Nagpur",
    },
    {
      name: "Dr. P.J. Giri",
      role: "Teacher Coordinator",
      institution: "LITUMUN 2026",
    },
  ],
};

export const CATEGORIES = [
  { id: "all", name: "All Committees" },
  { id: "mun", name: "MUN Committees" },
  { id: "historical", name: "Historical" },
  { id: "specialized", name: "Specialized" },
];
