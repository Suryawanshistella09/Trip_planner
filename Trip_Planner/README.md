# 🚀 AstraTrip - Futuristic Travel Planner

A next-generation web application that plans, optimizes, and adapts trips in real-time using AI-like features, interactive maps, and collaborative tools. Built with modern web technologies and featuring a stunning futuristic UI.

## ✨ Features

### 🧠 Smart Itinerary Generator
- **AI-like Recommendations**: Automatically generates itineraries based on destination and travel preferences
- **Day-wise Planning**: Organizes activities into morning, afternoon, and evening slots
- **Preference-based Activities**: Suggests activities based on travel style (adventure, foodie, relaxation, culture, shopping)

### 🌍 Interactive Map Integration
- **Destination Mapping**: Displays city coordinates and information
- **Custom Markers**: Add and manage location markers on the map
- **Geographic Data**: Shows country, continent, and coordinate information

### 🔮 Smart Recommendation System
- **Famous Spots**: Automatically displays popular attractions for selected destinations
- **Context-aware Suggestions**: Recommends activities based on destination and preferences
- **Spot Details**: Shows time needed, best visiting time, prices, and categories

### 📅 Drag & Drop Day Planner
- **Interactive Scheduling**: Drag activities between different days and time slots
- **Visual Feedback**: Smooth animations and visual cues during drag operations
- **Flexible Planning**: Easy reorganization of your travel schedule

### 💾 Save & Resume Itinerary
- **Local Storage**: All plans are saved locally in your browser
- **Auto-resume**: When you revisit the site, your itinerary automatically reappears
- **Export Options**: Download your itinerary as JSON or save to browser

### 🛫 Futuristic Visual Enhancements
- **Glassmorphism Design**: Modern glass-like UI elements with backdrop blur
- **Neon Gradients**: Beautiful color schemes with glowing effects
- **Three.js Animations**: 3D floating particles in the background
- **Smooth Transitions**: Elegant animations throughout the interface

### 🎒 Packing List + Expense Estimator
- **Smart Packing Lists**: Auto-generates packing suggestions based on destination type
- **Custom Items**: Add your own packing items
- **Budget Calculator**: Track accommodation, transportation, food, and activity costs
- **Real-time Updates**: Total budget automatically updates as you input expenses

### 🛰️ Offline-Ready Mode
- **Local Data Storage**: Works without internet connection
- **Export Functionality**: Download your data for offline access
- **Persistent Storage**: Data persists between browser sessions

### 🧭 Bonus Features
- **Countdown Timer**: Real-time countdown to your trip start date
- **Theme Toggle**: Switch between dark and light modes
- **Surprise Me**: Random destination and plan generator
- **Weather Preview**: Seasonal weather information for destinations
- **Responsive Design**: Works perfectly on all devices

## 🏗️ Architecture

### File Structure
```
AstraTrip/
├── index.html          # Main HTML structure
├── styles.css          # Futuristic CSS with glassmorphism
├── script.js           # Main JavaScript functionality
├── cities-data.js      # Comprehensive destination database
└── README.md           # Project documentation
```

### Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **3D Graphics**: Three.js for animated backgrounds
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Storage**: LocalStorage for data persistence
- **Animations**: CSS animations, Three.js particle system

### Data Model
- **Destinations**: Cities with coordinates, descriptions, and metadata
- **Famous Spots**: Attractions with detailed information
- **Activities**: Preference-based activity recommendations
- **Weather Data**: Seasonal weather information
- **Packing Templates**: Travel style-specific packing lists

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- No additional software installation required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start planning your next adventure!

### Usage Guide

#### 1. Plan Your Journey
- Enter your destination (try: Paris, Tokyo, New York, Bali, or Santorini)
- Select your travel dates and duration
- Choose your travel style preference
- Click "Generate Itinerary" to create your plan

#### 2. Explore Destinations
- View famous spots and attractions
- See weather information and seasonal details
- Get packing list recommendations
- Add locations to your interactive map

#### 3. Customize Your Itinerary
- Drag and drop activities between time slots
- Add famous spots to your schedule
- Customize your packing list
- Track your budget and expenses

#### 4. Save and Export
- Save your itinerary to browser storage
- Export as JSON for backup
- Clear data when needed

## 🌟 Supported Destinations

### Europe
- **Paris, France**: Art, fashion, gastronomy, and culture
- **Santorini, Greece**: Stunning volcanic island with white-washed buildings

### Asia
- **Tokyo, Japan**: Blend of ultramodern and traditional
- **Bali, Indonesia**: Island of the Gods with stunning beaches

### North America
- **New York City, USA**: The city that never sleeps

## 🎨 Design Features

### Glassmorphism
- Semi-transparent backgrounds with backdrop blur
- Subtle borders and shadows
- Modern, clean aesthetic

### Color Scheme
- **Primary**: Cyan (#00d4ff)
- **Secondary**: Magenta (#ff00ff)
- **Accent**: Yellow (#ffff00)
- **Backgrounds**: Dark themes with glass effects

### Typography
- **Headings**: Orbitron (futuristic, monospace)
- **Body**: Inter (clean, readable)

### Animations
- Floating travel icons
- Three.js particle system
- Smooth hover effects
- Gradient shifts
- Card transformations

## 🔧 Customization

### Adding New Destinations
Edit `cities-data.js` to add new cities:
```javascript
"new-city": {
    name: "City Name, Country",
    country: "Country",
    continent: "Continent",
    coordinates: { lat: 0.0000, lng: 0.0000 },
    description: "City description",
    famousSpots: [...],
    activities: {...},
    weather: {...},
    packingList: [...]
}
```

### Modifying Styles
Update CSS variables in `styles.css`:
```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    --accent-color: #your-color;
}
```

### Extending Functionality
The modular JavaScript structure makes it easy to add new features:
- Add new event listeners in `setupEventListeners()`
- Create new methods in the `AstraTrip` class
- Extend the data model in `cities-data.js`

## 📱 Responsive Design

- **Desktop**: Full-featured experience with all animations
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with simplified navigation

## 🌐 Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Full support
- **Edge**: Full support
- **Mobile Browsers**: Full support

## 🚀 Future Enhancements

- **Real-time Weather API**: Live weather data integration
- **Google Maps Integration**: Full interactive map functionality
- **Social Features**: Share itineraries with friends
- **AI Integration**: Machine learning for better recommendations
- **Offline PWA**: Progressive web app capabilities
- **Multi-language Support**: Internationalization
- **Cloud Sync**: Cross-device synchronization

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Three.js**: 3D graphics library
- **Google Fonts**: Typography resources
- **CSS Grid & Flexbox**: Modern layout systems
- **LocalStorage API**: Data persistence

## 📞 Support

For questions, suggestions, or issues:
- Create an issue in the project repository
- Check the documentation for common solutions
- Review the code comments for implementation details

---

**Made with ❤️ for travelers who dream big and plan smart!**

*"The world is a book, and those who do not travel read only one page." - Saint Augustine*
