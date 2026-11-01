import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

// Official Brand Font: Manrope (from Talukder Finance Brand Identity.pdf)
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Talukdar Finance | Australian Finance Brokerage",
  description:
    "Tailored lending solutions for home loans, car loans, personal loans, business finance, and refinancing across Australia.",
  icons: {
    icon: [
      {
        url: "/Talukder Finance/Talukder-Finance-Favicon.png",
        type: "image/png",
      },
    ],
    shortcut: "/Talukder Finance/Talukder-Finance-Favicon.png",
    apple: "/Talukder Finance/Talukder-Finance-Favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#02376D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--color-brand-text)] font-sans">
        {children}
      </body>
    </html>
  );
}
