// Destinations Page JavaScript

class DestinationsPage {
    constructor() {
        this.filteredDestinations = Object.keys(citiesData);
        this.currentPage = 1;
        this.destinationsPerPage = 9;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDestinations();
        this.populateFilters();
    }

    setupEventListeners() {
        // Filter event listeners
        document.getElementById('continent-filter').addEventListener('change', () => this.applyFilters());
        document.getElementById('preference-filter').addEventListener('change', () => this.applyFilters());
        document.getElementById('search-filter').addEventListener('input', () => this.applyFilters());
        
        // Load more button
        document.getElementById('load-more').addEventListener('click', () => this.loadMoreDestinations());
        
        // Modal event listeners
        document.getElementById('close-modal').addEventListener('click', () => this.closeModal());
        document.getElementById('plan-trip').addEventListener('click', () => this.planTrip());
        
        // Close modal when clicking outside
        document.getElementById('destination-modal').addEventListener('click', (e) => {
            if (e.target.id === 'destination-modal') {
                this.closeModal();
            }
        });
    }

    populateFilters() {
        const continentFilter = document.getElementById('continent-filter');
        const preferenceFilter = document.getElementById('preference-filter');
        
        // Get unique continents
        const continents = [...new Set(Object.values(citiesData).map(city => city.continent))];
        continents.forEach(continent => {
            const option = document.createElement('option');
            option.value = continent;
            option.textContent = continent;
            continentFilter.appendChild(option);
        });
    }

    applyFilters() {
        const continentFilter = document.getElementById('continent-filter').value;
        const preferenceFilter = document.getElementById('preference-filter').value;
        const searchFilter = document.getElementById('search-filter').value.toLowerCase();

        this.filteredDestinations = Object.keys(citiesData).filter(cityKey => {
            const city = citiesData[cityKey];
            
            // Continent filter
            if (continentFilter && city.continent !== continentFilter) return false;
            
            // Preference filter
            if (preferenceFilter && !city.activities[preferenceFilter]) return false;
            
            // Search filter
            if (searchFilter && !city.name.toLowerCase().includes(searchFilter) && 
                !city.country.toLowerCase().includes(searchFilter)) return false;
            
            return true;
        });

        this.currentPage = 1;
        this.loadDestinations();
    }

    loadDestinations() {
        const grid = document.getElementById('destinations-grid');
        grid.innerHTML = '';

        const startIndex = 0;
        const endIndex = Math.min(this.currentPage * this.destinationsPerPage, this.filteredDestinations.length);
        const destinationsToShow = this.filteredDestinations.slice(startIndex, endIndex);

        destinationsToShow.forEach(cityKey => {
            const city = citiesData[cityKey];
            const destinationCard = this.createDestinationCard(city, cityKey);
            grid.appendChild(destinationCard);
        });

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('load-more');
        if (endIndex >= this.filteredDestinations.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }

        // Show message if no destinations found
        if (this.filteredDestinations.length === 0) {
            grid.innerHTML = '<div class="text-center p-4"><p>No destinations found matching your criteria.</p></div>';
        }
    }

    loadMoreDestinations() {
        this.currentPage++;
        const grid = document.getElementById('destinations-grid');
        
        const startIndex = (this.currentPage - 1) * this.destinationsPerPage;
        const endIndex = Math.min(this.currentPage * this.destinationsPerPage, this.filteredDestinations.length);
        const destinationsToShow = this.filteredDestinations.slice(startIndex, endIndex);

        destinationsToShow.forEach(cityKey => {
            const city = citiesData[cityKey];
            const destinationCard = this.createDestinationCard(city, cityKey);
            grid.appendChild(destinationCard);
        });

        // Hide load more button if all destinations are shown
        if (endIndex >= this.filteredDestinations.length) {
            document.getElementById('load-more').style.display = 'none';
        }
    }

