import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Gift, ArrowRight, RefreshCw, Star, Zap } from 'lucide-react'
import questionsData from './data/questions.json'

// THE AI GENERATIVE ENGINE
// This replaces the static gifts.json and generates logic-driven suggestions on the fly
const generateAiSuggestions = (answers) => {
  const { recipient, budget } = answers;

  // Logical Budget mapping: low (<1000), medium (1000-5000), high (>5000)
  const productDatabase = {
    tech: [
      { title: "Portable Retro Console", desc: "400-in-1 classic arcade games for gaming on the go.", price: "₹899", budget: "low", gender: "male" },
      { title: "Smart Ambient Mood lamp", desc: "App-controlled LED lamp with 16M colors.", price: "₹1,499", budget: "medium", gender: "female" },
      { title: "RC Stunt Drone with Camera", desc: "High-speed mini drone with 4K recording.", price: "₹2,499", budget: "medium", gender: "male" },
      { title: "Mechanical Keyboard (RGB)", desc: "Tactile blue switches with customizable light modes.", price: "₹3,999", budget: "medium", gender: "male" },
      { title: "Instax Mini 12 Instant Camera", desc: "Cute instant film camera for live memories.", price: "₹6,999", budget: "high", gender: "female" },
      { title: "Wireless Noise-Canceling Buds", desc: "Crystal clear sound with ergonomic design.", price: "₹2,999", budget: "medium", gender: "female" }
    ],
    creative: [
      { title: "Draw-Everything Sketchbook", desc: "Premium 200-page acid-free paper for artists.", price: "₹450", budget: "low", gender: "any" },
      { title: "3D Pen Printing Kit", desc: "Create 3D art from thin air with precision.", price: "₹1,299", budget: "medium", gender: "male" },
      { title: "Graphite Sketching Set", desc: "Professional grade drawing pencils.", price: "₹699", budget: "low", gender: "male" },
      { title: "Professional 80-Marker Set", desc: "Dual-tip alcohol markers for vibrant sketching.", price: "₹1,850", budget: "medium", gender: "female" },
      { title: "Watercolor Palette & Brushes", desc: "Premium pigment cakes with self-moistening brushes.", price: "₹999", budget: "low", gender: "female" },
      { title: "DIY Journaling & Sticker Box", desc: "Aesthetic scrapbooking and memories.", price: "₹799", budget: "low", gender: "female" }
    ],
    gamer: [
      { title: "Hot Wheels 5-Car Pack", desc: "Authentic 1:64 scale die-cast cars.", price: "₹649", budget: "low", gender: "male" },
      { title: "Level Up Mug (Controller Handle)", desc: "Ceramic mug with a gaming controller grip.", price: "₹450", budget: "low", gender: "any" },
      { title: "Gaming Mouse (RGB)", desc: "High-DPI precision mouse with custom lighting.", price: "₹1,200", budget: "medium", gender: "male" },
      { title: "Pastel Custom Joy-Con Skins", desc: "Soft-touch custom skins for her setup.", price: "₹599", budget: "low", gender: "female" },
      { title: "Aesthetic Gaming Headset", desc: "High-fidelity audio with RGB attachments.", price: "₹4,500", budget: "medium", gender: "female" }
    ],
    luxury: [
      { title: "Lindt Swiss Luxury Box", desc: "Exquisite heart-shaped box of melting truffles.", price: "₹850", budget: "low", gender: "any" },
      { title: "Premium Red Roses Bouquet", desc: "10-stem long-life roses in a luxury vase.", price: "₹1,499", budget: "medium", gender: "female" },
      { title: "Aromatherapy Diffuser Kit", desc: "Ultrasonic diffuser with 10 essential oils.", price: "₹1,899", budget: "medium", gender: "female" },
      { title: "Gold Plated Pendant", desc: "Elegant heart-shaped minimal jewelry.", price: "₹5,500", budget: "high", gender: "female" }
    ]
  }

  // 1. POOL EVERYTHING
  let fullPool = [];
  Object.values(productDatabase).forEach(categoryItems => {
    fullPool = [...fullPool, ...categoryItems];
  });

  // 2. STRICT BUDGET FILTERING (Crucial Fix)
  let filteredPool = fullPool.filter(item => item.budget === budget);

  // 3. GENDER & INTEREST REFINEMENT
  let genderFiltered = filteredPool.filter(item =>
    item.gender === recipient || item.gender === 'any'
  );

  // If gender filtering is too strict, fallback to budget-only pool
  if (genderFiltered.length < 2) genderFiltered = filteredPool;

  // 4. RANDOMIZE AND MAP
  return genderFiltered
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(item => ({
      ...item,
      category: item.budget.toUpperCase() + " BUDGET",
      why: `Fits your ${budget} budget and matches their personality perfectly!`,
      score: 98,
      platforms: [
        { name: "Amazon India", price: item.price, link: `https://www.amazon.in/s?k=${encodeURIComponent(item.title)}` },
        { name: "Flipkart", price: `₹${parseInt(item.price.replace(/[^\d]/g, '')) - 40}`, link: `https://www.flipkart.com/search?q=${encodeURIComponent(item.title)}` }
      ]
    }));
};

