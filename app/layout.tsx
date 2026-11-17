import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ViceFolio — Your GTA VI Field Guide",
  description: "Explore Leonida, find vehicles and weapons, plan your next payday and keep your discoveries together.",
  manifest: "/site.webmanifest?v=2",
  icons: {
    icon: [
      { url: "/favicon.ico?v=1" },
      { url: "/assets/icons/vicefolio-city-32-v1.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=1",
    apple: [{ url: "/assets/icons/vicefolio-city-180-v1.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className="antialiased">{children}</body></html>;
}
