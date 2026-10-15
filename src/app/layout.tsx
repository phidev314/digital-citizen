import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Digital Citizen & Citizen Journalism | Media Pembelajaran UT Semester 3",
  description:
    "Media Pembelajaran Digital Interaktif: Perbedaan dan Karakteristik Digital Citizen serta Citizen Journalism - Tugas Mata Kuliah Belajar di Era Digital, Universitas Terbuka Semester 3.",
  keywords: [
    "Digital Citizen",
    "Citizen Journalism",
    "Universitas Terbuka",
    "Belajar di Era Digital",
    "MKWU4109",
    "Warga Digital",
    "Jurnalisme Warga",
  ],
  authors: [{ name: "Mahasiswa Universitas Terbuka" }],
};

export const viewport: Viewport = {
  themeColor: "#0F766E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col antialiased selection:bg-teal-100 selection:text-teal-900">
        {children}
      </body>
    </html>
  );
}
