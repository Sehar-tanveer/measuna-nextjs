// Custom Video Controls - Initialize after loader completes
function initializeVideoControls() {
    console.log('Initializing video controls...');
    
    const video = document.getElementById('introVideo');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const volumeIndicator = document.getElementById('volumeIndicator');
    const progressFill = document.getElementById('progressFill');
    
    console.log('Video elements found:', {
        video: !!video,
        fullscreenBtn: !!fullscreenBtn,
        volumeIndicator: !!volumeIndicator,
        progressFill: !!progressFill
    });
    
    if (video && fullscreenBtn && volumeIndicator && progressFill) {
        let isMuted = true;
        
        // Video click functionality to toggle mute
        video.addEventListener('click', function(e) {
            console.log('Video clicked, current mute state:', isMuted);
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle mute state
            isMuted = !isMuted;
            video.muted = isMuted;
            
            // Update volume indicator icon
            const volumeIcon = volumeIndicator.querySelector('svg');
            if (volumeIcon) {
                if (isMuted) {
                    // Show muted icon (speaker with slash)
                    volumeIcon.innerHTML = `
                        <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" stroke-width="2" fill="none"/>
                        <path d="M19.07 4.93L4.93 19.07" stroke="white" stroke-width="2"/>
                    `;
                } else {
                    // Show unmuted icon (speaker with sound waves)
                    volumeIcon.innerHTML = `
                        <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" stroke-width="2" fill="none"/>
                        <path d="M15.54 8.46L19.07 12L15.54 15.54" stroke="white" stroke-width="2"/>
                    `;
                }
            }
            
            // Keep indicator visible
            volumeIndicator.style.display = 'block';
            volumeIndicator.style.visibility = 'visible';
            volumeIndicator.style.opacity = '0.8';
            
            console.log('Video mute toggled to:', isMuted);
        });
        
        // Fullscreen functionality
        fullscreenBtn.addEventListener('click', function(e) {
            console.log('Fullscreen button clicked');
            e.preventDefault();
            e.stopPropagation();
            
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }
        });
        
        // Progress bar functionality
        function updateProgress() {
            if (video.duration) {
                const progress = (video.currentTime / video.duration) * 100;
                progressFill.style.width = progress + '%';
            }
        }
        
        // Update progress bar
        video.addEventListener('timeupdate', updateProgress);
        video.addEventListener('loadedmetadata', updateProgress);
        
        // Controls now show/hide on CSS hover
        
        // Initially show volume indicator with muted icon since video starts muted
        volumeIndicator.style.display = 'block';
        volumeIndicator.style.visibility = 'visible';
        volumeIndicator.style.opacity = '0.8';
        
        // Ensure initial muted icon is correct
        const volumeIcon = volumeIndicator.querySelector('svg');
        if (volumeIcon) {
            volumeIcon.innerHTML = `
                <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" stroke-width="2" fill="none"/>
                <path d="M19.07 4.93L4.93 19.07" stroke="white" stroke-width="2"/>
            `;
        }
        
        // Ensure video is ready
        video.addEventListener('canplay', function() {
            updateProgress();
        });
        
        console.log('Video controls initialized successfully');
    } else {
        console.error('Video controls initialization failed - missing elements:', {
            video: !!video,
            fullscreenBtn: !!fullscreenBtn,
            volumeIndicator: !!volumeIndicator,
            progressFill: !!progressFill
        });
    }
}

// Mea Suna Madeira Page Loader - Exact Recreation
class MeaSunaLoader {
    constructor() {
        this.loader = document.getElementById('pageLoader');
        this.mainContent = document.getElementById('mainContent');
        this.progressLine = document.querySelector('.progress-line');
        this.percentageElement = document.getElementById('percentage');
        this.cornerImages = document.querySelectorAll('.corner-image');
        this.loaderInner = document.querySelector('.loader-inner');
        
        this.loadingDuration = 6000; // 6 seconds (faster like reference)
        this.progressInterval = null;
        this.currentProgress = 0;
        this.imagesAnimated = false;
        
        this.init();
    }

