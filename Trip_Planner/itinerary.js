// Itinerary Page JavaScript

class ItineraryManager {
    constructor() {
        this.savedTrips = [];
        this.currentTrip = null;
        this.init();
    }

    init() {
        this.loadSavedTrips();
        this.setupEventListeners();
        this.displaySavedTrips();
        
        // Check if this page was opened from group travel
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('source') === 'group') {
            this.loadAndDisplayGroupItinerary();
        }
    }

    setupEventListeners() {
        // Add activity button
        document.getElementById('add-activities').addEventListener('click', () => this.openActivityModal());
        
        // Modal event listeners
        document.getElementById('cancel-activity').addEventListener('click', () => this.closeActivityModal());
        document.getElementById('save-activity').addEventListener('click', () => this.saveActivity());
        
        // Other buttons
        document.getElementById('edit-schedule').addEventListener('click', () => this.editSchedule());
        document.getElementById('export-schedule').addEventListener('click', () => this.exportSchedule());
    }

    loadSavedTrips() {
        this.savedTrips = JSON.parse(localStorage.getItem('astratrip-trips') || '[]');
    }

    displaySavedTrips() {
        const savedTripsContainer = document.getElementById('saved-trips');
        const noTripsContainer = document.getElementById('no-trips');

        if (this.savedTrips.length === 0) {
            savedTripsContainer.style.display = 'none';
            noTripsContainer.style.display = 'block';
            return;
        }

        savedTripsContainer.style.display = 'block';
        noTripsContainer.style.display = 'none';

        savedTripsContainer.innerHTML = this.savedTrips.map((trip, index) => `
            <div class="card mb-2">
                <div class="card-body">
                    <div class="grid grid-2">
                        <div>
                            <h4>${trip.tripName}</h4>
                            <p><strong>Destination:</strong> ${citiesData[trip.destination]?.name || 'Unknown'}</p>
                            <p><strong>Dates:</strong> ${trip.startDate} (${trip.tripLength} days)</p>
                            <p><strong>Style:</strong> ${this.getTravelStyleDisplay(trip.preferences)}</p>
                        </div>
                        <div class="text-right">
                            <button class="btn btn-primary btn-sm" onclick="itineraryManager.viewTrip(${index})">
                                View Details
                            </button>
                            <button class="btn btn-outline btn-sm" onclick="itineraryManager.editTrip(${index})">
                                Edit
                            </button>
                            <button class="btn btn-danger btn-sm" onclick="itineraryManager.deleteTrip(${index})">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    viewTrip(tripIndex) {
        this.currentTrip = this.savedTrips[tripIndex];
        this.displayCurrentItinerary();
        
        // Trigger gamification event for itinerary creation
        document.dispatchEvent(new CustomEvent('itineraryCreated'));
        
        // Scroll to current itinerary section
        document.getElementById('current-itinerary').scrollIntoView({ behavior: 'smooth' });
    }

    displayCurrentItinerary() {
        if (!this.currentTrip) return;

        const currentItinerary = document.getElementById('current-itinerary');
        const itineraryDetails = document.getElementById('itinerary-details');
        const dailyItinerary = document.getElementById('daily-itinerary');

        // Display trip details
        itineraryDetails.innerHTML = `
            <div class="grid grid-2">
                <div>
                    <h4>📍 Destination</h4>
                    <p>${citiesData[this.currentTrip.destination]?.name || 'Unknown'}</p>
                </div>
                <div>
                    <h4>📅 Trip Details</h4>
                    <p><strong>Name:</strong> ${this.currentTrip.tripName}</p>
                    <p><strong>Start Date:</strong> ${this.currentTrip.startDate}</p>
                    <p><strong>Duration:</strong> ${this.currentTrip.tripLength} days</p>
                    <p><strong>Travel Style:</strong> ${this.getTravelStyleDisplay(this.currentTrip.preferences)}</p>
                </div>
            </div>
            ${this.currentTrip.tripNotes ? `
                <div class="mt-3">
                    <h4>📝 Notes</h4>
                    <p>${this.currentTrip.tripNotes}</p>
                </div>
            ` : ''}
        `;

        // Display daily itinerary
        dailyItinerary.innerHTML = this.currentTrip.itinerary.map(dayPlan => `
            <div class="itinerary-day">
                <div class="day-header">
                    <h4 class="day-title">Day ${dayPlan.day}</h4>
                </div>
                <div class="time-slots">
                    ${Object.entries(dayPlan.activities).map(([time, activities]) => `
                        <div class="time-slot">
                            <span class="time-label">${this.getTimeSlotEmoji(time)} ${time.charAt(0).toUpperCase() + time.slice(1)}</span>
                            <div class="activities-container">
                                ${activities.length > 0 ? activities.map(activity => `
                                    <div class="activity-item">
                                        <span>${activity.name}</span>
                                        ${activity.description ? `<small>${activity.description}</small>` : ''}
                                        ${activity.price ? `<small>${activity.price}</small>` : ''}
                                        <button class="remove-btn" onclick="itineraryManager.removeActivity(${dayPlan.day}, '${time}', '${activity.name}')">×</button>
                                    </div>
                                `).join('') : '<p style="color: var(--text-secondary); font-style: italic;">No activities planned</p>'}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        currentItinerary.classList.remove('d-none');
    }

    openActivityModal() {
        if (!this.currentTrip) {
            this.showMessage('Please select a trip first', 'error');
            return;
        }

        const modal = document.getElementById('activity-modal');
        const daySelect = document.getElementById('activity-day');
        
        // Populate day options
        daySelect.innerHTML = '';
        for (let i = 1; i <= this.currentTrip.tripLength; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Day ${i}`;
            daySelect.appendChild(option);
        }

        modal.classList.remove('d-none');
        modal.style.display = 'flex';
    }

    closeActivityModal() {
        const modal = document.getElementById('activity-modal');
        modal.classList.add('d-none');
        modal.style.display = 'none';
        
        // Clear form
        document.getElementById('activity-form').reset();
    }

    saveActivity() {
        const activityName = document.getElementById('activity-name').value;
        const activityDay = parseInt(document.getElementById('activity-day').value);
        const activityTime = document.getElementById('activity-time').value;
        const activityNotes = document.getElementById('activity-notes').value;

        if (!activityName || !activityDay || !activityTime) {
            this.showMessage('Please fill in all required fields', 'error');
            return;
        }

        const newActivity = {
            name: activityName,
            type: 'custom',
            time: activityTime,
            notes: activityNotes
        };

        // Add activity to the current trip
        if (this.currentTrip && this.currentTrip.itinerary) {
            const dayPlan = this.currentTrip.itinerary.find(day => day.day === activityDay);
            if (dayPlan && dayPlan.activities[activityTime]) {
                dayPlan.activities[activityTime].push(newActivity);
                
                // Update localStorage
                this.updateSavedTrip();
                
                // Refresh display
                this.displayCurrentItinerary();
                
                this.showMessage('Activity added successfully!', 'success');
                this.closeActivityModal();
            }
        }
    }

    removeActivity(day, time, activityName) {
        if (!this.currentTrip || !this.currentTrip.itinerary) return;

        const dayPlan = this.currentTrip.itinerary.find(d => d.day === day);
        if (dayPlan && dayPlan.activities[time]) {
            const activityIndex = dayPlan.activities[time].findIndex(a => a.name === activityName);
            if (activityIndex !== -1) {
                dayPlan.activities[time].splice(activityIndex, 1);
                
                // Update localStorage
                this.updateSavedTrip();
                
                // Refresh display
                this.displayCurrentItinerary();
                
                this.showMessage('Activity removed successfully!', 'success');
            }
        }
    }

    updateSavedTrip() {
        if (!this.currentTrip) return;

        const tripIndex = this.savedTrips.findIndex(trip => 
            trip.tripName === this.currentTrip.tripName && 
            trip.startDate === this.currentTrip.startDate
        );

        if (tripIndex !== -1) {
            this.savedTrips[tripIndex] = this.currentTrip;
            localStorage.setItem('astratrip-trips', JSON.stringify(this.savedTrips));
        }
    }

    editTrip(tripIndex) {
        // For now, just show a message
        this.showMessage('Edit functionality coming soon!', 'success');
    }

    deleteTrip(tripIndex) {
        if (confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
            this.savedTrips.splice(tripIndex, 1);
            localStorage.setItem('astratrip-trips', JSON.stringify(this.savedTrips));
            
            if (this.currentTrip === this.savedTrips[tripIndex]) {
                this.currentTrip = null;
                document.getElementById('current-itinerary').classList.add('d-none');
            }
            
            this.displaySavedTrips();
            this.showMessage('Trip deleted successfully!', 'success');
        }
    }

    editSchedule() {
        this.showMessage('Schedule editing functionality coming soon!', 'success');
    }

    exportSchedule() {
        if (!this.currentTrip) {
            this.showMessage('No trip selected to export', 'error');
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
        a.download = `astratrip-itinerary-${this.currentTrip.tripName.replace(/\s+/g, '-')}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showMessage('Itinerary exported successfully!', 'success');
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

    loadAndDisplayGroupItinerary() {
        const groupItineraryData = localStorage.getItem('groupItinerary');
        if (!groupItineraryData) {
            this.showMessage('No group itinerary found. Please generate one from the Group Travel page.', 'error');
            return;
        }

        try {
            const groupData = JSON.parse(groupItineraryData);
            this.displayGroupItinerary(groupData);
            
            // Scroll to the group itinerary section
            document.getElementById('current-itinerary').scrollIntoView({ behavior: 'smooth' });
            
            // Trigger gamification event
            document.dispatchEvent(new CustomEvent('itineraryCreated'));
            
        } catch (error) {
            console.error('Error loading group itinerary:', error);
            this.showMessage('Error loading group itinerary data.', 'error');
        }
    }

    displayGroupItinerary(groupData) {
        const currentItinerary = document.getElementById('current-itinerary');
        const itineraryDetails = document.getElementById('itinerary-details');
        const dailyItinerary = document.getElementById('daily-itinerary');

        // Show the current itinerary section
        currentItinerary.classList.remove('d-none');

        // Display group itinerary details
        itineraryDetails.innerHTML = `
            <div class="grid grid-2">
                <div>
                    <h4>👥 Group Itinerary</h4>
                    <p><strong>Generated:</strong> ${new Date(groupData.generatedAt).toLocaleDateString()}</p>
                    <p><strong>Group Members:</strong> ${groupData.groupMembers.join(', ')}</p>
                </div>
                <div>
                    <h4>📊 Voting Results</h4>
                    <p><strong>Total Spots:</strong> ${groupData.spots.length}</p>
                    <p><strong>Top Recommendations:</strong> Based on group votes</p>
                </div>
            </div>
        `;

        // Display recommended spots as daily itinerary
        dailyItinerary.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h4>🎯 Group-Recommended Spots</h4>
                    <p>Destinations ranked by group consensus</p>
                </div>
                <div class="card-body">
                    ${groupData.spots.map((spot, index) => `
                        <div class="itinerary-day mb-3">
                            <div class="day-header">
                                <h5>${index + 1}. ${spot.name}</h5>
                                <div class="vote-stats">
                                    <span class="vote-score ${spot.score > 0.5 ? 'positive' : 'negative'}">
                                        ${Math.round(spot.score * 100)}% Approval
                                    </span>
                                    <span class="vote-count">
                                        ${spot.votes.likes} likes, ${spot.votes.dislikes} dislikes
                                    </span>
                                </div>
                            </div>
                            <div class="day-content">
                                <div class="grid grid-2">
                                    <div>
                                        <h6>📍 Location</h6>
                                        <p>${spot.location || 'Location details available'}</p>
                                        
                                        <h6>🎯 Famous For</h6>
                                        <p>${spot.famousFor || 'Cultural significance'}</p>
                                    </div>
                                    <div>
                                        <h6>🌟 Activities</h6>
                                        <ul>
                                            ${spot.activities ? Object.entries(spot.activities).map(([category, activities]) => `
                                                <li><strong>${category.charAt(0).toUpperCase() + category.slice(1)}:</strong> ${Array.isArray(activities) ? activities.slice(0, 2).join(', ') : activities}</li>
                                            `).join('') : '<li>Various activities available</li>'}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.itineraryManager = new ItineraryManager();
});
