'use client'

import { useState, useEffect } from 'react'
import PageLoader from '@/components/PageLoader'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import IntroSection from '@/components/IntroSection'
import FeaturesSection from '@/components/FeaturesSection'
import HorizontalSection from '@/components/HorizontalSection'
import GallerySection from '@/components/GallerySection'

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)
    const [isContentLoaded, setIsContentLoaded] = useState(false)

    useEffect(() => {
        // Refresh ScrollTrigger when content becomes visible
        if (isContentLoaded && typeof window !== 'undefined') {
            import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
                setTimeout(() => {
                    ScrollTrigger.refresh()
                }, 500)
            })
        }
    }, [isContentLoaded])

    const handleLoaderComplete = () => {
        setIsLoading(false)
        setTimeout(() => {
            setIsContentLoaded(true)
        }, 100)
    }

    return (
        <>
            {isLoading && <PageLoader onComplete={handleLoaderComplete} />}
            <div className={`main-content ${isContentLoaded ? 'loaded' : 'hidden'}`}>
                <Navbar />
                <Hero />
                <main>
                    <IntroSection />
                    <FeaturesSection />
                    <HorizontalSection />
                    <GallerySection />
                </main>
            </div>
        </>
    )
}

