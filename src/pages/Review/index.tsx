import { useInterviewStore } from '../../store/interviewStore'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Typography,
} from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import ReplayIcon from '@mui/icons-material/Replay'
import './Review.scss'

export default function Review() {
  const { answers, questions } = useInterviewStore()
  const navigate = useNavigate()

  if (answers.length === 0) {
    return (
      <Container maxWidth="md">
        <Box className="review-root">
          <Typography variant="h4" fontWeight={600}>Review Your Answers</Typography>
          <Typography color="text.secondary">No answers recorded yet.</Typography>
          <Button variant="contained" onClick={() => navigate('/')}>Go to Home</Button>
        </Box>
      </Container>
    )
  }

  return (
    <Container maxWidth="md">
      <Box className="review-root">
        <Typography variant="h4" fontWeight={600}>
          Review Your Answers
        </Typography>

        <Divider />

        {answers.map((answer, i) => {
          const question = questions.find((q) => q.id === answer.questionId)
          const videoUrl = URL.createObjectURL(answer.videoBlob)
          const minutes = Math.floor(answer.durationSeconds / 60)
          const secs = answer.durationSeconds % 60

          return (
            <Card key={i} elevation={2} sx={{ borderRadius: 2 }}>
              <CardContent className="review-card-content">
                <Box className="review-card-header">
                  <Typography variant="h6">
                    Q{i + 1}: {question?.text}
                  </Typography>
                  <Chip
                    icon={<AccessTimeIcon />}
                    label={`${minutes > 0 ? `${minutes}m ` : ''}${secs}s`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Box
                  component="video"
                  src={videoUrl}
                  controls
                  className="review-video"
                />
              </CardContent>
            </Card>
          )
        })}

        <Box className="review-actions">
          <Button
            variant="outlined"
            startIcon={<ReplayIcon />}
            onClick={() => navigate('/')}
          >
            Start Over
          </Button>
        </Box>
      </Box>
    </Container>
  )
}
