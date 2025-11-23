'use client'

import { useEffect, useRef } from 'react'

export default function FeaturesSection() {
    const backgroundRef = useRef<HTMLDivElement>(null)
    const featuresSectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const featureCards = document.querySelectorAll('.feature-card')
        const featuresBackground = backgroundRef.current

        if (featureCards.length === 0 || !featuresBackground) return

        // Set default background
        featuresBackground.classList.add('privacy-bg')

        const handleMouseEnter = (bgType: string) => {
            featuresBackground.classList.remove('privacy-bg', 'panoramic-bg', 'amenities-bg')
            if (bgType === 'privacy') {
                featuresBackground.classList.add('privacy-bg')
            } else if (bgType === 'panoramic') {
                featuresBackground.classList.add('panoramic-bg')
            } else if (bgType === 'amenities') {
                featuresBackground.classList.add('amenities-bg')
            }
        }

        featureCards.forEach((card) => {
            const bgType = card.getAttribute('data-bg')
            if (bgType) {
                card.addEventListener('mouseenter', () => handleMouseEnter(bgType))
            }
        })

        const handleMouseLeave = () => {
            if (featuresBackground) {
                featuresBackground.classList.remove('privacy-bg', 'panoramic-bg', 'amenities-bg')
                featuresBackground.classList.add('privacy-bg')
            }
        }

        const section = featuresSectionRef.current
        if (section) {
            section.addEventListener('mouseleave', handleMouseLeave)
        }

        return () => {
            featureCards.forEach((card) => {
                const bgType = card.getAttribute('data-bg')
                if (bgType) {
                    card.removeEventListener('mouseenter', () => handleMouseEnter(bgType))
                }
            })
            if (section) {
                section.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [])

    return (
        <section className="features-section" ref={featuresSectionRef}>
            <div className="features-background" ref={backgroundRef}></div>
            <div className="features-container">
                <div className="feature-card" data-bg="privacy">
                    <div className="feature-content">
                        <h3>PRIVACY &<br />SPACE</h3>
                        <p className="feature-description">Discover unmatched privacy and comfort in every corner of our home. Experience the luxury of having your own secluded paradise.</p>
                    </div>
                </div>

                <div className="feature-divider"></div>

                <div className="feature-card" data-bg="panoramic">
                    <div className="feature-content">
                        <h3>PANORAMIC<br />PARADISE</h3>
                        <p className="feature-description">Step into a breathtaking outdoor haven where lush green mountains meet the crystal-clear ocean. Every view is a masterpiece.</p>
                    </div>
                </div>

                <div className="feature-divider"></div>

                <div className="feature-card" data-bg="amenities">
                    <div className="feature-content">
                        <h3>EXQUISITE<br />AMENITIES</h3>
                        <p className="feature-description">Indulge in a world of premier leisure with our high-end fitness suite, soothing spa, private cinema and world-class golf simulator. Elevate your stay with endless recreation options crafted to enrich every moment of your getaway.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

