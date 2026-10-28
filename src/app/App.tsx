import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { AboutPage } from '../pages/AboutPage'
import { AwarenessPage } from '../pages/AwarenessPage'
import { ClassifyPage } from '../pages/ClassifyPage'
import { DashboardPage } from '../pages/DashboardPage'
import { HomePage } from '../pages/HomePage'
import { ReportPage } from '../pages/ReportPage'
import { SurveyPage } from '../pages/SurveyPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePage />} />
        <Route path="classify" element={<ClassifyPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="survey" element={<SurveyPage />} />
        <Route path="report" element={<ReportPage />} />
        <Route path="awareness" element={<AwarenessPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}