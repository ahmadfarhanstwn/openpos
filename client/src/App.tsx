import { useMemo } from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { themeSettings } from './theme';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Layout from './components/Layout';
import DashboardPage from './pages/modules/Dashboard/DashboardPage';
import UnauthorizePage from './pages/UnauthorizedPage';
import AuthMiddleware from './components/AuthMiddleware';
import ProductPage from './pages/modules/Products/ProductPage';
import CashierPage from './pages/modules/Cashier/CashierPage';

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
            <Route path="/unauthorized" element={<UnauthorizePage />} />
          </Routes>
          <Routes>
            <Route element={<Layout />}>
              <Route element={<AuthMiddleware allowedUser={['super_admin', 'management']} />}>
                <Route path='/dashboard' element={<DashboardPage />} />
                <Route path='/products' element={<ProductPage />} />
                <Route path='/cashier' element={<CashierPage />} />
              </Route>
            </Route>
          </Routes>
        </ThemeProvider>  
      </BrowserRouter>
    </div>
  )
}

export default App