    init() {
        this.startLoading();
        this.bindEvents();
    }

    startLoading() {
        // Start the loading animation immediately
        this.animateProgress();
        this.animateImages();
    }

    animateProgress() {
        const targetProgress = 100;
        const increment = 1;
        const interval = this.loadingDuration / (targetProgress / increment);
        
        this.progressInterval = setInterval(() => {
            this.currentProgress += increment;
            
            if (this.currentProgress >= targetProgress) {
                this.currentProgress = targetProgress;
                clearInterval(this.progressInterval);
                this.completeLoading();
            }
            
            this.updateProgress();
        }, interval);
    }

    updateProgress() {
        // Update progress line (bottom to top)
        const progressHeight = (this.currentProgress / 100) * 100;
        this.progressLine.style.transform = `translateX(-50%) scaleY(${progressHeight / 100})`;
        
        // Update percentage counter
        this.percentageElement.textContent = `${Math.round(this.currentProgress)}%`;
        
        // Animate percentage counter position (bottom to top) - follows progress line with spacing
        const containerHeight = this.loaderInner.offsetHeight;
        const navbarHeight = 72; // Height of the navbar
        const availableHeight = containerHeight - navbarHeight;
        const spacing = 20; // Space between progress line and counter
        const percentagePosition = (this.currentProgress / 100) * availableHeight + spacing;
        this.percentageElement.parentElement.style.bottom = `${percentagePosition}px`;
        
        // Trigger image animation when progress reaches certain points
        if (this.currentProgress >= 30 && !this.imagesAnimated) {
            this.animateImagesToCenter();
            this.imagesAnimated = true;
        }
    }

    animateImages() {
        // Images are now static and visible at start - no fade-in animation needed
        // Images will animate to center sequentially when triggered
    }

    animateImagesToCenter() {
        // Sequential animation: images move to center one by one with overlapping effect
        const animationSequence = [
            { selector: '.corner-image.top-left', delay: 0 },
            { selector: '.corner-image.bottom-right', delay: 300 },
            { selector: '.corner-image.top-right', delay: 600 },
            { selector: '.corner-image.bottom-left', delay: 900 }
        ];

        animationSequence.forEach(({ selector, delay }) => {
            setTimeout(() => {
                const image = document.querySelector(selector);
                if (image) {
                    image.classList.add('animate-to-center');
                }
            }, delay);
        });

        // Nothing else; navbar logo remains visible at top
    }

    completeLoading() {
        // Add a small delay before showing content
        setTimeout(() => {
            this.hideLoader();
            this.showMainContent();
            // Initialize video controls after main content is shown
            setTimeout(() => {
                initializeVideoControls();
                // Also initialize features background
                initializeFeaturesBackground();
                // Initialize horizontal slider after content is visible
                if (typeof initializeHorizontalSlider === 'function') {
                    initializeHorizontalSlider();
                    ScrollTrigger.refresh();
                }
                // Initialize gallery sliders
                if (typeof initializeGallerySliders === 'function') {
                    initializeGallerySliders();
                }
            }, 100);
        }, 500);
    }

