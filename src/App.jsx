import { Navigate, Route, Routes } from 'react-router'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import QuestionsPage from './pages/QuestionsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<DashboardPage />} />
        <Route path="questions" element={<QuestionsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
