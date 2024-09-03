// src/GlobalStyles.tsx

import React from 'react';
import { GlobalStyles as MUIGlobalStyles } from '@mui/material';

const GlobalStyles: React.FC = () => (
  <MUIGlobalStyles
    styles={(theme) => ({
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: 'Roboto',
        margin: 0,
        padding: 0,
        boxSizing: 'border-box',
        height: '100%',
      },
      html: {
        height: '100%',
      },
      '#root': {
        height: '100%',
      },
    })}
  />
);

export default GlobalStyles;