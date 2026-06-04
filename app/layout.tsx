import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://umrahthailand.com"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-mark-192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: { url: "/apple-touch-icon-180.png", sizes: "180x180" },
  },
  title: {
    default: "คู่มืออุมเราะห์และฮัจญ์ ฉบับสมบูรณ์ พร้อมดุอาอ์และหลักฐาน | Umrah Thailand",
    template: "%s | Umrah Thailand",
  },
  description:
    "ศูนย์รวมความรู้การทำอุมเราะห์และฮัจญ์สำหรับมุสลิมไทย อธิบายทุกขั้นตอนพร้อมดุอาอ์ภาษาอาหรับ คำอ่าน ความหมาย และหลักฐานจากอัลกุรอานและสุนนะฮ์",
  keywords: ["วิธีทำอุมเราะห์", "ขั้นตอนอุมเราะห์", "ดุอาอ์อุมเราะห์", "วิธีทำฮัจญ์", "ตะวาฟ", "สะแอ", "มิกอต", "อิหรอม"],
  openGraph: {
    title: "คู่มืออุมเราะห์และฮัจญ์ ฉบับสมบูรณ์ พร้อมดุอาอ์และหลักฐาน",
    type: "website",
    locale: "th_TH",
    siteName: "Umrah Thailand",
  },
  robots: { index: true, follow: true },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Umrah Thailand",
  url: "https://umrahthailand.com",
  inLanguage: "th",
  description: "ศูนย์รวมความรู้การทำอุมเราะห์และฮัจญ์สำหรับมุสลิมไทย",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+Thai:wght@400;500;600;700&family=Anuphan:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
