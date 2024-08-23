
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { ThemeProvider } from '@emotion/react';
import { theme } from './Themes.tsx';
import { Box, CssBaseline } from '@mui/material';
import GlobalStyles from './GlobalStyles.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Box sx={{ minHeight: '100%' }}>
        <App />
      </Box>
    </ThemeProvider>
  </React.StrictMode>,
);
