import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInterviewStore } from '../../store/interviewStore'
import { useTimer } from '../../hooks/useTimer'
import { useMediaRecorder } from '../../hooks/useMediaRecorder'
import {
  Box,
  Button,
  Chip,
  Container,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material'
import TimerIcon from '@mui/icons-material/Timer'
import './Interview.scss'

export default function Interview() {
  const navigate = useNavigate()
  const { questions, currentIndex, nextQuestion, addAnswer } = useInterviewStore()
  const { seconds, start, stop } = useTimer()
  const { videoBlob, startRecording, stopRecording, resetRecording } = useMediaRecorder()
  const videoPreviewRef = useRef<HTMLVideoElement>(null)

  const currentQuestion = questions[currentIndex]
  const isLastQuestion = currentIndex === questions.length - 1
  const progress = ((currentIndex + 1) / questions.length) * 100

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
    <Container maxWidth="md">
      <Box className="interview-root">
        <Box className="interview-header">
          <Typography variant="subtitle1" color="text.secondary">
            Question {currentIndex + 1} / {questions.length}
          </Typography>
          <Chip icon={<TimerIcon />} label={`${seconds}s`} variant="outlined" color="primary" />
        </Box>

        <LinearProgress className="interview-progress" variant="determinate" value={progress} />

        <Paper className="interview-question-card" elevation={2}>
          <Typography variant="h6">{currentQuestion.text}</Typography>
        </Paper>

        <Box
          component="video"
          ref={videoPreviewRef}
          autoPlay
          muted
          playsInline
          className="interview-video"
        />

        <Box className="interview-actions">
          <Button variant="contained" size="large" onClick={handleNext}>
            {isLastQuestion ? 'Finish' : 'Next'}
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
