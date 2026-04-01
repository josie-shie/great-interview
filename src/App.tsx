import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Interview from './pages/Interview'
import Review from './pages/Review'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/interview" element={<Interview />} />
        <Route path="/review" element={<Review />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
