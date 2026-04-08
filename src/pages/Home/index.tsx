import { useNavigate } from 'react-router-dom'
import { useInterviewStore } from '../../store/interviewStore'
import { questions } from '../../data/questions'
import { Box, Button, Container, Typography } from '@mui/material'

export default function Home() {
  const navigate = useNavigate()
  const { setQuestions, reset } = useInterviewStore()

  const handleStart = () => {
    reset()
    setQuestions(questions)
    navigate('/interview')
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        gap={3}
        textAlign="center"
      >
        <Typography variant="h3" fontWeight={600}>
          Great Interview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Are you ready? Click start and the system will ask you questions one by one while recording your answers.
        </Typography>
        <Button variant="contained" size="large" onClick={handleStart}>
          Start Interview
        </Button>
      </Box>
    </Container>
  )
}
