import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProductFormPage } from './pages/ProductFormPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-[#0a0a0b] text-[#e8ff47]">Cargando...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/products/new" 
        element={
          <ProtectedRoute>
            <ProductFormPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/products/edit/:id" 
        element={
          <ProtectedRoute>
            <ProductFormPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App
