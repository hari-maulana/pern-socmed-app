import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ThemeProvider } from '@emotion/react'
import { theme } from './Themes.tsx'
import { Box, CssBaseline, GlobalStyles } from '@mui/material'
import { Height } from '@mui/icons-material'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles
      styles={(theme) => ({
        body: {
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary,
          fontFamily: 'Roboto',
          margin: 0,
          padding: 0,
          boxSizing: 'border-box',
          Height: '100%',
        },
        html: {
          Height: '100%',
        },
        '#root': {
          Height: '100%',
        },
      })}
    />
    <Box sx={{ minHeight: '100%' }}>
    <App />
    </Box>
    </ThemeProvider>
  </React.StrictMode>,
)
