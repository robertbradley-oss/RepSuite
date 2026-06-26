import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://repsuite.vercel.app"),
  title: "RepSuite",
  description: "The central hub for RepStack, RepReport, RepOS, and RepGuard.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "RepSuite",
    description: "All your Rep tools. One suite.",
    images: ["/repsuite-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
