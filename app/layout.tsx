import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RepSuite",
  description: "The central hub for RepStack, RepReport, RepOS, and RepGuard.",
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
