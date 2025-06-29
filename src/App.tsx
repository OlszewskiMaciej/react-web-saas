import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import router from './routes/AppRoutes'
import { Box, CssBaseline } from '@mui/material'
import './i18n/i18n'
import { Toaster } from 'sonner'

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <CssBaseline />
          <Toaster 
            position="top-right" 
            richColors 
            closeButton
            toastOptions={{
              duration: 4000,
              className: 'toast-custom-class',
            }}
          />
          <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column' }}>
            <RouterProvider router={router} />
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  )
}

export default App
