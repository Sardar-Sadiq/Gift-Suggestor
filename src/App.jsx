import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, ArrowRight, RefreshCw, CheckCircle2, Heart, Zap, Coffee, Smartphone, Palette, Mountain, Sparkles } from 'lucide-react'
import questionsData from './data/questions.json'
import giftsData from './data/gifts.json'

function App() {
  const [step, setStep] = useState('landing') // landing, questions, results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleStart = () => {
    setStep('questions')
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const handleAnswer = (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (currentQuestionIndex < questionsData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      calculateResults(newAnswers)
    }
  }

  const calculateResults = (finalAnswers) => {
    setIsLoading(true)
    setStep('results')

    // AI Price Comparison Simulation
    setTimeout(() => {
      const matchedGifts = giftsData.map(gift => {
        let score = 0

        // Match logic tailored for Lover's Week
        if (gift.budgetRange === finalAnswers.budget) score += 4
        if (gift.occasions.includes(finalAnswers.occasion)) score += 5
        if (gift.personalityTags.includes(finalAnswers.personality)) score += 3

        // Relationship specific bonus
        if (finalAnswers.relationship === 'partner' && gift.personalityTags.includes('romantic')) score += 2

        return { ...gift, score }
      })
        .filter(gift => gift.score > 2)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)

      setResults(matchedGifts)
      setIsLoading(false)
    }, 2000)
  }

  const handleReset = () => {
    setStep('landing')
    setAnswers({})
    setCurrentQuestionIndex(0)
  }

  return (
    <div className="app-container">
      <div className="background-glow">
        <div className="glow-circle glow-1"></div>
        <div className="glow-circle glow-2"></div>
      </div>

      <div className="content-container">
        <header>
          <div className="logo" onClick={handleReset} style={{ cursor: 'pointer' }}>
            <div style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', padding: '8px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '8px' }}>
              <Gift size={24} color="white" />
            </div>
            <span>GIFTIFY <span style={{ fontSize: '0.7rem', verticalAlign: 'middle', background: 'rgba(236,72,153,0.2)', color: '#ec4899', padding: '2px 8px', borderRadius: '99px', marginLeft: '8px' }}>AI v2.0</span></span>
          </div>
        </header>

        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            {step === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card"
                style={{ textAlign: 'center', maxWidth: '700px' }}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <span className="badge" style={{ background: 'rgba(236,72,153,0.1)', color: '#ec4899', border: '1px solid rgba(236,72,153,0.2)' }}>
                    Feb Special: Lovers Week Edition ❤️
                  </span>
                </div>
                <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', fontWeight: 800, lineHeight: 1.1 }}>
                  Find the Gift that <span style={{ background: 'linear-gradient(to right, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Speaks Love.</span>
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3rem', lineHeight: 1.6 }}>
                  Our AI scans 100+ platforms (Amazon, Flipkart, FNP) to find the best prices
                  and deepest meaning for your special someone.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button className="btn btn-primary" onClick={handleStart} style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
                    Start AI Matcher <Sparkles size={18} style={{ marginLeft: '8px' }} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 'questions' && (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card"
                style={{ width: '100%', maxWidth: '600px' }}
              >
                <div className="progress-bar-container">
                  <div
                    className="progress-bar-fill"
                    style={{ width: `${((currentQuestionIndex + 1) / questionsData.length) * 100}%` }}
                  ></div>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span className="badge">AI ANALYSIS: {Math.round(((currentQuestionIndex + 1) / questionsData.length) * 100)}% COMPLETE</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Step {currentQuestionIndex + 1}/{questionsData.length}</span>
                  </div>
                  <h2 style={{ fontSize: '2.2rem', fontWeight: 700 }}>
                    {questionsData[currentQuestionIndex].question}
                  </h2>
                </div>

                <div className="options-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  {questionsData[currentQuestionIndex].options.map((option, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="question-option"
                      onClick={() => handleAnswer(questionsData[currentQuestionIndex].id, option.value)}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ width: '100%', maxWidth: '1200px' }}
              >
                {isLoading ? (
                  <div style={{ textAlign: 'center', padding: '6rem 0' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        style={{ width: '80px', height: '80px', border: '4px solid rgba(139, 92, 246, 0.1)', borderTopColor: '#8b5cf6', borderRadius: '50%' }}
                      ></motion.div>
                      <Gift size={32} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#ec4899' }} />
                    </div>
                    <h2 style={{ fontSize: '1.8rem', marginTop: '2rem' }}>AI Price Comparison Service...</h2>
                    <p style={{ color: 'var(--text-muted)' }}>Checking Amazon, Flipkart, & FNP for the best deals...</p>
                  </div>
                ) : (
                  <div>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                      <span className="badge" style={{ marginBottom: '1rem', background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
                        <CheckCircle2 size={14} style={{ marginRight: '4px' }} /> AI Matching Engine Finished
                      </span>
                      <h2 style={{ fontSize: '3rem', fontWeight: 800 }}>Best Gifts for Lovers Week</h2>
                      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>We analyzed platform prices & historical trends to find these matches.</p>
                    </div>

                    <div className="results-grid">
                      {results.map((gift, idx) => (
                        <motion.div
                          key={gift.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.2 }}
                          className="glass-card gift-card"
                          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}
                        >
                          <div style={{
                            background: 'rgba(255,255,255,0.02)',
                            height: '180px',
                            borderRadius: '16px',
                            marginBottom: '1.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            position: 'relative',
                            border: '1px solid rgba(255,255,255,0.05)'
                          }}>
                            {gift.category === 'Flowers' && <Heart size={64} color="#ec4899" fill="#ec4899" opacity={0.2} />}
                            {gift.category === 'Tech' && <Smartphone size={64} color="#8b5cf6" opacity={0.5} />}
                            {gift.category === 'Food & Drink' && <Coffee size={64} color="#fbbf24" opacity={0.5} />}
                            {gift.category === 'Personalized' && <Gift size={64} color="#ec4899" opacity={0.5} />}
                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                              <span style={{ fontSize: '0.6rem', padding: '4px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
                                ID: #{gift.id}
                              </span>
                            </div>
                          </div>

                          <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center' }}>
                              <span className="badge">{gift.category}</span>
                              <span className="badge-match">{Math.round((gift.score / 12) * 100)}% AI Match</span>
                            </div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>{gift.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5, minHeight: '3em' }}>
                              {gift.description}
                            </p>

                            <div style={{ margin: '1.5rem 0', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                                <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>LIVE PRICE COMPARISON</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }}></div>
                                  <span style={{ fontSize: '0.6rem', color: '#22c55e', fontWeight: 700 }}>LIVE</span>
                                </div>
                              </div>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {gift.platforms.map((platform, pIdx) => (
                                  <div key={pIdx} className="price-row">
                                    <span className="platform-name">{platform.name}</span>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <span className="platform-price">{platform.price}</span>
                                      <a href={platform.link} target="_blank" rel="noopener noreferrer" className="buy-link">
                                        <ArrowRight size={12} />
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div style={{ background: 'rgba(139, 92, 246, 0.05)', padding: '1rem', borderRadius: '12px', borderLeft: '3px solid var(--primary)' }}>
                              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontStyle: 'italic', lineHeight: 1.4 }}>
                                "{gift.why}"
                              </p>
                            </div>
                          </div>

                          <div style={{ marginTop: '2rem' }}>
                            <a
                              href={gift.platforms[0].link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-primary"
                              style={{ width: '100%', textDecoration: 'none' }}
                            >
                              Buy from Best Price <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                            </a>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '5rem' }}>
                      <button className="btn btn-secondary" onClick={handleReset}>
                        <RefreshCw size={18} /> Reset AI Search
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer style={{ marginTop: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p>© 2026 GIFTIFY AI. POWERED BY REAL-TIME SHOPPING DATA.</p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Live Tracker</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Lovers Week Schedule</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>API Status</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
