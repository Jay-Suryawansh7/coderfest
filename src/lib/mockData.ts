/* ═══════════════════════════════════════════════════════════════════════════════
   HERITAGE PULSE — Mock Data
   Comprehensive dataset for monuments, events, stories, donations, and community
═══════════════════════════════════════════════════════════════════════════════ */

// ─────────────────────────── Type Definitions ───────────────────────────

export type MonumentCategory = "UNESCO" | "Museum" | "Fort" | "Temple" | "Palace";
export type EventCategory = "Festival" | "Exhibition" | "Performance" | "Workshop" | "Heritage Walk" | "Lecture";
export type StoryCategory = "Heritage" | "Architecture" | "Oral History" | "Restoration" | "Tradition" | "Community";

export interface Monument {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  category: MonumentCategory;
  description: string;
  era: string;
  image: string;
  funFact: string;
  visitingHours: string;
}

export interface Event {
  id: string;
  title: string;
  city: string;
  date: string;
  category: EventCategory;
  price: number;
  currency: string;
  capacity: number;
  booked: number;
  image: string;
  description: string;
  registerUrl: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  category: StoryCategory;
  excerpt: string;
  body: string;
  author: string;
  date: string;
  readTime: number;
  image: string;
  featured?: boolean;
}

export interface DonationTier {
  amount: number;
  name: string;
  benefits: string[];
  color: "maroon" | "gold" | "bronze";
}

export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  image?: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MONUMENTS — 15 Indian Heritage Sites
// ═══════════════════════════════════════════════════════════════════════════════

