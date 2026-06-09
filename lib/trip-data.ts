export const TRIP = {
  name: "Poconos Mountains",
  tagline: "10 Friends · Mountains · Lake Day · Campfires · Grill Night · Saturday Rager",
  startDate: "2026-07-03T15:00:00-04:00",
  endDate: "2026-07-05T11:00:00-04:00",
  groupSize: 10,
  location: "Poconos Mountains, Pennsylvania",
  airbnbUrl:
    "https://www.airbnb.com/rooms/748035530634426073?adults=12&check_in=2026-07-03&check_out=2026-07-05",
  airbnbCoords: { lat: 41.1162, lng: -75.3236 },
  promisedLandCoords: { lat: 41.3187, lng: -75.2143 },
};

export const PARTICIPANTS = [
  { name: "Milo", role: "Head Boy", emoji: "🎯" },
  { name: "Thanh", role: "Sex Symbol", emoji: "💋" },
  { name: "Freya", role: "Hype Girl", emoji: "📣" },
  { name: "Gavin", role: "Uber Driver", emoji: "🚗" },
  { name: "Sally", role: "Uber Driver Wife", emoji: "💍" },
  { name: "Brian", role: "Lightweight", emoji: "🍺" },
  { name: "Amaris", role: "Curfew Child", emoji: "🌙" },
  { name: "Sophia", role: "Asexual", emoji: "🧊" },
  { name: "Sav", role: "Temu Nina Lin", emoji: "🪩" },
  { name: "Derek", role: "Loverboy", emoji: "💘" },
];

export const HIGHLIGHTS = [
  { icon: "🏡", label: "Luxury Airbnb" },
  { icon: "🔥", label: "Campfire & S'mores" },
  { icon: "🥾", label: "Hiking" },
  { icon: "🌊", label: "Lake Day" },
  { icon: "🛟", label: "Floaties & Water Games" },
  { icon: "🍔", label: "Grill Night" },
  { icon: "🎉", label: "Saturday Night Rager" },
];

export const ACTIVITIES = [
  {
    title: "Hiking",
    desc: "Forest trails and morning lookouts in the Poconos.",
    img: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=900&q=80",
    accent: "from-forest-500 to-forest-700",
  },
  {
    title: "Lake Day",
    desc: "Promised Land State Park — beach, swim, float.",
    img: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    accent: "from-lake-500 to-lake-700",
  },
  {
    title: "Swimming",
    desc: "Cool down in the lake after the heat.",
    img: "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=900&q=80",
    accent: "from-lake-400 to-forest-500",
  },
  {
    title: "Campfires",
    desc: "Nightly fire pit hangs. Bring a hoodie.",
    img: "https://images.unsplash.com/photo-1475738972911-5b44ce984c42?auto=format&fit=crop&w=900&q=80",
    accent: "from-campfire-500 to-sunset-600",
  },
  {
    title: "S'mores",
    desc: "Marshmallow, Hershey's, graham. Sacred.",
    img: "https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&w=900&q=80",
    accent: "from-sunset-400 to-campfire-500",
  },
  {
    title: "Floaties",
    desc: "Giant inflatables. Beer pong rafts. Drift mode.",
    img: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=900&q=80",
    accent: "from-lake-400 to-sunset-400",
  },
  {
    title: "Water Games",
    desc: "Volleyball, football, chicken fights, repeat.",
    img: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=900&q=80",
    accent: "from-lake-500 to-gold-500",
  },
  {
    title: "Grilling",
    desc: "Burgers, dogs, BBQ. Sauce optional, judgment mandatory.",
    img: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80",
    accent: "from-sunset-500 to-campfire-600",
  },
  {
    title: "Party Night",
    desc: "Saturday rager. Music, dancing, games, mayhem.",
    img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
    accent: "from-campfire-500 to-sunset-500",
  },
  {
    title: "Group Photos",
    desc: "If it isn't documented, it didn't happen.",
    img: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=900&q=80",
    accent: "from-gold-500 to-sunset-500",
  },
];