    hideLoader() {
        this.loader.classList.add('fade-out');
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            this.loader.style.display = 'none';
        }, 800);
    }

    showMainContent() {
        this.mainContent.classList.remove('hidden');
        
        // Add loaded class for fade-in animation
        setTimeout(() => {
            this.mainContent.classList.add('loaded');
        }, 100);
        
        // Initialize main content interactions
        this.initializeMainContent();
    }

    initializeMainContent() {
        // Add scroll functionality
        this.addScrollEffects();
        
        // Add video autoplay
        this.initializeVideo();
        
        // Add smooth scrolling
        this.addSmoothScrolling();
    }

    addScrollEffects() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                this.scrollToContent();
            });
        }
    }

    scrollToContent() {
        const introSection = document.querySelector('.intro-section');
        if (introSection) {
            introSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    initializeVideo() {
        const video = document.querySelector('video');
        if (video) {
            // Ensure video plays when content is loaded
            video.play().catch(e => {
                console.log('Video autoplay prevented:', e);
            });
        }
    }

    addSmoothScrolling() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    bindEvents() {
        // Handle window load event
        window.addEventListener('load', () => {
            // Ensure loading completes even if resources load quickly
            if (this.currentProgress < 100) {
                this.currentProgress = 100;
                this.updateProgress();
                this.completeLoading();
            }
        });

        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                // Pause animations when page is hidden
                this.pauseAnimations();
            } else {
                // Resume animations when page is visible
                this.resumeAnimations();
            }
        });

        // Handle resize events
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    pauseAnimations() {
        // Pause CSS animations
        this.cornerImages.forEach(image => {
            image.style.animationPlayState = 'paused';
        });
    }

    resumeAnimations() {
        // Resume CSS animations
        this.cornerImages.forEach(image => {
            image.style.animationPlayState = 'running';
        });
    }

    handleResize() {
        // Handle responsive adjustments
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Adjust for mobile
            this.adjustForMobile();
        } else {
            // Adjust for desktop
            this.adjustForDesktop();
        }
    }

    adjustForMobile() {
        // Mobile-specific adjustments
        const brandText = document.querySelector('.brand-text');
        if (brandText) {
            brandText.style.fontSize = '2.5rem';
        }
    }

    adjustForDesktop() {
        // Desktop-specific adjustments
        const brandText = document.querySelector('.brand-text');
        if (brandText) {
            brandText.style.fontSize = '4rem';
        }
    }

    // Public methods for external control
    showLoader() {
        this.loader.style.display = 'flex';
        this.mainContent.classList.add('hidden');
        this.currentProgress = 0;
        this.imagesAnimated = false;
        this.startLoading();
    }

    hideLoader() {
        this.loader.classList.add('fade-out');
        setTimeout(() => {
            this.loader.style.display = 'none';
        }, 800);
    }

    getProgress() {
        return this.currentProgress;
    }

    isComplete() {
        return this.currentProgress >= 100;
    }
}

// Initialize the page loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing loader...');
    window.meaSunaLoader = new MeaSunaLoader();
    console.log('Loader initialized:', window.meaSunaLoader);
    
    // Initialize navbar functionality
    initializeNavbar();
});

