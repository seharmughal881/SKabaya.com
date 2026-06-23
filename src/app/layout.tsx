import type { Metadata } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Inter,
  Poppins,
} from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-label",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://skabaya.com"),
  title: {
    default: "SK Abaya — Elegance in Modesty | Luxury Abaya Fashion House",
    template: "%s | SK Abaya",
  },
  description:
    "SK Abaya crafts handcrafted luxury abayas where modesty meets timeless elegance. Premium Nida fabrics, signature gold embroidery, and bespoke tailoring — shipped worldwide.",
  keywords: [
    "luxury abaya",
    "premium abaya",
    "designer abaya",
    "modest fashion",
    "black abaya",
    "Eid collection",
    "bridal abaya",
    "SK Abaya",
  ],
  openGraph: {
    title: "SK Abaya — Elegance in Modesty",
    description:
      "Discover handcrafted abayas designed for women who embrace elegance, confidence, and sophistication.",
    type: "website",
    locale: "en_US",
    siteName: "SK Abaya",
  },
  twitter: {
    card: "summary_large_image",
    title: "SK Abaya — Elegance in Modesty",
    description:
      "Handcrafted luxury abayas. Premium Nida fabrics, signature gold embroidery, bespoke tailoring.",
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
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-ivory">
        {children}
      </body>
    </html>
  );
}
