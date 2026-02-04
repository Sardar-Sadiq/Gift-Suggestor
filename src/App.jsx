import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import questionsData from './data/questions.json'
import { generateAiSuggestions } from './utils/suggestionEngine'

// Components
import Header from './components/Header'
import Footer from './components/Footer'
import Landing from './components/Landing'
import Questions from './components/Questions'
import Loading from './components/Loading'
import Results from './components/Results'

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
        <Header onLogoClick={handleReset} />

        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div ref={pageRef} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            {step === 'landing' && <Landing onStart={handleStart} />}

            {step === 'questions' && (
              <Questions
                currentIndex={currentQuestionIndex}
                onAnswer={handleAnswer}
              />
            )}

            {step === 'results' && (
              <div style={{ width: '100%' }}>
                {isLoading ? <Loading /> : <Results results={results} onReset={handleReset} />}
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default App