// Navbar functionality
function initializeNavbar() {
    const navbar = document.querySelector('.main-navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const sideMenu = document.querySelector('.side-menu');
    const sideMenuClose = document.querySelector('.side-menu-close');
    const sideMenuInquireBtn = document.querySelector('.side-menu-inquire-btn');
    const menuLinks = document.querySelectorAll('.menu-links a');
    const inquiryBtn = document.querySelector('.inquiry-btn');
    
    // Navbar scroll effect - keep transparent
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'transparent';
        } else {
            navbar.style.background = 'transparent';
        }
    });
    
    // Side menu toggle
    if (navbarToggle && sideMenu) {
        navbarToggle.addEventListener('click', () => {
            sideMenu.classList.add('active');
            
            // Animate the divider after a short delay
            setTimeout(() => {
                const divider = document.querySelector('.menu-divider');
                if (divider) {
                    divider.classList.add('animate');
                }
            }, 200);
        });
    }

    // Close side menu
    if (sideMenuClose && sideMenu) {
        sideMenuClose.addEventListener('click', () => {
            // Animate divider closing from bottom to top
            const divider = document.querySelector('.menu-divider');
            if (divider) {
                divider.classList.remove('animate');
                divider.classList.add('closing');
                
                // Remove closing class after animation completes
                setTimeout(() => {
                    divider.classList.remove('closing');
                }, 600);
            }
            
            sideMenu.classList.remove('active');
        });
    }

    // Close side menu when clicking outside
    document.addEventListener('click', (e) => {
        if (sideMenu && sideMenu.classList.contains('active')) {
            if (!sideMenu.contains(e.target) && !navbarToggle.contains(e.target)) {
                // Animate divider closing from bottom to top
                const divider = document.querySelector('.menu-divider');
                if (divider) {
                    divider.classList.remove('animate');
                    divider.classList.add('closing');
                    
                    // Remove closing class after animation completes
                    setTimeout(() => {
                        divider.classList.remove('closing');
                    }, 600);
                }
                
                sideMenu.classList.remove('active');
            }
        }
    });

    // Close side menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sideMenu && sideMenu.classList.contains('active')) {
            // Animate divider closing from bottom to top
            const divider = document.querySelector('.menu-divider');
            if (divider) {
                divider.classList.remove('animate');
                divider.classList.add('closing');
                
                // Remove closing class after animation completes
                setTimeout(() => {
                    divider.classList.remove('closing');
                }, 600);
            }
            
            sideMenu.classList.remove('active');
        }
    });
    
    // Smooth scrolling for menu links
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close side menu
            if (sideMenu.classList.contains('active')) {
                sideMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });

        // Handle hover to disable other links
        link.addEventListener('mouseenter', () => {
            // Disable all other links
            menuLinks.forEach(otherLink => {
                if (otherLink !== link) {
                    otherLink.classList.add('disabled');
                }
            });
        });

        link.addEventListener('mouseleave', () => {
            // Re-enable all links
            menuLinks.forEach(otherLink => {
                otherLink.classList.remove('disabled');
            });
        });
    });

    // Inquiry button click handler
    if (inquiryBtn) {
        inquiryBtn.addEventListener('click', () => {
            console.log('Inquiry button clicked');
        });
    }

    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            // Scroll to the next section (main content)
            const mainContent = document.querySelector('main');
            if (mainContent) {
                mainContent.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Hero divider animation - simplified approach
    const heroDivider = document.querySelector('.hero-divider');
    if (heroDivider) {
        console.log('Hero divider found, setting up animation...');
        
        // Simple timeout approach - animate after 7 seconds
        setTimeout(() => {
            console.log('Animating hero divider');
            heroDivider.classList.add('animate');
        }, 7000);
    } else {
        console.log('Hero divider not found!');
    }


    // Side menu inquire button click handler
    if (sideMenuInquireBtn) {
        sideMenuInquireBtn.addEventListener('click', () => {
            console.log('Side menu inquiry button clicked');
            // Close the side menu after clicking
            if (sideMenu.classList.contains('active')) {
                sideMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

// Video container zoom effect on scroll
const introVideoContainer = document.querySelector('.intro-video');
if (introVideoContainer) {
    let ticking = false;
    let lastScrollTop = 0;
    
    function updateVideoZoom() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        const videoRect = introVideoContainer.getBoundingClientRect();
        const videoTop = videoRect.top + scrollTop;
        const videoHeight = videoRect.height;
        
        // Calculate scroll progress through the video
        const scrollProgress = Math.max(0, Math.min(1, (scrollTop - videoTop + windowHeight) / (videoHeight + windowHeight)));
        
        // Determine scroll direction
        const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
        lastScrollTop = scrollTop;
        
        // Apply zoom effect based on scroll direction
        let scale;
        if (scrollDirection === 'down') {
            // Zoom in when scrolling down (scale from 1.0 to 1.2)
            scale = 1.0 + (scrollProgress * 0.2);
        } else {
            // Zoom out when scrolling up (scale from 1.2 to 1.0)
            scale = 1.2 - (scrollProgress * 0.2);
        }
        
        introVideoContainer.style.transform = `scale(${scale})`;
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateVideoZoom);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Add some additional utility functions
const LoaderUtils = {
    // Create a custom loading message
    setLoadingMessage(message) {
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) {
            loadingText.innerHTML = `<span>${message}</span><span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>`;
        }
    },

    // Add a loading step
    addLoadingStep(stepName) {
        console.log(`Loading: ${stepName}`);
    },

    // Simulate network delay
    simulateNetworkDelay(delay = 1000) {
        return new Promise(resolve => {
            setTimeout(resolve, delay);
        });
    },

    // Check if page is fully loaded
    isPageLoaded() {
        return document.readyState === 'complete';
    }
    }
};

// Export for external use
window.LoaderUtils = LoaderUtils;

// Fallback initialization for video controls
document.addEventListener('DOMContentLoaded', function() {
    // Try to initialize video controls after a delay
    setTimeout(() => {
        if (document.getElementById('introVideo')) {
            initializeVideoControls();
        }
    }, 2000);
});

// Features section background image functionality
function initializeFeaturesBackground() {
    console.log('Initializing features background functionality...');
    
    const featureCards = document.querySelectorAll('.feature-card');
    const featuresBackground = document.querySelector('.features-background');
    
    console.log('Found elements:', {
        featureCards: featureCards.length,
        featuresBackground: !!featuresBackground
    });
    
    if (featureCards.length > 0 && featuresBackground) {
        // Set default background (privacy)
        featuresBackground.classList.add('privacy-bg');
        console.log('Set default privacy background');
        
        featureCards.forEach((card, index) => {
            const bgType = card.getAttribute('data-bg');
            console.log(`Card ${index + 1} has bg type:`, bgType);
            
            card.addEventListener('mouseenter', function() {
                console.log('Hovering over card with bg type:', bgType);
                
                // Remove all background classes
                featuresBackground.classList.remove('privacy-bg', 'panoramic-bg', 'amenities-bg');
                
                // Add the appropriate background class
                if (bgType === 'privacy') {
                    featuresBackground.classList.add('privacy-bg');
                    console.log('Applied privacy background');
                } else if (bgType === 'panoramic') {
                    featuresBackground.classList.add('panoramic-bg');
                    console.log('Applied panoramic background');
                } else if (bgType === 'amenities') {
                    featuresBackground.classList.add('amenities-bg');
                    console.log('Applied amenities background');
                }
            });
        });
        
        // Reset to default background when mouse leaves the section
        const featuresSection = document.querySelector('.features-section');
        if (featuresSection) {
            featuresSection.addEventListener('mouseleave', function() {
                console.log('Mouse left features section, resetting to privacy background');
                featuresBackground.classList.remove('privacy-bg', 'panoramic-bg', 'amenities-bg');
                featuresBackground.classList.add('privacy-bg');
            });
        }
        
        console.log('Features background functionality initialized successfully');
    } else {
        console.error('Features background initialization failed - missing elements');
    }
}

// Initialize features background after loader completes
document.addEventListener('DOMContentLoaded', function() {
    // Try to initialize features background after a delay
    setTimeout(() => {
        initializeFeaturesBackground();
    }, 3000);
});

// Home Tour Horizontal Scroll with GSAP
function initializeHorizontalSlider() {
    if (!window.gsap || !window.ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    const horizontalSection = document.querySelector('.horizontal-section');
    const horizontalWrapper = document.querySelector('.horizontal-wrapper');
    const slides = gsap.utils.toArray('.slide');
    if (!horizontalSection || !horizontalWrapper || slides.length === 0) return;

    // Kill existing triggers related to this section
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.set(horizontalWrapper, { clearProps: 'all', x: 0 });

    // Ensure wrapper width is exact (slides * viewport)
    const totalSlides = slides.length;
    horizontalWrapper.style.width = `${totalSlides * 100}vw`;

    // Force layout to get correct scrollWidth
    const totalScrollDistance = horizontalWrapper.scrollWidth - window.innerWidth;
    if (totalScrollDistance <= 0) return;

    const tween = gsap.to(horizontalWrapper, {
        x: -totalScrollDistance,
        ease: 'none'
    });

    ScrollTrigger.create({
        animation: tween,
        trigger: horizontalSection,
        start: 'top top',
        end: () => `+=${totalScrollDistance}`,
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: totalSlides > 1 ? {
            snapTo: 1 / (totalSlides - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: 'power1.inOut'
        } : false,
        onEnter: () => gsap.set(horizontalWrapper, { x: 0 }),
        onLeaveBack: () => gsap.set(horizontalWrapper, { x: 0 }),
        onLeave: () => {
            // Smoothly move to the next vertical section when horizontal completes
            const next = horizontalSection.nextElementSibling;
            if (next && typeof next.scrollIntoView === 'function') {
                next.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });

    // Animate section CTA rings left-to-right with horizontal scroll
    const overlay = document.querySelector('.slide-overlay-cta');
    const ringsEl = overlay ? overlay.querySelector('.cta-rings') : null;
    if (overlay && ringsEl) {
        const padding = 80; // keep some side padding
        const computeTravel = () => {
            const sectionWidth = horizontalSection.clientWidth;
            const ctaWidth = ringsEl.offsetWidth || 160;
            return Math.max(0, sectionWidth - ctaWidth - padding * 2);
        };

        let travel = computeTravel();
        gsap.set(overlay, { x: -travel / 2 });

        gsap.to(overlay, {
            x: () => (travel / 2),
            ease: 'none',
            scrollTrigger: {
                trigger: horizontalSection,
                start: 'top top',
                end: () => `+=${totalScrollDistance}`,
                scrub: 0.7,
                invalidateOnRefresh: true,
                onRefresh: () => {
                    travel = computeTravel();
                    gsap.set(overlay, { x: -travel / 2 });
                }
            }
        });
    }

    // Debounced resize
    let rTimer;
    window.addEventListener('resize', () => {
        clearTimeout(rTimer);
        rTimer = setTimeout(() => {
            initializeHorizontalSlider();
            ScrollTrigger.refresh();
        }, 120);
    }, { once: true });
}

// Gallery Card Image Slider
function initializeGallerySliders() {
    const gallerySection = document.querySelector('.gallery-section');
    if (!gallerySection) return;
    
    const galleryCards = gallerySection.querySelectorAll('.gallery-card');
    
    galleryCards.forEach((card, cardIdx) => {
        const img = card.querySelector('.card-img');
        const dots = card.querySelectorAll('.card-dots .dot');
        const imagesData = card.getAttribute('data-images');
        
        if (!img || !imagesData) return;
        
        let imageUrls = [];
        try {
            imageUrls = JSON.parse(imagesData);
        } catch (e) {
            console.error('Error parsing images data:', e);
            return;
        }
        
        if (imageUrls.length === 0) return;
        
        let currentIndex = 0;
        
        function showImage(index) {
            if (index < 0 || index >= imageUrls.length) return;
            
            // Change the image src
            if (imageUrls[index]) {
                img.src = imageUrls[index];
            }
            
            // Update dots
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            
            currentIndex = index;
        }
        
        // Click on card or overlay to cycle through images
        const handleCardClick = function(e) {
            // Don't cycle if clicking on a dot (handled separately)
            if (e.target.classList.contains('dot') || e.target.closest('.dot')) {
                return;
            }
            
            currentIndex = (currentIndex + 1) % imageUrls.length;
            showImage(currentIndex);
        };
        
        // Add click listener to card
        card.addEventListener('click', handleCardClick);
        
        // Also attach to overlay to ensure clicks work
        const overlay = card.querySelector('.card-overlay');
        if (overlay) {
            overlay.addEventListener('click', handleCardClick);
        }
        
        // Click on dots to jump to specific image
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click
                showImage(index);
            });
        });
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeGallerySliders);
} else {
    initializeGallerySliders();
}
