// Group Travel Mode - Friends List and Voting System

class GroupTravelManager {
    constructor() {
        this.friends = this.loadFriends();
        this.votes = this.loadVotes();
        this.currentGroup = this.loadCurrentGroup();
        this.init();
    }

    init() {
        this.renderFriendsList();
        this.renderVotingInterface();
        this.setupEventListeners();
        this.updateRecommendations();
    }

    // Friends Management
    addFriend(name, email) {
        const friend = {
            id: Date.now().toString(),
            name: name,
            email: email,
            avatar: this.generateAvatar(name),
            joinedAt: new Date().toISOString()
        };
        
        this.friends.push(friend);
        this.saveFriends();
        this.renderFriendsList();
        this.showNotification(`Friend ${name} added successfully!`, 'success');
    }

    removeFriend(friendId) {
        this.friends = this.friends.filter(f => f.id !== friendId);
        this.saveFriends();
        this.renderFriendsList();
        this.showNotification('Friend removed from group', 'info');
    }

    generateAvatar(name) {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
        return { initials, color };
    }

    // Voting System
    voteForSpot(friendId, spotId, vote) {
        if (!this.votes[spotId]) {
            this.votes[spotId] = {};
        }
        
        this.votes[spotId][friendId] = vote;
        this.saveVotes();
        this.updateRecommendations();
        this.renderVotingInterface();
        
        // Trigger gamification event for group voting
        document.dispatchEvent(new CustomEvent('groupVote'));
        
        const friend = this.friends.find(f => f.id === friendId);
        const voteText = vote ? 'liked' : 'disliked';
        this.showNotification(`${friend.name} ${voteText} this spot!`, 'info');
    }

    getSpotVotes(spotId) {
        if (!this.votes[spotId]) return { likes: 0, dislikes: 0, total: 0 };
        
        const votes = Object.values(this.votes[spotId]);
        const likes = votes.filter(v => v).length;
        const dislikes = votes.filter(v => !v).length;
        
        return { likes, dislikes, total: votes.length };
    }

    getSpotRecommendationScore(spotId) {
        const votes = this.getSpotVotes(spotId);
        if (votes.total === 0) return 0;
        return (votes.likes - votes.dislikes) / votes.total;
    }

    // Recommendations
    updateRecommendations() {
        const spots = this.getAllSpots();
        const recommendations = spots.map(spot => ({
            ...spot,
            score: this.getSpotRecommendationScore(spot.id),
            votes: this.getSpotVotes(spot.id)
        })).filter(spot => spot.votes.total > 0)
          .sort((a, b) => b.score - a.score);

        this.renderRecommendations(recommendations);
        this.highlightRecommendedSpots(recommendations);
    }

    getAllSpots() {
        // Get spots from current itinerary or destinations
        const spots = [];
        
        // Check if we're on itinerary page
        const itinerarySpots = document.querySelectorAll('.activity-item');
        itinerarySpots.forEach((spot, index) => {
            spots.push({
                id: `itinerary-${index}`,
                name: spot.querySelector('span')?.textContent || `Activity ${index + 1}`,
                type: 'itinerary'
            });
        });

        // Check if we're on destinations page
        const destinationSpots = document.querySelectorAll('.destination-card');
        destinationSpots.forEach((dest, index) => {
            spots.push({
                id: `destination-${index}`,
                name: dest.querySelector('.destination-name')?.textContent || `Destination ${index + 1}`,
                type: 'destination'
            });
        });

        // If no spots found on current page, use cities data
        if (spots.length === 0 && window.citiesData) {
            window.citiesData.forEach((city, index) => {
                spots.push({
                    id: `city-${index}`,
                    name: city.name,
                    type: 'destination',
                    country: city.country,
                    description: city.description
                });
            });
        }

        return spots;
    }

    highlightRecommendedSpots(recommendations) {
        // Remove existing highlights
        document.querySelectorAll('.spot-recommended').forEach(el => {
            el.classList.remove('spot-recommended');
        });

        // Highlight top recommendations
        recommendations.slice(0, 3).forEach(rec => {
            const spotElement = document.querySelector(`[data-spot-id="${rec.id}"]`);
            if (spotElement) {
                spotElement.classList.add('spot-recommended');
            }
        });
    }

