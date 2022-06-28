import '../styles/globals.css'
import "../styles/style.css"
import type { AppProps } from 'next/app'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    text: {
      primary: '#00ff00',
    }
  },
});

function MyApp({ Component, pageProps }: AppProps) {

  return (

      
        <ThemeProvider theme={theme}>
          <Component {...pageProps}/>
        </ThemeProvider>

  )
}

export default MyApp
