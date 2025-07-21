"use client";

import { ThemeProvider } from "@emotion/react";
import { createTheme, CssBaseline } from "@mui/material";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren;

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export function App({ children }: Props) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
