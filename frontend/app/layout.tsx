import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import NavBar from "@/components/NavBar";
import { BackgroundBeams } from "@/components/BackgroundBeams";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ShopBlues",
  description: "Something about ShopBlues",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          // disableTransitionOnChange
        >
          <NavBar />
          {children}
          {/* <BackgroundBeams className="-z-[10]"/> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
