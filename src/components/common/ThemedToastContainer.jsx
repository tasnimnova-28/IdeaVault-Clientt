import { ToastContainer } from 'react-toastify'
import useTheme from '../../hooks/useTheme'

// Mounted once for the whole app. Later batches call toast.success() / toast.error()
export default function ThemedToastContainer() {
  const { theme } = useTheme()

  return <ToastContainer position="top-right" autoClose={3500} theme={theme} newestOnTop />
}
