import ThemeProvider from './context/ThemeProvider'
import AuthProvider from './context/AuthProvider'
import AppRoutes from './routes/AppRoutes'
import ThemedToastContainer from './components/common/ThemedToastContainer'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRoutes />
        <ThemedToastContainer />
      </AuthProvider>
    </ThemeProvider>
  )
}
