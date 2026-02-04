import React from 'react'
import { ArrowRight, RefreshCw } from 'lucide-react'

const Results = ({ results, onReset }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'inline-block', transform: 'rotate(-2deg)', background: 'var(--primary)', padding: '5px 20px', border: '3px solid black', borderRadius: '10px', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 900, fontSize: '1.2rem' }}>AI ANALYSIS COMPLETE!</span>
                </div>
                <h2 style={{ fontSize: '4rem', lineHeight: 1 }}>LOOK WHAT <br /><span style={{ color: 'var(--secondary)' }}>WE FOUND!</span></h2>
            </div>

            <div className="results-grid">
                {results.map((gift, idx) => (
                    <div key={idx} className="cartoon-card" style={{ position: 'relative' }}>
                        <div className="emoji-sticker">
                            <span className="gift-emoji">🎁</span>
                            <span className="ribbon-emoji">🎀</span>
                        </div>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <span className="badge-tag" style={{ background: '#E3F2FD' }}>{gift.category}</span>
                            <h3 style={{ fontSize: '1.8rem', marginTop: '0.5rem' }}>{gift.title}</h3>
                            <p style={{ fontWeight: 700, color: 'var(--text-muted)', fontSize: '1rem', marginTop: '0.5rem', lineHeight: 1.4 }}>
                                {gift.description}
                            </p>
                        </div>

                        <div className="price-box">
                            <p style={{ fontSize: '0.7rem', fontWeight: 900, color: 'var(--text-muted)', marginBottom: '0.5rem' }}>WHERE TO BUY:</p>
                            {gift.platforms.slice(0, 2).map((platform, pIdx) => (
                                <div key={pIdx} className="price-item">
                                    <span style={{ fontWeight: 900 }}>{platform.name}</span>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <span style={{ fontWeight: 900, color: 'var(--accent)' }}>{platform.price}</span>
                                        <a href={platform.link} target="_blank" rel="noopener noreferrer" className="buy-now-link">
                                            GO <ArrowRight size={14} />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: '#FFFDF0', padding: '1rem', borderRadius: '12px', border: '2px dashed var(--primary)' }}>
                            <p style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                                " {gift.why} "
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="btn btn-secondary" onClick={onReset} style={{ marginTop: '4rem' }}>
                <RefreshCw size={20} /> Reset Matcher
            </button>
        </div>
    )
}

export default Results
