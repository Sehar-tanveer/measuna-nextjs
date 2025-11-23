'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

export default function HorizontalSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (typeof window === 'undefined') return

        // Wait for content to be visible and DOM to be ready
        const initScrollTrigger = () => {
            const horizontalSection = sectionRef.current
            const horizontalWrapper = wrapperRef.current
            if (!horizontalSection || !horizontalWrapper) return

            // Check if section is visible
            const isVisible = !horizontalSection.classList.contains('hidden') && 
                             horizontalSection.offsetParent !== null
            
            if (!isVisible) {
                // Retry after a short delay if not visible yet
                setTimeout(initScrollTrigger, 100)
                return
            }

            const slides = gsap.utils.toArray('.slide')
            if (slides.length === 0) return

            // Kill existing triggers
            ScrollTrigger.getAll().forEach(t => {
                if (t.vars?.trigger === horizontalSection) {
                    t.kill()
                }
            })

            gsap.set(horizontalWrapper, { clearProps: 'all', x: 0 })

            const totalSlides = slides.length
            horizontalWrapper.style.width = `${totalSlides * 100}vw`

            // Force a layout recalculation
            horizontalWrapper.offsetHeight

            const totalScrollDistance = horizontalWrapper.scrollWidth - window.innerWidth
            if (totalScrollDistance <= 0) {
                console.warn('Horizontal scroll distance is 0 or negative')
                return
            }

            const tween = gsap.to(horizontalWrapper, {
                x: -totalScrollDistance,
                ease: 'none'
            })

            ScrollTrigger.create({
                animation: tween,
                trigger: horizontalSection,
                start: 'top top',
                end: () => `+=${totalScrollDistance}`,
                pin: true,
                scrub: 0.7,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                ...(totalSlides > 1 ? {
                    snap: {
                        snapTo: 1 / (totalSlides - 1),
                        duration: { min: 0.2, max: 0.5 },
                        ease: 'power1.inOut'
                    }
                } : {}),
                onEnter: () => gsap.set(horizontalWrapper, { x: 0 }),
                onLeaveBack: () => gsap.set(horizontalWrapper, { x: 0 }),
            })

            // Animate CTA rings
            const overlay = overlayRef.current
            const ringsEl = overlay?.querySelector('.cta-rings')
            if (overlay && ringsEl) {
                const padding = 80
                const computeTravel = () => {
                    const sectionWidth = horizontalSection.clientWidth
                    const ctaWidth = (ringsEl as HTMLElement).offsetWidth || 160
                    return Math.max(0, sectionWidth - ctaWidth - padding * 2)
                }

                let travel = computeTravel()
                gsap.set(overlay, { x: -travel / 2 })

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
                            travel = computeTravel()
                            gsap.set(overlay, { x: -travel / 2 })
                        }
                    }
                })
            }

            // Refresh ScrollTrigger after initialization
            ScrollTrigger.refresh()
        }

        // Initialize after a short delay to ensure DOM is ready
        const timer = setTimeout(() => {
            initScrollTrigger()
        }, 500)

        // Handle resize
        let resizeTimer: NodeJS.Timeout
        const handleResize = () => {
            clearTimeout(resizeTimer)
            resizeTimer = setTimeout(() => {
                ScrollTrigger.refresh()
            }, 120)
        }

        window.addEventListener('resize', handleResize)

        // Also listen for when content becomes visible
        const observer = new MutationObserver(() => {
            const horizontalSection = sectionRef.current
            if (horizontalSection && !horizontalSection.classList.contains('hidden')) {
                ScrollTrigger.refresh()
            }
        })

        const horizontalSection = sectionRef.current
        if (horizontalSection) {
            observer.observe(horizontalSection, {
                attributes: true,
                attributeFilter: ['class']
            })
        }

        return () => {
            clearTimeout(timer)
            ScrollTrigger.getAll().forEach(t => {
                if (t.vars?.trigger === sectionRef.current) {
                    t.kill()
                }
            })
            window.removeEventListener('resize', handleResize)
            observer.disconnect()
        }
    }, [])

    return (
        <section className="horizontal-section" ref={sectionRef}>
            <div className="horizontal-wrapper" ref={wrapperRef}>
                <div className="slide">
                    <div className="tour-slide explore-slide">
                        <div className="slide-left">
                            <div className="slide-header-text">PRIVACY & SPACE</div>
                            <div className="slide-header-line"></div>
                            <div className="slide-title">EXPLORE OUR<br />HOME</div>
                            <div className="slide-description">
                                From the moment you step into the expansive living area, you&apos;ll be immersed in the awe-inspiring sea views that define every room. The beautifully appointed sitting areas, elegant dining spaces, and inviting bedrooms create a refined and welcoming ambiance.
                            </div>
                            <button className="slide-cta-btn">INQUIRE NOW</button>
                        </div>
                        <div className="slide-right">
                            <div className="image-collage">
                                <div className="image-item image-item-1">
                                    <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=1200&fit=crop" alt="Home" />
                                </div>
                                <div className="image-item image-item-2">
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop" alt="Relaxation" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide">
                    <div className="tour-slide explore-slide">
                        <div className="slide-left">
                            <div className="slide-title">Living Space</div>
                            <div className="slide-description">
                                Immerse yourself in the finest comfort of our spacious living area. Relax by the fireplace, unwind on the plush sofa or stay productive in the serene study room.
                            </div>
                            <div className="slide-header-line"></div>
                        </div>
                        <div className="slide-right">
                            <div className="image-collage">
                                <div className="image-item image-item-3">
                                    <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=1200&fit=crop" alt="Home" />
                                </div>
                                <div className="image-item image-item-4">
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop" alt="Relaxation" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide">
                    <div className="tour-slide explore-slide">
                        <div className="slide-left">
                            <div className="image-item image-item-5">
                                <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=1200&fit=crop" alt="Home" />
                            </div>
                        </div>
                        <div className="slide-right">
                            <div className="image-collage">
                                <div className="image-item image-item-6">
                                    <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=1200&fit=crop" alt="Home" />
                                </div>
                                <div className="image-item image-item-4">
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop" alt="Relaxation" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide">
                    <div className="tour-slide explore-slide">
                        <div className="slide-left">
                            <div className="slide-title">Dining Area</div>
                            <div className="slide-description">
                                Enjoy culinary delights in the elegant dining area with its generous indoor table and poolside terrace seating. Prepare meals in the large kitchen or use the separate barbecue area for a perfect outdoor dining experience.
                            </div>
                            <div className="slide-header-line"></div>
                        </div>
                        <div className="slide-right">
                            <div className="image-collage">
                                <div className="image-item image-item-3">
                                    <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=1200&fit=crop" alt="Home" />
                                </div>
                                <div className="image-item image-item-8">
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop" alt="Relaxation" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide">
                    <div className="tour-slide explore-slide">
                        <div className="slide-left">
                            <div className="image-item image-item-5">
                                <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=1200&fit=crop" alt="Home" />
                            </div>
                        </div>
                        <div className="slide-right">
                            <div className="image-collage">
                                <div className="image-item image-item-6">
                                    <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=1200&fit=crop" alt="Home" />
                                </div>
                                <div className="image-item image-item-4">
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop" alt="Relaxation" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide">
                    <div className="tour-slide explore-slide">
                        <div className="slide-left">
                            <div className="slide-title">Bedrooms</div>
                            <div className="slide-description">
                                Wake up to breathtaking ocean views in one of our three stylish bedrooms. Enjoy the rising and setting sun from your balcony, and embrace the calming sounds of the ocean waves.
                            </div>
                            <div className="slide-header-line"></div>
                        </div>
                        <div className="slide-right">
                            <div className="image-collage">
                                <div className="image-item image-item-3">
                                    <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=1200&fit=crop" alt="Home" />
                                </div>
                                <div className="image-item image-item-8">
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop" alt="Relaxation" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="slide">
                    <div className="tour-slide explore-slide">
                        <div className="slide-left">
                            <div className="image-item image-item-5">
                                <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=1200&fit=crop" alt="Home" />
                            </div>
                        </div>
                        <div className="slide-right">
                            <div className="image-collage">
                                <div className="image-item image-item-6">
                                    <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=1200&fit=crop" alt="Home" />
                                </div>
                                <div className="image-item image-item-4">
                                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop" alt="Relaxation" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slide-bottom-divider"></div>
            <div className="slide-overlay-cta" ref={overlayRef}>
                <div className="cta-rings">
                    <span className="ring ring-outer"></span>
                    <span className="ring ring-middle"></span>
                    <span className="ring ring-inner">
                        <span className="cta-arrow">→</span>
                    </span>
                </div>
            </div>
        </section>
    )
}

