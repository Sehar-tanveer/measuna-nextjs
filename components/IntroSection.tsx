'use client'

import { useEffect, useRef, useState } from 'react'

export default function IntroSection() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const videoContainerRef = useRef<HTMLDivElement>(null)
    const [isMuted, setIsMuted] = useState(true)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const video = videoRef.current
        const container = videoContainerRef.current

        if (!video || !container) return

        const updateProgress = () => {
            if (video.duration) {
                const prog = (video.currentTime / video.duration) * 100
                setProgress(prog)
            }
        }

        video.addEventListener('timeupdate', updateProgress)
        video.addEventListener('loadedmetadata', updateProgress)

        // Video zoom effect on scroll
        let ticking = false
        let lastScrollTop = 0

        const updateVideoZoom = () => {
            const scrollTop = window.pageYOffset
            const windowHeight = window.innerHeight
            const videoRect = container.getBoundingClientRect()
            const videoTop = videoRect.top + scrollTop
            const videoHeight = videoRect.height
            const scrollProgress = Math.max(0, Math.min(1, (scrollTop - videoTop + windowHeight) / (videoHeight + windowHeight)))
            const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up'
            lastScrollTop = scrollTop

            let scale = 1.0
            if (scrollDirection === 'down') {
                scale = 1.0 + (scrollProgress * 0.2)
            } else {
                scale = 1.2 - (scrollProgress * 0.2)
            }

            container.style.transform = `scale(${scale})`
            ticking = false
        }

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateVideoZoom)
                ticking = true
            }
        }

        window.addEventListener('scroll', requestTick)

        return () => {
            video.removeEventListener('timeupdate', updateProgress)
            video.removeEventListener('loadedmetadata', updateProgress)
            window.removeEventListener('scroll', requestTick)
        }
    }, [])

    const toggleMute = () => {
        if (videoRef.current) {
            const newMuted = !videoRef.current.muted
            videoRef.current.muted = newMuted
            setIsMuted(newMuted)
        }
    }

    const handleFullscreen = () => {
        const video = videoRef.current
        if (!video) return

        if (video.requestFullscreen) {
            video.requestFullscreen()
        } else if ((video as any).webkitRequestFullscreen) {
            (video as any).webkitRequestFullscreen()
        } else if ((video as any).msRequestFullscreen) {
            (video as any).msRequestFullscreen()
        }
    }

    return (
        <section className="intro-section">
            <h2>Far From Ordinary,<br />Close To Perfect!</h2>
            <p>Mea Suna Madeira stands for extravagance of its own. Nestled along Madeira&apos;s green coastline, this place of calm and relaxation offers extraordinary amenities. From a world-class golf simulator to unparalleled wellness and inspiring workspaces, everything you desire is here.</p>

            <div className="intro-video" ref={videoContainerRef}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    loop
                    playsInline
                    id="introVideo"
                    onClick={toggleMute}
                >
                    <source src="https://r2.vidzflow.com/v/g9vXOBLi0X_720p_1737461793.mp4" type="video/mp4" />
                </video>

                <div className="video-controls">
                    <div className="volume-indicator">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            {isMuted ? (
                                <>
                                    <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2" fill="none" />
                                    <path d="M19.07 4.93L4.93 19.07" stroke="white" strokeWidth="2" />
                                </>
                            ) : (
                                <>
                                    <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="white" strokeWidth="2" fill="none" />
                                    <path d="M15.54 8.46L19.07 12L15.54 15.54" stroke="white" strokeWidth="2" />
                                </>
                            )}
                        </svg>
                    </div>

                    <div className="video-progress-container">
                        <div className="video-progress-bar">
                            <div className="video-progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                    </div>

                    <div className="control-buttons">
                        <button className="control-btn fullscreen-btn" onClick={handleFullscreen}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M8 3H5C3.89543 3 3 3.89543 3 5V8" stroke="white" strokeWidth="2" />
                                <path d="M21 8V5C21 3.89543 20.1046 3 19 3H16" stroke="white" strokeWidth="2" />
                                <path d="M16 21H19C20.1046 21 21 20.1046 21 19V16" stroke="white" strokeWidth="2" />
                                <path d="M3 16V19C3 20.1046 3.89543 21 5 21H8" stroke="white" strokeWidth="2" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

