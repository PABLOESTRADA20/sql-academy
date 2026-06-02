import type { Metadata } from "next";
import { IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "sonner";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "SQL Academy - Aprende SQL y PostgreSQL",
    template: "%s | SQL Academy",
  },
  description: "Plataforma educativa gratuita para aprender SQL y PostgreSQL. Lecciones interactivas, ejercicios prácticos y simulador SQL en vivo.",
  keywords: ["SQL", "PostgreSQL", "base de datos", "aprender SQL", "tutorial SQL", "PostgreSQL tutorial"],
  authors: [{ name: "SQL Academy" }],
  openGraph: {
    title: "SQL Academy - Aprende SQL y PostgreSQL",
    description: "Plataforma educativa gratuita para aprender SQL y PostgreSQL.",
    url: "https://sql-academy.com",
    siteName: "SQL Academy",
    locale: "es_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Academy",
    description: "Aprende SQL y PostgreSQL desde cero.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${ibmPlexSans.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
