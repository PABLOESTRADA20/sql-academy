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
  keywords: ["SQL", "PostgreSQL", "base de datos", "aprender SQL", "tutorial SQL", "PostgreSQL tutorial", "curso SQL", "SQL online"],
  authors: [{ name: "SQL Academy", url: "https://sql-academy.com" }],
  creator: "SQL Academy",
  publisher: "SQL Academy",
  metadataBase: new URL("https://sql-academy.com"),
  openGraph: {
    title: "SQL Academy - Aprende SQL y PostgreSQL",
    description: "Plataforma educativa gratuita para aprender SQL y PostgreSQL. Lecciones interactivas, ejercicios prácticos y simulador SQL en vivo.",
    url: "https://sql-academy.com",
    siteName: "SQL Academy",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SQL Academy - Aprende SQL y PostgreSQL",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "SQL Academy - Aprende SQL y PostgreSQL",
    description: "Plataforma educativa gratuita para aprender SQL y PostgreSQL con lecciones interactivas.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: "https://sql-academy.com",
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
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg"
            >
              Saltar al contenido principal
            </a>
            <Header />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
