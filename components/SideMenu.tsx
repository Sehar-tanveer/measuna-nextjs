'use client'

import { useEffect, useRef } from 'react'

interface SideMenuProps {
    isOpen: boolean
    onClose: () => void
}

export default function SideMenu({ isOpen, onClose }: SideMenuProps) {
    const dividerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isOpen && dividerRef.current) {
            setTimeout(() => {
                dividerRef.current?.classList.add('animate')
            }, 200)
        } else if (!isOpen && dividerRef.current) {
            dividerRef.current.classList.remove('animate')
            dividerRef.current.classList.add('closing')
            setTimeout(() => {
                dividerRef.current?.classList.remove('closing')
            }, 600)
        }
    }, [isOpen])

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }

        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (isOpen && !target.closest('.side-menu') && !target.closest('.navbar-toggle')) {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            document.addEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isOpen, onClose])

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        const target = document.querySelector(href)
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        onClose()
    }

    return (
        <div className={`side-menu ${isOpen ? 'active' : ''}`}>
            <div className="side-menu-header">
                <button className="side-menu-close" onClick={onClose}>
                    <span></span>
                    <span></span>
                </button>
                <button className="side-menu-inquire-btn">INQUIRE NOW</button>
            </div>

            <div className="side-menu-content">
                <div className="menu-section">
                    <h3 className="menu-section-title">SERVICE</h3>
                    <ul className="menu-links">
                        <li><a href="#home" onClick={(e) => handleLinkClick(e, '#home')}>Home</a></li>
                        <li><a href="#bedrooms" onClick={(e) => handleLinkClick(e, '#bedrooms')}>Bedrooms</a></li>
                        <li><a href="#living" onClick={(e) => handleLinkClick(e, '#living')}>Living Space</a></li>
                        <li><a href="#amenities" onClick={(e) => handleLinkClick(e, '#amenities')}>Amenities</a></li>
                    </ul>
                </div>

                <div className="menu-divider" ref={dividerRef}></div>

                <div className="menu-section">
                    <h3 className="menu-section-title">OTHERS</h3>
                    <ul className="menu-links">
                        <li><a href="#gallery" onClick={(e) => handleLinkClick(e, '#gallery')}>Gallery</a></li>
                        <li><a href="#imprint" onClick={(e) => handleLinkClick(e, '#imprint')}>Imprint</a></li>
                        <li><a href="#data-policy" onClick={(e) => handleLinkClick(e, '#data-policy')}>Data Policy</a></li>
                    </ul>
                </div>
            </div>

            <div className="side-menu-footer">
                <p>&copy; 2025</p>
            </div>
        </div>
    )
}

