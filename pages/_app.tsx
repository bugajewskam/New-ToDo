import "../styles/globals.css";
import "../styles/style.css";
import type { AppProps } from "next/app";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import React, { useState, useMemo, useEffect, useCallback } from "react";
// export const ModeContext = React.createContext({mode: string as Mode, setMode: ()=>{}
// })
export const ColorModeContext = React.createContext({
  value: "light",
  toggleColorMode: () => {},
});

export type Mode = "light" | "dark";
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    
    primary: {
      main: "hsl(236, 9%, 61%)",
    },
    text: {
      primary: "hsl(236, 2%, 51%)",
    },
  },
});
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "hsl(235, 21%, 11%)",
    },
    text: {
      primary: "hsl(236, 33%, 92%)",
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [mode, setMode] = useState<Mode>("light");
  const toggleColorMode = useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  const theme = useMemo(
    () => (mode === "dark" ? darkTheme : lightTheme),
    [mode]
  );

  useEffect(() => {
    document.body.className = mode;
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ value: mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default MyApp;