function App() {
  const [step, setStep] = useState('landing') // landing, questions, results
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const pageRef = useRef(null)

  // GSAP Transition Effect
  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      )
    }
  }, [step, currentQuestionIndex])

  const handleStart = () => {
    setStep('questions')
    setCurrentQuestionIndex(0)
    setAnswers({})
  }

  const handleAnswer = (questionId, value) => {
    // Mini animation for the answer click
    gsap.to(".option-bubble", { scale: 0.98, duration: 0.1, yoyo: true, repeat: 1 })

    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQuestionIndex < questionsData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        const aiSuggestions = generateAiSuggestions(newAnswers);
        setResults(aiSuggestions)
        setIsLoading(true)
        setStep('results')

        // Final AI Thinking simulation
        setTimeout(() => setIsLoading(false), 2000)
      }
    }, 200)
  }

  const handleReset = () => {
    gsap.to(pageRef.current, {
      opacity: 0, scale: 0.9, duration: 0.3, onComplete: () => {
        setStep('landing')
        setAnswers({})
        setCurrentQuestionIndex(0)
      }
    })
  }

  return (
    <div className="app-container">
      <div className="content-container">
        <header>
          <div className="logo" onClick={handleReset}>
            <div style={{ background: 'var(--primary)', padding: '10px', borderRadius: '15px', border: '3px solid black' }}>
              <Gift size={32} />
            </div>
            <span>GIFTIFY <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>CARTOON AI</span></span>
          </div>
        </header>

        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div ref={pageRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {step === 'landing' && (
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
                <button className="btn btn-primary" onClick={handleStart} style={{ padding: '1.2rem 3rem', fontSize: '1.3rem' }}>
                  Let's Go! <ArrowRight size={24} />
                </button>
              </div>
            )}

            {step === 'questions' && (
              <div className="cartoon-card" style={{ width: '100%', maxWidth: '600px' }}>
                <div className="progress-container">
                  <div
                    className="progress-fill"
                    style={{ width: `${((currentQuestionIndex + 1) / questionsData.length) * 100}%` }}
                  ></div>
                </div>

                <div style={{ marginBottom: '2.5rem' }}>
                  <span className="badge-tag">STEP {currentQuestionIndex + 1} OF {questionsData.length}</span>
                  <h2 style={{ fontSize: '2.4rem', marginTop: '1rem' }}>
                    {questionsData[currentQuestionIndex].question}
                  </h2>
                </div>

                <div className="options-list">
                  {questionsData[currentQuestionIndex].options.map((option, idx) => (
                    <button
                      key={idx}
                      className="option-bubble"
                      onClick={() => handleAnswer(questionsData[currentQuestionIndex].id, option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 'results' && (
              <div style={{ width: '100%' }}>
                {isLoading ? (
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
                ) : (
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

                    <button className="btn btn-secondary" onClick={handleReset} style={{ marginTop: '4rem' }}>
                      <RefreshCw size={20} /> Reset Matcher
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>

        <footer>
          <p>Made with 💖 and Cartoon Magic</p>
        </footer>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default App
