import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UnreckAI | Paste Once. Works Everywhere.",
  description:
    "AI tools wreck your formatting. UnreckAI translates it back. 100% local, zero cloud, no AI calls.",
  openGraph: {
    title: "UnreckAI | Paste Once. Works Everywhere.",
    description:
      "Copy from ChatGPT, Claude, Gemini. Paste into Slack, Gmail, Notion. Native formatting, every time.",
    type: "website",
    url: "https://unreckai.com",
    locale: "en_US",
    siteName: "UnreckAI",
    images: [
      {
        url: "https://unreckai.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "UnreckAI: Paste Once. Works Everywhere.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UnreckAI | Paste Once. Works Everywhere.",
    description:
      "Copy from ChatGPT, Claude, Gemini. Paste into Slack, Gmail, Notion. Native formatting, every time.",
    images: ["https://unreckai.com/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
