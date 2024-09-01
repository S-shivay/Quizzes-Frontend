import { Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './pages/register'
import MainLayout from './pages/mainLayout'
import Dashboard from './pages/dashboard'
import Sidebar from './pages/sidebar'
import Analytics from './pages/analytics'
import CreateQuiz from './pages/createQuiz'
import QuizForm from './pages/quizForm'

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}/>
      <Route path="register" element={<Register/>}/>
      <Route path="dashboard" element={<Dashboard/>}/>
      <Route path="sidebar" element={<Sidebar/>}/>
      <Route path="/analytics/:id" element={<Analytics/>} />
      <Route path="createQuiz" element={<CreateQuiz/>}/>
      <Route path="QuizForm" element={<QuizForm/>}/>
    </Routes>
  )
}

export default App
