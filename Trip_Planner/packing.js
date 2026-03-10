// Packing List Page JavaScript

class PackingListManager {
    constructor() {
        this.packingList = {};
        this.savedTrips = [];
        this.currentTrip = null;
        this.init();
    }

    init() {
        this.loadSavedTrips();
        this.setupEventListeners();
        this.populateTripSelector();
        this.initializePackingCategories();
    }

    setupEventListeners() {
        // Generate packing list button
        document.getElementById('generate-packing-list').addEventListener('click', () => this.generatePackingList());
        
        // Add item buttons
        document.getElementById('add-essential-btn').addEventListener('click', () => this.addItem('essential'));
        document.getElementById('add-clothing-btn').addEventListener('click', () => this.addItem('clothing'));
        document.getElementById('add-electronics-btn').addEventListener('click', () => this.addItem('electronics'));
        document.getElementById('add-toiletries-btn').addEventListener('click', () => this.addItem('toiletries'));
        
        // Custom category buttons
        document.getElementById('add-custom-category').addEventListener('click', () => this.createCustomCategory());
        document.getElementById('add-custom-item').addEventListener('click', () => this.addCustomItem());
        
        // Action buttons
        document.getElementById('check-all').addEventListener('click', () => this.checkAllItems());
        document.getElementById('uncheck-all').addEventListener('click', () => this.uncheckAllItems());
        document.getElementById('clear-list').addEventListener('click', () => this.clearList());
        document.getElementById('export-packing').addEventListener('click', () => this.exportList());
        document.getElementById('print-packing').addEventListener('click', () => this.printList());
        document.getElementById('share-packing').addEventListener('click', () => this.shareList());
        
        // Trip selector change
        document.getElementById('trip-selector').addEventListener('change', () => this.onTripChange());
        document.getElementById('travel-style').addEventListener('change', () => this.onTravelStyleChange());
    }

    loadSavedTrips() {
        this.savedTrips = JSON.parse(localStorage.getItem('astratrip-trips') || '[]');
    }

    populateTripSelector() {
        const tripSelector = document.getElementById('trip-selector');
        
        // Clear existing options
        tripSelector.innerHTML = '<option value="">Select a trip...</option>';
        
        this.savedTrips.forEach(trip => {
            const option = document.createElement('option');
            option.value = trip.tripName;
            option.textContent = trip.tripName;
            tripSelector.appendChild(option);
        });
    }

    initializePackingCategories() {
        this.packingList = {
            essential: [],
            clothing: [],
            electronics: [],
            toiletries: [],
            custom: {}
        };
    }

    onTripChange() {
        const selectedTrip = document.getElementById('trip-selector').value;
        if (selectedTrip) {
            this.currentTrip = this.savedTrips.find(trip => trip.tripName === selectedTrip);
            if (this.currentTrip) {
                document.getElementById('travel-style').value = this.currentTrip.preferences;
                this.loadPackingList();
            }
        }
    }

    onTravelStyleChange() {
        if (this.currentTrip) {
            this.generatePackingList();
        }
    }

    generatePackingList() {
        const travelStyle = document.getElementById('travel-style').value;
        
        if (!travelStyle) {
            this.showMessage('Please select a travel style', 'error');
            return;
        }

        // Clear existing lists
        this.clearAllLists();

        // Add template items based on travel style
        if (packingTemplates[travelStyle]) {
            this.packingList.essential = packingTemplates[travelStyle].map(item => ({
                name: item,
                checked: false,
                category: 'essential'
            }));
        }

        // Add destination-specific items if trip is selected
        if (this.currentTrip && citiesData[this.currentTrip.destination]) {
            const city = citiesData[this.currentTrip.destination];
            this.packingList.essential = [
                ...this.packingList.essential,
                ...city.packingList.map(item => ({
                    name: item,
                    checked: false,
                    category: 'essential'
                }))
            ];
        }

        // Add common items
        this.addCommonItems();

        this.displayPackingLists();
        
        // Trigger gamification event for packing list creation
        document.dispatchEvent(new CustomEvent('packingListCreated'));
        
        this.showMessage('Packing list generated successfully!', 'success');
    }

