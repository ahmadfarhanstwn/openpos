import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { themeSettings } from './theme';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <div className='app'>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </ThemeProvider>  
      </BrowserRouter>
    </div>
  )
}

export default App
