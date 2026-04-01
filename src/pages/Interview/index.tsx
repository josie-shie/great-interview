import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInterviewStore } from '../../store/interviewStore'
import { useTimer } from '../../hooks/useTimer'
import { useMediaRecorder } from '../../hooks/useMediaRecorder'

export default function Interview() {
  const navigate = useNavigate()
  const { questions, currentIndex, nextQuestion, addAnswer } = useInterviewStore()
  const { seconds, start, stop, reset } = useTimer()
  const { isRecording, videoBlob, startRecording, stopRecording, resetRecording } = useMediaRecorder()
  const videoPreviewRef = useRef<HTMLVideoElement>(null)

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1

  useEffect(() => {
    const begin = async () => {
      const stream = await startRecording()
      if (videoPreviewRef.current) {
        videoPreviewRef.current.srcObject = stream
      }
      start()
    }
    begin()
  }, [currentIndex])

  useEffect(() => {
    if (videoBlob) {
      addAnswer({ questionId: currentQuestion?.id, videoBlob, durationSeconds: seconds })
      resetRecording()
      if (isLastQuestion) {
        navigate('/review')
      } else {
        nextQuestion()
      }
    }
  }, [videoBlob])

  const handleNext = () => {
    stop()
    stopRecording()
  }

  if (!currentQuestion) return null

  return (
    <div>
      <h2>Question {currentIndex + 1} / {questions.length}</h2>
      <p>{currentQuestion.text}</p>
      <p>Time: {seconds}s</p>
      <video ref={videoPreviewRef} autoPlay muted playsInline />
      <button onClick={handleNext}>
        {isLastQuestion ? 'Finish' : 'Next'}
      </button>
    </div>
  )
}
