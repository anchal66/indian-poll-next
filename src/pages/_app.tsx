import React from 'react';
import { AppProps } from 'next/app';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { SnackbarProvider } from '../context/SnackbarContext';
import '../styles/globals.css'; // Import global styles here

let theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
    background: {
      default: '#1a1a1a',  // Slightly lighter than pure black
      paper: '#2e2e2e',    // Slightly lighter than pure black
    },
    text: {
      primary: '#ffffff',
      secondary: '#bbbbbb',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
});

theme = responsiveFontSizes(theme);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CssBaseline />
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
