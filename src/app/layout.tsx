import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/react"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "AI Quiz Generator",
  description: "Generate quizzes with the help of AI",
  openGraph: {
    title: "AI Quiz Generator",
    description: "Generate quizzes with the help of AI",
    type: "website",
    locale: "en_US",
    url: "https://ai-quiz-generator.vercel.app",
    images: [
      {
        url: "https://ai-quiz-generator.vercel.app/quiz.png",
        width: 800,
        height: 600,
        alt: "AI Quiz Generator",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
            style: {
              background: "var(--background)",
              color: "var(--foreground)",
            },
          }}
        />
      </body>
    </html>
  );
}
