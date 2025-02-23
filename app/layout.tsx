
import type { Metadata } from "next";
import "./globals.css";
import { Plus_Jakarta_Sans } from "next/font/google"
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "patient management system",
  description: "patient management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn("font-sans bg-dark-300 min-h-screen antialiased", fontSans.variable)}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
