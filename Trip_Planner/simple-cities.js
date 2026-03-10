// Simple Cities Data for Testing
const citiesData = {
    "paris": {
        name: "Paris, France",
        country: "France",
        continent: "Europe",
        description: "The City of Light",
        image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
        imageAlt: "Eiffel Tower and Paris skyline",
        famousSpots: [
            {
                name: "Eiffel Tower",
                description: "Iconic iron lattice tower",
                category: "landmark",
                image: "🗼",
                timeNeeded: "2-3 hours",
                bestTime: "morning",
                price: "€26"
            }
        ],
        activities: {
            adventure: ["Seine River cruise", "Montmartre walking tour"],
            foodie: ["Boulangerie tasting", "Wine tasting"],
            relaxation: ["Luxembourg Gardens", "Tuileries Garden"],
            culture: ["Museum pass", "Historical walking tour"],
            shopping: ["Galeries Lafayette", "Le Marais boutiques"]
        },
        weather: {
            spring: { temp: "15°C", condition: "🌤️", description: "Mild and pleasant" },
            summer: { temp: "25°C", condition: "☀️", description: "Warm and sunny" },
            autumn: { temp: "18°C", condition: "🍂", description: "Cool and colorful" },
            winter: { temp: "8°C", condition: "❄️", description: "Cold and magical" }
        },
        packingList: ["Comfortable walking shoes", "Light jacket", "Umbrella", "Camera"]
    },
    
    "tokyo": {
        name: "Tokyo, Japan",
        country: "Japan",
        continent: "Asia",
        description: "A fascinating blend of ultramodern and traditional",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
        imageAlt: "Tokyo cityscape with Tokyo Tower",
        famousSpots: [
            {
                name: "Shibuya Crossing",
                description: "World's busiest pedestrian crossing",
                category: "landmark",
                image: "🚶",
                timeNeeded: "30 minutes",
                bestTime: "evening",
                price: "Free"
            }
        ],
        activities: {
            adventure: ["Robot Restaurant", "VR gaming centers"],
            foodie: ["Ramen tasting", "Sushi making class"],
            relaxation: ["Traditional onsen", "Tea ceremony"],
            culture: ["Sumo wrestling", "Traditional crafts"],
            shopping: ["Akihabara electronics", "Ginza luxury"]
        },
        weather: {
            spring: { temp: "18°C", condition: "🌸", description: "Cherry blossom season" },
            summer: { temp: "28°C", condition: "☀️", description: "Hot and humid" },
            autumn: { temp: "20°C", condition: "🍁", description: "Mild and pleasant" },
            winter: { temp: "8°C", condition: "❄️", description: "Cold and dry" }
        },
        packingList: ["Comfortable shoes", "Light clothing", "Portable fan", "JR Pass"]
    }
};

// Make sure citiesData is available globally for browser usage
if (typeof window !== 'undefined') {
    window.citiesData = citiesData;
    console.log('Simple cities data loaded:', Object.keys(citiesData));
}