    addCommonItems() {
        // Common clothing items
        this.packingList.clothing = [
            'Underwear', 'Socks', 'Pajamas', 'Swimwear', 'Formal outfit',
            'Casual outfits', 'Jacket/Sweater', 'Comfortable shoes', 'Flip flops'
        ].map(item => ({
            name: item,
            checked: false,
            category: 'clothing'
        }));

        // Common electronics
        this.packingList.electronics = [
            'Phone charger', 'Power bank', 'Travel adapter', 'Camera',
            'Laptop/Tablet', 'Headphones', 'Portable speaker'
        ].map(item => ({
            name: item,
            checked: false,
            category: 'electronics'
        }));

        // Common toiletries
        this.packingList.toiletries = [
            'Toothbrush', 'Toothpaste', 'Shampoo', 'Conditioner', 'Soap',
            'Deodorant', 'Hair brush', 'Razor', 'Shaving cream', 'Feminine products'
        ].map(item => ({
            name: item,
            checked: false,
            category: 'toiletries'
        }));
    }

    displayPackingLists() {
        this.displayCategoryList('essential', 'essential-items');
        this.displayCategoryList('clothing', 'clothing-items');
        this.displayCategoryList('electronics', 'electronics-items');
        this.displayCategoryList('toiletries', 'toiletries-items');
        this.displayCustomCategories();
    }

    displayCategoryList(category, containerId) {
        const container = document.getElementById(containerId);
        const items = this.packingList[category] || [];
        
        if (items.length === 0) {
            container.innerHTML = '<p class="text-center text-muted">No items in this category</p>';
            return;
        }

        container.innerHTML = items.map((item, index) => `
            <div class="packing-item">
                <label class="d-flex align-center">
                    <input type="checkbox" ${item.checked ? 'checked' : ''} 
                           onchange="packingManager.toggleItem('${category}', ${index})">
                    <span class="ml-2">${item.name}</span>
                </label>
                <button class="remove-btn" onclick="packingManager.removeItem('${category}', ${index})">×</button>
            </div>
        `).join('');
    }