    createDestinationCard(city, cityKey) {
        const card = document.createElement('div');
        card.className = 'destination-card';
        card.addEventListener('click', () => this.openDestinationModal(city, cityKey));

        card.innerHTML = `
            <div class="destination-image">
                <img src="${city.image}" alt="${city.imageAlt}" loading="lazy" 
                     onload="this.classList.add('loaded')"
                     onerror="this.style.display='none'; this.parentElement.innerHTML='<div style=\\"display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: var(--gradient-primary); font-size: 3rem; color: white;\\">🌍</div>'">
            </div>
            <div class="destination-info">
                <h3 class="destination-name">${city.name}</h3>
                <p class="destination-location">${city.country} • ${city.continent}</p>
                <p class="destination-description">${city.description}</p>
                <div class="destination-meta">
                    <span>${city.famousSpots.length} attractions</span>
                    <span>${Object.keys(city.activities).length} travel styles</span>
                </div>
            </div>
        `;

        return card;
    }

    getDestinationEmoji(cityName) {
        const emojiMap = {
            'Paris': '🗼',
            'Tokyo': '⛩️',
            'New York': '🗽',
            'Bali': '🏝️',
            'Santorini': '🌅',
            'London': '🕰️',
            'Sydney': '🎭',
            'Rio de Janeiro': '✝️',
            'Cape Town': '⛰️',
            'Dubai': '🏗️',
            'Mexico City': '🏛️',
            'Marrakech': '🕌'
        };

        for (const [city, emoji] of Object.entries(emojiMap)) {
            if (cityName.includes(city)) {
                return emoji;
            }
        }
        return '🌍';
    }

    openDestinationModal(city, cityKey) {
        const modal = document.getElementById('destination-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalContent = document.getElementById('modal-content');

        modalTitle.textContent = city.name;
        modalContent.innerHTML = this.createModalContent(city, cityKey);

        modal.classList.remove('d-none');
        modal.style.display = 'flex';
    }

    createModalContent(city, cityKey) {
        const currentMonth = new Date().getMonth();
        let season;
        if (currentMonth >= 2 && currentMonth <= 4) season = 'spring';
        else if (currentMonth >= 5 && currentMonth <= 7) season = 'summer';
        else if (currentMonth >= 8 && currentMonth <= 10) season = 'autumn';
        else season = 'winter';

        const weather = city.weather[season];

        return `
            <div class="grid grid-2 mb-3">
                <div>
                    <h4>📍 Location</h4>
                    <p>${city.country}, ${city.continent}</p>
                    <p>Coordinates: ${city.coordinates.lat.toFixed(4)}, ${city.coordinates.lng.toFixed(4)}</p>
                </div>
                <div>
                    <h4>🌤️ Current Weather</h4>
                    <p>${weather.condition} ${weather.temp}</p>
                    <p>${weather.description}</p>
                </div>
            </div>

            <div class="mb-3">
                <h4>🌟 Famous Spots</h4>
                <div class="spots-grid">
                    ${city.famousSpots.map(spot => `
                        <div class="spot-card">
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
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="mb-3">
                <h4>🎯 Travel Activities</h4>
                <div class="grid grid-2">
                    ${Object.entries(city.activities).map(([style, activities]) => `
                        <div>
                            <h5>${this.getTravelStyleEmoji(style)} ${style.charAt(0).toUpperCase() + style.slice(1)}</h5>
                            <ul>
                                ${activities.map(activity => `<li>${activity}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div>
                <h4>🎒 Packing Suggestions</h4>
                <p>${city.packingList.join(', ')}</p>
            </div>
        `;
    }

    getTravelStyleEmoji(style) {
        const emojiMap = {
            'adventure': '🏔️',
            'foodie': '🍜',
            'relaxation': '🏖️',
            'culture': '🏛️',
            'shopping': '🛍️'
        };
        return emojiMap[style] || '🎯';
    }

    closeModal() {
        const modal = document.getElementById('destination-modal');
        modal.classList.add('d-none');
        modal.style.display = 'none';
    }

    planTrip() {
        const modalTitle = document.getElementById('modal-title').textContent;
        const cityKey = Object.keys(citiesData).find(key => citiesData[key].name === modalTitle);
        
        if (cityKey) {
            // Store selected destination and redirect to planner
            localStorage.setItem('selectedDestination', cityKey);
            window.location.href = 'planner.html';
        }
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DestinationsPage();
});
