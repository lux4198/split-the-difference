import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "yellow",
  white: "#ede7e6",
  headings: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: "400",
    textWrap: "wrap",
  },
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Split The Difference",
  description: "Expense sharing made easy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className + " overflow-hidden"}>
        <MantineProvider theme={theme} defaultColorScheme="light">
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
