import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Gift, ArrowRight, RefreshCw, Star, Heart, Camera, Palette, Zap, ShoppingBag, Car, BookOpen, PenTool } from 'lucide-react'
import questionsData from './data/questions.json'

// THE AI GENERATIVE ENGINE
// This replaces the static gifts.json and generates logic-driven suggestions on the fly
const generateAiSuggestions = (answers) => {
  const { recipient, occasion, budget, interest, vibe } = answers;

  // Base knowledge for the AI
  const productDatabase = {
    tech: {
      male: [
        { title: "RC Stunt Drone with Camera", desc: "High-speed mini drone with 4K recording and 360 flips.", price: "₹2,499", id: "B09V7N7Z1H" },
        { title: "Mechanical Keyboard (RGB)", desc: "Tactile blue switches with customizable light modes.", price: "₹3,999", id: "B0B5L7N6WS" },
        { title: "Portable Retro Console", desc: "400-in-1 classic arcade games for gaming on the go.", price: "₹899", id: "B08G718C9H" }
      ],
      female: [
        { title: "Instax Mini 12 Instant Camera", desc: "Cute instant film camera for capturing live memories.", price: "₹6,999", id: "B0BZ7D7G1N" },
        { title: "Smart Ambient Mood lamp", desc: "App-controlled LED lamp with 16M colors and music sync.", price: "₹1,499", id: "B09V7N7Z1H" },
        { title: "Wireless Noise-Canceling Buds", desc: "Crystal clear sound with ergonomic design for deep focus.", price: "₹2,999", id: "B0B5L7N6WS" }
      ]
    },
    creative: {
      male: [
        { title: "3D Pen Printing Kit", desc: "Create 3D art from thin air with this precision pen.", price: "₹1,299", id: "B09V7N7Z1H" },
        { title: "Graphite Sketching Set", desc: "Professional grade drawing pencils and charcoal for artists.", price: "₹699", id: "B08G718C9H" }
      ],
      female: [
        { title: "Professional 80-Marker Set", desc: "Dual-tip alcohol markers for vibrant sketching and art.", price: "₹1,850", id: "B08HMRMM1D" },
        { title: "Watercolor Palette & Brushes", desc: "Premium pigment cakes with self-moistening brushes.", price: "₹999", id: "B0B5L7N6WS" },
        { title: "DIY Journaling & Sticker Box", desc: "Everything needed for aesthetic scrapbooking and memories.", price: "₹799", id: "B09V7N7Z1H" }
      ]
    },
    gamer: {
      male: [
        { title: "Hot Wheels 5-Car Collector Pack", desc: "Authentic 1:64 scale die-cast cars for collectors.", price: "₹649", id: "B08G718C9H" },
        { title: "Gaming Mouse with Macro Keys", desc: "High-DPI precision mouse with custom RGB lighting.", price: "₹1,200", id: "B0B5L7N6WS" },
        { title: "Level Up Mug (Controller Handle)", desc: "Ceramic mug with a cool gaming controller grip.", price: "₹450", id: "B08G718C9H" }
      ],
      female: [
        { title: "Pastel Custom Joy-Con Skins", desc: "Soft-touch custom skins for her gaming setup.", price: "₹599", id: "B09V7N7Z1H" },
        { title: "Aesthetic Gaming Headset", desc: "High-fidelity audio with cat-ear RGB attachments.", price: "₹4,500", id: "B0B5L7N6WS" }
      ]
    },
    luxury: {
      any: [
        { title: "Lindt Swiss Luxury Box", desc: "Exquisite heart-shaped box of melting chocolate truffles.", price: "₹850", id: "B00B9G6HTI" },
        { title: "Premium Red Roses Bouquet", desc: "10-stem long-life roses in a luxury ceramic vase.", price: "₹1,499", id: "fnp-roses" }
      ],
      female: [
        { title: "Aromatherapy Diffuser Kit", desc: "Ultrasonic diffuser with 10 essential oil scents.", price: "₹1,899", id: "B09V7N7Z1H" }
      ]
    }
  }

  // AI Matching Logic
  let cat = interest === 'reader' ? 'creative' : interest;
  let genderKey = recipient === 'male' || recipient === 'female' ? recipient : 'female';

  let pool = [...(productDatabase[cat]?.[genderKey] || []), ...(productDatabase.luxury.any)];

  // Refine by vibe
  if (vibe === 'romantic') pool = [...pool, ...productDatabase.luxury.any];

  // Randomize and select top 3
  return pool
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map(item => ({
      ...item,
      category: interest.toUpperCase(),
      why: `Matches the ${interest} interest and ${vibe} vibe perfectly!`,
      imageUrl: `https://images.unsplash.com/photo-${getUnsplashId(item.title)}?auto=format&fit=crop&w=600&q=80`,
      score: 95 + Math.floor(Math.random() * 5), // High AI match score
      platforms: [
        { name: "Amazon India", price: item.price, link: `https://www.amazon.in/s?k=${encodeURIComponent(item.title)}` },
        { name: "Flipkart", price: `₹${parseInt(item.price.replace(/[^\d]/g, '')) - 50}`, link: `https://www.flipkart.com/search?q=${encodeURIComponent(item.title)}` }
      ]
    }));
};

const getUnsplashId = (title) => {
  if (title.includes('Drone')) return '1508614589041-396be394014d';
  if (title.includes('Keyboard')) return '1511467687858-23d96c32e4ae';
  if (title.includes('Console')) return '1527219525722-f9767a7f28f4';
  if (title.includes('Camera')) return '1526170315830-ef18a6739032';
  if (title.includes('Lamp')) return '1534073828943-f801091bb18c';
  if (title.includes('Buds')) return '1505740420928-5e560c06d30e';
  if (title.includes('Pen')) return '1511300636408-a63a89df3482';
  if (title.includes('Sketching')) return '1513364776144-60967b0f800f';
  if (title.includes('Marker')) return '1511108690759-009324a903df';
  if (title.includes('Watercolor')) return '1541339907198-e08756ebafe1';
  if (title.includes('Journaling')) return '1531058285117-562a3b2b467e';
  if (title.includes('Hot Wheels')) return '1594731802114-2503d5b4c8d9';
  if (title.includes('Rose')) return '1582794543139-8ac9cb0f7b11';
  if (title.includes('Chocolate')) return '1549007994-cb92caebd54b';
  return '1513151233558-d860c5398176';
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

                    <div className="results-grid" style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                      gap: '2.5rem',
                      width: '100%'
                    }}>
                      {results.map((gift, idx) => (
                        <div key={gift.id} className="cartoon-card" style={{ position: 'relative' }}>
                          <div className="match-percentage">
                            {Math.round((gift.score / 15) * 100)}%
                          </div>
                          <div className="gift-image-container">
                            <img
                              src={gift.imageUrl}
                              alt={gift.title}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80"; // Fallback to a nice gift wrapping photo
                              }}
                            />
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