export type ItineraryBlock = {
  time: string;
  title: string;
  items: string[];
  icon: string;
};

export type ItineraryDay = {
  day: string;
  date: string;
  theme: string;
  blocks: ItineraryBlock[];
};

export const ITINERARY: ItineraryDay[] = [
  {
    day: "Friday",
    date: "July 3",
    theme: "Arrival & Chill",
    blocks: [
      {
        time: "Afternoon",
        title: "Arrive & Settle In",
        icon: "🚗",
        items: [
          "Arrive at the Airbnb",
          "Unpack and pick rooms",
          "Explore the property",
          "Grocery + alcohol setup",
        ],
      },
      {
        time: "Evening",
        title: "Charcuterie & Chill",
        icon: "🧀",
        items: [
          "Charcuterie board and drinks",
          "Chill social hangout",
          "Wine and beer for everyone",
          "Music, card games, conversations",
        ],
      },
      {
        time: "Late Night",
        title: "Campfire & Stargazing",
        icon: "🔥",
        items: [
          "Campfire pit gathering",
          "S'mores making",
          "Stargazing",
          "Relaxed first night",
        ],
      },
    ],
  },
  {
    day: "Saturday",
    date: "July 4",
    theme: "Lake Day → Rager",
    blocks: [
      {
        time: "Morning",
        title: "Slow Start",
        icon: "☕",
        items: [
          "Light breakfast",
          "Coffee + recovery session",
          "Group planning for the day",
        ],
      },
      {
        time: "Late Morning",
        title: "Adventure: Hike or Lake",
        icon: "🥾",
        items: [
          "Option A — Hiking adventure",
          "Option B — Promised Land State Park (24 min drive)",
          "Swimming, floating, beach activities",
          "Note: No lifeguards on duty",
        ],
      },
      {
        time: "Afternoon",
        title: "Floaties + Water Games",
        icon: "🛟",
        items: [
          "Giant floaties",
          "Water games",
          "Group photos",
          "Pure relaxation",
        ],
      },
      {
        time: "Evening",
        title: "Grill Night",
        icon: "🍔",
        items: [
          "Burgers, hot dogs, BBQ",
          "Snacks and drinks",
          "Sunset photos",
          "Easy outdoor dinner",
        ],
      },
      {
        time: "Night",
        title: "🎉 SATURDAY NIGHT RAGER",
        icon: "🎉",
        items: [
          "Music — playlist on full blast",
          "Party games",
          "Drinks and dancing",
          "Celebration atmosphere",
          "Memories you'll talk about for years",
        ],
      },
    ],
  },
  {
    day: "Sunday",
    date: "July 5",
    theme: "Cleanup & Home",
    blocks: [
      {
        time: "Morning",
        title: "Wrap Up",
        icon: "🥞",
        items: [
          "Breakfast together",
          "Cleanup crew in motion",
          "Final group photos",
          "Pack belongings",
        ],
      },
      {
        time: "Afternoon",
        title: "Departure",
        icon: "🛣️",
        items: ["Checkout", "Drive home"],
      },
    ],
  },
];

export const AMENITIES = [
  "Hot Tub",
  "Fire Pit",
  "Outdoor Grill",
  "Patio with Lake View",
  "Game Room",
  "Full Kitchen",
  "Wi-Fi",
  "Smart TV",
  "Washer & Dryer",
  "Free Parking",
  "Heating & A/C",
  "Coffee Maker",
];

export const SLEEPING = [
  { room: "Master Suite", config: "1 King" },
  { room: "Bedroom 2", config: "1 Queen" },
  { room: "Bedroom 3", config: "1 Queen" },
  { room: "Bedroom 4", config: "2 Twins" },
  { room: "Loft", config: "2 Queens" },
  { room: "Living Room", config: "1 Pull-out Sofa" },
];