    displayCustomCategories() {
        const customContainer = document.getElementById('custom-categories');
        if (!customContainer) return;

        const customCategories = Object.keys(this.packingList.custom);
        
        if (customCategories.length === 0) {
            customContainer.innerHTML = '<p class="text-center text-muted">No custom categories</p>';
            return;
        }

        customContainer.innerHTML = customCategories.map(category => `
            <div class="card mb-2">
                <div class="card-header">
                    <h5>${category}</h5>
                </div>
                <div class="card-body">
                    ${this.packingList.custom[category].map((item, index) => `
                        <div class="packing-item">
                            <label class="d-flex align-center">
                                <input type="checkbox" ${item.checked ? 'checked' : ''} 
                                       onchange="packingManager.toggleCustomItem('${category}', ${index})">
                                <span class="ml-2">${item.name}</span>
                            </label>
                            <button class="remove-btn" onclick="packingManager.removeCustomItem('${category}', ${index})">×</button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    addItem(category) {
        const inputId = `add-${category}`;
        const input = document.getElementById(inputId);
        const itemName = input.value.trim();
        
        if (!itemName) {
            this.showMessage('Please enter an item name', 'error');
            return;
        }

        if (!this.packingList[category]) {
            this.packingList[category] = [];
        }

        this.packingList[category].push({
            name: itemName,
            checked: false,
            category: category
        });

        input.value = '';
        this.displayCategoryList(category, `${category}-items`);
        this.showMessage(`Item added to ${category}`, 'success');
    }

    createCustomCategory() {
        const categoryName = document.getElementById('custom-category').value.trim();
        
        if (!categoryName) {
            this.showMessage('Please enter a category name', 'error');
            return;
        }

        if (this.packingList.custom[categoryName]) {
            this.showMessage('Category already exists', 'error');
            return;
        }

        this.packingList.custom[categoryName] = [];
        document.getElementById('custom-category').value = '';
        this.displayCustomCategories();
        this.showMessage(`Custom category '${categoryName}' created`, 'success');
    }

    addCustomItem() {
        const categoryName = document.getElementById('custom-category').value.trim();
        const itemName = document.getElementById('custom-item').value.trim();
        
        if (!categoryName || !itemName) {
            this.showMessage('Please enter both category and item names', 'error');
            return;
        }

        if (!this.packingList.custom[categoryName]) {
            this.packingList.custom[categoryName] = [];
        }

        this.packingList.custom[categoryName].push({
            name: itemName,
            checked: false,
            category: 'custom'
        });

        document.getElementById('custom-item').value = '';
        this.displayCustomCategories();
        this.showMessage(`Item added to ${categoryName}`, 'success');
    }

    toggleItem(category, index) {
        if (this.packingList[category] && this.packingList[category][index]) {
            this.packingList[category][index].checked = !this.packingList[category][index].checked;
        }
    }

    toggleCustomItem(category, index) {
        if (this.packingList.custom[category] && this.packingList.custom[category][index]) {
            this.packingList.custom[category][index].checked = !this.packingList.custom[category][index].checked;
        }
    }

    removeItem(category, index) {
        if (this.packingList[category] && this.packingList[category][index]) {
            this.packingList[category].splice(index, 1);
            this.displayCategoryList(category, `${category}-items`);
        }
    }

    removeCustomItem(category, index) {
        if (this.packingList.custom[category] && this.packingList.custom[category][index]) {
            this.packingList.custom[category].splice(index, 1);
            this.displayCustomCategories();
        }
    }

    checkAllItems() {
        Object.keys(this.packingList).forEach(category => {
            if (Array.isArray(this.packingList[category])) {
                this.packingList[category].forEach(item => item.checked = true);
            } else if (typeof this.packingList[category] === 'object') {
                Object.keys(this.packingList[category]).forEach(subCategory => {
                    this.packingList[category][subCategory].forEach(item => item.checked = true);
                });
            }
        });
        this.displayPackingLists();
    }

    uncheckAllItems() {
        Object.keys(this.packingList).forEach(category => {
            if (Array.isArray(this.packingList[category])) {
                this.packingList[category].forEach(item => item.checked = false);
            } else if (typeof this.packingList[category] === 'object') {
                Object.keys(this.packingList[category]).forEach(subCategory => {
                    this.packingList[category][subCategory].forEach(item => item.checked = false);
                });
            }
        });
        this.displayPackingLists();
    }

    clearList() {
        if (confirm('Are you sure you want to clear all packing lists? This action cannot be undone.')) {
            this.initializePackingCategories();
            this.displayPackingLists();
            this.showMessage('All packing lists cleared', 'success');
        }
    }

    clearAllLists() {
        Object.keys(this.packingList).forEach(category => {
            if (Array.isArray(this.packingList[category])) {
                this.packingList[category] = [];
            } else if (typeof this.packingList[category] === 'object') {
                this.packingList[category] = {};
            }
        });
    }

    loadPackingList() {
        // Load saved packing list for the current trip
        const savedList = localStorage.getItem(`astratrip-packing-${this.currentTrip.tripName}`);
        if (savedList) {
            this.packingList = JSON.parse(savedList);
            this.displayPackingLists();
        }
    }

    savePackingList() {
        if (this.currentTrip) {
            localStorage.setItem(`astratrip-packing-${this.currentTrip.tripName}`, JSON.stringify(this.packingList));
        }
    }

    exportList() {
        const data = {
            trip: this.currentTrip?.tripName || 'General',
            packingList: this.packingList,
            exportDate: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `astratrip-packing-${data.trip.replace(/\s+/g, '-')}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showMessage('Packing list exported successfully!', 'success');
    }

    printList() {
        const printWindow = window.open('', '_blank');
        const printContent = this.generatePrintContent();
        
        printWindow.document.write(`
            <html>
                <head>
                    <title>Packing List - ${this.currentTrip?.tripName || 'General'}</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .category { margin-bottom: 20px; }
                        .category h3 { color: #2c3e50; border-bottom: 2px solid #3498db; }
                        .item { margin: 5px 0; }
                        .checked { text-decoration: line-through; color: #7f8c8d; }
                    </style>
                </head>
                <body>
                    <h1>Packing List - ${this.currentTrip?.tripName || 'General'}</h1>
                    ${printContent}
                </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }

    generatePrintContent() {
        let content = '';
        
        Object.keys(this.packingList).forEach(category => {
            if (Array.isArray(this.packingList[category]) && this.packingList[category].length > 0) {
                content += `
                    <div class="category">
                        <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        ${this.packingList[category].map(item => `
                            <div class="item">
                                ☐ ${item.name}
                            </div>
                        `).join('')}
                    </div>
                `;
            } else if (typeof this.packingList[category] === 'object') {
                Object.keys(this.packingList[category]).forEach(subCategory => {
                    if (this.packingList[category][subCategory].length > 0) {
                        content += `
                            <div class="category">
                                <h3>${subCategory}</h3>
                                ${this.packingList[category][subCategory].map(item => `
                                    <div class="item">
                                        ☐ ${item.name}
                                    </div>
                                `).join('')}
                            </div>
                        `;
                    }
                });
            }
        });
        
        return content;
    }

    shareList() {
        // For now, just show a message
        this.showMessage('Share functionality coming soon!', 'success');
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

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.packingManager = new PackingListManager();
});
