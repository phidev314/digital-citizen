import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Citizen & Citizen Journalism | Notebook Editorial UT Semester 3",
  description:
    "Media Pembelajaran Digital Interaktif Berformat Notebook Editorial: Perbedaan dan Karakteristik Digital Citizen serta Citizen Journalism - Tugas 2 Mata Kuliah Belajar di Era Digital (MKDI4202) Universitas Terbuka Semester 3 oleh Luthfy Rahmani (NIM: 056385504) UPBJJ-UT Bandung.",
  keywords: [
    "Digital Citizen",
    "Citizen Journalism",
    "Universitas Terbuka",
    "Belajar di Era Digital",
    "MKDI4202",
    "Warga Digital",
    "Jurnalisme Warga",
    "Notebook Tabs",
    "Luthfy Rahmani",
    "056385504",
    "UPBJJ UT Bandung",
  ],
  authors: [{ name: "Luthfy Rahmani (NIM: 056385504) - UPBJJ-UT Bandung" }],
};

export const viewport: Viewport = {
  themeColor: "#2d2d2d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth bg-[#2d2d2d]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=JetBrains+Mono:ital,wght@0,400..800;1,400..800&display=swap"
        />
      </head>
      <body className="min-h-[100dvh] bg-[#2d2d2d] text-[#1a1a1a] antialiased selection:bg-[#98d4bb] selection:text-[#1a1a1a]">
        {children}
      </body>
    </html>
  );
}
