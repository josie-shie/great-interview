import { useNavigate } from 'react-router-dom'
import { useInterviewStore } from '../../store/interviewStore'
import { questions } from '../../data/questions'

export default function Home() {
  const navigate = useNavigate()
  const { setQuestions, reset } = useInterviewStore()

  const handleStart = () => {
    reset()
    setQuestions(questions)
    navigate('/interview')
  }

  return (
    <div>
      <h1>Great Interview</h1>
      <p>Are you ready? Click start and the system will ask you questions one by one while recording your answers.</p>
      <button onClick={handleStart}>Start Interview</button>
    </div>
  )
}
