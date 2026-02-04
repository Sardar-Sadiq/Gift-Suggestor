import React from 'react'
import { Gift } from 'lucide-react'

const Header = ({ onLogoClick }) => {
    return (
        <header>
            <div className="logo" onClick={onLogoClick}>
                <div style={{ background: 'var(--primary)', padding: '10px', borderRadius: '15px', border: '3px solid black' }}>
                    <Gift size={32} />
                </div>
                <span>GIFTIFY <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>AI</span></span>
            </div>
        </header>
    )
}

export default Header
