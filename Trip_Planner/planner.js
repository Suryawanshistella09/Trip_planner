// Trip Planner Page JavaScript

class TripPlanner {
    constructor() {
        this.currentTrip = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateDestinationOptions();
        this.setDefaultDate();
        this.loadSavedDestination();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('trip-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateItinerary();
        });

        // Surprise me button
        document.getElementById('surprise-me').addEventListener('click', () => this.surpriseMe());

        // Save itinerary button
        document.getElementById('save-itinerary').addEventListener('click', () => this.saveItinerary());

        // Edit itinerary button
        document.getElementById('edit-itinerary').addEventListener('click', () => this.editItinerary());

        // Export itinerary button
        document.getElementById('export-itinerary').addEventListener('click', () => this.exportItinerary());
    }

    populateDestinationOptions() {
        const destinationSelect = document.getElementById('destination');
        
        console.log('=== POPULATE DESTINATION OPTIONS ===');
        console.log('citiesData type:', typeof citiesData);
        console.log('window.citiesData type:', typeof window.citiesData);
        
        // Debug: Check if citiesData is available
        if (typeof citiesData === 'undefined' && typeof window.citiesData === 'undefined') {
            console.error('citiesData is not defined!');
            console.log('Window object keys:', Object.keys(window).filter(key => key.includes('cities')));
            
            // Show error message
            destinationSelect.innerHTML = '<option value="">Error: No destinations available</option>';
            return;
        }
        
        // Use either citiesData or window.citiesData
        const data = citiesData || window.citiesData;
        console.log('Using data source:', data === citiesData ? 'citiesData' : 'window.citiesData');
        this.populateFromData(data, destinationSelect);
    }
    
    populateFromData(data, selectElement) {
        console.log('Available cities:', Object.keys(data));
        console.log('Total cities count:', Object.keys(data).length);
        
        // Clear existing options first
        selectElement.innerHTML = '<option value="">Select destination...</option>';
        
        Object.entries(data).forEach(([key, city]) => {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = city.name;
            selectElement.appendChild(option);
        });
        
        console.log(`Added ${Object.keys(data).length} destinations to the dropdown`);
        console.log('Final dropdown options:', selectElement.options.length);
    }

    setDefaultDate() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const dateString = tomorrow.toISOString().split('T')[0];
        document.getElementById('start-date').value = dateString;
    }

    loadSavedDestination() {
        const savedDestination = localStorage.getItem('selectedDestination');
        if (savedDestination && citiesData[savedDestination]) {
            document.getElementById('destination').value = savedDestination;
            localStorage.removeItem('selectedDestination'); // Clear after use
        }
    }

    generateItinerary() {
        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) {
            return;
        }

        this.currentTrip = {
            ...formData,
            itinerary: this.createItinerary(formData.tripLength, formData.preferences, formData.destination),
            createdAt: new Date().toISOString()
        };

        this.displayItinerary();
        this.showCountdown(formData.startDate);
        this.showWeather(formData.destination);
        this.showSuccessMessage('Itinerary generated successfully!');
    }

    getFormData() {
        return {
            destination: document.getElementById('destination').value,
            tripName: document.getElementById('trip-name').value,
            startDate: document.getElementById('start-date').value,
            tripLength: parseInt(document.getElementById('trip-length').value),
            preferences: document.getElementById('preferences').value,
            budget: document.getElementById('budget').value,
            tripNotes: document.getElementById('trip-notes').value
        };
    }

    validateForm(data) {
        if (!data.destination) {
            this.showErrorMessage('Please select a destination');
            return false;
        }
        if (!data.tripName) {
            this.showErrorMessage('Please enter a trip name');
            return false;
        }
        if (!data.startDate) {
            this.showErrorMessage('Please select a start date');
            return false;
        }
        if (!data.tripLength || data.tripLength < 1) {
            this.showErrorMessage('Please enter a valid trip duration');
            return false;
        }
        if (!data.preferences) {
            this.showErrorMessage('Please select a travel style');
            return false;
        }
        return true;
    }

    createItinerary(days, preferences, destinationKey) {
        const itinerary = [];
        const timeSlots = ['morning', 'afternoon', 'evening'];
        const city = citiesData[destinationKey];

        for (let day = 1; day <= days; day++) {
            const dayPlan = {
                day: day,
                activities: {}
            };

            timeSlots.forEach(slot => {
                dayPlan.activities[slot] = [];
                
                // Add activities based on preferences
                if (city && city.activities[preferences]) {
                    const randomActivity = city.activities[preferences][Math.floor(Math.random() * city.activities[preferences].length)];
                    dayPlan.activities[slot].push({
                        name: randomActivity,
                        type: preferences,
                        time: slot
                    });
                }

                // Add famous spots on specific days
                if (city && city.famousSpots.length > 0) {
                    const spotIndex = (day - 1) % city.famousSpots.length;
                    const spot = city.famousSpots[spotIndex];
                    dayPlan.activities[slot].push({
                        name: spot.name,
                        type: 'landmark',
                        time: slot,
                        description: spot.description,
                        price: spot.price
                    });
                }
            });

            itinerary.push(dayPlan);
        }

        return itinerary;
    }

    displayItinerary() {
        const container = document.getElementById('itinerary-content');
        const preview = document.getElementById('itinerary-preview');

        if (!this.currentTrip || !this.currentTrip.itinerary) {
            container.innerHTML = '<p>No itinerary available</p>';
            return;
        }

        container.innerHTML = `
            <div class="grid grid-2 mb-3">
                <div>
                    <h4>📍 Destination</h4>
                    <p>${citiesData[this.currentTrip.destination].name}</p>
                </div>
                <div>
                    <h4>📅 Trip Details</h4>
                    <p>${this.currentTrip.tripName}</p>
                    <p>${this.currentTrip.startDate} (${this.currentTrip.tripLength} days)</p>
                </div>
            </div>

            <div class="mb-3">
                <h4>🎯 Travel Style</h4>
                <p>${this.getTravelStyleDisplay(this.currentTrip.preferences)}</p>
            </div>

            <div class="mb-3">
                <h4>📋 Daily Schedule</h4>
                ${this.currentTrip.itinerary.map(dayPlan => `
                    <div class="itinerary-day mb-2">
                        <div class="day-header">
                            <h5>Day ${dayPlan.day}</h5>
                        </div>
                        <div class="time-slots">
                            ${Object.entries(dayPlan.activities).map(([time, activities]) => `
                                <div class="time-slot">
                                    <span class="time-label">${this.getTimeSlotEmoji(time)} ${time.charAt(0).toUpperCase() + time.slice(1)}</span>
                                    <div class="activities-container">
                                        ${activities.map(activity => `
                                            <div class="activity-item">
                                                <span>${activity.name}</span>
                                                ${activity.description ? `<small>${activity.description}</small>` : ''}
                                                ${activity.price ? `<small>${activity.price}</small>` : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        preview.classList.remove('d-none');
    }

    getTravelStyleDisplay(style) {
        const emojiMap = {
            'adventure': '🏔️ Adventure',
            'foodie': '🍜 Foodie',
            'relaxation': '🏖️ Relaxation',
            'culture': '🏛️ Culture',
            'shopping': '🛍️ Shopping'
        };
        return emojiMap[style] || style;
    }

    getTimeSlotEmoji(time) {
        const emojiMap = {
            'morning': '🌅',
            'afternoon': '☀️',
            'evening': '🌙'
        };
        return emojiMap[time] || '⏰';
    }

    showCountdown(startDate) {
        if (!startDate) return;

        const countdownSection = document.getElementById('countdown-section');
        countdownSection.classList.remove('d-none');
        
        this.updateCountdown(startDate);
        
        // Update countdown every minute
        setInterval(() => {
            this.updateCountdown(startDate);
        }, 60000);
    }

    updateCountdown(startDate) {
        const now = new Date();
        const tripDate = new Date(startDate);
        const timeDiff = tripDate - now;
        
        if (timeDiff <= 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            return;
        }
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    }

    showWeather(destinationKey) {
        if (!destinationKey || !citiesData[destinationKey]) return;

        const city = citiesData[destinationKey];
        const weatherSection = document.getElementById('weather-section');
        const weatherContent = document.getElementById('weather-content');
        
        const currentMonth = new Date().getMonth();
        let season;
        if (currentMonth >= 2 && currentMonth <= 4) season = 'spring';
        else if (currentMonth >= 5 && currentMonth <= 7) season = 'summer';
        else if (currentMonth >= 8 && currentMonth <= 10) season = 'autumn';
        else season = 'winter';
        
        const weather = city.weather[season];
        
        weatherContent.innerHTML = `
            <div class="grid grid-2">
                <div class="weather-card">
                    <div class="weather-icon">${weather.condition}</div>
                    <div class="weather-temp">${weather.temp}</div>
                    <div class="weather-desc">${weather.description}</div>
                </div>
                <div class="weather-card">
                    <div class="weather-icon">🌍</div>
                    <div class="weather-temp">${city.name}</div>
                    <div class="weather-desc">${season.charAt(0).toUpperCase() + season.slice(1)}</div>
                </div>
            </div>
        `;
        
        weatherSection.classList.remove('d-none');
    }

    surpriseMe() {
        const destinations = Object.keys(citiesData);
        const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
        const preferences = ['adventure', 'foodie', 'relaxation', 'culture', 'shopping'];
        const randomPreference = preferences[Math.floor(Math.random() * preferences.length)];
        
        document.getElementById('destination').value = randomDestination;
        document.getElementById('preferences').value = randomPreference;
        document.getElementById('trip-name').value = `Surprise Trip to ${citiesData[randomDestination].name}`;
        
        this.showSuccessMessage(`🎲 Surprise! Planning a ${randomPreference} trip to ${citiesData[randomDestination].name}`);
    }

    saveItinerary() {
        if (!this.currentTrip) {
            this.showErrorMessage('No itinerary to save');
            return;
        }

        const savedTrips = JSON.parse(localStorage.getItem('astratrip-trips') || '[]');
        savedTrips.push(this.currentTrip);
        localStorage.setItem('astratrip-trips', JSON.stringify(savedTrips));
        
        // Trigger gamification events
        document.dispatchEvent(new CustomEvent('tripPlanned'));
        if (this.currentTrip.destination) {
            document.dispatchEvent(new CustomEvent('spotAdded'));
        }
        
        this.showSuccessMessage('Itinerary saved successfully!');
    }

    editItinerary() {
        // For now, just show a message
        this.showSuccessMessage('Edit functionality coming soon!');
    }

    exportItinerary() {
        if (!this.currentTrip) {
            this.showErrorMessage('No itinerary to export');
            return;
        }

        const data = {
            ...this.currentTrip,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `astratrip-${this.currentTrip.tripName.replace(/\s+/g, '-')}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showSuccessMessage('Itinerary exported successfully!');
    }

    showSuccessMessage(message) {
        this.showMessage(message, 'success');
    }

    showErrorMessage(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;
        
        // Insert at the top of the page container
        const pageContainer = document.querySelector('.page-container');
        pageContainer.insertBefore(messageElement, pageContainer.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentElement) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Initialize the page when DOM is loaded and cities data is available
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    console.log('citiesData available:', typeof citiesData !== 'undefined');
    console.log('window.citiesData available:', typeof window.citiesData !== 'undefined');
    
    // Check if citiesData is available immediately
    if (typeof citiesData !== 'undefined') {
        console.log('Initializing TripPlanner immediately');
        new TripPlanner();
    } else if (typeof window.citiesData !== 'undefined') {
        console.log('Found citiesData in window object');
        new TripPlanner();
    } else {
        console.log('citiesData not available, waiting...');
        // If not available, wait for it to load
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds max
        
        const checkCitiesData = () => {
            attempts++;
            console.log(`Attempt ${attempts}: citiesData available:`, typeof citiesData !== 'undefined');
            console.log(`Attempt ${attempts}: window.citiesData available:`, typeof window.citiesData !== 'undefined');
            
            if (typeof citiesData !== 'undefined' || typeof window.citiesData !== 'undefined') {
                console.log('citiesData found, initializing TripPlanner');
                new TripPlanner();
            } else if (attempts < maxAttempts) {
                setTimeout(checkCitiesData, 100);
            } else {
                console.error('Failed to load citiesData after maximum attempts');
                // Show error message to user
                const destinationSelect = document.getElementById('destination');
                if (destinationSelect) {
                    destinationSelect.innerHTML = '<option value="">Error loading destinations</option>';
                }
            }
        };
        checkCitiesData();
    }
});
