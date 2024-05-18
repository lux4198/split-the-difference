import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";

import {
  Card,
  ColorSchemeScript,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  colors: {
    "ocean-blue": [
      "#7AD1DD",
      "#5FCCDB",
      "#44CADC",
      "#2AC9DE",
      "#1AC2D9",
      "#11B7CD",
      "#09ADC3",
      "#0E99AC",
      "#128797",
      "#147885",
    ],
  },
  primaryColor: "ocean-blue",
  primaryShade: 7,
  white: "#ffffff",
  headings: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "400",
    textWrap: "wrap",
  },
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Split The Difference",
  description: "Expense sharing made simple.",
};

export default function RootLayout({ children }) {
  return (
    <SessionProvider>
      <Analytics />
      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <body className={inter.className}>
          <MantineProvider theme={theme} defaultColorScheme="light">
            {children}
          </MantineProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
