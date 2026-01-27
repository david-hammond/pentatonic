import { useState, useEffect, useRef, useCallback } from 'react'

const EXERCISE_DURATION = 600 // 10 minutes in seconds

export function useObjectWriting(prompts) {
  const [currentPrompt, setCurrentPrompt] = useState('')
  const [timeLeft, setTimeLeft] = useState(EXERCISE_DURATION)
  const [isRunning, setIsRunning] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const previousPromptRef = useRef('')
  const timerRef = useRef(null)

  const getRandomPrompt = useCallback(() => {
    if (!prompts || prompts.length === 0) return ''
    if (prompts.length === 1) return prompts[0]

    let newPrompt
    do {
      newPrompt = prompts[Math.floor(Math.random() * prompts.length)]
    } while (newPrompt === previousPromptRef.current)

    previousPromptRef.current = newPrompt
    return newPrompt
  }, [prompts])

  const startExercise = useCallback(() => {
    setCurrentPrompt(getRandomPrompt())
    setTimeLeft(EXERCISE_DURATION)
    setIsRunning(true)
    setIsComplete(false)
  }, [getRandomPrompt])

  const getNewPrompt = useCallback(() => {
    setCurrentPrompt(getRandomPrompt())
  }, [getRandomPrompt])

  const restartTimer = useCallback(() => {
    setTimeLeft(EXERCISE_DURATION)
    setIsComplete(false)
    setIsRunning(true)
  }, [])

  const reset = useCallback(() => {
    setCurrentPrompt('')
    setTimeLeft(EXERCISE_DURATION)
    setIsRunning(false)
    setIsComplete(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            setIsComplete(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isRunning])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return {
    currentPrompt,
    timeLeft,
    formattedTime: formatTime(timeLeft),
    isRunning,
    isComplete,
    startExercise,
    getNewPrompt,
    restartTimer,
    reset,
  }
}
