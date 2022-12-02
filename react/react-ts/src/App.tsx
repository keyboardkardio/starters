import { Helmet, HelmetProvider } from 'react-helmet-async';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Router from 'src/Router';
import Toasts from './components/Toast';
import ThemeProvider from 'src/ThemeProvider';
import { ToastContextProvider } from './contexts/ToastContext';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
    return (
      <HelmetProvider>
        <Helmet>
          <title>React-TS Starter</title>
        </Helmet>
        <ThemeProvider>
          <ToastContextProvider>
            <Box
              sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <Container maxWidth='md'>
                <Toasts />
                <Router />
              </Container>
            </Box>
          </ToastContextProvider>
        </ThemeProvider>
      </HelmetProvider>
    );
}
