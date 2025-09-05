// Mobile Device Optimizations for Pro Athlete App
// Handles iOS Safari, Android Chrome, and device-specific features

class MobileOptimizer {
    constructor() {
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.isAndroid = /Android/.test(navigator.userAgent);
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        this.isChrome = /Chrome/.test(navigator.userAgent);
        this.isMobile = window.innerWidth <= 768;
        
        this.init();
    }

    init() {
        this.setupViewportFix();
        this.setupTouchOptimizations();
        this.setupIOSSpecificFixes();
        this.setupAndroidSpecificFixes();
        this.setupKeyboardHandling();
        this.setupOrientationHandling();
        this.setupPerformanceOptimizations();
        this.setupAccessibilityFeatures();
        
        // Debug info for development
        this.logDeviceInfo();
    }

    // Fix iOS Safari viewport issues
    setupViewportFix() {
        if (this.isIOS) {
            // Fix iOS Safari viewport height issue
            const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };
            
            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', () => {
                setTimeout(setVH, 500); // Delay for iOS orientation change
            });
            
            // Prevent zoom on input focus
            const inputs = document.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    if (input.style.fontSize !== '16px') {
                        input.style.fontSize = '16px';
                    }
                });
            });
        }
    }

    // Optimize touch interactions
    setupTouchOptimizations() {
        // Add touch feedback for buttons
        document.addEventListener('touchstart', (e) => {
            if (e.target.classList.contains('apple-btn') || 
                e.target.closest('.apple-btn') ||
                e.target.classList.contains('mobile-nav-item')) {
                e.target.style.transform = 'scale(0.95)';
                e.target.style.opacity = '0.8';
            }
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (e.target.classList.contains('apple-btn') || 
                e.target.closest('.apple-btn') ||
                e.target.classList.contains('mobile-nav-item')) {
                setTimeout(() => {
                    e.target.style.transform = '';
                    e.target.style.opacity = '';
                }, 150);
            }
        }, { passive: true });

        // Prevent scroll bounce on iOS
        if (this.isIOS) {
            document.addEventListener('touchmove', (e) => {
                if (e.target.closest('.no-scroll-bounce')) {
                    e.preventDefault();
                }
            }, { passive: false });
        }

        // Add swipe gestures for navigation
        this.setupSwipeGestures();
    }

    // iOS-specific optimizations
    setupIOSSpecificFixes() {
        if (!this.isIOS) return;

        // Add iOS-specific classes
        document.body.classList.add('ios-device');

        // Fix iOS Safari scroll issues
        document.body.style.webkitOverflowScrolling = 'touch';
        document.body.style.overflowScrolling = 'touch';

        // Handle iOS keyboard affecting viewport
        window.addEventListener('focusin', () => {
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 300);
        });

        // Fix iOS Safari navigation bar hiding
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 50) {
                document.body.classList.add('scrolled');
            } else {
                document.body.classList.remove('scrolled');
            }
        });

        // Add iOS status bar padding
        if (window.navigator.standalone) {
            document.body.classList.add('ios-standalone');
        }
    }

    // Android-specific optimizations
    setupAndroidSpecificFixes() {
        if (!this.isAndroid) return;

        document.body.classList.add('android-device');

        // Handle Android keyboard resize
        if (this.isChrome) {
            const initialViewportHeight = window.innerHeight;
            
            window.addEventListener('resize', () => {
                const currentHeight = window.innerHeight;
                const difference = initialViewportHeight - currentHeight;
                
                if (difference > 150) {
                    // Keyboard is likely open
                    document.body.classList.add('keyboard-open');
                } else {
                    document.body.classList.remove('keyboard-open');
                }
            });
        }

        // Optimize Android Chrome performance
        document.body.style.transform = 'translateZ(0)';
    }

    // Handle virtual keyboard
    setupKeyboardHandling() {
        const inputs = document.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                setTimeout(() => {
                    // Scroll input into view
                    const rect = input.getBoundingClientRect();
                    const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
                    
                    if (!isInView) {
                        input.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }
                }, 300); // Wait for keyboard animation
            });

            input.addEventListener('blur', () => {
                setTimeout(() => {
                    window.scrollTo(window.scrollX, window.scrollY);
                }, 100);
            });
        });
    }

    // Handle device orientation changes
    setupOrientationHandling() {
        window.addEventListener('orientationchange', () => {
            // Delay to allow for orientation change completion
            setTimeout(() => {
                // Trigger resize events
                window.dispatchEvent(new Event('resize'));
                
                // Update navigation layout
                this.updateNavigationLayout();
                
                // Refresh any video players
                this.refreshVideoPlayers();
            }, 500);
        });
    }

    // Performance optimizations
    setupPerformanceOptimizations() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Optimize scroll performance
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // Add swipe gesture support
    setupSwipeGestures() {
        let startX, startY, startTime;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            const endTime = Date.now();

            const diffX = startX - endX;
            const diffY = startY - endY;
            const diffTime = endTime - startTime;

            // Only process quick swipes
            if (diffTime > 300) return;

            // Horizontal swipe
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.handleSwipeLeft();
                } else {
                    this.handleSwipeRight();
                }
            }

            // Reset
            startX = startY = null;
        }, { passive: true });
    }

    // Handle swipe gestures
    handleSwipeLeft() {
        // Could be used for navigation
        console.log('Swipe left detected');
    }

    handleSwipeRight() {
        // Could be used for navigation  
        console.log('Swipe right detected');
    }

    // Handle scroll events
    handleScroll() {
        const scrollY = window.pageYOffset;
        
        // Update navigation transparency
        const nav = document.querySelector('.mobile-nav');
        if (nav) {
            if (scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
            }
        }

        // Hide/show elements based on scroll direction
        this.updateScrollBasedElements(scrollY);
    }

    // Update navigation layout for orientation
    updateNavigationLayout() {
        const nav = document.querySelector('.mobile-nav');
        if (nav && this.isMobile) {
            // Adjust navigation for landscape mode
            if (window.innerWidth > window.innerHeight) {
                nav.style.paddingBottom = 'calc(8px + env(safe-area-inset-bottom))';
            } else {
                nav.style.paddingBottom = 'calc(16px + env(safe-area-inset-bottom))';
            }
        }
    }

    // Refresh video players after orientation change
    refreshVideoPlayers() {
        const videoPlayers = document.querySelectorAll('video, .video-js');
        videoPlayers.forEach(player => {
            if (player.videojs) {
                player.videojs.trigger('resize');
            }
        });
    }

    // Update elements based on scroll direction
    updateScrollBasedElements(scrollY) {
        const threshold = 10;
        const currentScroll = scrollY;
        
        if (!this.lastScroll) this.lastScroll = 0;
        
        const isScrollingDown = currentScroll > this.lastScroll && currentScroll > threshold;
        const isScrollingUp = currentScroll < this.lastScroll;
        
        if (isScrollingDown) {
            document.body.classList.add('scroll-down');
            document.body.classList.remove('scroll-up');
        } else if (isScrollingUp) {
            document.body.classList.add('scroll-up');
            document.body.classList.remove('scroll-down');
        }
        
        this.lastScroll = currentScroll;
    }

    // Setup accessibility features
    setupAccessibilityFeatures() {
        // Respect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduce-motion');
        }

        // Enhance focus visibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });

        // Add screen reader improvements
        this.improveScreenReaderExperience();
    }

    // Improve screen reader experience
    improveScreenReaderExperience() {
        // Add ARIA labels to navigation items
        const navItems = document.querySelectorAll('.mobile-nav-item');
        navItems.forEach(item => {
            const text = item.querySelector('.mobile-nav-text')?.textContent;
            if (text && !item.getAttribute('aria-label')) {
                item.setAttribute('aria-label', `Navigate to ${text}`);
            }
        });

        // Add role attributes where missing
        const nav = document.querySelector('.mobile-nav');
        if (nav && !nav.getAttribute('role')) {
            nav.setAttribute('role', 'navigation');
            nav.setAttribute('aria-label', 'Main navigation');
        }
    }

    // Log device information for debugging
    logDeviceInfo() {
        if (window.location.search.includes('debug=true')) {
            console.group('🔧 Mobile Optimizer - Device Info');
            console.log('📱 Device Type:', {
                isIOS: this.isIOS,
                isAndroid: this.isAndroid,
                isSafari: this.isSafari,
                isChrome: this.isChrome,
                isMobile: this.isMobile
            });
            console.log('📐 Viewport:', {
                width: window.innerWidth,
                height: window.innerHeight,
                devicePixelRatio: window.devicePixelRatio
            });
            console.log('🌐 User Agent:', navigator.userAgent);
            console.groupEnd();
        }
    }

    // Add haptic feedback (iOS only)
    addHapticFeedback(type = 'light') {
        if (this.isIOS && window.navigator.vibrate) {
            switch (type) {
                case 'light':
                    window.navigator.vibrate(10);
                    break;
                case 'medium':
                    window.navigator.vibrate(25);
                    break;
                case 'heavy':
                    window.navigator.vibrate(50);
                    break;
            }
        }
    }

    // Public method to force refresh optimizations
    refresh() {
        this.isMobile = window.innerWidth <= 768;
        this.updateNavigationLayout();
        this.setupPerformanceOptimizations();
    }
}

// Initialize mobile optimizer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.mobileOptimizer = new MobileOptimizer();
    });
} else {
    window.mobileOptimizer = new MobileOptimizer();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MobileOptimizer;
}