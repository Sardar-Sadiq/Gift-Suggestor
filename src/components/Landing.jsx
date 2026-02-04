import React from 'react'
import { Star, ArrowRight } from 'lucide-react'

const Landing = ({ onStart }) => {
    return (
        <div className="cartoon-card" style={{ textAlign: 'center', maxWidth: '650px' }}>
            <div style={{ marginBottom: '2rem' }}>
                <Star size={64} color="var(--primary)" fill="var(--primary)" />
            </div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
                Find a Gift <br /><span style={{ color: 'var(--secondary)' }}>They'll Love!</span>
            </h1>
            <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                A super-smart AI helper to find perfect presents for Boys & Girls. Simple, fast, and fun!
            </p>
            <button className="btn btn-primary" onClick={onStart} style={{ padding: '1.2rem 3rem', fontSize: '1.3rem' }}>
                Let's Go! <ArrowRight size={24} />
            </button>
        </div>
    )
}

export default Landing
