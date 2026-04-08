import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import Home from './pages/Home'
import Interview from './pages/Interview'
import Review from './pages/Review'

const theme = createTheme({
  palette: {
    primary: { main: '#aa3bff' },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
