'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
    const dividerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            dividerRef.current?.classList.add('animate')
        }, 7000)

        return () => clearTimeout(timer)
    }, [])

    const scrollToContent = () => {
        const introSection = document.querySelector('.intro-section')
        if (introSection) {
            introSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    return (
        <header className="hero-section">
            <div className="hero-overlay"></div>
            <div className="hero-video">
                <video autoPlay muted loop playsInline>
                    <source src="https://r2.vidzflow.com/v/1MRqONfXPP_1080p_1737463347.mp4" type="video/mp4" />
                </video>
            </div>
            <div className="hero-content">
                <h1>Madeiras hidden paradise</h1>
                <p>Immerse yourself in the serene oasis of Mea Suna Madeira, where comfort and style coexist in perfect harmony.</p>
                <div className="hero-divider" ref={dividerRef}></div>
                <div className="scroll-indicator" onClick={scrollToContent}>
                    <div className="mouse-icon">
                        <div className="mouse-wheel"></div>
                    </div>
                    <span className="scroll-text">SCROLL DOWN</span>
                </div>
            </div>
        </header>
    )
}

