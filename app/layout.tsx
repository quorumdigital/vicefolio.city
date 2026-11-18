import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vicefolio.city"),

  title: "GTA VI Interactive Map, Vehicles & Guides | ViceFolio",

  description:
    "Explore GTA VI with interactive maps, vehicles, weapons, money guides, Leonida locations, UFO mysteries and more. Your ultimate GTA 6 field guide.",

  alternates: {
    canonical: "/",
  },

  manifest: "/site.webmanifest?v=2",

  icons: {
    icon: [
      { url: "/favicon.ico?v=1" },
      {
        url: "/assets/icons/vicefolio-city-32-v1.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: "/favicon.ico?v=1",
    apple: [
      {
        url: "/assets/icons/vicefolio-city-180-v1.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
