import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scott Maiwald Portfolio - UI/UX/AI Expert and Consultant",
  description: "Portfolio of Scott Maiwald: Expert in UI/UX Design, Artificial Intelligence, and Product Innovation. Building autonomous AI workflows and beautifully designed user experiences.",
  keywords: ["Scott Maiwald", "UI/UX Designer", "AI Expert", "AI Consultant", "Product Innovation", "Web Design", "UX Research", "AI Agents", "Next.js Portfolio"],
  authors: [{ name: "Scott Maiwald" }],
  creator: "Scott Maiwald",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scottmaiwald.com",
    title: "Scott Maiwald - UI/UX/AI Expert and Consultant",
    description: "Expert in UI/UX Design, Artificial Intelligence, and Product Innovation. Building autonomous AI workflows and beautifully designed user experiences.",
    siteName: "Scott Maiwald Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scott Maiwald - UI/UX/AI Expert and Consultant",
    description: "Expert in UI/UX Design, Artificial Intelligence, and Product Innovation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body 
        className="min-h-full flex flex-col"
        suppressHydrationWarning
      >{children}</body>
    </html>
  );
}
