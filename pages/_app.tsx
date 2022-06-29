import "../styles/globals.css";
import "../styles/style.css";
import type { AppProps } from "next/app";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "hsl(236, 9%, 61%)",
    },
    text: {
      primary: "hsl(236, 2%, 51%)",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
