import React from 'react'
import questionsData from '../data/questions.json'

const Questions = ({ currentIndex, onAnswer }) => {
    const currentQuestion = questionsData[currentIndex]

    return (
        <div className="cartoon-card" style={{ width: '100%', maxWidth: '600px' }}>
            <div className="progress-container">
                <div
                    className="progress-fill"
                    style={{ width: `${((currentIndex + 1) / questionsData.length) * 100}%` }}
                ></div>
            </div>

            <div style={{ marginBottom: '2.5rem' }}>
                <span className="badge-tag">STEP {currentIndex + 1} OF {questionsData.length}</span>
                <h2 style={{ fontSize: '2.4rem', marginTop: '1rem' }}>
                    {currentQuestion.question}
                </h2>
            </div>

            <div className="options-list">
                {currentQuestion.options.map((option, idx) => (
                    <button
                        key={idx}
                        className="option-bubble"
                        onClick={() => onAnswer(currentQuestion.id, option.value)}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Questions
