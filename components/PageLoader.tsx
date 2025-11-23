'use client'

import { useEffect, useState, useRef } from 'react'

export default function PageLoader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const progressLineRef = useRef<HTMLDivElement>(null)
    const percentageRef = useRef<HTMLDivElement>(null)
    const loaderInnerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const loadingDuration = 6000
        const targetProgress = 100
        const increment = 1
        const interval = loadingDuration / (targetProgress / increment)
        let currentProgress = 0

        const progressInterval = setInterval(() => {
            currentProgress += increment

            if (currentProgress >= targetProgress) {
                currentProgress = targetProgress
                clearInterval(progressInterval)
                setIsComplete(true)
                setTimeout(() => {
                    onComplete()
                }, 500)
            }

            setProgress(currentProgress)

            // Update progress line
            if (progressLineRef.current) {
                const progressHeight = (currentProgress / 100) * 100
                progressLineRef.current.style.transform = `translateX(-50%) scaleY(${progressHeight / 100})`
            }

            // Update percentage counter position
            if (percentageRef.current && loaderInnerRef.current) {
                const containerHeight = loaderInnerRef.current.offsetHeight
                const navbarHeight = 72
                const availableHeight = containerHeight - navbarHeight
                const spacing = 20
                const percentagePosition = (currentProgress / 100) * availableHeight + spacing
                percentageRef.current.style.bottom = `${percentagePosition}px`
            }

            // Trigger image animation when progress reaches 30%
            if (currentProgress >= 30) {
                const cornerImages = document.querySelectorAll('.corner-image')
                const animationSequence = [
                    { selector: '.corner-image.top-left', delay: 0 },
                    { selector: '.corner-image.bottom-right', delay: 300 },
                    { selector: '.corner-image.top-right', delay: 600 },
                    { selector: '.corner-image.bottom-left', delay: 900 }
                ]

                animationSequence.forEach(({ selector, delay }) => {
                    setTimeout(() => {
                        const image = document.querySelector(selector)
                        if (image) {
                            image.classList.add('animate-to-center')
                        }
                    }, delay)
                })
            }
        }, interval)

        return () => clearInterval(progressInterval)
    }, [onComplete])

    return (
        <div className={`loader-overlay ${isComplete ? 'fade-out' : ''}`}>
            <div className="loader-navbar">
                <div className="loader-logo">Mea Suna</div>
            </div>

            <div className="loader-inner" ref={loaderInnerRef}>
                <div className="loader-background-text">
                    <div className="background-text-item">Mea Suna</div>
                </div>

                <div className="corner-image top-left" data-image="1"></div>
                <div className="corner-image top-right" data-image="2"></div>
                <div className="corner-image bottom-left" data-image="3"></div>
                <div className="corner-image bottom-right" data-image="4"></div>

                <div className="progress-line" ref={progressLineRef}></div>

                <div className="percentage-counter" ref={percentageRef}>
                    <span id="percentage">{Math.round(progress)}%</span>
                </div>
            </div>
        </div>
    )
}

