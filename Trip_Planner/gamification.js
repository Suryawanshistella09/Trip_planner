// Gamification System - Travel Points, Achievements, and Badges

class GamificationManager {
    constructor() {
        this.userData = this.loadUserData();
        this.achievements = this.defineAchievements();
        this.badges = this.defineBadges();
        this.init();
    }

    init() {
        this.renderUserProfile();
        this.renderAchievements();
        this.setupEventListeners();
        this.checkForNewAchievements();
    }

    // User Data Management
    loadUserData() {
        const saved = localStorage.getItem('userGamificationData');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            points: 0,
            level: 1,
            experience: 0,
            achievements: [],
            badges: [],
            stats: {
                spotsAdded: 0,
                restaurantsAdded: 0,
                tripsPlanned: 0,
                destinationsVisited: 0,
                groupVotes: 0,
                itinerariesCreated: 0,
                packingListsCreated: 0,
                expensesTracked: 0
            },
            createdAt: new Date().toISOString()
        };
    }

    saveUserData() {
        localStorage.setItem('userGamificationData', JSON.stringify(this.userData));
    }

    // Points and Leveling System
    addPoints(amount, reason) {
        const oldLevel = this.userData.level;
        this.userData.points += amount;
        this.userData.experience += amount;
        
        // Level up calculation (100 points per level)
        const newLevel = Math.floor(this.userData.experience / 100) + 1;
        if (newLevel > oldLevel) {
            this.levelUp(newLevel);
        }
        
        this.saveUserData();
        this.showPointsNotification(amount, reason);
        this.updateUI();
    }

    levelUp(newLevel) {
        const levelRewards = {
            2: { points: 50, badge: 'rookie-explorer' },
            3: { points: 75, badge: 'adventure-seeker' },
            5: { points: 100, badge: 'travel-enthusiast' },
            10: { points: 200, badge: 'world-wanderer' },
            15: { points: 300, badge: 'travel-master' },
            20: { points: 500, badge: 'travel-legend' }
        };

        this.userData.level = newLevel;
        
        if (levelRewards[newLevel]) {
            const reward = levelRewards[newLevel];
            this.addPoints(reward.points, `Level ${newLevel} Bonus!`);
            this.unlockBadge(reward.badge);
        }

        this.showLevelUpAnimation(newLevel);
    }

    // Achievement System
    defineAchievements() {
        return {
            'first-trip': {
                id: 'first-trip',
                name: 'First Steps',
                description: 'Plan your first trip',
                icon: '🎯',
                points: 50,
                condition: (stats) => stats.tripsPlanned >= 1
            },
            'explorer': {
                id: 'explorer',
                name: 'Explorer',
                description: 'Add 5 spots to your trips',
                icon: '🗺️',
                points: 100,
                condition: (stats) => stats.spotsAdded >= 5
            },
            'foodie': {
                id: 'foodie',
                name: 'Foodie',
                description: 'Add 3 restaurants to your trips',
                icon: '🍕',
                points: 75,
                condition: (stats) => stats.restaurantsAdded >= 3
            },
            'group-traveler': {
                id: 'group-traveler',
                name: 'Group Traveler',
                description: 'Participate in group voting',
                icon: '👥',
                points: 60,
                condition: (stats) => stats.groupVotes >= 1
            },
            'itinerary-master': {
                id: 'itinerary-master',
                name: 'Itinerary Master',
                description: 'Create 3 detailed itineraries',
                icon: '📋',
                points: 150,
                condition: (stats) => stats.itinerariesCreated >= 3
            },
            'packing-pro': {
                id: 'packing-pro',
                name: 'Packing Pro',
                description: 'Create 5 packing lists',
                icon: '🧳',
                points: 80,
                condition: (stats) => stats.packingListsCreated >= 5
            },
            'budget-tracker': {
                id: 'budget-tracker',
                name: 'Budget Tracker',
                description: 'Track expenses for 3 trips',
                icon: '💰',
                points: 90,
                condition: (stats) => stats.expensesTracked >= 3
            },
            'world-explorer': {
                id: 'world-explorer',
                name: 'World Explorer',
                description: 'Visit 10 different destinations',
                icon: '🌍',
                points: 200,
                condition: (stats) => stats.destinationsVisited >= 10
            },
            'social-butterfly': {
                id: 'social-butterfly',
                name: 'Social Butterfly',
                description: 'Vote on 10 different spots in group travel',
                icon: '🦋',
                points: 120,
                condition: (stats) => stats.groupVotes >= 10
            },
            'travel-guru': {
                id: 'travel-guru',
                name: 'Travel Guru',
                description: 'Reach level 10',
                icon: '👑',
                points: 300,
                condition: (stats, level) => level >= 10
            }
        };
    }

    checkForNewAchievements() {
        const unlockedAchievements = [];
        
        Object.values(this.achievements).forEach(achievement => {
            if (!this.userData.achievements.includes(achievement.id)) {
                if (achievement.condition(this.userData.stats, this.userData.level)) {
                    this.unlockAchievement(achievement);
                    unlockedAchievements.push(achievement);
                }
            }
        });

        if (unlockedAchievements.length > 0) {
            this.showAchievementUnlockedAnimation(unlockedAchievements);
        }
    }

    unlockAchievement(achievement) {
        this.userData.achievements.push(achievement.id);
        this.addPoints(achievement.points, `Achievement: ${achievement.name}`);
        this.saveUserData();
    }

    // Badge System
    defineBadges() {
        return {
            'rookie-explorer': {
                id: 'rookie-explorer',
                name: 'Rookie Explorer',
                description: 'Reached level 2',
                icon: '🌟',
                rarity: 'common'
            },
            'adventure-seeker': {
                id: 'adventure-seeker',
                name: 'Adventure Seeker',
                description: 'Reached level 3',
                icon: '🏔️',
                rarity: 'common'
            },
            'travel-enthusiast': {
                id: 'travel-enthusiast',
                name: 'Travel Enthusiast',
                description: 'Reached level 5',
                icon: '✈️',
                rarity: 'uncommon'
            },
            'world-wanderer': {
                id: 'world-wanderer',
                name: 'World Wanderer',
                description: 'Reached level 10',
                icon: '🌍',
                rarity: 'rare'
            },
            'travel-master': {
                id: 'travel-master',
                name: 'Travel Master',
                description: 'Reached level 15',
                icon: '👑',
                rarity: 'epic'
            },
            'travel-legend': {
                id: 'travel-legend',
                name: 'Travel Legend',
                description: 'Reached level 20',
                icon: '🏆',
                rarity: 'legendary'
            }
        };
    }

    unlockBadge(badgeId) {
        if (!this.userData.badges.includes(badgeId)) {
            this.userData.badges.push(badgeId);
            this.saveUserData();
            this.showBadgeUnlockedAnimation(badgeId);
        }
    }

    // UI Rendering
    renderUserProfile() {
        const profileContainer = document.getElementById('user-profile');
        if (!profileContainer) return;

        const progressToNextLevel = (this.userData.experience % 100) / 100;
        const nextLevelExp = 100 - (this.userData.experience % 100);

        profileContainer.innerHTML = `
            <div class="user-profile-card">
                <div class="user-avatar">
                    <div class="avatar-circle">
                        <span class="avatar-level">${this.userData.level}</span>
                    </div>
                </div>
                <div class="user-info">
                    <h3 class="user-name">Travel Explorer</h3>
                    <div class="user-level">
                        <span class="level-text">Level ${this.userData.level}</span>
                        <div class="level-progress">
                            <div class="progress-bar">
                                <div class="progress-fill" style="width: ${progressToNextLevel * 100}%"></div>
                            </div>
                            <span class="progress-text">${this.userData.experience % 100}/${100} XP</span>
                        </div>
                    </div>
                    <div class="user-points">
                        <span class="points-icon">⭐</span>
                        <span class="points-text">${this.userData.points} Points</span>
                    </div>
                </div>
            </div>
        `;
    }

    renderAchievements() {
        const achievementsContainer = document.getElementById('achievements-list');
        if (!achievementsContainer) return;

        const achievementsList = Object.values(this.achievements).map(achievement => {
            const isUnlocked = this.userData.achievements.includes(achievement.id);
            const isCompleted = achievement.condition(this.userData.stats, this.userData.level);
            
            return `
                <div class="achievement-card ${isUnlocked ? 'unlocked' : isCompleted ? 'completed' : 'locked'}">
                    <div class="achievement-icon">
                        <span class="achievement-emoji">${achievement.icon}</span>
                        ${isUnlocked ? '<div class="achievement-badge">✓</div>' : ''}
                    </div>
                    <div class="achievement-info">
                        <h4 class="achievement-name">${achievement.name}</h4>
                        <p class="achievement-description">${achievement.description}</p>
                        <div class="achievement-reward">
                            <span class="reward-points">+${achievement.points} points</span>
                        </div>
                    </div>
                    <div class="achievement-status">
                        ${isUnlocked ? '<span class="status-unlocked">Unlocked!</span>' : 
                          isCompleted ? '<span class="status-completed">Ready to claim!</span>' : 
                          '<span class="status-locked">Locked</span>'}
                    </div>
                </div>
            `;
        }).join('');

        achievementsContainer.innerHTML = achievementsList;
    }

    // Event Listeners
    setupEventListeners() {
        // Listen for various user actions to award points
        document.addEventListener('spotAdded', () => {
            this.userData.stats.spotsAdded++;
            this.addPoints(10, 'Spot Added');
            this.checkForNewAchievements();
        });

        document.addEventListener('restaurantAdded', () => {
            this.userData.stats.restaurantsAdded++;
            this.addPoints(15, 'Restaurant Added');
            this.checkForNewAchievements();
        });

        document.addEventListener('tripPlanned', () => {
            this.userData.stats.tripsPlanned++;
            this.addPoints(25, 'Trip Planned');
            this.checkForNewAchievements();
        });

        document.addEventListener('groupVote', () => {
            this.userData.stats.groupVotes++;
            this.addPoints(5, 'Group Vote');
            this.checkForNewAchievements();
        });

        document.addEventListener('itineraryCreated', () => {
            this.userData.stats.itinerariesCreated++;
            this.addPoints(20, 'Itinerary Created');
            this.checkForNewAchievements();
        });

        document.addEventListener('packingListCreated', () => {
            this.userData.stats.packingListsCreated++;
            this.addPoints(15, 'Packing List Created');
            this.checkForNewAchievements();
        });

        document.addEventListener('expensesTracked', () => {
            this.userData.stats.expensesTracked++;
            this.addPoints(10, 'Expenses Tracked');
            this.checkForNewAchievements();
        });
    }

    // Animations and Notifications
    showPointsNotification(points, reason) {
        const notification = document.createElement('div');
        notification.className = 'points-notification';
        notification.innerHTML = `
            <div class="points-content">
                <span class="points-icon">⭐</span>
                <span class="points-amount">+${points}</span>
                <span class="points-reason">${reason}</span>
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

    showLevelUpAnimation(newLevel) {
        const levelUpModal = document.createElement('div');
        levelUpModal.className = 'level-up-modal';
        levelUpModal.innerHTML = `
            <div class="level-up-content">
                <div class="level-up-icon">🎉</div>
                <h2 class="level-up-title">Level Up!</h2>
                <p class="level-up-text">Congratulations! You've reached Level ${newLevel}</p>
                <div class="level-up-rewards">
                    <div class="reward-item">
                        <span class="reward-icon">⭐</span>
                        <span class="reward-text">Bonus Points!</span>
                    </div>
                </div>
                <button class="btn btn-primary level-up-close">Continue</button>
            </div>
        `;
        
        document.body.appendChild(levelUpModal);
        
        setTimeout(() => {
            levelUpModal.classList.add('show');
        }, 100);
        
        levelUpModal.querySelector('.level-up-close').addEventListener('click', () => {
            levelUpModal.classList.remove('show');
            setTimeout(() => levelUpModal.remove(), 300);
        });
    }

    showAchievementUnlockedAnimation(achievements) {
        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                const achievementModal = document.createElement('div');
                achievementModal.className = 'achievement-modal';
                achievementModal.innerHTML = `
                    <div class="achievement-content">
                        <div class="achievement-icon-large">${achievement.icon}</div>
                        <h3 class="achievement-title">Achievement Unlocked!</h3>
                        <h4 class="achievement-name">${achievement.name}</h4>
                        <p class="achievement-description">${achievement.description}</p>
                        <div class="achievement-reward">
                            <span class="reward-points">+${achievement.points} points</span>
                        </div>
                    </div>
                `;
                
                document.body.appendChild(achievementModal);
                
                setTimeout(() => {
                    achievementModal.classList.add('show');
                }, 100);
                
                setTimeout(() => {
                    achievementModal.classList.remove('show');
                    setTimeout(() => achievementModal.remove(), 300);
                }, 4000);
            }, index * 500);
        });
    }

    showBadgeUnlockedAnimation(badgeId) {
        const badge = this.badges[badgeId];
        if (!badge) return;

        const badgeModal = document.createElement('div');
        badgeModal.className = 'badge-modal';
        badgeModal.innerHTML = `
            <div class="badge-content">
                <div class="badge-icon-large">${badge.icon}</div>
                <h3 class="badge-title">New Badge!</h3>
                <h4 class="badge-name">${badge.name}</h4>
                <p class="badge-description">${badge.description}</p>
                <div class="badge-rarity ${badge.rarity}">${badge.rarity.toUpperCase()}</div>
            </div>
        `;
        
        document.body.appendChild(badgeModal);
        
        setTimeout(() => {
            badgeModal.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            badgeModal.classList.remove('show');
            setTimeout(() => badgeModal.remove(), 300);
        }, 4000);
    }

    updateUI() {
        this.renderUserProfile();
        this.renderAchievements();
    }

    // Public methods for other parts of the app
    awardPointsForAction(action, amount = 10) {
        this.addPoints(amount, action);
    }

    getCurrentLevel() {
        return this.userData.level;
    }

    getCurrentPoints() {
        return this.userData.points;
    }

    getAchievements() {
        return this.userData.achievements;
    }

    getBadges() {
        return this.userData.badges;
    }
}

// Initialize gamification system
let gamification;
document.addEventListener('DOMContentLoaded', () => {
    gamification = new GamificationManager();
    window.gamification = gamification;
});
