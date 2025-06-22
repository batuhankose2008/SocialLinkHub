// Main JavaScript for Link in Bio application

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Add click tracking for social links
    trackSocialLinks();
    
    // Add keyboard navigation support
    addKeyboardNavigation();
    
    // Add touch feedback for mobile devices
    addTouchFeedback();
    
    // Initialize intersection observer for animations
    initializeScrollAnimations();
    
    console.log('Link in Bio app initialized successfully');
}

/**
 * Track clicks on social media links for analytics
 */
function trackSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.dataset.platform;
            const linkText = this.querySelector('.link-text').textContent;
            
            // Add loading state
            this.classList.add('loading');
            
            // Log the click (in a real app, this would send to analytics)
            console.log(`Social link clicked: ${platform} - ${linkText}`);
            
            // Remove loading state after a short delay
            setTimeout(() => {
                this.classList.remove('loading');
            }, 500);
        });
    });
}

/**
 * Add keyboard navigation support for accessibility
 */
function addKeyboardNavigation() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach((link, index) => {
        link.addEventListener('keydown', function(e) {
            let nextIndex;
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    nextIndex = (index + 1) % socialLinks.length;
                    socialLinks[nextIndex].focus();
                    break;
                    
                case 'ArrowUp':
                    e.preventDefault();
                    nextIndex = (index - 1 + socialLinks.length) % socialLinks.length;
                    socialLinks[nextIndex].focus();
                    break;
                    
                case 'Home':
                    e.preventDefault();
                    socialLinks[0].focus();
                    break;
                    
                case 'End':
                    e.preventDefault();
                    socialLinks[socialLinks.length - 1].focus();
                    break;
            }
        });
    });
}

/**
 * Add touch feedback for mobile devices
 */
function addTouchFeedback() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        // Add touch start feedback
        link.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        }, { passive: true });
        
        // Reset on touch end
        link.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        }, { passive: true });
        
        // Reset on touch cancel
        link.addEventListener('touchcancel', function() {
            this.style.transform = '';
        }, { passive: true });
    });
}

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
function initializeScrollAnimations() {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
        return;
    }
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.social-link-wrapper, .profile-section, .footer');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });
}

/**
 * Utility function to copy profile URL to clipboard
 */
function copyProfileURL() {
    const url = window.location.href;
    
    if (navigator.clipboard && window.isSecureContext) {
        // Use modern clipboard API
        navigator.clipboard.writeText(url).then(() => {
            showNotification('Profile URL copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy URL:', err);
            fallbackCopyToClipboard(url);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyToClipboard(url);
    }
}

/**
 * Fallback method to copy text to clipboard
 */
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        showNotification('Profile URL copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy URL:', err);
        showNotification('Failed to copy URL. Please copy manually.');
    } finally {
        document.body.removeChild(textArea);
    }
}

/**
 * Show a temporary notification to the user
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3';
    notification.style.zIndex = '9999';
    notification.style.animation = 'fadeInUp 0.3s ease-out';
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeInUp 0.3s ease-out reverse';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Handle profile image loading errors
 */
function handleImageError() {
    const profileImage = document.querySelector('.profile-image');
    if (profileImage) {
        profileImage.addEventListener('error', function() {
            // Use a fallback avatar if the main image fails to load
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDEyMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iNjAiIGZpbGw9IiM2Nzc0ODQiLz4KPHN2ZyB4PSIzMCIgeT0iMzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CjxwYXRoIGQ9Im0yMCAxNi0yLTJhNC00IDAgMCAwLTYgMGwtMiAyIi8+CjxjaXJjbGUgY3g9IjEyIiBjeT0iNyIgcj0iNCIvPgo8L3N2Zz4KPC9zdmc+';
            this.alt = 'Default Profile Picture';
        });
    }
}

// Initialize image error handling when DOM is loaded
document.addEventListener('DOMContentLoaded', handleImageError);

// Add service worker registration for potential PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Note: Service worker would be implemented separately if needed
        console.log('Service Worker support detected');
    });
}
