// Cities and Destinations Data for AstraTrip
const citiesData = {
    "paris": {
        name: "Paris, France",
        country: "France",
        continent: "Europe",
        coordinates: { lat: 48.8566, lng: 2.3522 },
        description: "The City of Light, known for art, fashion, gastronomy and culture",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
        imageAlt: "Eiffel Tower and Paris skyline at sunset",
        famousSpots: [
            {
                name: "Eiffel Tower",
                description: "Iconic iron lattice tower on the Champ de Mars",
                category: "landmark",
                image: "🗼",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€26"
            },
            {
                name: "Louvre Museum",
                description: "World's largest art museum and historic monument",
                category: "culture",
                image: "🎨",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "€17"
            },
            {
                name: "Notre-Dame Cathedral",
                description: "Medieval Catholic cathedral on Île de la Cité",
                category: "culture",
                image: "⛪",
                timeNeeded: "1-2 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Arc de Triomphe",
                description: "Monument honoring those who fought for France",
                category: "landmark",
                image: "🏛️",
                timeNeeded: "1 hour",
                bestTime: "evening",
                price: "€13"
            },
            {
                name: "Champs-Élysées",
                description: "Famous avenue known for shopping and entertainment",
                category: "shopping",
                image: "🛍️",
                timeNeeded: "2-3 hours",
                bestTime: "afternoon",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Seine River cruise", "Montmartre walking tour", "Catacombs visit"],
            foodie: ["Boulangerie tasting", "Wine tasting", "Cheese market"],
            relaxation: ["Luxembourg Gardens", "Tuileries Garden", "Spa day"],
            culture: ["Museum pass", "Historical walking tour", "Opera visit"],
            shopping: ["Galeries Lafayette", "Le Marais boutiques", "Antique markets"]
        },
        weather: {
            spring: { temp: "15°C", condition: "🌤️", description: "Mild and pleasant" },
            summer: { temp: "25°C", condition: "☀️", description: "Warm and sunny" },
            autumn: { temp: "18°C", condition: "🍂", description: "Cool and colorful" },
            winter: { temp: "8°C", condition: "❄️", description: "Cold and magical" }
        },
        packingList: ["Comfortable walking shoes", "Light jacket", "Umbrella", "Camera", "Travel adapter"]
    },
    
    "tokyo": {
        name: "Tokyo, Japan",
        country: "Japan",
        continent: "Asia",
        coordinates: { lat: 35.6762, lng: 139.6503 },
        description: "A fascinating blend of ultramodern and traditional",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
        imageAlt: "Tokyo cityscape with Tokyo Tower and modern buildings",
        famousSpots: [
            {
                name: "Shibuya Crossing",
                description: "World's busiest pedestrian crossing",
                category: "landmark",
                image: "🚶",
                timeNeeded: "30 minutes",
                bestTime: "evening",
                price: "Free"
            },
            {
                name: "Tsukiji Outer Market",
                description: "Famous fish market and food paradise",
                category: "foodie",
                image: "🐟",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Senso-ji Temple",
                description: "Ancient Buddhist temple in Asakusa",
                category: "culture",
                image: "⛩️",
                timeNeeded: "1-2 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Tokyo Skytree",
                description: "Tallest tower in Japan with observation deck",
                category: "landmark",
                image: "🗼",
                timeNeeded: "2 hours",
                bestTime: "evening",
                price: "¥3,100"
            },
            {
                name: "Harajuku",
                description: "Fashion district known for street style",
                category: "shopping",
                image: "👗",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Robot Restaurant", "VR gaming centers", "Escape rooms"],
            foodie: ["Ramen tasting", "Sushi making class", "Street food tour"],
            relaxation: ["Traditional onsen", "Tea ceremony", "Zen meditation"],
            culture: ["Sumo wrestling", "Traditional crafts", "Kabuki theater"],
            shopping: ["Akihabara electronics", "Ginza luxury", "Nakamise shopping"]
        },
        weather: {
            spring: { temp: "18°C", condition: "🌸", description: "Cherry blossom season" },
            summer: { temp: "28°C", condition: "☀️", description: "Hot and humid" },
            autumn: { temp: "20°C", condition: "🍁", description: "Mild and pleasant" },
            winter: { temp: "8°C", condition: "❄️", description: "Cold and dry" }
        },
        packingList: ["Comfortable shoes", "Light clothing", "Portable fan", "JR Pass", "Pocket WiFi"]
    },
    
    "new-york": {
        name: "New York City, USA",
        country: "United States",
        continent: "North America",
        coordinates: { lat: 40.7128, lng: -74.0060 },
        description: "The city that never sleeps",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
        imageAlt: "New York City skyline with Empire State Building",
        famousSpots: [
            {
                name: "Statue of Liberty",
                description: "Iconic symbol of freedom and democracy",
                category: "landmark",
                image: "🗽",
                timeNeeded: "3-4 hours",
                bestTime: "morning",
                price: "$24"
            },
            {
                name: "Times Square",
                description: "Famous intersection and entertainment hub",
                category: "landmark",
                image: "🎭",
                timeNeeded: "1-2 hours",
                bestTime: "evening",
                price: "Free"
            },
            {
                name: "Central Park",
                description: "Urban oasis with 843 acres of green space",
                category: "relaxation",
                image: "🌳",
                timeNeeded: "2-4 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Metropolitan Museum of Art",
                description: "One of the world's largest art museums",
                category: "culture",
                image: "🎨",
                timeNeeded: "3-5 hours",
                bestTime: "afternoon",
                price: "$25"
            },
            {
                name: "Brooklyn Bridge",
                description: "Historic suspension bridge connecting boroughs",
                category: "landmark",
                image: "🌉",
                timeNeeded: "1-2 hours",
                bestTime: "sunset",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Helicopter tour", "Rock climbing gym", "Escape room"],
            foodie: ["Pizza tour", "Food truck tasting", "Chinatown dim sum"],
            relaxation: ["Spa day", "Yoga in the park", "Boat cruise"],
            culture: ["Broadway show", "Jazz clubs", "Art galleries"],
            shopping: ["Fifth Avenue", "SoHo boutiques", "Brooklyn markets"]
        },
        weather: {
            spring: { temp: "15°C", condition: "🌸", description: "Mild and pleasant" },
            summer: { temp: "28°C", condition: "☀️", description: "Hot and humid" },
            autumn: { temp: "18°C", condition: "🍂", description: "Cool and colorful" },
            winter: { temp: "2°C", condition: "❄️", description: "Cold and snowy" }
        },
        packingList: ["Comfortable walking shoes", "Layers of clothing", "Subway card", "Camera", "Comfortable bag"]
    },
    
    "bali": {
        name: "Bali, Indonesia",
        country: "Indonesia",
        continent: "Asia",
        coordinates: { lat: -8.3405, lng: 115.0920 },
        description: "Island of the Gods with stunning beaches and culture",
        image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
        imageAlt: "Bali rice terraces with lush green landscape",
        famousSpots: [
            {
                name: "Tanah Lot Temple",
                description: "Ancient Hindu temple perched on a rock",
                category: "culture",
                image: "🏛️",
                timeNeeded: "2-3 hours",
                bestTime: "sunset",
                price: "IDR 60,000"
            },
            {
                name: "Ubud Monkey Forest",
                description: "Sacred forest with playful macaques",
                category: "adventure",
                image: "🐒",
                timeNeeded: "2 hours",
                bestTime: "morning",
                price: "IDR 80,000"
            },
            {
                name: "Rice Terraces",
                description: "Ancient irrigation system and farming method",
                category: "culture",
                image: "🌾",
                timeNeeded: "3-4 hours",
                bestTime: "morning",
                price: "IDR 40,000"
            },
            {
                name: "Nusa Penida",
                description: "Island paradise with crystal clear waters",
                category: "relaxation",
                image: "🏝️",
                timeNeeded: "Full day",
                bestTime: "morning",
                price: "IDR 800,000"
            },
            {
                name: "Seminyak Beach",
                description: "Trendy beach area with luxury resorts",
                category: "relaxation",
                image: "🏖️",
                timeNeeded: "4-6 hours",
                bestTime: "afternoon",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Surfing lessons", "Trekking Mount Batur", "White water rafting"],
            foodie: ["Cooking class", "Warung food tour", "Coffee plantation"],
            relaxation: ["Balinese massage", "Yoga retreat", "Beach club"],
            culture: ["Traditional dance", "Temple ceremony", "Art village tour"],
            shopping: ["Ubud market", "Seminyak boutiques", "Art galleries"]
        },
        weather: {
            spring: { temp: "28°C", condition: "🌺", description: "Warm and pleasant" },
            summer: { temp: "30°C", condition: "☀️", description: "Hot and dry" },
            autumn: { temp: "29°C", condition: "🌴", description: "Warm and breezy" },
            winter: { temp: "27°C", condition: "🌧️", description: "Warm with rain" }
        },
        packingList: ["Swimwear", "Light clothing", "Mosquito repellent", "Sunscreen", "Comfortable sandals"]
    },
    
    "santorini": {
        name: "Santorini, Greece",
        country: "Greece",
        continent: "Europe",
        coordinates: { lat: 36.3932, lng: 25.4615 },
        description: "Stunning volcanic island with white-washed buildings",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
        imageAlt: "Santorini white buildings and blue domes overlooking the sea",
        famousSpots: [
            {
                name: "Oia Sunset",
                description: "Famous sunset viewing point",
                category: "relaxation",
                image: "🌅",
                timeNeeded: "2 hours",
                bestTime: "sunset",
                price: "Free"
            },
            {
                name: "Fira Town",
                description: "Capital with stunning caldera views",
                category: "culture",
                image: "🏛️",
                timeNeeded: "3-4 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Red Beach",
                description: "Unique red sand beach",
                category: "relaxation",
                image: "🏖️",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "Wine Museum",
                description: "Learn about local wine production",
                category: "foodie",
                image: "🍷",
                timeNeeded: "2 hours",
                bestTime: "afternoon",
                price: "€8"
            },
            {
                name: "Volcano Tour",
                description: "Explore the volcanic crater",
                category: "adventure",
                image: "🌋",
                timeNeeded: "4-5 hours",
                bestTime: "morning",
                price: "€25"
            }
        ],
        activities: {
            adventure: ["Volcano hiking", "Sailing tour", "Scuba diving"],
            foodie: ["Wine tasting", "Cooking class", "Seafood dinner"],
            relaxation: ["Beach day", "Spa treatment", "Sunset cruise"],
            culture: ["Archaeological site", "Museum visit", "Local village tour"],
            shopping: ["Art galleries", "Jewelry shops", "Local crafts"]
        },
        weather: {
            spring: { temp: "20°C", condition: "🌸", description: "Mild and pleasant" },
            summer: { temp: "28°C", condition: "☀️", description: "Hot and sunny" },
            autumn: { temp: "22°C", condition: "🍂", description: "Warm and breezy" },
            winter: { temp: "15°C", condition: "🌧️", description: "Cool with rain" }
        },
        packingList: ["Swimwear", "Light clothing", "Comfortable shoes", "Camera", "Sunscreen"]
    },

    "london": {
        name: "London, England",
        country: "United Kingdom",
        continent: "Europe",
        coordinates: { lat: 51.5074, lng: -0.1278 },
        description: "Historic capital with royal heritage and modern culture",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
        imageAlt: "London skyline with Big Ben and Westminster",
        famousSpots: [
            {
                name: "Big Ben",
                description: "Iconic clock tower at Westminster Palace",
                category: "landmark",
                image: "🕰️",
                timeNeeded: "1 hour",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "British Museum",
                description: "World-famous museum of human history",
                category: "culture",
                image: "🏛️",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "Tower Bridge",
                description: "Victorian bridge over River Thames",
                category: "landmark",
                image: "🌉",
                timeNeeded: "2 hours",
                bestTime: "morning",
                price: "£12"
            },
            {
                name: "Buckingham Palace",
                description: "Official residence of British monarch",
                category: "culture",
                image: "👑",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "£30"
            },
            {
                name: "Oxford Street",
                description: "Famous shopping street with major retailers",
                category: "shopping",
                image: "🛍️",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Thames River cruise", "Jack the Ripper tour", "Escape rooms"],
            foodie: ["Afternoon tea", "Fish and chips", "Indian curry tour"],
            relaxation: ["Hyde Park stroll", "Spa day", "Theater show"],
            culture: ["West End musical", "Royal tour", "Museum hopping"],
            shopping: ["Covent Garden", "Camden Market", "Harrods"]
        },
        weather: {
            spring: { temp: "12°C", condition: "🌸", description: "Mild with occasional rain" },
            summer: { temp: "22°C", condition: "☀️", description: "Warm and pleasant" },
            autumn: { temp: "15°C", condition: "🍂", description: "Cool and colorful" },
            winter: { temp: "8°C", condition: "🌧️", description: "Cold and rainy" }
        },
        packingList: ["Umbrella", "Comfortable walking shoes", "Layers of clothing", "Oyster card", "Camera"]
    },

    "sydney": {
        name: "Sydney, Australia",
        country: "Australia",
        continent: "Oceania",
        coordinates: { lat: -33.8688, lng: 151.2093 },
        description: "Harbor city with iconic landmarks and stunning beaches",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop",
        imageAlt: "Sydney Opera House and Harbor Bridge at sunset",
        famousSpots: [
            {
                name: "Sydney Opera House",
                description: "UNESCO World Heritage performing arts center",
                category: "landmark",
                image: "🎭",
                timeNeeded: "2-3 hours",
                bestTime: "afternoon",
                price: "AUD 42"
            },
            {
                name: "Sydney Harbour Bridge",
                description: "Iconic steel arch bridge",
                category: "landmark",
                image: "🌉",
                timeNeeded: "1-2 hours",
                bestTime: "sunset",
                price: "Free"
            },
            {
                name: "Bondi Beach",
                description: "Famous surf beach with coastal walk",
                category: "relaxation",
                image: "🏖️",
                timeNeeded: "4-6 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Taronga Zoo",
                description: "World-class zoo with harbor views",
                category: "culture",
                image: "🦘",
                timeNeeded: "3-4 hours",
                bestTime: "morning",
                price: "AUD 48"
            },
            {
                name: "The Rocks",
                description: "Historic area with markets and pubs",
                category: "culture",
                image: "🏛️",
                timeNeeded: "2-3 hours",
                bestTime: "afternoon",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Bridge climb", "Surfing lessons", "Coastal hiking"],
            foodie: ["Seafood dining", "Coffee culture tour", "Wine tasting"],
            relaxation: ["Beach day", "Harbor cruise", "Botanic gardens"],
            culture: ["Aboriginal tour", "Museum visits", "Art galleries"],
            shopping: ["Pitt Street Mall", "Queen Victoria Building", "Weekend markets"]
        },
        weather: {
            spring: { temp: "20°C", condition: "🌸", description: "Mild and pleasant" },
            summer: { temp: "26°C", condition: "☀️", description: "Warm and sunny" },
            autumn: { temp: "22°C", condition: "🍂", description: "Mild and breezy" },
            winter: { temp: "17°C", condition: "🌧️", description: "Cool with rain" }
        },
        packingList: ["Swimwear", "Sunscreen", "Comfortable shoes", "Light clothing", "Opal card"]
    },

    "rio-de-janeiro": {
        name: "Rio de Janeiro, Brazil",
        country: "Brazil",
        continent: "South America",
        coordinates: { lat: -22.9068, lng: -43.1729 },
        description: "Marvelous city with stunning beaches and carnival spirit",
        image: "https://images.unsplash.com/photo-1483729558449-99ef09a6c49e?w=800&h=600&fit=crop",
        imageAlt: "Christ the Redeemer statue overlooking Rio de Janeiro",
        famousSpots: [
            {
                name: "Christ the Redeemer",
                description: "Iconic statue overlooking the city",
                category: "landmark",
                image: "✝️",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "BRL 75"
            },
            {
                name: "Copacabana Beach",
                description: "Famous beach with golden sand",
                category: "relaxation",
                image: "🏖️",
                timeNeeded: "4-6 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "Sugarloaf Mountain",
                description: "Granite peak with cable car access",
                category: "adventure",
                image: "⛰️",
                timeNeeded: "3-4 hours",
                bestTime: "sunset",
                price: "BRL 110"
            },
            {
                name: "Ipanema Beach",
                description: "Trendy beach known for surfing",
                category: "relaxation",
                image: "🏄",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "Escadaria Selarón",
                description: "Colorful mosaic staircase",
                category: "culture",
                image: "🎨",
                timeNeeded: "1-2 hours",
                bestTime: "morning",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Hang gliding", "Rock climbing", "Surfing lessons"],
            foodie: ["Churrascaria", "Feijoada", "Street food tour"],
            relaxation: ["Beach day", "Samba show", "Botanical gardens"],
            culture: ["Favela tour", "Carnival experience", "Historical center"],
            shopping: ["Ipanema boutiques", "Hippie Fair", "Shopping Leblon"]
        },
        weather: {
            spring: { temp: "25°C", condition: "🌸", description: "Warm and pleasant" },
            summer: { temp: "30°C", condition: "☀️", description: "Hot and humid" },
            autumn: { temp: "27°C", condition: "🍂", description: "Warm and breezy" },
            winter: { temp: "23°C", condition: "🌧️", description: "Mild with rain" }
        },
        packingList: ["Swimwear", "Light clothing", "Sunscreen", "Comfortable sandals", "Camera"]
    },

    "cape-town": {
        name: "Cape Town, South Africa",
        country: "South Africa",
        continent: "Africa",
        coordinates: { lat: -33.9249, lng: 18.4241 },
        description: "Mother city with stunning landscapes and rich history",
        image: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=600&fit=crop",
        imageAlt: "Table Mountain and Cape Town cityscape",
        famousSpots: [
            {
                name: "Table Mountain",
                description: "Iconic flat-topped mountain",
                category: "adventure",
                image: "⛰️",
                timeNeeded: "4-6 hours",
                bestTime: "morning",
                price: "ZAR 360"
            },
            {
                name: "Robben Island",
                description: "Historic prison island",
                category: "culture",
                image: "🏝️",
                timeNeeded: "4-5 hours",
                bestTime: "morning",
                price: "ZAR 550"
            },
            {
                name: "V&A Waterfront",
                description: "Historic harbor with shopping and dining",
                category: "shopping",
                image: "🛍️",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "Boulders Beach",
                description: "Penguin colony beach",
                category: "relaxation",
                image: "🐧",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "ZAR 152"
            },
            {
                name: "Kirstenbosch Gardens",
                description: "UNESCO World Heritage botanical garden",
                category: "relaxation",
                image: "🌺",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "ZAR 220"
            }
        ],
        activities: {
            adventure: ["Mountain hiking", "Shark cage diving", "Paragliding"],
            foodie: ["Wine tasting", "Seafood dining", "Local cuisine tour"],
            relaxation: ["Beach day", "Garden visits", "Spa treatment"],
            culture: ["Township tour", "Museum visits", "Historical walking tour"],
            shopping: ["Greenmarket Square", "Long Street", "Canal Walk"]
        },
        weather: {
            spring: { temp: "18°C", condition: "🌸", description: "Mild and pleasant" },
            summer: { temp: "25°C", condition: "☀️", description: "Warm and sunny" },
            autumn: { temp: "20°C", condition: "🍂", description: "Mild and breezy" },
            winter: { temp: "15°C", condition: "🌧️", description: "Cool with rain" }
        },
        packingList: ["Comfortable hiking shoes", "Light layers", "Sunscreen", "Camera", "Travel adapter"]
    },

    "dubai": {
        name: "Dubai, UAE",
        country: "United Arab Emirates",
        continent: "Asia",
        coordinates: { lat: 25.2048, lng: 55.2708 },
        description: "Ultra-modern city with luxury shopping and futuristic architecture",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop",
        imageAlt: "Dubai skyline with Burj Khalifa and modern architecture",
        famousSpots: [
            {
                name: "Burj Khalifa",
                description: "World's tallest building",
                category: "landmark",
                image: "🏗️",
                timeNeeded: "2-3 hours",
                bestTime: "sunset",
                price: "AED 149"
            },
            {
                name: "Palm Jumeirah",
                description: "Artificial palm-shaped island",
                category: "landmark",
                image: "🌴",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "Dubai Mall",
                description: "World's largest shopping mall",
                category: "shopping",
                image: "🛍️",
                timeNeeded: "4-6 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "Desert Safari",
                description: "Dune bashing and desert activities",
                category: "adventure",
                image: "🏜️",
                timeNeeded: "6-8 hours",
                bestTime: "afternoon",
                price: "AED 200"
            },
            {
                name: "Dubai Fountain",
                description: "World's largest choreographed fountain",
                category: "culture",
                image: "⛲",
                timeNeeded: "1 hour",
                bestTime: "evening",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Desert safari", "Skydiving", "Helicopter tour"],
            foodie: ["Arabic cuisine", "International dining", "Food festivals"],
            relaxation: ["Beach clubs", "Luxury spas", "Golf courses"],
            culture: ["Mosque visits", "Heritage tours", "Museum visits"],
            shopping: ["Gold Souk", "Spice Souk", "Designer boutiques"]
        },
        weather: {
            spring: { temp: "28°C", condition: "🌸", description: "Warm and pleasant" },
            summer: { temp: "38°C", condition: "☀️", description: "Very hot and dry" },
            autumn: { temp: "32°C", condition: "🍂", description: "Warm and breezy" },
            winter: { temp: "22°C", condition: "🌧️", description: "Mild and pleasant" }
        },
        packingList: ["Light clothing", "Sunscreen", "Comfortable shoes", "Modest attire", "Camera"]
    },

    "mexico-city": {
        name: "Mexico City, Mexico",
        country: "Mexico",
        continent: "North America",
        coordinates: { lat: 19.4326, lng: -99.1332 },
        description: "Vibrant capital with rich history and delicious cuisine",
        image: "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=800&h=600&fit=crop",
        imageAlt: "Mexico City historic center with colorful buildings",
        famousSpots: [
            {
                name: "Teotihuacan",
                description: "Ancient Mesoamerican city",
                category: "culture",
                image: "🏛️",
                timeNeeded: "4-6 hours",
                bestTime: "morning",
                price: "MXN 80"
            },
            {
                name: "Zócalo",
                description: "Historic main square",
                category: "culture",
                image: "🏛️",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Frida Kahlo Museum",
                description: "Artist's blue house and studio",
                category: "culture",
                image: "🎨",
                timeNeeded: "2-3 hours",
                bestTime: "afternoon",
                price: "MXN 250"
            },
            {
                name: "Chapultepec Castle",
                description: "Historic castle with city views",
                category: "culture",
                image: "🏰",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "MXN 80"
            },
            {
                name: "Xochimilco",
                description: "Colorful floating gardens",
                category: "relaxation",
                image: "🚣",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "MXN 500"
            }
        ],
        activities: {
            adventure: ["Lucha libre wrestling", "Hot air balloon ride", "Bike tours"],
            foodie: ["Taco tasting", "Mole cooking class", "Mezcal tasting"],
            relaxation: ["Chapultepec Park", "Spa day", "Boat rides"],
            culture: ["Historical walking tour", "Art galleries", "Traditional markets"],
            shopping: ["La Ciudadela", "Plaza Garibaldi", "Coyoacán markets"]
        },
        weather: {
            spring: { temp: "22°C", condition: "🌸", description: "Mild and pleasant" },
            summer: { temp: "25°C", condition: "☀️", description: "Warm with rain" },
            autumn: { temp: "23°C", condition: "🍂", description: "Mild and breezy" },
            winter: { temp: "18°C", condition: "🌧️", description: "Cool and dry" }
        },
        packingList: ["Comfortable walking shoes", "Light layers", "Rain jacket", "Camera", "Spanish phrasebook"]
    },

    "marrakech": {
        name: "Marrakech, Morocco",
        country: "Morocco",
        continent: "Africa",
        coordinates: { lat: 31.6295, lng: -7.9811 },
        description: "Red city with bustling souks and stunning architecture",
        image: "https://images.unsplash.com/photo-1553603221-62831988de83?w=800&h=600&fit=crop",
        imageAlt: "Marrakech medina with traditional Moroccan architecture",
        famousSpots: [
            {
                name: "Jemaa el-Fnaa",
                description: "Famous square with street performers",
                category: "culture",
                image: "🎭",
                timeNeeded: "2-3 hours",
                bestTime: "evening",
                price: "Free"
            },
            {
                name: "Majorelle Garden",
                description: "Botanical garden with blue villa",
                category: "relaxation",
                image: "🌺",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "MAD 70"
            },
            {
                name: "Koutoubia Mosque",
                description: "Largest mosque in Marrakech",
                category: "culture",
                image: "🕌",
                timeNeeded: "1 hour",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Bahia Palace",
                description: "19th-century palace with beautiful gardens",
                category: "culture",
                image: "🏰",
                timeNeeded: "2 hours",
                bestTime: "morning",
                price: "MAD 70"
            },
            {
                name: "Souk Semmarine",
                description: "Famous shopping street",
                category: "shopping",
                image: "🛍️",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Atlas Mountains trek", "Camel ride", "Hot air balloon"],
            foodie: ["Cooking class", "Food tour", "Traditional tea ceremony"],
            relaxation: ["Hammam spa", "Garden visits", "Rooftop dining"],
            culture: ["Medina tour", "Historical sites", "Traditional music"],
            shopping: ["Souk bargaining", "Carpet shopping", "Argan oil"]
        },
        weather: {
            spring: { temp: "22°C", condition: "🌸", description: "Mild and pleasant" },
            summer: { temp: "32°C", condition: "☀️", description: "Hot and dry" },
            autumn: { temp: "26°C", condition: "🍂", description: "Warm and breezy" },
            winter: { temp: "18°C", condition: "🌧️", description: "Cool and pleasant" }
        },
        packingList: ["Modest clothing", "Comfortable shoes", "Sunscreen", "Scarf", "Camera"]
    },

    "singapore": {
        name: "Singapore",
        country: "Singapore",
        continent: "Asia",
        coordinates: { lat: 1.3521, lng: 103.8198 },
        description: "Modern city-state with diverse culture and stunning architecture",
        image: "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800&h=600&fit=crop",
        imageAlt: "Singapore Marina Bay Sands and city skyline",
        famousSpots: [
            {
                name: "Marina Bay Sands",
                description: "Iconic hotel with infinity pool and sky park",
                category: "landmark",
                image: "🏨",
                timeNeeded: "2-3 hours",
                bestTime: "evening",
                price: "SGD 23"
            },
            {
                name: "Gardens by the Bay",
                description: "Futuristic nature park with super trees",
                category: "relaxation",
                image: "🌳",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "SGD 28"
            },
            {
                name: "Sentosa Island",
                description: "Entertainment island with beaches and attractions",
                category: "relaxation",
                image: "🏖️",
                timeNeeded: "Full day",
                bestTime: "morning",
                price: "SGD 4"
            },
            {
                name: "Chinatown",
                description: "Historic district with temples and street food",
                category: "culture",
                image: "🏛️",
                timeNeeded: "2-3 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "Orchard Road",
                description: "Famous shopping street with luxury boutiques",
                category: "shopping",
                image: "🛍️",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Universal Studios", "Adventure Cove Waterpark", "Zip line"],
            foodie: ["Hawker center tour", "Chilli crab", "Durian tasting"],
            relaxation: ["Botanic Gardens", "Beach day", "Spa treatment"],
            culture: ["Temple visits", "Museum tours", "Cultural shows"],
            shopping: ["Orchard Road", "Bugis Street", "VivoCity"]
        },
        weather: {
            spring: { temp: "28°C", condition: "🌺", description: "Warm and humid" },
            summer: { temp: "30°C", condition: "☀️", description: "Hot and rainy" },
            autumn: { temp: "29°C", condition: "🍂", description: "Warm and breezy" },
            winter: { temp: "27°C", condition: "🌧️", description: "Warm with rain" }
        },
        packingList: ["Light clothing", "Umbrella", "Comfortable shoes", "Sunscreen", "Camera"]
    },

    "barcelona": {
        name: "Barcelona, Spain",
        country: "Spain",
        continent: "Europe",
        coordinates: { lat: 41.3851, lng: 2.1734 },
        description: "Cosmopolitan city with stunning architecture and Mediterranean charm",
        image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop",
        imageAlt: "Barcelona Sagrada Familia and cityscape",
        famousSpots: [
            {
                name: "Sagrada Familia",
                description: "Gaudí's masterpiece basilica",
                category: "culture",
                image: "⛪",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€26"
            },
            {
                name: "Park Güell",
                description: "Colorful park with Gaudí's designs",
                category: "culture",
                image: "🌺",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€10"
            },
            {
                name: "La Rambla",
                description: "Famous pedestrian street",
                category: "shopping",
                image: "🚶",
                timeNeeded: "2-3 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "Barceloneta Beach",
                description: "Popular city beach",
                category: "relaxation",
                image: "🏖️",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "Casa Batlló",
                description: "Gaudí's architectural wonder",
                category: "culture",
                image: "🏛️",
                timeNeeded: "1-2 hours",
                bestTime: "morning",
                price: "€35"
            }
        ],
        activities: {
            adventure: ["Bike tours", "Hiking Montjuïc", "Water sports"],
            foodie: ["Tapas tour", "Paella cooking class", "Wine tasting"],
            relaxation: ["Beach day", "Spa treatment", "Park strolls"],
            culture: ["Gaudí tour", "Museum visits", "Flamenco show"],
            shopping: ["La Rambla", "El Born", "Passeig de Gràcia"]
        },
        weather: {
            spring: { temp: "18°C", condition: "🌸", description: "Mild and pleasant" },
            summer: { temp: "26°C", condition: "☀️", description: "Hot and sunny" },
            autumn: { temp: "20°C", condition: "🍂", description: "Mild and breezy" },
            winter: { temp: "12°C", condition: "🌧️", description: "Cool with rain" }
        },
        packingList: ["Comfortable walking shoes", "Light clothing", "Sunscreen", "Camera", "Travel adapter"]
    },

    // 18. Amsterdam, Netherlands
    amsterdam: {
        name: "Amsterdam",
        location: "Netherlands",
        image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9ee?w=800&h=600&fit=crop",
        imageAlt: "Amsterdam canals with historic buildings",
        description: "A charming city of canals, bicycles, and rich cultural heritage",
        famousFor: "Canals, museums, cycling culture, and liberal atmosphere",
        bestTimeToVisit: "April to October",
        famousSpots: [
            {
                name: "Anne Frank House",
                description: "Historic house and museum",
                category: "culture",
                image: "🏛️",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€14"
            },
            {
                name: "Van Gogh Museum",
                description: "World's largest Van Gogh collection",
                category: "culture",
                image: "🎨",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€20"
            },
            {
                name: "Rijksmuseum",
                description: "Dutch national museum",
                category: "culture",
                image: "🏛️",
                timeNeeded: "3-4 hours",
                bestTime: "morning",
                price: "€22.50"
            },
            {
                name: "Canal Cruise",
                description: "Scenic boat tour through canals",
                category: "relaxation",
                image: "🚢",
                timeNeeded: "1-2 hours",
                bestTime: "afternoon",
                price: "€16"
            }
        ],
        activities: {
            adventure: ["Bike tours", "Canal kayaking", "Walking tours"],
            foodie: ["Dutch cheese tasting", "Stroopwafel making", "Beer tasting"],
            relaxation: ["Canal cruise", "Vondelpark stroll", "Spa day"],
            culture: ["Museum visits", "Historic tours", "Art galleries"],
            shopping: ["Nine Streets", "Albert Cuyp Market", "Kalverstraat"]
        },
        weather: {
            spring: { temp: "12°C", condition: "🌸", description: "Tulip season" },
            summer: { temp: "20°C", condition: "☀️", description: "Mild and pleasant" },
            autumn: { temp: "14°C", condition: "🍂", description: "Colorful foliage" },
            winter: { temp: "5°C", condition: "❄️", description: "Cold with snow" }
        },
        packingList: ["Rain jacket", "Comfortable walking shoes", "Bike-friendly clothing", "Camera", "Travel adapter"]
    },

    // 19. Prague, Czech Republic
    prague: {
        name: "Prague",
        location: "Czech Republic",
        image: "https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800&h=600&fit=crop",
        imageAlt: "Prague Castle and Charles Bridge",
        description: "The magical 'City of a Hundred Spires' with stunning architecture",
        famousFor: "Medieval architecture, beer culture, and fairy-tale atmosphere",
        bestTimeToVisit: "March to May, September to November",
        famousSpots: [
            {
                name: "Prague Castle",
                description: "Largest ancient castle complex",
                category: "culture",
                image: "🏰",
                timeNeeded: "3-4 hours",
                bestTime: "morning",
                price: "€15"
            },
            {
                name: "Charles Bridge",
                description: "Historic stone bridge",
                category: "culture",
                image: "🌉",
                timeNeeded: "1-2 hours",
                bestTime: "sunrise",
                price: "Free"
            },
            {
                name: "Old Town Square",
                description: "Historic city center",
                category: "culture",
                image: "🏛️",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Astronomical Clock",
                description: "Medieval clock tower",
                category: "culture",
                image: "⏰",
                timeNeeded: "30 minutes",
                bestTime: "hourly show",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Castle hiking", "River cruises", "Ghost tours"],
            foodie: ["Beer tasting", "Traditional Czech food", "Wine tours"],
            relaxation: ["River cruise", "Park visits", "Spa treatments"],
            culture: ["Castle tours", "Museum visits", "Historical walks"],
            shopping: ["Wenceslas Square", "Palladium Mall", "Local markets"]
        },
        weather: {
            spring: { temp: "12°C", condition: "🌸", description: "Mild and pleasant" },
            summer: { temp: "22°C", condition: "☀️", description: "Warm and sunny" },
            autumn: { temp: "14°C", condition: "🍂", description: "Colorful and cool" },
            winter: { temp: "2°C", condition: "❄️", description: "Cold with snow" }
        },
        packingList: ["Warm clothing", "Comfortable walking shoes", "Camera", "Travel adapter", "Umbrella"]
    },

    // 20. Vienna, Austria
    vienna: {
        name: "Vienna",
        location: "Austria",
        image: "https://images.unsplash.com/photo-1516550893923-e4a6b2b0b0b0?w=800&h=600&fit=crop",
        imageAlt: "Vienna's historic center with St. Stephen's Cathedral",
        description: "The imperial capital of music, art, and coffee culture",
        famousFor: "Classical music, coffee houses, and imperial palaces",
        bestTimeToVisit: "April to October",
        famousSpots: [
            {
                name: "Schönbrunn Palace",
                description: "Imperial summer residence",
                category: "culture",
                image: "🏰",
                timeNeeded: "3-4 hours",
                bestTime: "morning",
                price: "€20"
            },
            {
                name: "St. Stephen's Cathedral",
                description: "Gothic cathedral",
                category: "culture",
                image: "⛪",
                timeNeeded: "1-2 hours",
                bestTime: "morning",
                price: "€6"
            },
            {
                name: "Belvedere Palace",
                description: "Baroque palace complex",
                category: "culture",
                image: "🏛️",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€16"
            },
            {
                name: "Vienna State Opera",
                description: "World-famous opera house",
                category: "culture",
                image: "🎭",
                timeNeeded: "2-3 hours",
                bestTime: "evening",
                price: "€15-150"
            }
        ],
        activities: {
            adventure: ["Danube cycling", "Hiking in Wienerwald", "City tours"],
            foodie: ["Coffee house culture", "Wiener Schnitzel", "Wine tasting"],
            relaxation: ["Coffee houses", "Danube walks", "Spa treatments"],
            culture: ["Opera performances", "Museum visits", "Palace tours"],
            shopping: ["Kärntner Straße", "Naschmarkt", "Mariahilfer Straße"]
        },
        weather: {
            spring: { temp: "14°C", condition: "🌸", description: "Mild and pleasant" },
            summer: { temp: "24°C", condition: "☀️", description: "Warm and sunny" },
            autumn: { temp: "16°C", condition: "🍂", description: "Cool and colorful" },
            winter: { temp: "4°C", condition: "❄️", description: "Cold with snow" }
        },
        packingList: ["Elegant clothing", "Comfortable walking shoes", "Camera", "Travel adapter", "Umbrella"]
    },

    // 21. Budapest, Hungary
    budapest: {
        name: "Budapest",
        location: "Hungary",
        image: "https://images.unsplash.com/photo-1551867633-194f125695d8?w=800&h=600&fit=crop",
        imageAlt: "Budapest Parliament building and Danube River",
        description: "The 'Pearl of the Danube' with thermal baths and stunning architecture",
        famousFor: "Thermal baths, ruin bars, and beautiful bridges",
        bestTimeToVisit: "March to May, September to November",
        famousSpots: [
            {
                name: "Buda Castle",
                description: "Historic castle complex",
                category: "culture",
                image: "🏰",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€12"
            },
            {
                name: "Parliament Building",
                description: "Gothic Revival parliament",
                category: "culture",
                image: "🏛️",
                timeNeeded: "1-2 hours",
                bestTime: "morning",
                price: "€15"
            },
            {
                name: "Széchenyi Thermal Bath",
                description: "Famous thermal baths",
                category: "relaxation",
                image: "♨️",
                timeNeeded: "3-4 hours",
                bestTime: "morning",
                price: "€25"
            },
            {
                name: "Chain Bridge",
                description: "Iconic suspension bridge",
                category: "culture",
                image: "🌉",
                timeNeeded: "30 minutes",
                bestTime: "evening",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Danube cruises", "Castle hiking", "Cave exploring"],
            foodie: ["Goulash tasting", "Wine tours", "Market visits"],
            relaxation: ["Thermal baths", "Danube walks", "Spa treatments"],
            culture: ["Castle tours", "Museum visits", "Opera performances"],
            shopping: ["Váci Street", "Central Market Hall", "Andrássy Avenue"]
        },
        weather: {
            spring: { temp: "15°C", condition: "🌸", description: "Mild and pleasant" },
            summer: { temp: "26°C", condition: "☀️", description: "Hot and sunny" },
            autumn: { temp: "17°C", condition: "🍂", description: "Cool and colorful" },
            winter: { temp: "3°C", condition: "❄️", description: "Cold with snow" }
        },
        packingList: ["Swimsuit for baths", "Comfortable walking shoes", "Camera", "Travel adapter", "Warm clothing"]
    },

    // 22. Stockholm, Sweden
    stockholm: {
        name: "Stockholm",
        location: "Sweden",
        image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=600&fit=crop",
        imageAlt: "Stockholm's Gamla Stan old town with colorful buildings",
        description: "The beautiful capital spread across 14 islands",
        famousFor: "Archipelago, design, and sustainable living",
        bestTimeToVisit: "May to September",
        famousSpots: [
            {
                name: "Gamla Stan",
                description: "Medieval old town",
                category: "culture",
                image: "🏛️",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Vasa Museum",
                description: "17th-century warship",
                category: "culture",
                image: "🚢",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€15"
            },
            {
                name: "Djurgården",
                description: "Green island park",
                category: "relaxation",
                image: "🌳",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "ABBA Museum",
                description: "Interactive ABBA experience",
                category: "culture",
                image: "🎵",
                timeNeeded: "2-3 hours",
                bestTime: "afternoon",
                price: "€25"
            }
        ],
        activities: {
            adventure: ["Archipelago tours", "Bike tours", "Kayaking"],
            foodie: ["Fika culture", "Seafood tasting", "Local markets"],
            relaxation: ["Archipelago cruises", "Park walks", "Spa treatments"],
            culture: ["Museum visits", "Design tours", "Historical walks"],
            shopping: ["Drottningholm", "Södermalm", "Design stores"]
        },
        weather: {
            spring: { temp: "8°C", condition: "🌸", description: "Cool and fresh" },
            summer: { temp: "20°C", condition: "☀️", description: "Mild and sunny" },
            autumn: { temp: "12°C", condition: "🍂", description: "Cool and colorful" },
            winter: { temp: "-2°C", condition: "❄️", description: "Cold with snow" }
        },
        packingList: ["Warm clothing", "Waterproof jacket", "Comfortable walking shoes", "Camera", "Travel adapter"]
    },

    // 23. Copenhagen, Denmark
    copenhagen: {
        name: "Copenhagen",
        location: "Denmark",
        image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=600&fit=crop",
        imageAlt: "Copenhagen's Nyhavn harbor with colorful buildings",
        description: "The happiest city with cycling culture and Nordic design",
        famousFor: "Hygge lifestyle, cycling, and sustainable living",
        bestTimeToVisit: "May to September",
        famousSpots: [
            {
                name: "Nyhavn",
                description: "Colorful harbor district",
                category: "culture",
                image: "🏘️",
                timeNeeded: "2-3 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "Tivoli Gardens",
                description: "Historic amusement park",
                category: "adventure",
                image: "🎡",
                timeNeeded: "4-5 hours",
                bestTime: "afternoon",
                price: "€18"
            },
            {
                name: "Little Mermaid",
                description: "Iconic bronze statue",
                category: "culture",
                image: "🧜‍♀️",
                timeNeeded: "30 minutes",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Rosenborg Castle",
                description: "Renaissance castle",
                category: "culture",
                image: "🏰",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€15"
            }
        ],
        activities: {
            adventure: ["Bike tours", "Canal tours", "Amusement parks"],
            foodie: ["New Nordic cuisine", "Smørrebrød", "Coffee culture"],
            relaxation: ["Canal cruises", "Park visits", "Hygge cafes"],
            culture: ["Castle tours", "Design museums", "Historical walks"],
            shopping: ["Strøget", "Design stores", "Local markets"]
        },
        weather: {
            spring: { temp: "10°C", condition: "🌸", description: "Cool and fresh" },
            summer: { temp: "20°C", condition: "☀️", description: "Mild and pleasant" },
            autumn: { temp: "12°C", condition: "🍂", description: "Cool and colorful" },
            winter: { temp: "2°C", condition: "❄️", description: "Cold with snow" }
        },
        packingList: ["Warm clothing", "Bike-friendly attire", "Comfortable walking shoes", "Camera", "Travel adapter"]
    },

    // 24. Oslo, Norway
    oslo: {
        name: "Oslo",
        location: "Norway",
        image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=600&fit=crop",
        imageAlt: "Oslo's modern architecture and fjord views",
        description: "The green capital surrounded by forests and fjords",
        famousFor: "Fjords, outdoor activities, and Nordic culture",
        bestTimeToVisit: "May to September",
        famousSpots: [
            {
                name: "Vigeland Sculpture Park",
                description: "World's largest sculpture park",
                category: "culture",
                image: "🗿",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Viking Ship Museum",
                description: "Ancient Viking vessels",
                category: "culture",
                image: "⚓",
                timeNeeded: "1-2 hours",
                bestTime: "morning",
                price: "€12"
            },
            {
                name: "Holmenkollen Ski Jump",
                description: "Famous ski jumping venue",
                category: "adventure",
                image: "⛷️",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€15"
            },
            {
                name: "Akershus Fortress",
                description: "Medieval castle",
                category: "culture",
                image: "🏰",
                timeNeeded: "2-3 hours",
                bestTime: "afternoon",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Fjord tours", "Hiking", "Skiing"],
            foodie: ["Seafood tasting", "Nordic cuisine", "Coffee culture"],
            relaxation: ["Fjord cruises", "Park walks", "Spa treatments"],
            culture: ["Museum visits", "Castle tours", "Historical walks"],
            shopping: ["Karl Johans Gate", "Aker Brygge", "Local markets"]
        },
        weather: {
            spring: { temp: "8°C", condition: "🌸", description: "Cool and fresh" },
            summer: { temp: "18°C", condition: "☀️", description: "Mild and pleasant" },
            autumn: { temp: "10°C", condition: "🍂", description: "Cool and colorful" },
            winter: { temp: "-2°C", condition: "❄️", description: "Cold with snow" }
        },
        packingList: ["Warm clothing", "Waterproof gear", "Hiking boots", "Camera", "Travel adapter"]
    },

    // 25. Helsinki, Finland
    helsinki: {
        name: "Helsinki",
        location: "Finland",
        image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=600&fit=crop",
        imageAlt: "Helsinki's modern architecture and Baltic Sea views",
        description: "The design capital with a unique blend of East and West",
        famousFor: "Design, saunas, and Baltic Sea islands",
        bestTimeToVisit: "May to September",
        famousSpots: [
            {
                name: "Senate Square",
                description: "Neoclassical city center",
                category: "culture",
                image: "🏛️",
                timeNeeded: "1-2 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Suomenlinna Fortress",
                description: "Sea fortress island",
                category: "culture",
                image: "🏰",
                timeNeeded: "3-4 hours",
                bestTime: "morning",
                price: "€7"
            },
            {
                name: "Temppeliaukio Church",
                description: "Rock church",
                category: "culture",
                image: "⛪",
                timeNeeded: "1-2 hours",
                bestTime: "morning",
                price: "€3"
            },
            {
                name: "Design District",
                description: "Creative design area",
                category: "shopping",
                image: "🎨",
                timeNeeded: "2-3 hours",
                bestTime: "afternoon",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Island hopping", "Bike tours", "Winter sports"],
            foodie: ["Nordic cuisine", "Coffee culture", "Local markets"],
            relaxation: ["Sauna experience", "Island visits", "Park walks"],
            culture: ["Design tours", "Museum visits", "Historical walks"],
            shopping: ["Design District", "Market Square", "Local boutiques"]
        },
        weather: {
            spring: { temp: "6°C", condition: "🌸", description: "Cool and fresh" },
            summer: { temp: "18°C", condition: "☀️", description: "Mild and pleasant" },
            autumn: { temp: "8°C", condition: "🍂", description: "Cool and colorful" },
            winter: { temp: "-4°C", condition: "❄️", description: "Cold with snow" }
        },
        packingList: ["Warm clothing", "Waterproof gear", "Comfortable walking shoes", "Camera", "Travel adapter"]
    },

    // 26. Warsaw, Poland
    warsaw: {
        name: "Warsaw",
        location: "Poland",
        image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=600&fit=crop",
        imageAlt: "Warsaw's Old Town with reconstructed historic buildings",
        description: "The phoenix city that rose from the ashes of war",
        famousFor: "Rebuilt Old Town, rich history, and vibrant culture",
        bestTimeToVisit: "May to September",
        famousSpots: [
            {
                name: "Old Town Market Place",
                description: "Reconstructed medieval square",
                category: "culture",
                image: "🏛️",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Royal Castle",
                description: "Reconstructed royal residence",
                category: "culture",
                image: "🏰",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€12"
            },
            {
                name: "Łazienki Park",
                description: "Beautiful palace and gardens",
                category: "relaxation",
                image: "🌳",
                timeNeeded: "3-4 hours",
                bestTime: "afternoon",
                price: "Free"
            },
            {
                name: "Warsaw Uprising Museum",
                description: "WWII resistance museum",
                category: "culture",
                image: "🏛️",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€8"
            }
        ],
        activities: {
            adventure: ["City tours", "Vistula River cruises", "Walking tours"],
            foodie: ["Polish cuisine", "Pierogi making", "Vodka tasting"],
            relaxation: ["Park visits", "River walks", "Spa treatments"],
            culture: ["Museum visits", "Historical tours", "Palace visits"],
            shopping: ["Nowy Świat", "Złote Tarasy", "Local markets"]
        },
        weather: {
            spring: { temp: "12°C", condition: "🌸", description: "Mild and pleasant" },
            summer: { temp: "22°C", condition: "☀️", description: "Warm and sunny" },
            autumn: { temp: "14°C", condition: "🍂", description: "Cool and colorful" },
            winter: { temp: "2°C", condition: "❄️", description: "Cold with snow" }
        },
        packingList: ["Warm clothing", "Comfortable walking shoes", "Camera", "Travel adapter", "Umbrella"]
    },

    // 27. Krakow, Poland
    krakow: {
        name: "Krakow",
        location: "Poland",
        image: "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&h=600&fit=crop",
        imageAlt: "Krakow's Main Market Square with St. Mary's Basilica",
        description: "The cultural heart of Poland with medieval charm",
        famousFor: "Medieval architecture, Jewish heritage, and academic culture",
        bestTimeToVisit: "March to November",
        famousSpots: [
            {
                name: "Main Market Square",
                description: "Europe's largest medieval square",
                category: "culture",
                image: "🏛️",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "Free"
            },
            {
                name: "Wawel Castle",
                description: "Royal castle complex",
                category: "culture",
                image: "🏰",
                timeNeeded: "3-4 hours",
                bestTime: "morning",
                price: "€15"
            },
            {
                name: "Auschwitz-Birkenau",
                description: "WWII concentration camp",
                category: "culture",
                image: "🏛️",
                timeNeeded: "6-8 hours",
                bestTime: "morning",
                price: "€15"
            },
            {
                name: "Kazimierz District",
                description: "Historic Jewish quarter",
                category: "culture",
                image: "🏘️",
                timeNeeded: "2-3 hours",
                bestTime: "afternoon",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["City tours", "Salt mine visits", "Walking tours"],
            foodie: ["Polish cuisine", "Jewish food tours", "Vodka tasting"],
            relaxation: ["Park visits", "River walks", "Cafe culture"],
            culture: ["Historical tours", "Museum visits", "Jewish heritage"],
            shopping: ["Cloth Hall", "Local markets", "Artisan shops"]
        },
        weather: {
            spring: { temp: "12°C", condition: "🌸", description: "Mild and pleasant" },
            summer: { temp: "22°C", condition: "☀️", description: "Warm and sunny" },
            autumn: { temp: "14°C", condition: "🍂", description: "Cool and colorful" },
            winter: { temp: "2°C", condition: "❄️", description: "Cold with snow" }
        },
        packingList: ["Warm clothing", "Comfortable walking shoes", "Camera", "Travel adapter", "Respectful attire"]
    }
};

// Packing list templates for different travel styles
const packingTemplates = {
    adventure: [
        "Hiking boots", "Backpack", "Water bottle", "First aid kit",
        "Weather-appropriate clothing", "Multi-tool", "Headlamp", "Compass"
    ],
    foodie: [
        "Comfortable walking shoes", "Food journal", "Camera", "Reusable utensils",
        "Local food guide", "Small cooler bag", "Hand sanitizer", "Tasting notebook"
    ],
    relaxation: [
        "Swimwear", "Beach towel", "Sunscreen", "Beach umbrella",
        "Comfortable clothing", "Book/kindle", "Portable speaker", "Beach chair"
    ],
    culture: [
        "Modest clothing", "Comfortable shoes", "Camera", "Local guidebook",
        "Respectful accessories", "Journal", "Small backpack", "Cultural etiquette guide"
    ],
    shopping: [
        "Comfortable walking shoes", "Large tote bag", "Shopping list", "Credit cards",
        "Fashion accessories", "Portable charger", "Shopping map", "Budget tracker"
    ]
};

// Weather conditions and icons
const weatherConditions = {
    sunny: "☀️",
    cloudy: "☁️",
    rainy: "🌧️",
    snowy: "❄️",
    stormy: "⛈️",
    foggy: "🌫️",
    windy: "💨",
    clear: "🌙"
};

// Export the data
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { citiesData, packingTemplates, weatherConditions };
}

// Make sure citiesData is available globally for browser usage
if (typeof window !== 'undefined') {
    window.citiesData = citiesData;
    window.packingTemplates = packingTemplates;
    window.weatherConditions = weatherConditions;
    console.log('Cities data loaded successfully!');
    console.log('Total cities:', Object.keys(citiesData).length);
    console.log('Cities:', Object.keys(citiesData));
}