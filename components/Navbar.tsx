'use client'

import { useState } from 'react'
import SideMenu from './SideMenu'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <>
            <nav className="main-navbar">
                <div className="navbar-left">
                    <div className="navbar-toggle" onClick={() => setIsMenuOpen(true)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="navbar-center">
                    <div className="navbar-logo">
                        <div className="logo-text">MEA SUNA MADEIRA</div>
                    </div>
                </div>
                <div className="navbar-right">
                    <button className="inquiry-btn">INQUIRE NOW</button>
                </div>
            </nav>
            <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    )
}

