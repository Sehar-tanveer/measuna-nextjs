'use client'

import { useEffect, useRef, useState } from 'react'

interface GalleryCardProps {
    cardIndex: number
    images: string[]
    title: string
    description: string
    initialImage: string
    centerCard?: boolean
}

function GalleryCard({ cardIndex, images, title, description, initialImage, centerCard }: GalleryCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const imgRef = useRef<HTMLImageElement>(null)

    const showImage = (index: number) => {
        if (index < 0 || index >= images.length) return
        setCurrentIndex(index)
        if (imgRef.current) {
            imgRef.current.src = images[index]
        }
    }

    const handleCardClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement
        if (target.classList.contains('dot') || target.closest('.dot')) {
            return
        }
        setCurrentIndex((prev) => (prev + 1) % images.length)
        if (imgRef.current) {
            imgRef.current.src = images[(currentIndex + 1) % images.length]
        }
    }

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.src = images[currentIndex]
        }
    }, [currentIndex, images])

    return (
        <div className={`gallery-card ${centerCard ? 'center-card' : ''}`} onClick={handleCardClick}>
            <div className="card-image-container">
                <img
                    ref={imgRef}
                    src={initialImage}
                    alt={title}
                    className="card-img"
                />
            </div>
            <div className="card-overlay">
                <div className="card-dots">
                    {images.map((_, i) => (
                        <span
                            key={i}
                            className={`dot ${i === currentIndex ? 'active' : ''}`}
                            data-dot-index={i}
                            onClick={(e) => {
                                e.stopPropagation()
                                showImage(i)
                            }}
                        ></span>
                    ))}
                </div>
                <p className="card-text">{description}</p>
                <div className="card-title">{title}</div>
            </div>
        </div>
    )
}

export default function GallerySection() {
    return (
        <section className="gallery-section" id="gallery">
            <div className="gallery-inner">
                <div className="gallery-header">
                    <h2 className="gallery-title">YOUR PANORAMIC OASIS AWAITS</h2>
                    <p className="gallery-subtitle">Relax amidst lush coastal gardens and a panoramic infinity pool, surrounded by stunning natural beauty.</p>
                    <button className="gallery-cta">EXPLORE GALLERY</button>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <GalleryCard
                            cardIndex={0}
                            images={[
                                "https://cdn.prod.website-files.com/66571619d0ab300c2bfd7b71/6772274725aa75f901a5a393_66a2305964e8b9ea39f14b4f_13card-mea-suna.webp",
                                "https://cdn.prod.website-files.com/66571619d0ab300c2bfd7b71/6772274725aa75f901a5a393_66a2305964e8b9ea39f14b4f_13card-mea-suna.webp",
                                "https://cdn.prod.website-files.com/66571619d0ab300c2bfd7b71/6772274725aa75f901a5a393_66a2305964e8b9ea39f14b4f_13card-mea-suna.webp"
                            ]}
                            title="GARDEN"
                            description="Explore four lush terraces filled with evergreens and vibrant blooms. Hammocks and loungers invite you to relax with sweeping ocean views."
                            initialImage="https://cdn.prod.website-files.com/66571619d0ab300c2bfd7b71/6772274725aa75f901a5a393_66a2305964e8b9ea39f14b4f_13card-mea-suna.webp"
                        />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <GalleryCard
                            cardIndex={1}
                            images={[
                                "https://cdn.prod.website-files.com/66571619d0ab300c2bfd7b71/677229aa296a1a6e8db21813_66a2305a87f2e0eeede61a6d_2card-mea-suna.webp",
                                "https://cdn.prod.website-files.com/66571619d0ab300c2bfd7b71/677229aa296a1a6e8db21813_66a2305a87f2e0eeede61a6d_2card-mea-suna.webp",
                                "https://cdn.prod.website-files.com/66571619d0ab300c2bfd7b71/677229aa296a1a6e8db21813_66a2305a87f2e0eeede61a6d_2card-mea-suna.webp"
                            ]}
                            title="POOL"
                            description="Heated infinity pool with massage jets and counter-current. Lounge by the water or on the sundeck with panoramic views."
                            initialImage="https://cdn.prod.website-files.com/66571619d0ab300c2bfd7b71/677229aa296a1a6e8db21813_66a2305a87f2e0eeede61a6d_2card-mea-suna.webp"
                            centerCard
                        />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <GalleryCard
                            cardIndex={2}
                            images={[
                                "https://cdn.prod.website-files.com/66571619d0ab300c2bfd7b71/66acee55343422b88c8f8e2b_5measuna.webp",
                                "https://cdn.prod.website-files.com/66571619d0ab300c2bfd7b71/66acee55343422b88c8f8e2b_5measuna.webp",
                                "https://cdn.prod.website-files.com/66571619d0ab300c2bfd7b71/66acee55343422b88c8f8e2b_5measuna.webp"
                            ]}
                            title="SCENERY"
                            description="Terraced architecture set high above the coastline offers breathtaking views of the cliffs and crystal-clear Atlantic."
                            initialImage="https://cdn.prod.website-files.com/66571619d0ab300c2bfd7b71/66acee55343422b88c8f8e2b_5measuna.webp"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