    // UI Rendering
    renderFriendsList() {
        const container = document.getElementById('friends-list');
        if (!container) return;

        container.innerHTML = `
            <div class="friends-header">
                <h3>👥 Group Members (${this.friends.length})</h3>
                <button class="btn btn-primary btn-sm" onclick="groupTravel.showAddFriendModal()">
                    <i class="fas fa-plus"></i> Add Friend
                </button>
            </div>
            <div class="friends-grid">
                ${this.friends.map(friend => `
                    <div class="friend-card" data-friend-id="${friend.id}">
                        <div class="friend-avatar" style="background: ${friend.avatar.color}">
                            ${friend.avatar.initials}
                        </div>
                        <div class="friend-info">
                            <h4>${friend.name}</h4>
                            <p>${friend.email}</p>
                            <small>Joined ${new Date(friend.joinedAt).toLocaleDateString()}</small>
                        </div>
                        <button class="btn btn-outline btn-sm" onclick="groupTravel.removeFriend('${friend.id}')">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
            ${this.friends.length === 0 ? `
                <div class="empty-state">
                    <i class="fas fa-users"></i>
                    <h4>No friends added yet</h4>
                    <p>Add friends to start group voting on travel spots!</p>
                    <button class="btn btn-primary" onclick="groupTravel.showAddFriendModal()">
                        Add Your First Friend
                    </button>
                </div>
            ` : ''}
        `;
    }

    renderVotingInterface() {
        const container = document.getElementById('voting-interface');
        if (!container) return;

        const spots = this.getAllSpots();
        
        container.innerHTML = `
            <div class="voting-header">
                <h3>🗳️ Vote on Spots</h3>
                <p>Let your group decide which spots to visit!</p>
            </div>
            <div class="spots-voting-grid">
                ${spots.map(spot => {
                    const votes = this.getSpotVotes(spot.id);
                    const score = this.getSpotRecommendationScore(spot.id);
                    const voteStatus = this.getCurrentUserVote(spot.id);
                    
                    return `
                        <div class="spot-vote-card" data-spot-id="${spot.id}">
                            <div class="spot-info">
                                <h4>${spot.name}</h4>
                                <span class="spot-type">${spot.type}</span>
                            </div>
                            <div class="vote-stats">
                                <div class="vote-count">
                                    <span class="likes">👍 ${votes.likes}</span>
                                    <span class="dislikes">👎 ${votes.dislikes}</span>
                                </div>
                                <div class="vote-score ${score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral'}">
                                    ${(score * 100).toFixed(0)}% approval
                                </div>
                            </div>
                            <div class="vote-buttons">
                                <button class="btn btn-sm ${voteStatus === true ? 'btn-success' : 'btn-outline'}" 
                                        onclick="groupTravel.voteForSpot('current-user', '${spot.id}', true)">
                                    👍 Like
                                </button>
                                <button class="btn btn-sm ${voteStatus === false ? 'btn-danger' : 'btn-outline'}" 
                                        onclick="groupTravel.voteForSpot('current-user', '${spot.id}', false)">
                                    👎 Dislike
                                </button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    renderRecommendations(recommendations) {
        const container = document.getElementById('group-recommendations');
        if (!container) return;

        container.innerHTML = `
            <div class="recommendations-header">
                <h3>⭐ Group Recommendations</h3>
                <p>Top spots based on group votes</p>
            </div>
            <div class="recommendations-grid">
                ${recommendations.slice(0, 5).map((rec, index) => `
                    <div class="recommendation-card ${index < 3 ? 'top-recommendation' : ''}">
                        <div class="recommendation-rank">#${index + 1}</div>
                        <div class="recommendation-info">
                            <h4>${rec.name}</h4>
                            <div class="recommendation-stats">
                                <span class="approval-rate">${(rec.score * 100).toFixed(0)}% approval</span>
                                <span class="total-votes">${rec.votes.total} votes</span>
                            </div>
                        </div>
                        <div class="recommendation-badge">
                            ${index < 3 ? '🔥 Hot Pick' : '👍 Recommended'}
                        </div>
                    </div>
                `).join('')}
            </div>
            ${recommendations.length === 0 ? `
                <div class="empty-state">
                    <i class="fas fa-star"></i>
                    <h4>No votes yet</h4>
                    <p>Start voting on spots to see group recommendations!</p>
                </div>
            ` : ''}
        `;
    }

    // Modal Management
    showAddFriendModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add Friend to Group</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <form id="add-friend-form" class="modal-body">
                    <div class="form-group">
                        <label for="friend-name">Friend's Name</label>
                        <input type="text" id="friend-name" class="form-control" required>
                    </div>
                    <div class="form-group">
                        <label for="friend-email">Email Address</label>
                        <input type="email" id="friend-email" class="form-control" required>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="this.closest('.modal-overlay').remove()">Cancel</button>
                        <button type="submit" class="btn btn-primary">Add Friend</button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Handle form submission
        document.getElementById('add-friend-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('friend-name').value;
            const email = document.getElementById('friend-email').value;
            
            this.addFriend(name, email);
            modal.remove();
        });
    }

    // Event Listeners
    setupEventListeners() {
        // Add ripple effects to voting buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.vote-buttons .btn')) {
                AstraTripEnhancements.addRippleEffect(e);
            }
        });
    }

    // Utility Methods
    getCurrentUserVote(spotId) {
        return this.votes[spotId]?.['current-user'] || null;
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Data Persistence
    saveFriends() {
        localStorage.setItem('groupTravel_friends', JSON.stringify(this.friends));
    }

    loadFriends() {
        const saved = localStorage.getItem('groupTravel_friends');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Return sample friends for demo
        return [
            {
                id: '1',
                name: 'Sarah Johnson',
                email: 'sarah.j@email.com',
                avatar: { initials: 'SJ', color: '#667eea' },
                joinedAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: '2',
                name: 'Mike Chen',
                email: 'mike.chen@email.com',
                avatar: { initials: 'MC', color: '#764ba2' },
                joinedAt: new Date(Date.now() - 172800000).toISOString()
            },
            {
                id: '3',
                name: 'Emma Davis',
                email: 'emma.d@email.com',
                avatar: { initials: 'ED', color: '#f093fb' },
                joinedAt: new Date(Date.now() - 259200000).toISOString()
            }
        ];
    }

    saveVotes() {
        localStorage.setItem('groupTravel_votes', JSON.stringify(this.votes));
    }

    loadVotes() {
        const saved = localStorage.getItem('groupTravel_votes');
        if (saved) {
            return JSON.parse(saved);
        }
        
        // Return sample votes for demo
        return {
            'city-0': { '1': true, '2': true, '3': true, 'current-user': true },
            'city-1': { '1': true, '2': false, '3': true, 'current-user': true },
            'city-2': { '1': false, '2': true, '3': true, 'current-user': false },
            'city-3': { '1': true, '2': true, '3': false, 'current-user': true },
            'city-4': { '1': false, '2': false, '3': true, 'current-user': true },
            'city-5': { '1': true, '2': true, '3': true, 'current-user': true },
            'city-6': { '1': false, '2': true, '3': false, 'current-user': false },
            'city-7': { '1': true, '2': false, '3': true, 'current-user': true }
        };
    }

    saveCurrentGroup() {
        localStorage.setItem('groupTravel_currentGroup', JSON.stringify(this.currentGroup));
    }

    loadCurrentGroup() {
        const saved = localStorage.getItem('groupTravel_currentGroup');
        return saved ? JSON.parse(saved) : { name: 'My Travel Group', id: 'default' };
    }
}

// Initialize Group Travel Manager
let groupTravel;

document.addEventListener('DOMContentLoaded', () => {
    groupTravel = new GroupTravelManager();
    window.groupTravel = groupTravel;
});
