// AstraTrip - Main JavaScript File

class AstraTrip {
    constructor() {
        this.currentItinerary = [];
        this.currentDestination = null;
        this.currentPreferences = null;
        this.mapMarkers = [];
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationId = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSavedData();
        this.initThreeJS();
        this.setDefaultDate();
        this.setupExpenseCalculator();
        this.setupDragAndDrop();
    }

    setupEventListeners() {
        // Generate Itinerary Button
        document.getElementById('generate-itinerary').addEventListener('click', () => {
            this.generateItinerary();
        });

        // Theme Toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Surprise Me Button
        document.getElementById('surprise-btn').addEventListener('click', () => {
            this.surpriseMe();
        });

        // Map Controls
        document.getElementById('add-location').addEventListener('click', () => {
            this.addMapLocation();
        });

        document.getElementById('clear-markers').addEventListener('click', () => {
            this.clearMapMarkers();
        });

        // Packing List Controls
        document.getElementById('add-custom-item').addEventListener('click', () => {
            this.addCustomPackingItem();
        });

        // Export Controls
        document.getElementById('save-itinerary').addEventListener('click', () => {
            this.saveToBrowser();
        });

        document.getElementById('export-pdf').addEventListener('click', () => {
            this.exportAsPDF();
        });

        document.getElementById('export-json').addEventListener('click', () => {
            this.exportAsJSON();
        });

        document.getElementById('clear-all').addEventListener('click', () => {
            this.clearAll();
        });

        // Destination input with autocomplete
        const destinationInput = document.getElementById('destination');
        destinationInput.addEventListener('input', (e) => {
            this.handleDestinationInput(e.target.value);
        });

        // Preferences change
        document.getElementById('preferences').addEventListener('change', (e) => {
            this.updatePackingList(e.target.value);
        });
    }

    initThreeJS() {
        const background = document.getElementById('animated-background');
        
        // Create scene
        this.scene = new THREE.Scene();
        
        // Create camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 5;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        background.appendChild(this.renderer.domElement);
        
        // Create floating particles
        this.createFloatingParticles();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Start animation loop
        this.animate();
    }

