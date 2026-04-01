import { useInterviewStore } from '../../store/interviewStore'
import { useNavigate } from 'react-router-dom'

export default function Review() {
  const { answers, questions } = useInterviewStore()
  const navigate = useNavigate()

  return (
    <div>
      <h1>Review Your Answers</h1>
      {answers.map((answer, i) => {
        const question = questions.find((q) => q.id === answer.questionId)
        const videoUrl = URL.createObjectURL(answer.videoBlob)
        const minutes = Math.floor(answer.durationSeconds / 60)
        const secs = answer.durationSeconds % 60

        return (
          <div key={i}>
            <h3>Q{i + 1}: {question?.text}</h3>
            <p>Duration: {minutes > 0 ? `${minutes}m ` : ''}{secs}s</p>
            <video src={videoUrl} controls />
          </div>
        )
      })}
      <button onClick={() => navigate('/')}>Start Over</button>
    </div>
  )
}
