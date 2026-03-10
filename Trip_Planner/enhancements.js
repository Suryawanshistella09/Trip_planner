// AstraTrip Enhancements - Interactive Elements and Animations

class AstraTripEnhancements {
    constructor() {
        this.init();
    }

    init() {
        this.addScrollAnimations();
        this.addHoverEffects();
    }



    // Add scroll-triggered animations
    addScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        document.querySelectorAll('.card, .destination-card, .itinerary-day').forEach(el => {
            observer.observe(el);
        });
    }

    // Add enhanced hover effects
    addHoverEffects() {
        // Add subtle hover effects to cards
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }



    // Add confetti effect for successful actions
    static createConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }

    // Add ripple effect to buttons
    static addRippleEffect(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add progress bar to forms
    static updateProgressBar(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        const filledInputs = Array.from(inputs).filter(input => input.value.trim() !== '');
        const progress = (filledInputs.length / inputs.length) * 100;
        
        let progressBar = form.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.innerHTML = '<div class="progress-fill"></div>';
            form.insertBefore(progressBar, form.firstChild);
        }
        
        const progressFill = progressBar.querySelector('.progress-fill');
        progressFill.style.width = progress + '%';
    }

    // Add tooltip functionality
    static addTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.classList.add('tooltip');
        });
    }

    // Add custom checkbox functionality
    static initCustomCheckboxes() {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            const wrapper = document.createElement('div');
            wrapper.className = 'custom-checkbox';
            checkbox.parentNode.insertBefore(wrapper, checkbox);
            wrapper.appendChild(checkbox);
            
            checkbox.addEventListener('change', () => {
                wrapper.classList.toggle('checked', checkbox.checked);
            });
            
            wrapper.addEventListener('click', () => {
                checkbox.checked = !checkbox.checked;
                wrapper.classList.toggle('checked', checkbox.checked);
                checkbox.dispatchEvent(new Event('change'));
            });
        });
    }
}

// Add CSS for new animations
const additionalCSS = `
@keyframes confettiFall {
    to {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple 0.6s linear;
    pointer-events: none;
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.btn {
    position: relative;
    overflow: hidden;
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Initialize enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AstraTripEnhancements();
    
    // Add ripple effect to all buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', AstraTripEnhancements.addRippleEffect);
    });
    
    // Add tooltips
    AstraTripEnhancements.addTooltips();
    
    // Initialize custom checkboxes
    AstraTripEnhancements.initCustomCheckboxes();
    
    // Add progress tracking to forms
    document.querySelectorAll('form').forEach(form => {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                AstraTripEnhancements.updateProgressBar(form);
            });
        });
    });
    
    // Add confetti effect to successful form submissions
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', () => {
            setTimeout(() => {
                AstraTripEnhancements.createConfetti();
            }, 500);
        });
    });
});

// Export for use in other files
window.AstraTripEnhancements = AstraTripEnhancements;