    createFloatingParticles() {
        const particleCount = 100;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;
            
            colors[i] = Math.random();
            colors[i + 1] = Math.random();
            colors[i + 2] = Math.random();
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });
        
        const particleSystem = new THREE.Points(particles, particleMaterial);
        this.scene.add(particleSystem);
        
        // Store for animation
        this.particleSystem = particleSystem;
    }

    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        if (this.particleSystem) {
            this.particleSystem.rotation.x += 0.001;
            this.particleSystem.rotation.y += 0.002;
        }
        
        this.renderer.render(this.scene, this.camera);
    }

    setDefaultDate() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        const dateString = tomorrow.toISOString().split('T')[0];
        document.getElementById('start-date').value = dateString;
    }

    setupExpenseCalculator() {
        const expenseInputs = ['accommodation', 'transportation', 'food', 'activities'];
        
        expenseInputs.forEach(id => {
            document.getElementById(id).addEventListener('input', () => {
                this.calculateTotalExpense();
            });
        });
    }

    calculateTotalExpense() {
        const accommodation = parseFloat(document.getElementById('accommodation').value) || 0;
        const transportation = parseFloat(document.getElementById('transportation').value) || 0;
        const food = parseFloat(document.getElementById('food').value) || 0;
        const activities = parseFloat(document.getElementById('activities').value) || 0;
        
        const total = accommodation + transportation + food + activities;
        document.getElementById('total-budget').textContent = `$${total.toFixed(2)}`;
    }

    handleDestinationInput(value) {
        const normalizedValue = value.toLowerCase().replace(/[^a-z]/g, '');
        
        if (citiesData[normalizedValue]) {
            this.currentDestination = normalizedValue;
            this.displayDestinationSpots();
            this.updateMap();
            this.updateWeather();
            this.updatePackingList(document.getElementById('preferences').value);
        } else {
            document.getElementById('spots-section').style.display = 'none';
        }
    }

    displayDestinationSpots() {
        if (!this.currentDestination) return;
        
        const city = citiesData[this.currentDestination];
        const spotsGrid = document.getElementById('spots-grid');
        const spotsSection = document.getElementById('spots-section');
        
        spotsGrid.innerHTML = '';
        
        city.famousSpots.forEach(spot => {
            const spotCard = document.createElement('div');
            spotCard.className = 'spot-card';
            spotCard.innerHTML = `
                <div class="spot-header">
                    <span class="spot-icon">${spot.image}</span>
                    <div class="spot-info">
                        <h4>${spot.name}</h4>
                        <p>${spot.description}</p>
                    </div>
                </div>
                <div class="spot-details">
                    <span>⏰ ${spot.timeNeeded}</span>
                    <span>🌅 ${spot.bestTime}</span>
                    <span>💰 ${spot.price}</span>
                    <span>🏷️ ${spot.category}</span>
                </div>
                <button class="add-to-itinerary" onclick="astraTrip.addSpotToItinerary('${spot.name}')">
                    ✨ Add to Itinerary
                </button>
            `;
            spotsGrid.appendChild(spotCard);
        });
        
        spotsSection.style.display = 'block';
    }

    updateMap() {
        if (!this.currentDestination) return;
        
        const city = citiesData[this.currentDestination];
        const mapContainer = document.getElementById('map');
        
        // Create a simple map representation with coordinates
        mapContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3>🗺️ ${city.name}</h3>
                <p>📍 Coordinates: ${city.coordinates.lat.toFixed(4)}, ${city.coordinates.lng.toFixed(4)}</p>
                <p>🌍 ${city.country} - ${city.continent}</p>
                <p>${city.description}</p>
                <div style="margin-top: 1rem;">
                    <button onclick="astraTrip.addMapMarker('${city.name}', ${city.coordinates.lat}, ${city.coordinates.lng})" 
                            class="map-btn">📍 Add to Map</button>
                </div>
            </div>
        `;
    }

    updateWeather() {
        if (!this.currentDestination) return;
        
        const city = citiesData[this.currentDestination];
        const weatherDisplay = document.getElementById('weather-display');
        const currentMonth = new Date().getMonth();
        
        let season;
        if (currentMonth >= 2 && currentMonth <= 4) season = 'spring';
        else if (currentMonth >= 5 && currentMonth <= 7) season = 'summer';
        else if (currentMonth >= 8 && currentMonth <= 10) season = 'autumn';
        else season = 'winter';
        
        const weather = city.weather[season];
        
        weatherDisplay.innerHTML = `
            <div class="weather-info">
                <div class="weather-card">
                    <div class="weather-icon">${weather.condition}</div>
                    <h4>${weather.temp}</h4>
                    <p>${weather.description}</p>
                </div>
                <div class="weather-card">
                    <div class="weather-icon">🌍</div>
                    <h4>${city.name}</h4>
                    <p>${season.charAt(0).toUpperCase() + season.slice(1)}</p>
                </div>
            </div>
        `;
    }

    updatePackingList(preference) {
        if (!preference) return;
        
        const packingList = document.getElementById('packing-list');
        const template = packingTemplates[preference];
        const cityList = this.currentDestination ? citiesData[this.currentDestination].packingList : [];
        
        const allItems = [...template, ...cityList];
        
        packingList.innerHTML = '';
        
        allItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'packing-item';
            itemElement.innerHTML = `
                <span>${item}</span>
                <button onclick="this.parentElement.remove()" class="remove-activity">×</button>
            `;
            packingList.appendChild(itemElement);
        });
    }

    addCustomPackingItem() {
        const input = document.getElementById('add-item');
        const item = input.value.trim();
        
        if (item) {
            const packingList = document.getElementById('packing-list');
            const itemElement = document.createElement('div');
            itemElement.className = 'packing-item';
            itemElement.innerHTML = `
                <span>${item}</span>
                <button onclick="this.parentElement.remove()" class="remove-activity">×</button>
            `;
            packingList.appendChild(itemElement);
            input.value = '';
        }
    }

    generateItinerary() {
        const destination = document.getElementById('destination').value;
        const startDate = document.getElementById('start-date').value;
        const tripLength = parseInt(document.getElementById('trip-length').value);
        const preferences = document.getElementById('preferences').value;
        
        if (!destination || !startDate || !tripLength) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }
        
        this.currentPreferences = preferences;
        this.currentItinerary = this.createItinerary(tripLength, preferences);
        
        this.displayItinerary();
        this.showCountdown(startDate);
        this.showMessage('Itinerary generated successfully!', 'success');
    }

    createItinerary(days, preferences) {
        const itinerary = [];
        const timeSlots = ['morning', 'afternoon', 'evening'];
        
        for (let day = 1; day <= days; day++) {
            const dayPlan = {
                day: day,
                activities: {}
            };
            
            timeSlots.forEach(slot => {
                dayPlan.activities[slot] = [];
                
                // Add activities based on preferences
                if (this.currentDestination && citiesData[this.currentDestination]) {
                    const city = citiesData[this.currentDestination];
                    if (city.activities[preferences]) {
                        const randomActivity = city.activities[preferences][Math.floor(Math.random() * city.activities[preferences].length)];
                        dayPlan.activities[slot].push({
                            name: randomActivity,
                            type: preferences,
                            time: slot
                        });
                    }
                }
            });
            
            itinerary.push(dayPlan);
        }
        
        return itinerary;
    }

    displayItinerary() {
        const container = document.getElementById('itinerary-container');
        
        if (this.currentItinerary.length === 0) {
            container.innerHTML = '<div class="itinerary-placeholder"><p>✨ Generate an itinerary to get started!</p></div>';
            return;
        }
        
        container.innerHTML = '';
        
        this.currentItinerary.forEach(dayPlan => {
            const dayContainer = document.createElement('div');
            dayContainer.className = 'day-container';
            dayContainer.setAttribute('data-day', dayPlan.day);
            
            dayContainer.innerHTML = `
                <div class="day-header">
                    <h4 class="day-title">Day ${dayPlan.day}</h4>
                </div>
                <div class="time-slots">
                    <div class="time-slot" data-time="morning" data-day="${dayPlan.day}">
                        <span class="time-label">🌅 Morning</span>
                        <div class="activities-container">
                            ${this.renderActivities(dayPlan.activities.morning)}
                        </div>
                    </div>
                    <div class="time-slot" data-time="afternoon" data-day="${dayPlan.day}">
                        <span class="time-label">☀️ Afternoon</span>
                        <div class="activities-container">
                            ${this.renderActivities(dayPlan.activities.afternoon)}
                        </div>
                    </div>
                    <div class="time-slot" data-time="evening" data-day="${dayPlan.day}">
                        <span class="time-label">🌙 Evening</span>
                        <div class="activities-container">
                            ${this.renderActivities(dayPlan.activities.evening)}
                        </div>
                    </div>
                </div>
            `;
            
            container.appendChild(dayContainer);
        });
    }

    renderActivities(activities) {
        if (!activities || activities.length === 0) {
            return '<p style="color: var(--text-secondary); font-style: italic;">No activities planned</p>';
        }
        
        return activities.map(activity => `
            <div class="activity-item" draggable="true" data-activity="${activity.name}">
                <span>${activity.name}</span>
                <button onclick="astraTrip.removeActivity(this)" class="remove-activity">×</button>
            </div>
        `).join('');
    }

    addSpotToItinerary(spotName) {
        if (!this.currentItinerary.length) {
            this.showMessage('Please generate an itinerary first', 'error');
            return;
        }
        
        // Add to first day morning slot
        const firstDay = this.currentItinerary[0];
        if (firstDay.activities.morning) {
            firstDay.activities.morning.push({
                name: spotName,
                type: 'landmark',
                time: 'morning'
            });
            this.displayItinerary();
            this.showMessage(`${spotName} added to Day 1 Morning`, 'success');
        }
    }

    removeActivity(button) {
        button.parentElement.remove();
    }

    showCountdown(startDate) {
        if (!startDate) return;
        
        const countdownSection = document.getElementById('countdown-section');
        countdownSection.style.display = 'block';
        
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

    addMapLocation() {
        if (!this.currentDestination) {
            this.showMessage('Please select a destination first', 'error');
            return;
        }
        
        const city = citiesData[this.currentDestination];
        this.addMapMarker(city.name, city.coordinates.lat, city.coordinates.lng);
    }

    addMapMarker(name, lat, lng) {
        const marker = { name, lat, lng };
        this.mapMarkers.push(marker);
        
        this.showMessage(`📍 ${name} added to map`, 'success');
        
        // Update map display
        this.updateMapDisplay();
    }

    updateMapDisplay() {
        const mapContainer = document.getElementById('map');
        const city = citiesData[this.currentDestination];
        
        let markersHtml = '';
        this.mapMarkers.forEach(marker => {
            markersHtml += `
                <div style="background: var(--glass-bg); padding: 0.5rem; margin: 0.5rem; border-radius: 8px; border: 1px solid var(--glass-border);">
                    📍 ${marker.name} (${marker.lat.toFixed(4)}, ${marker.lng.toFixed(4)})
                </div>
            `;
        });
        
        mapContainer.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <h3>🗺️ ${city.name}</h3>
                <p>📍 Coordinates: ${city.coordinates.lat.toFixed(4)}, ${city.coordinates.lng.toFixed(4)}</p>
                <div style="margin: 1rem 0;">
                    <h4>Map Markers:</h4>
                    ${markersHtml || '<p style="color: var(--text-secondary);">No markers added yet</p>'}
                </div>
            </div>
        `;
    }

    clearMapMarkers() {
        this.mapMarkers = [];
        this.updateMapDisplay();
        this.showMessage('All map markers cleared', 'success');
    }

    setupDragAndDrop() {
        document.addEventListener('dragover', (e) => {
            e.preventDefault();
        });
        
        document.addEventListener('drop', (e) => {
            e.preventDefault();
            const activityName = e.dataTransfer.getData('text/plain');
            const targetTimeSlot = e.target.closest('.time-slot');
            
            if (targetTimeSlot && activityName) {
                this.moveActivity(activityName, targetTimeSlot);
            }
        });
        
        // Make activity items draggable
        document.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('activity-item')) {
                e.dataTransfer.setData('text/plain', e.target.dataset.activity);
                e.target.classList.add('dragging');
            }
        });
        
        document.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('activity-item')) {
                e.target.classList.remove('dragging');
            }
        });
    }

    moveActivity(activityName, targetTimeSlot) {
        const day = targetTimeSlot.dataset.day;
        const time = targetTimeSlot.dataset.time;
        
        // Find the activity in the current itinerary
        let activity = null;
        let sourceDay = null;
        let sourceTime = null;
        
        this.currentItinerary.forEach(dayPlan => {
            Object.keys(dayPlan.activities).forEach(timeSlot => {
                const activities = dayPlan.activities[timeSlot];
                const activityIndex = activities.findIndex(a => a.name === activityName);
                if (activityIndex !== -1) {
                    activity = activities[activityIndex];
                    sourceDay = dayPlan.day;
                    sourceTime = timeSlot;
                    activities.splice(activityIndex, 1);
                }
            });
        });
        
        if (activity) {
            // Add to new location
            const targetDay = this.currentItinerary.find(d => d.day == day);
            if (targetDay && targetDay.activities[time]) {
                targetDay.activities[time].push(activity);
                this.displayItinerary();
                this.showMessage(`${activityName} moved to Day ${day} ${time}`, 'success');
            }
        }
    }

    surpriseMe() {
        const destinations = Object.keys(citiesData);
        const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
        const preferences = ['adventure', 'foodie', 'relaxation', 'culture', 'shopping'];
        const randomPreference = preferences[Math.floor(Math.random() * preferences.length)];
        
        document.getElementById('destination').value = citiesData[randomDestination].name;
        document.getElementById('preferences').value = randomPreference;
        
        this.currentDestination = randomDestination;
        this.displayDestinationSpots();
        this.updateMap();
        this.updateWeather();
        this.updatePackingList(randomPreference);
        
        this.showMessage(`🎲 Surprise! Planning a ${randomPreference} trip to ${citiesData[randomDestination].name}`, 'success');
    }

    toggleTheme() {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        
        const themeBtn = document.getElementById('theme-toggle');
        themeBtn.textContent = newTheme === 'light' ? '🌙' : '☀️';
        
        this.showMessage(`Theme changed to ${newTheme} mode`, 'success');
    }

    saveToBrowser() {
        const data = {
            itinerary: this.currentItinerary,
            destination: this.currentDestination,
            preferences: this.currentPreferences,
            mapMarkers: this.mapMarkers,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('astratrip-data', JSON.stringify(data));
        this.showMessage('Itinerary saved to browser successfully!', 'success');
    }

    loadSavedData() {
        const savedData = localStorage.getItem('astratrip-data');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                this.currentItinerary = data.itinerary || [];
                this.currentDestination = data.destination || null;
                this.currentPreferences = data.preferences || null;
                this.mapMarkers = data.mapMarkers || [];
                
                if (this.currentItinerary.length > 0) {
                    this.displayItinerary();
                }
                
                if (this.currentDestination) {
                    this.displayDestinationSpots();
                    this.updateMap();
                    this.updateWeather();
                }
                
                this.showMessage('Previous itinerary loaded successfully!', 'success');
            } catch (error) {
                console.error('Error loading saved data:', error);
            }
        }
    }

    exportAsPDF() {
        this.showMessage('PDF export feature coming soon!', 'success');
    }

    exportAsJSON() {
        const data = {
            itinerary: this.currentItinerary,
            destination: this.currentDestination,
            preferences: this.currentPreferences,
            mapMarkers: this.mapMarkers,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'astratrip-itinerary.json';
        a.click();
        URL.revokeObjectURL(url);
        
        this.showMessage('Itinerary exported as JSON successfully!', 'success');
    }

    clearAll() {
        if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            this.currentItinerary = [];
            this.currentDestination = null;
            this.currentPreferences = null;
            this.mapMarkers = [];
            
            localStorage.removeItem('astratrip-data');
            
            document.getElementById('spots-section').style.display = 'none';
            document.getElementById('countdown-section').style.display = 'none';
            document.getElementById('itinerary-container').innerHTML = '<div class="itinerary-placeholder"><p>✨ Generate an itinerary to get started!</p></div>';
            document.getElementById('packing-list').innerHTML = '<div class="packing-placeholder"><p>🎯 Select destination type to generate packing list</p></div>';
            document.getElementById('weather-display').innerHTML = '<div class="weather-placeholder"><p>🌍 Select destination to see weather</p></div>';
            document.getElementById('map').innerHTML = '<div class="map-placeholder"><p>📍 Select a destination to view the map</p></div>';
            
            this.showMessage('All data cleared successfully!', 'success');
        }
    }

    showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.message');
        existingMessages.forEach(msg => msg.remove());
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = message;
        
        // Insert at the top of the main container
        const mainContainer = document.querySelector('.main-container');
        mainContainer.insertBefore(messageElement, mainContainer.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentElement) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Initialize AstraTrip when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.astraTrip = new AstraTrip();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.astraTrip && window.astraTrip.animationId) {
        cancelAnimationFrame(window.astraTrip.animationId);
    }
});
