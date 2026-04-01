import { useState, useRef, useCallback } from 'react'

export function useMediaRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  const startRecording = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    streamRef.current = stream
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder
    chunksRef.current = []

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunksRef.current.push(e.data)
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      setVideoBlob(blob)
    }

    mediaRecorder.start()
    setIsRecording(true)
    return stream
  }, [])

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop()
    streamRef.current?.getTracks().forEach((t) => t.stop())
    setIsRecording(false)
  }, [])

  const resetRecording = useCallback(() => {
    setVideoBlob(null)
  }, [])

  return { isRecording, videoBlob, startRecording, stopRecording, resetRecording }
}
