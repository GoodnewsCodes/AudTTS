import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AudTTS - AI Voice Synthesis",
  description: "Convert text to lifelike speech with ElevenLabs AI.",
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
