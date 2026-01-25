/* ═══════════════════════════════════════════════════════════════════════════════
   HERITAGE PULSE — Mock Data
   Comprehensive dataset for monuments, events, stories, donations, and community
═══════════════════════════════════════════════════════════════════════════════ */

// ─────────────────────────── Type Definitions ───────────────────────────

export type MonumentCategory = "UNESCO" | "Museum" | "Fort" | "Temple" | "Palace";
export type EventCategory = "Festival" | "Exhibition" | "Performance";
export type StoryCategory = "Heritage" | "Architecture" | "Oral History";

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
  readingTime: number;
  image: string;
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
  // ─────────────────────────── UNESCO World Heritage Sites ───────────────────────────
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    city: "Agra",
    state: "Uttar Pradesh",
    lat: 27.1751,
    lng: 78.0421,
    category: "UNESCO",
    description: "An ivory-white marble mausoleum built by Mughal Emperor Shah Jahan in memory of his wife Mumtaz Mahal. Considered the jewel of Muslim art in India and one of the universally admired masterpieces of world heritage.",
    era: "1632–1653 CE",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
    funFact: "The Taj Mahal changes color depending on the time of day — pinkish at dawn, milky white in evening, and golden under moonlight.",
    visitingHours: "Sunrise to Sunset (Closed on Fridays)",
  },
  {
    id: "amber-fort",
    name: "Amber Fort",
    city: "Jaipur",
    state: "Rajasthan",
    lat: 26.9855,
    lng: 75.8513,
    category: "Fort",
    description: "A majestic fort-palace complex known for its artistic Hindu-style elements and stunning views of Maota Lake. Built from red sandstone and marble, it reflects a unique blend of Rajput and Mughal architecture.",
    era: "1592 CE",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",
    funFact: "The Sheesh Mahal (Mirror Palace) inside Amber Fort can illuminate the entire room with just two candles using thousands of mirror pieces.",
    visitingHours: "8:00 AM – 5:30 PM",
  },
  {
    id: "meenakshi-temple",
    name: "Meenakshi Amman Temple",
    city: "Madurai",
    state: "Tamil Nadu",
    lat: 9.9195,
    lng: 78.1193,
    category: "Temple",
    description: "A historic Hindu temple dedicated to Goddess Meenakshi and Lord Sundareshwar. Famous for its 14 magnificent gopurams (gateway towers) covered with thousands of colorful sculptures.",
    era: "6th century CE (rebuilt 1623–1655)",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop",
    funFact: "The temple complex covers 14 acres and contains approximately 33,000 sculptures.",
    visitingHours: "5:00 AM – 12:30 PM, 4:00 PM – 9:30 PM",
  },
  {
    id: "qutub-minar",
    name: "Qutub Minar",
    city: "Delhi",
    state: "Delhi",
    lat: 28.5245,
    lng: 77.1855,
    category: "UNESCO",
    description: "A 73-meter tall minaret made of red sandstone and marble, representing the beginning of Muslim rule in India. The tower has five distinct stories, each marked by a projecting balcony.",
    era: "1193–1220 CE",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop",
    funFact: "The tower has a slight tilt of about 65 centimeters from the perpendicular, believed to be intentional for structural stability.",
    visitingHours: "7:00 AM – 5:00 PM",
  },
  {
    id: "hawa-mahal",
    name: "Hawa Mahal",
    city: "Jaipur",
    state: "Rajasthan",
    lat: 26.9239,
    lng: 75.8267,
    category: "Palace",
    description: "The 'Palace of Winds' is a stunning pink sandstone structure with 953 small windows designed to allow royal women to observe street life without being seen. Its unique five-story exterior resembles the honeycomb of a beehive.",
    era: "1799 CE",
    image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?w=800&h=600&fit=crop",
    funFact: "Despite being five stories tall, Hawa Mahal has no stairs — the levels are connected by ramps.",
    visitingHours: "9:00 AM – 4:30 PM",
  },
  // ─────────────────────────── More Heritage Sites ───────────────────────────
  {
    id: "red-fort",
    name: "Red Fort",
    city: "Delhi",
    state: "Delhi",
    lat: 28.6562,
    lng: 77.2410,
    category: "UNESCO",
    description: "A massive red sandstone fort that served as the main residence of Mughal emperors for nearly 200 years. Its walls rise 33 meters above the ground and span over 2 kilometers.",
    era: "1638–1648 CE",
    image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800&h=600&fit=crop",
    funFact: "Every year on India's Independence Day, the Prime Minister hoists the national flag and delivers a speech from the fort's ramparts.",
    visitingHours: "9:30 AM – 4:30 PM (Closed on Mondays)",
  },
  {
    id: "mysore-palace",
    name: "Mysore Palace",
    city: "Mysuru",
    state: "Karnataka",
    lat: 12.3052,
    lng: 76.6552,
    category: "Palace",
    description: "A historical palace and royal residence that blends Hindu, Muslim, Rajput, and Gothic architectural styles. The palace is illuminated with nearly 100,000 light bulbs during the Dasara festival.",
    era: "1912 CE",
    image: "https://images.unsplash.com/photo-1600100397608-e1f6e9a0a919?w=800&h=600&fit=crop",
    funFact: "Mysore Palace is the second most visited tourist attraction in India after the Taj Mahal, with over 6 million annual visitors.",
    visitingHours: "10:00 AM – 5:30 PM",
  },
  {
    id: "khajuraho",
    name: "Khajuraho Temples",
    city: "Khajuraho",
    state: "Madhya Pradesh",
    lat: 24.8318,
    lng: 79.9199,
    category: "UNESCO",
    description: "A group of Hindu and Jain temples famous for their nagara-style architectural symbolism and erotic sculptures. Originally 85 temples were built, of which only 25 survive today.",
    era: "950–1050 CE",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    funFact: "Only about 10% of the sculptures are erotic in nature — the majority depict gods, goddesses, celestial beings, and everyday life.",
    visitingHours: "Sunrise to Sunset",
  },
  {
    id: "konark-temple",
    name: "Konark Sun Temple",
    city: "Konark",
    state: "Odisha",
    lat: 19.8876,
    lng: 86.0945,
    category: "UNESCO",
    description: "A 13th-century temple dedicated to the Sun God Surya, designed as a giant chariot with 24 elaborately carved wheels pulled by seven horses. It represents the pinnacle of Kalinga architecture.",
    era: "1250 CE",
    image: "https://images.unsplash.com/photo-1590766940554-634c4e2c6127?w=800&h=600&fit=crop",
    funFact: "The temple was originally built at the mouth of the river Chandrabhaga, which has since receded.",
    visitingHours: "6:00 AM – 8:00 PM",
  },
  {
    id: "golden-temple",
    name: "Golden Temple (Harmandir Sahib)",
    city: "Amritsar",
    state: "Punjab",
    lat: 31.6200,
    lng: 74.8765,
    category: "Temple",
    description: "The holiest Gurdwara and pilgrimage site of Sikhism, known for its stunning gold-plated architecture reflecting in the sacred Sarovar pool. The temple serves free meals to over 100,000 visitors daily.",
    era: "1577–1604 CE",
    image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&h=600&fit=crop",
    funFact: "The langar (community kitchen) at the Golden Temple is the world's largest free kitchen, running 24 hours a day.",
    visitingHours: "Open 24 hours",
  },
  // ─────────────────────────── Museums & Additional Sites ───────────────────────────
  {
    id: "indian-museum",
    name: "Indian Museum",
    city: "Kolkata",
    state: "West Bengal",
    lat: 22.5580,
    lng: 88.3509,
    category: "Museum",
    description: "The largest and oldest museum in India, housing rare collections of antiques, armor, ornaments, fossils, skeletons, and Mughal paintings. Founded in 1814, it contains over 100,000 objects.",
    era: "1814 CE",
    image: "https://images.unsplash.com/photo-1569700338389-e0f30b1f29cf?w=800&h=600&fit=crop",
    funFact: "The museum houses the ashes of Buddha and a 4,000-year-old Egyptian mummy.",
    visitingHours: "10:00 AM – 5:00 PM (Closed on Mondays)",
  },
  {
    id: "chhatrapati-shivaji",
    name: "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya",
    city: "Mumbai",
    state: "Maharashtra",
    lat: 18.9268,
    lng: 72.8327,
    category: "Museum",
    description: "A premier art and history museum featuring sculptures, terracotta, and other artifacts from ancient India. The building itself is an architectural marvel blending Indo-Saracenic, Mughal, and British styles.",
    era: "1922 CE",
    image: "https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800&h=600&fit=crop",
    funFact: "The museum was originally named after Prince of Wales (later King George V) who laid its foundation stone in 1905.",
    visitingHours: "10:15 AM – 6:00 PM",
  },
  {
    id: "hampi",
    name: "Hampi Ruins",
    city: "Hampi",
    state: "Karnataka",
    lat: 15.3350,
    lng: 76.4600,
    category: "UNESCO",
    description: "The ruins of Vijayanagara, the former capital of the Vijayanagara Empire, spread over 26 square kilometers. Once one of the largest and richest cities in the world, it was destroyed in 1565.",
    era: "14th–16th century CE",
    image: "https://images.unsplash.com/photo-1590766740886-b8b0a9b4e8a8?w=800&h=600&fit=crop",
    funFact: "At its peak, Hampi was larger than Rome, with a population of about 500,000 people.",
    visitingHours: "Sunrise to Sunset",
  },
  {
    id: "mehrangarh-fort",
    name: "Mehrangarh Fort",
    city: "Jodhpur",
    state: "Rajasthan",
    lat: 26.2979,
    lng: 73.0186,
    category: "Fort",
    description: "One of the largest forts in India, perched 125 meters above the city on a rocky hill. Its imposing walls, up to 36 meters high and 21 meters wide, enclose ornate palaces and intricate carvings.",
    era: "1459 CE",
    image: "https://images.unsplash.com/photo-1599661046295-8c87f6a1eb3c?w=800&h=600&fit=crop",
    funFact: "Rudyard Kipling called Mehrangarh 'the work of angels, fairies, and giants.'",
    visitingHours: "9:00 AM – 5:00 PM",
  },
  {
    id: "victoria-memorial",
    name: "Victoria Memorial",
    city: "Kolkata",
    state: "West Bengal",
    lat: 22.5448,
    lng: 88.3426,
    category: "Museum",
    description: "A large marble building dedicated to Queen Victoria, now serving as a museum and tourist destination. Built in the Indo-Saracenic style, it houses a vast collection of memorabilia from the British Raj.",
    era: "1906–1921 CE",
    image: "https://images.unsplash.com/photo-1558431382-27e303142255?w=800&h=600&fit=crop",
    funFact: "The memorial's bronze Angel of Victory statue atop the central dome rotates with the wind like a weather vane.",
    visitingHours: "10:00 AM – 5:00 PM (Closed on Mondays)",
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
    category: "Exhibition",
    price: 1500,
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
    category: "Exhibition",
    price: 2500,
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
    category: "Exhibition",
    price: 400,
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
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop",
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
    readingTime: 8,
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop",
  },
  {
    id: "story-3",
    title: "Last of the Scroll Painters",
    slug: "last-scroll-painters-rajasthan",
    category: "Oral History",
    excerpt: "Meet Shrilal Joshi, one of the last living masters of Phad, the 700-year-old Rajasthani scroll painting tradition.",
    body: `In a small village in Bhilwara district, 82-year-old Shrilal Joshi unfurls a 30-foot canvas painted with scenes from the epic of Pabuji, a Rajasthani folk deity. This is Phad painting — a dying art form that has been passed down through generations of the Joshi caste for over seven centuries.

"When I was young, every village had a Bhopa (priest-singer) who would travel with these scrolls, performing all-night narrations of our heroes," Shrilal recalls. "Now, the young people have televisions. They don't want to sit through a twelve-hour performance." Despite his age, Shrilal still teaches at a small school he founded, where he trains 15 students in the painstaking process of preparing the cloth, mixing natural pigments, and mastering the distinctive style that tells sacred stories.`,
    author: "Priya Mehta",
    date: "2025-12-22",
    readingTime: 10,
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop",
  },
  {
    id: "story-4",
    title: "How AI is Saving Temple Sculptures",
    slug: "ai-saving-temple-sculptures",
    category: "Heritage",
    excerpt: "A groundbreaking project uses machine learning to document and digitally preserve thousands of deteriorating temple carvings.",
    body: `At the 1000-year-old Brihadeeswara Temple in Thanjavur, a team of engineers and archaeologists are racing against time. The temple's 16,000 carved figures are eroding at an alarming rate due to pollution and climate change. Their solution: train an AI to create perfect 3D replicas before the originals are lost forever.

Using photogrammetry and neural networks, the team has already documented over 3,000 sculptures in unprecedented detail. The AI can even predict how erosion will progress and suggest which figures need immediate conservation. "We're not trying to replace the originals," explains project lead Dr. Arun Kumar. "We're creating a digital ark for future generations. A thousand years from now, people will be able to see these sculptures exactly as they were in 2025."`,
    author: "Vikram Iyer",
    date: "2025-12-15",
    readingTime: 7,
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
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// DONATIONS — 3 Tiers
// ═══════════════════════════════════════════════════════════════════════════════

export const DONATIONS: DonationTier[] = [
  {
    amount: 500,
    name: "Heritage Guardian",
    color: "bronze",
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
