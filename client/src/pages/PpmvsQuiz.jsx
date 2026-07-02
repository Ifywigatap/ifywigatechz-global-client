import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { QUIZ_QUESTIONS } from '../data/ppmvsQuizData'

export default function PpmvsQuiz() {
  const [currentQ, setCurrentQ] = useState(0)
  // Store answers as an array of objects for more clarity
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0)
  const [score, setScore] = useState(null)
  const [selectedOption, setSelectedOption] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const question = QUIZ_QUESTIONS[currentQ]

  const handleAnswer = (optionIndex) => {
    if (showExplanation) return // Prevent answering again

    setSelectedOption(optionIndex)
    setShowExplanation(true)

    const isCorrect = optionIndex === question.correctOptionIndex
    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1)
    }
  }

  const handleNext = () => {
    setShowExplanation(false)
    setSelectedOption(null)

    if (currentQ < QUIZ_QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      // Quiz finished, calculate score
      const finalScore = Math.round((correctAnswersCount / QUIZ_QUESTIONS.length) * 100)
      setScore(finalScore)
    }
  }

  const getButtonClass = (i) => {
    let classes = 'w-full rounded-2xl border px-6 py-4 text-left transition '
    if (!showExplanation) {
      return classes + 'border-slate-600 bg-slate-900 text-slate-200 hover:border-amber-400 hover:bg-slate-800/50 hover:text-white disabled:opacity-50'
    }
    if (i === question.correctOptionIndex) {
      return classes + 'bg-green-500/20 border-green-500 text-white' // Correct answer
    }
    if (i === selectedOption) {
      return classes + 'bg-red-500/20 border-red-500 text-white' // Incorrect selection
    }
    return classes + 'border-slate-700 bg-slate-900 text-slate-400 opacity-60' // Other options
  }

  const restart = () => {
    setCurrentQ(0)
    setCorrectAnswersCount(0)
    setScore(null)
    setSelectedOption(null)
    setShowExplanation(false)
  }

  if (score !== null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-900 to-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-12 text-center shadow-2xl">
          <div className="text-6xl font-black bg-gradient-to-r from-amber-400 to-slate-100 bg-clip-text text-transparent mb-6">
            {score >= 80 ? '🎉' : score >= 60 ? '👍' : '📚'}
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Score: {score}%</h1>
          <p className="text-slate-300 mb-8">
            {score >= 70
              ? 'You’re ready to lead compliant NAPPMED and PPMVS practice.'
              : 'Review the modules and retake the quiz to strengthen your compliance knowledge.'}
          </p>
          <div className="flex-responsive">
            <button
              onClick={restart}
              className="flex-1 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 py-4 font-bold text-slate-950 shadow-xl hover:shadow-2xl transition"
            >
              Retake Quiz
            </button>
            <Link
              to="/ppmvs"
              className="flex-1 text-center rounded-2xl border border-white/20 bg-white/5 py-4 font-semibold text-white hover:bg-white/10 transition"
            >
              Back to PPMVS course
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950">
      <div className="container mx-auto px-6 py-12">
        <Link
          to="/ppmvs"
          className="mb-8 inline-flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-slate-300 hover:bg-slate-700"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back to PPMVS course
        </Link>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-4">
              NAPPMED / PPMVS Training Quiz
            </h1>
            <p className="text-xl text-slate-400">Question {currentQ + 1} of {QUIZ_QUESTIONS.length}</p>
          </div>
          <div className="rounded-3xl border border-slate-700 bg-slate-800/50 backdrop-blur-xl p-10 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">{question.question}</h2>
              <div className="space-y-3">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation}
                    className={getButtonClass(i)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showExplanation && (
                <div className="mt-6 p-4 rounded-xl bg-slate-700/50 border border-slate-600">
                  <p className="text-white font-bold mb-2">Explanation:</p>
                  <p className="text-slate-300">{question.explanation}</p>
                  <button
                    onClick={handleNext}
                    className="w-full mt-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 py-3 font-bold text-slate-950 shadow-lg hover:shadow-xl transition"
                  >
                    {currentQ < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Finish & See Score'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