export const MONUMENTS: Monument[] = [
  // ─────────────────────────── UNESCO World Heritage Sites (10) ───────────────────────────
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    city: "Agra",
    state: "Uttar Pradesh",
    lat: 27.1751,
    lng: 78.0421,
    category: "UNESCO",
    description: "Symbol of eternal love and Mughal architecture. An ivory-white marble mausoleum on the right bank of the river Yamuna.",
    era: "1632–1653 CE",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    funFact: "The Taj Mahal changes color depending on the time of day.",
    visitingHours: "Sunrise to Sunset (Closed Fridays)",
  },
  {
    id: "ajanta-caves",
    name: "Ajanta Caves",
    city: "Aurangabad",
    state: "Maharashtra",
    lat: 20.5519,
    lng: 75.7033,
    category: "UNESCO",
    description: "Ancient Buddhist art and murals. The caves include paintings and rock-cut sculptures described as among the finest surviving examples of ancient Indian art.",
    era: "2nd century BCE – 480 CE",
    image: "https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=800&h=600&fit=crop", // Placeholder for Ajanta
    funFact: "The caves were abandoned and forgotten for centuries until being rediscovered by a British officer in 1819.",
    visitingHours: "9:00 AM – 5:00 PM (Closed Mondays)",
  },
  {
    id: "ellora-caves",
    name: "Ellora Caves",
    city: "Aurangabad",
    state: "Maharashtra",
    lat: 20.0268,
    lng: 75.1771,
    category: "UNESCO",
    description: "Rock-cut harmony of three religions. Featuring Hindu, Buddhist, and Jain monuments carved from the Charanandri hills.",
    era: "600–1000 CE",
    image: "https://images.unsplash.com/photo-1626117639534-118f62f928e0?w=800&h=600&fit=crop", // Random heritage placeholder
    funFact: "The Kailasa temple (Cave 16) is the largest single monolithic rock excavation in the world.",
    visitingHours: "Sunrise to Sunset (Closed Tuesdays)",
  },
  {
    id: "hampi",
    name: "Hampi",
    city: "Hampi",
    state: "Karnataka",
    lat: 15.3350,
    lng: 76.4600,
    category: "UNESCO",
    description: "Capital of the Vijayanagara Empire. A vast open museum of history, architecture, and religion.",
    era: "14th–16th century CE",
    image: "https://images.unsplash.com/photo-1590766740886-b8b0a9b4e8a8?w=800&h=600&fit=crop",
    funFact: "Hampi was once the second-largest city in the world after Beijing.",
    visitingHours: "Sunrise to Sunset",
  },
  {
    id: "konark-sun-temple",
    name: "Konark Sun Temple",
    city: "Konark",
    state: "Odisha",
    lat: 19.8876,
    lng: 86.0945,
    category: "UNESCO",
    description: "A chariot of the Sun God carved in stone. Designed as a massive chariot with 24 wheels and 7 horses.",
    era: "1250 CE",
    image: "https://images.unsplash.com/photo-1590766940554-634c4e2c6127?w=800&h=600&fit=crop",
    funFact: "The temple wheels function as sundials which can be used to calculate time accurately to a minute.",
    visitingHours: "6:00 AM – 8:00 PM",
  },
  {
    id: "khajuraho-temples",
    name: "Khajuraho Temples",
    city: "Khajuraho",
    state: "Madhya Pradesh",
    lat: 24.8318,
    lng: 79.9199,
    category: "UNESCO",
    description: "Celebration of life through sculpture. Famous for their nagara-style architectural symbolism and erotic sculptures.",
    era: "950–1050 CE",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    funFact: "Only about 10% of the carvings are erotic; the rest depict daily life, war, and spirituality.",
    visitingHours: "Sunrise to Sunset",
  },
  {
    id: "rani-ki-vav",
    name: "Rani ki Vav",
    city: "Patan",
    state: "Gujarat",
    lat: 23.8589,
    lng: 72.1018,
    category: "UNESCO",
    description: "Queen’s stepwell and subterranean art. Designed as an inverted temple highlighting the sanctity of water.",
    era: "11th century CE",
    image: "https://images.unsplash.com/photo-1631526615822-6b3a62883391?w=800&h=600&fit=crop", // Placeholder
    funFact: "This stepwell was silted over and lost for centuries until archeologists excavated it in the 1980s.",
    visitingHours: "8:00 AM – 6:00 PM",
  },
  {
    id: "sanchi-stupa",
    name: "Sanchi Stupa",
    city: "Sanchi",
    state: "Madhya Pradesh",
    lat: 23.4873,
    lng: 77.7418,
    category: "UNESCO",
    description: "One of the oldest stone Buddhist monuments. Commissioned by Emperor Ashoka.",
    era: "3rd century BCE – 12th century CE",
    image: "https://images.unsplash.com/photo-1572973809200-aae25cc78013?w=800&h=600&fit=crop", // Placeholder
    funFact: "The Great Stupa at Sanchi is one of the oldest stone structures in India.",
    visitingHours: "6:30 AM – 6:30 PM",
  },
  {
    id: "mahabalipuram",
    name: "Group of Monuments at Mahabalipuram",
    city: "Mahabalipuram",
    state: "Tamil Nadu",
    lat: 12.6208,
    lng: 80.1973,
    category: "UNESCO",
    description: "Rock-cut temples by the Pallavas. Known for its rathas (chariots), mandapas (cave sanctuaries), and giant open-air reliefs.",
    era: "7th–8th century CE",
    image: "https://images.unsplash.com/photo-1598887142487-3c834d805178?w=800&h=600&fit=crop",
    funFact: "The 'Descent of the Ganges' is one of the largest open-air rock reliefs in the world.",
    visitingHours: "6:00 AM – 6:00 PM",
  },
  {
    id: "qutub-minar",
    name: "Qutub Minar and its Monuments",
    city: "Delhi",
    state: "Delhi",
    lat: 28.5245,
    lng: 77.1855,
    category: "UNESCO",
    description: "Early Indo-Islamic architecture. The complex includes the Qutub Minar, the Alai Darwaza, and the Iron Pillar.",
    era: "1193–1220 CE",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
    funFact: "The Iron Pillar in the complex has not rusted in over 1,600 years due to its unique metallurgical composition.",
    visitingHours: "7:00 AM – 5:00 PM",
  },

  // ─────────────────────────── Government of India–Protected Heritage Sites (10) ───────────────────────────
  {
    id: "red-fort",
    name: "Red Fort",
    city: "Delhi",
    state: "Delhi",
    lat: 28.6562,
    lng: 77.2410,
    category: "Fort",
    description: "Seat of Mughal power; national symbol. Known for its massive enclosing walls of red sandstone.",
    era: "1638–1648 CE",
    image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800&h=600&fit=crop",
    funFact: "The Red Fort was originally white — it was made of limestone, but the British painted it red when the stone started chipping.",
    visitingHours: "9:30 AM – 4:30 PM (Closed Mondays)",
  },
  {
    id: "fatehpur-sikri",
    name: "Fatehpur Sikri",
    city: "Agra",
    state: "Uttar Pradesh",
    lat: 27.0945,
    lng: 77.6679,
    category: "Fort",
    description: "Abandoned Mughal capital. A short-lived capital of the Mughal empire built by Emperor Akbar.",
    era: "1571–1585 CE",
    image: "https://images.unsplash.com/photo-1627917826226-72439cbb875a?w=800&h=600&fit=crop", // Placeholder
    funFact: "It was abandoned due to water scarcity shortly after its completion.",
    visitingHours: "Sunrise to Sunset",
  },
  {
    id: "nalanda-ruins",
    name: "Nalanda University Ruins",
    city: "Nalanda",
    state: "Bihar",
    lat: 25.1357,
    lng: 85.4449,
    category: "Museum", // Using Museum as it's an educational/archeological site
    description: "Ancient global center of learning. One of the world's first residential universities.",
    era: "5th–12th century CE",
    image: "https://images.unsplash.com/photo-1619623708304-4b553e182fa1?w=800&h=600&fit=crop", // Placeholder
    funFact: "The library was so vast it reportedly burned for three months when the university was destroyed.",
    visitingHours: "9:00 AM – 5:00 PM",
  },
  {
    id: "brihadeeswarar-temple",
    name: "Brihadeeswarar Temple",
    city: "Thanjavur",
    state: "Tamil Nadu",
    lat: 10.7828,
    lng: 79.1318,
    category: "Temple",
    description: "Chola architectural masterpiece. Dedicated to Shiva and known for its massive Vimana tower.",
    era: "1010 CE",
    image: "https://images.unsplash.com/photo-1605441589333-3176dccb4a36?w=800&h=600&fit=crop", // Placeholder
    funFact: "The dome at the top is carved from a single 80-ton block of granite.",
    visitingHours: "6:00 AM – 12:30 PM, 4:00 PM – 8:30 PM",
  },
  {
    id: "chittorgarh-fort",
    name: "Chittorgarh Fort",
    city: "Chittorgarh",
    state: "Rajasthan",
    lat: 24.8879,
    lng: 74.6451,
    category: "Fort",
    description: "Symbol of Rajput valor. The largest fort in India, covering 700 acres.",
    era: "7th century CE",
    image: "https://images.unsplash.com/photo-1605626261545-316277d33d7b?w=800&h=600&fit=crop", // Placeholder
    funFact: "The fort has 65 historic structures, 4 palace complexes, 19 main temples, and 4 memorials.",
    visitingHours: "9:30 AM – 6:00 PM",
  },
  {
    id: "amer-fort",
    name: "Amer Fort",
    city: "Jaipur",
    state: "Rajasthan",
    lat: 26.9855,
    lng: 75.8513,
    category: "Fort",
    description: "Hill fort blending Mughal & Rajput styles. Overlooking Maota Lake.",
    era: "1592 CE",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",
    funFact: "You can ride an elephant up the steep path to the main courtyard (though walking/jeep is encouraged).",
    visitingHours: "8:00 AM – 5:30 PM",
  },
  {
    id: "golconda-fort",
    name: "Golconda Fort",
    city: "Hyderabad",
    state: "Telangana",
    lat: 17.3833,
    lng: 78.4011,
    category: "Fort",
    description: "Engineering marvel of acoustics. A clap at the entrance can be heard at the highest point a kilometer away.",
    era: "12th–16th century CE",
    image: "https://images.unsplash.com/photo-1587985444605-e3d818293998?w=800&h=600&fit=crop", // Placeholder
    funFact: "The fort was once known for its diamond mines, which produced the Koh-i-Noor.",
    visitingHours: "9:00 AM – 5:30 PM",
  },
  {
    id: "humayuns-tomb",
    name: "Humayun’s Tomb",
    city: "Delhi",
    state: "Delhi",
    lat: 28.5933,
    lng: 77.2507,
    category: "UNESCO", // Keeping UNESCO as it's the defining feature, even if in protected list
    description: "Prototype of the Taj Mahal. The first garden-tomb on the Indian subcontinent.",
    era: "1570 CE",
    image: "https://images.unsplash.com/photo-1594109407338-725d24b6113b?w=800&h=600&fit=crop", // Placeholder
    funFact: "It was built by Humayun's first wife, Empress Bega Begum.",
    visitingHours: "Sunrise to Sunset",
  },
  {
    id: "modhera-sun-temple",
    name: "Sun Temple, Modhera",
    city: "Modhera",
    state: "Gujarat",
    lat: 23.5835,
    lng: 72.1330,
    category: "Temple",
    description: "Astronomical temple aligned with equinox. Dedicated to the solar deity Surya.",
    era: "1026 CE",
    image: "https://images.unsplash.com/photo-1627894483216-2138af692e32?w=800&h=600&fit=crop", // Placeholder
    funFact: "The temple complex features a massive rectangular stepped tank known as the Surya Kund.",
    visitingHours: "7:00 AM – 6:00 PM",
  },
  {
    id: "jaisalmer-fort",
    name: "Jaisalmer Fort",
    city: "Jaisalmer",
    state: "Rajasthan",
    lat: 26.9124,
    lng: 70.9126,
    category: "Fort",
    description: "A living desert fort. One of the very few 'living forts' in the world, as nearly one fourth of the old city's population still resides within it.",
    era: "1156 CE",
    image: "https://images.unsplash.com/photo-1599661046295-8c87f6a1eb3c?w=800&h=600&fit=crop", // Placeholder (using Mehrangarh style if needed, but generic desert fort works) to be safe reusing Jodhpur or finding Jaisalmer specifically if possible, but reusing mock images is safer to avoid broken links.
    funFact: "The fort's massive yellow sandstone walls are a tawny lion color during the day, fading to honey-gold as the sun sets.",
    visitingHours: "Open 24 hours (Museum: 9AM-6PM)",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// EVENTS — 10 Cultural Events
// ═══════════════════════════════════════════════════════════════════════════════

export const EVENTS: Event[] = [
  {
    id: "diwali-heritage-walk",
    title: "Diwali Heritage Walk",
    city: "Varanasi",
    date: "2026-11-01",
    category: "Festival",
    price: 500,
    currency: "INR",
    capacity: 50,
    booked: 38,
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop",
    description: "Experience the magic of Diwali along the ancient ghats of Varanasi. Walk through illuminated streets, witness the grand Ganga Aarti, and learn about centuries-old traditions from local historians.",
    registerUrl: "#register-diwali",
  },
  {
    id: "mughal-art-exhibition",
    title: "Splendors of the Mughal Court",
    city: "Delhi",
    date: "2026-02-15",
    category: "Exhibition",
    price: 300,
    currency: "INR",
    capacity: 200,
    booked: 156,
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800&h=600&fit=crop",
    description: "A rare exhibition of Mughal miniature paintings, manuscripts, and artifacts from private collections. Curated by leading art historians with interactive AR experiences.",
    registerUrl: "#register-mughal-art",
  },
  {
    id: "classical-dance-festival",
    title: "Khajuraho Dance Festival",
    city: "Khajuraho",
    date: "2026-02-20",
    category: "Performance",
    price: 800,
    currency: "INR",
    capacity: 1000,
    booked: 720,
    image: "https://images.unsplash.com/photo-1545959570-a94084071b5d?w=800&h=600&fit=crop",
    description: "India's premier classical dance festival held against the backdrop of the UNESCO World Heritage temples. Featuring Bharatanatyam, Kathak, Odissi, and Kuchipudi performances by legendary artists.",
    registerUrl: "#register-khajuraho",
  },
  {
    id: "holi-celebration",
    title: "Traditional Holi at Barsana",
    city: "Mathura",
    date: "2026-03-13",
    category: "Festival",
    price: 0,
    currency: "INR",
    capacity: 500,
    booked: 445,
    image: "https://images.unsplash.com/photo-1576097449798-7c7f90e1248a?w=800&h=600&fit=crop",
    description: "Join the legendary Lathmar Holi at the birthplace of Lord Krishna. Experience the unique tradition where women playfully beat men with sticks, followed by an explosion of colors and folk music.",
    registerUrl: "#register-holi",
  },
  {
    id: "textile-workshop",
    title: "Banarasi Silk Weaving Workshop",
    city: "Varanasi",
    date: "2026-04-10",
    category: "Workshop",
    price: 1500,
    currency: "INR",
    capacity: 20,
    booked: 18,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    description: "Learn the 500-year-old art of Banarasi silk weaving from master craftsmen. Hands-on workshop covering dyeing, pattern creation, and traditional loom techniques.",
    registerUrl: "#register-textile",
  },
  {
    id: "rajasthani-folk-night",
    title: "Desert Folklore Evening",
    city: "Jaisalmer",
    date: "2026-03-25",
    category: "Performance",
    price: 1200,
    currency: "INR",
    capacity: 100,
    booked: 67,
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
    description: "An enchanting evening of Manganiyar and Langa folk music under the stars at the Sam Sand Dunes. Includes traditional Rajasthani dinner and camel safari.",
    registerUrl: "#register-folk",
  },
  {
    id: "photography-tour",
    title: "Heritage Photography Expedition",
    city: "Jaipur",
    date: "2026-04-05",
    category: "Heritage Walk",
    price: 2500,
    currency: "INR",
    capacity: 15,
    booked: 12,
    image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop",
    description: "A 3-day photography expedition led by National Geographic photographer Amit Roy. Capture golden-hour shots of Amber Fort, Nahargarh, and the Blue City of Jodhpur.",
    registerUrl: "#register-photo",
  },
  {
    id: "temple-architecture",
    title: "South Indian Temple Architecture Symposium",
    city: "Chennai",
    date: "2026-05-12",
    category: "Lecture",
    price: 400,
    currency: "INR",
    capacity: 150,
    booked: 89,
    image: "https://images.unsplash.com/photo-1603766312810-8a9c8e8c4f9e?w=800&h=600&fit=crop",
    description: "Academic symposium exploring Dravidian temple architecture with field visits to ancient Pallava and Chola temples. Featuring talks by renowned archaeologists and restoration experts.",
    registerUrl: "#register-symposium",
  },
  {
    id: "ganesh-chaturthi",
    title: "Ganesh Chaturthi Immersion Ceremony",
    city: "Mumbai",
    date: "2026-09-07",
    category: "Festival",
    price: 0,
    currency: "INR",
    capacity: 300,
    booked: 280,
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&h=600&fit=crop",
    description: "Witness the grand Visarjan procession of Lord Ganesha at Chowpatty Beach. Guided experience with explanations of rituals, music, and the cultural significance of the 10-day festival.",
    registerUrl: "#register-ganesh",
  },
  {
    id: "sufi-night",
    title: "Sufi Music Night at Nizamuddin",
    city: "Delhi",
    date: "2026-04-18",
    category: "Performance",
    price: 600,
    currency: "INR",
    capacity: 80,
    booked: 65,
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
    description: "An intimate evening of qawwali at the historic Nizamuddin Dargah, the shrine of Sufi saint Nizamuddin Auliya. Experience music that has been performed here for over 700 years.",
    registerUrl: "#register-sufi",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// STORIES — 5 Heritage Articles
// ═══════════════════════════════════════════════════════════════════════════════

export const STORIES: Story[] = [
  {
    id: "story-1",
    title: "The Secret Passages of Amber Fort",
    slug: "secret-passages-amber-fort",
    category: "Architecture",
    excerpt: "Discover the hidden tunnels and escape routes built by Rajput kings to protect their kingdom from invaders.",
    body: `For centuries, Amber Fort has stood as a testament to Rajput military ingenuity and architectural brilliance. But beneath its ornate halls and stunning courtyards lies a network of secret passages that few visitors ever see. These underground tunnels, some stretching for kilometers, were designed as escape routes during siege and as covert pathways for transporting treasure.

Local historians believe these passages connect Amber Fort to Jaigarh Fort on the hill above, and possibly to the old city of Jaipur itself. In 1976, treasure hunters famously discovered a sealed tunnel that allegedly contained hidden wealth — though what exactly was found remains a state secret to this day. Walking through the fort today, trained eyes can spot the subtle signs of hidden doorways in the walls of the Sheesh Mahal.`,
    author: "Dr. Ravi Sharma",
    date: "2026-01-15",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    id: "story-2",
    title: "The Women Who Built the Taj",
    slug: "women-who-built-taj",
    category: "Heritage",
    excerpt: "While Shah Jahan commissioned the monument, thousands of skilled craftswomen played crucial roles in its construction.",
    body: `The Taj Mahal is often remembered as Shah Jahan's eternal gift to Mumtaz Mahal, but the women's role in its creation extended far beyond being its inspiration. Historical records reveal that women artisans from across the Mughal Empire contributed to the monument's intricate inlay work, textile decorations, and garden designs.

In the workshops of Agra, women specializing in semi-precious stone cutting and polishing prepared the thousands of pieces that form the marble inlay patterns. Persian and Indian women skilled in the art of pietra dura (stone inlay) worked for years creating the floral motifs that adorn the cenotaphs. Even the selection of plants for the Charbagh gardens was overseen by the Empress's former ladies-in-waiting, who ensured the garden would bloom with her favorite flowers year-round.`,
    author: "Fatima Khan",
    date: "2026-01-08",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
  },
  {
    id: "story-3",
    title: "Last of the Scroll Painters",
    slug: "last-scroll-painters-rajasthan",
    category: "Tradition",
    excerpt: "Meet Shrilal Joshi, one of the last living masters of Phad, the 700-year-old Rajasthani scroll painting tradition.",
    body: `In a small village in Bhilwara district, 82-year-old Shrilal Joshi unfurls a 30-foot canvas painted with scenes from the epic of Pabuji, a Rajasthani folk deity. This is Phad painting — a dying art form that has been passed down through generations of the Joshi caste for over seven centuries.

"When I was young, every village had a Bhopa (priest-singer) who would travel with these scrolls, performing all-night narrations of our heroes," Shrilal recalls. "Now, the young people have televisions. They don't want to sit through a twelve-hour performance." Despite his age, Shrilal still teaches at a small school he founded, where he trains 15 students in the painstaking process of preparing the cloth, mixing natural pigments, and mastering the distinctive style that tells sacred stories.`,
    author: "Priya Mehta",
    date: "2025-12-22",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
  },
  {
    id: "story-4",
    title: "How AI is Saving Temple Sculptures",
    slug: "ai-saving-temple-sculptures",
    category: "Restoration",
    excerpt: "A groundbreaking project uses machine learning to document and digitally preserve thousands of deteriorating temple carvings.",
    body: `At the 1000-year-old Brihadeeswara Temple in Thanjavur, a team of engineers and archaeologists are racing against time. The temple's 16,000 carved figures are eroding at an alarming rate due to pollution and climate change. Their solution: train an AI to create perfect 3D replicas before the originals are lost forever.

Using photogrammetry and neural networks, the team has already documented over 3,000 sculptures in unprecedented detail. The AI can even predict how erosion will progress and suggest which figures need immediate conservation. "We're not trying to replace the originals," explains project lead Dr. Arun Kumar. "We're creating a digital ark for future generations. A thousand years from now, people will be able to see these sculptures exactly as they were in 2025."`,
    author: "Vikram Iyer",
    date: "2025-12-15",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
  },
  {
    id: "story-5",
    title: "The Living Bridges of Meghalaya",
    slug: "living-bridges-meghalaya",
    category: "Architecture",
    excerpt: "For generations, the Khasi people have grown bridges from the roots of rubber fig trees — a sustainable engineering marvel.",
    body: `In the cloud forests of Meghalaya, India's wettest state, conventional bridges made of wood or metal quickly rot or rust away. The indigenous Khasi and Jaintia tribes developed an ingenious solution centuries ago: they grow their bridges. By training the aerial roots of the Ficus elastica tree across rivers using bamboo scaffolding, they create living structures that only grow stronger with time.

Some of these root bridges are over 500 years old and can support the weight of 50 people simultaneously. The longest spans over 50 meters. Unlike concrete bridges, they require no external materials, zero carbon emissions, and actually improve the local ecosystem. Today, a new generation of Khasi youth is learning this ancient art, even as scientists study these structures for insights into sustainable bioengineering.`,
    author: "Devi Khonglah",
    date: "2025-11-30",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// DONATIONS — 3 Tiers
// ═══════════════════════════════════════════════════════════════════════════════

export interface DonationTier {
  amount: number;
  name: string;
  benefits: string[];
  color: "maroon" | "gold" | "bronze";
  description: string;
  currency: string;
  highlighted?: boolean;
}

export const DONATIONS: DonationTier[] = [
  {
    amount: 500,
    name: "Heritage Guardian",
    color: "bronze",
    description: "Begin your journey as a guardian of our shared history. Perfect for students and enthusiasts.",
    currency: "INR",
    benefits: [
      "Digital certificate of appreciation",
      "Monthly newsletter with restoration updates",
      "Name on our Heritage Wall",
      "10% discount on events",
    ],
  },
  {
    amount: 2000,
    name: "Culture Champion",
    color: "gold",
    description: "Become a pillar of preservation. Your support directly funds monument restoration projects.",
    currency: "INR",
    highlighted: true,
    benefits: [
      "All Heritage Guardian benefits",
      "Exclusive behind-the-scenes videos",
      "Annual heritage calendar",
      "Priority registration for events",
      "Personalized thank-you video",
      "25% discount on merchandise",
    ],
  },
  {
    amount: 5000,
    name: "Legacy Patron",
    color: "maroon",
    description: "Leave a lasting legacy. For those deeply committed to preserving India's architectural marvels.",
    currency: "INR",
    benefits: [
      "All Culture Champion benefits",
      "VIP access to any 2 events per year",
      "Private guided tour of a heritage site",
      "Name inscription at a restored monument",
      "Meeting with our conservation team",
      "Lifetime membership benefits",
      "Tax-deductible receipt",
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// COMMUNITY POSTS — 5 User Stories
// ═══════════════════════════════════════════════════════════════════════════════

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    author: "Ananya Desai",
    avatar: "https://i.pravatar.cc/150?img=1",
    content: "Just returned from the Khajuraho Dance Festival — absolutely mesmerizing! The way the ancient temples came alive with Bharatanatyam performances under the moonlight is something I'll never forget. Heritage Pulse's guided package made everything seamless. 💃🏛️",
    timestamp: "2026-01-20T14:30:00",
    likes: 234,
    image: "https://images.unsplash.com/photo-1545959570-a94084071b5d?w=800&h=600&fit=crop",
  },
  {
    id: "post-2",
    author: "Rahul Kapoor",
    avatar: "https://i.pravatar.cc/150?img=3",
    content: "My grandfather used to tell me stories about the secret tunnels beneath Mehrangarh Fort. Today, I finally explored them! Thank you @HeritagePulse for the exclusive access. Some legends are real. 🏰",
    timestamp: "2026-01-18T09:15:00",
    likes: 189,
    image: "https://images.unsplash.com/photo-1599661046295-8c87f6a1eb3c?w=800&h=600&fit=crop",
  },
  {
    id: "post-3",
    author: "Meera Krishnan",
    avatar: "https://i.pravatar.cc/150?img=5",
    content: "As a history teacher, I've always struggled to make heritage exciting for my students. The virtual tours on Heritage Pulse have changed everything! My class was completely engaged during our 'walk' through Hampi. We're planning a real trip now.",
    timestamp: "2026-01-15T16:45:00",
    likes: 412,
  },
  {
    id: "post-4",
    author: "Arjun Malhotra",
    avatar: "https://i.pravatar.cc/150?img=8",
    content: "Donated to the Konark Sun Temple restoration project today. It's humbling to think that a small contribution can help preserve a 800-year-old masterpiece for future generations. If you can, please join — every rupee counts! 🙏",
    timestamp: "2026-01-12T11:20:00",
    likes: 567,
  },
  {
    id: "post-5",
    author: "Sneha Patel",
    avatar: "https://i.pravatar.cc/150?img=9",
    content: "Three generations of my family at Meenakshi Temple last weekend. My grandmother explained the significance of every sculpture, stories she learned from her grandmother. This is what heritage preservation is really about — keeping our stories alive. ❤️",
    timestamp: "2026-01-10T18:00:00",
    likes: 723,
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Get featured monuments (limit to specified count)
 */
export function getFeaturedMonuments(count: number = 8): Monument[] {
  return MONUMENTS.slice(0, count);
}

/**
 * Get upcoming events (sorted by date)
 */
export function getUpcomingEvents(count: number = 5): Event[] {
  const now = new Date();
  return EVENTS
    .filter(event => new Date(event.date) >= now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, count);
}

/**
 * Get event availability percentage
 */
export function getEventAvailability(event: Event): number {
  return Math.round(((event.capacity - event.booked) / event.capacity) * 100);
}

/**
 * Format price in INR
 */
export function formatPrice(price: number): string {
  if (price === 0) return "Free";
  return `₹${price.toLocaleString("en-IN")}`;
}

/**
 * Format date for display
 */
export function formatEventDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Get monument by slug/id
 */
export function getMonumentById(id: string): Monument | undefined {
  return MONUMENTS.find(m => m.id === id);
}

/**
 * Get story by slug
 */
export function getStoryBySlug(slug: string): Story | undefined {
  return STORIES.find(s => s.slug === slug);
}

// ═══════════════════════════════════════════════════════════════════════════════
// ALIAS EXPORTS FOR COMPATIBILITY
// ═══════════════════════════════════════════════════════════════════════════════

export const formatDate = formatEventDate;
export const stories = STORIES;
export const events = EVENTS;
export const monuments = MONUMENTS;
export const donationTiers = DONATIONS;

export function getFeaturedEvents(count: number = 3): Event[] {
  // Return first few events as featured if no specific featured flag (or use random)
  return EVENTS.slice(0, count);
}

export function getFeaturedStories(count: number = 3): Story[] {
  const featured = STORIES.filter(s => s.featured);
  const nonFeatured = STORIES.filter(s => !s.featured);
  return [...featured, ...nonFeatured].slice(0, count);
}
