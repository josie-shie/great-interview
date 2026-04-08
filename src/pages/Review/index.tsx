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

export default function Review() {
  const { answers, questions } = useInterviewStore()
  const navigate = useNavigate()

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" gap={3} py={4}>
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
              <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={1}>
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
                  sx={{ width: '100%', borderRadius: 1, bgcolor: 'black' }}
                />
              </CardContent>
            </Card>
          )
        })}

        <Box display="flex" justifyContent="flex-end">
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
