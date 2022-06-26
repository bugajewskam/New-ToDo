import '../styles/globals.css'
import "../styles/style.css"
import type { AppProps } from 'next/app'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          color: "primary"
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "primary"
        }
      }
    }
  }

});

const color = createTheme({
  palette: {
    primary: {
      main: "hsl(300, 80%, 50%)",
    },
  },
  typography: {
    fontFamily: 'Josefin Sans',
    fontSize: 18,
  }
})

function MyApp({ Component, pageProps }: AppProps) {

  return (

      <ThemeProvider theme={theme}>
        <ThemeProvider theme={color}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ThemeProvider>
  )
}

export default MyApp
