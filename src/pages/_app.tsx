import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Source_Serif_4, Inter } from "next/font/google";

/**
 * Fonts are loaded here and nowhere else.
 *
 * Previously every page declared its own font stack inline — 146 uses of
 * font-display plus a four-deep serif stack on the Discovery
 * Lab page — and nothing was ever actually loaded. Browsers fell through to
 * Georgia on macOS and to something else everywhere else, so the site
 * rendered differently on every device.
 *
 * next/font self-hosts the files, generates the @font-face rules, and sets
 * font-display: swap with a size-adjusted fallback, so there is no layout
 * shift while they load and no request to Google at runtime.
 */

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${serif.variable} ${sans.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
