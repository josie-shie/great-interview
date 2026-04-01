import { useState, useRef, useCallback } from 'react'

export function useTimer() {
  const [seconds, setSeconds] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = useCallback(() => {
    setSeconds(0)
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
  }, [])

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const reset = useCallback(() => {
    stop()
    setSeconds(0)
  }, [stop])

  return { seconds, start, stop, reset }
}
