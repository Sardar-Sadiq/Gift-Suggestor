import React from 'react'
import { RefreshCw, Zap } from 'lucide-react'

const Loading = () => {
    return (
        <div className="cartoon-card" style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem', position: 'relative', display: 'inline-block' }}>
                <RefreshCw size={80} className="spin-icon" style={{ animation: 'spin 2s linear infinite', color: 'var(--primary)' }} />
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <Zap size={32} color="var(--secondary)" fill="var(--secondary)" />
                </div>
            </div>
            <h2 style={{ fontSize: '3rem', color: 'var(--text-main)' }}>POOF! ✨</h2>
            <p style={{ fontWeight: 900, fontSize: '1.2rem', marginTop: '1rem', textTransform: 'uppercase' }}>
                Our AI is digging through <br />the toy boxes...
            </p>
        </div>
    )
}

export default Loading