export const PACKING = {
  essentials: [
    "Clothes",
    "Swimsuit",
    "Towel",
    "Hiking shoes",
    "Water bottle",
    "Sunglasses",
    "Sunscreen",
    "Phone charger",
    "Portable speaker",
    "Campfire clothes",
  ],
  optional: [
    "Floaties",
    "Games",
    "Coolers",
    "Extra drinks",
    "Cameras",
  ],
};

export const SHOPPING = [
  {
    name: "Giant Inflatable Floaty",
    desc: "Massive lounger — the centerpiece of lake day.",
    icon: "🦩",
    color: "from-sunset-400 to-campfire-500",
  },
  {
    name: "Beer Pong Floaty",
    desc: "Floating pong table. Yes, really.",
    icon: "🏓",
    color: "from-gold-400 to-sunset-500",
  },
  {
    name: "Floating Cooler",
    desc: "Cold drinks within arm's reach in the lake.",
    icon: "🧊",
    color: "from-lake-400 to-lake-600",
  },
  {
    name: "Water Football",
    desc: "Grippy ball that flies wet.",
    icon: "🏈",
    color: "from-campfire-500 to-sunset-500",
  },
  {
    name: "Water Volleyball Set",
    desc: "Inflatable net + ball. Tournament time.",
    icon: "🏐",
    color: "from-lake-500 to-forest-500",
  },
  {
    name: "Lake Toys Bundle",
    desc: "Goggles, dive rings, the works.",
    icon: "🐠",
    color: "from-lake-400 to-gold-400",
  },
  {
    name: "Waterproof Speaker",
    desc: "Loud, floats, JBL-loud. Soundtrack of the weekend.",
    icon: "🔊",
    color: "from-forest-500 to-lake-500",
  },
];

export const COSTS = [
  { label: "Airbnb", total: 1900, perPerson: 190, color: "#10b981" },
  { label: "Groceries / Drinks / Firewood", total: 300, perPerson: 30, color: "#f97316" },
  { label: "Gas Contribution", total: 180, perPerson: 18, color: "#06b6d4" },
];

export const GROUP_ROLES = [
  { key: "cars", label: "Cars & Carpool", icon: "🚗" },
  { key: "groceries", label: "Groceries", icon: "🛒" },
  { key: "grill", label: "Grill Crew", icon: "🍔" },
  { key: "drinks", label: "Drinks", icon: "🍻" },
  { key: "cleanup", label: "Cleanup Crew", icon: "🧹" },
] as const;

export const FAQ = [
  {
    q: "What's the drive time to the Airbnb?",
    a: "Roughly 2 hours from NYC and 2.5 hours from Philly, depending on traffic. The Airbnb is in the Poconos Mountains, PA.",
  },
  {
    q: "How far is the lake?",
    a: "Promised Land State Park is a 24-minute drive from the Airbnb. Plan to caravan in the morning to grab beach space.",
  },
  {
    q: "Are there lifeguards at the lake?",
    a: "No. There are no lifeguards on duty at Promised Land. Bring floaties and use the buddy system.",
  },
  {
    q: "What's the cost per person?",
    a: "Approximately $238 per person all-in: ~$190 Airbnb, ~$30 food/drink/firewood, ~$18 gas contribution.",
  },
  {
    q: "What about the optional Friday-night experience?",
    a: "An optional mushroom experience is available Friday night for those who choose to participate. There's zero pressure either way — wine, beer, and games for everyone else. We'll talk through it as a group before anything happens.",
  },
  {
    q: "Can I bring a plus-one?",
    a: "The Airbnb is booked for 12. Reach out to Milo before adding anyone — sleeping arrangements are tight.",
  },
  {
    q: "What should I NOT bring?",
    a: "Anything you'd be sad to lose. Lake day + campfire + party night = stuff gets sandy, smoky, or sticky.",
  },
];
