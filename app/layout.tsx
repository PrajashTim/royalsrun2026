import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "royalsrun.local";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return {
    metadataBase: new URL(`${protocol}://${host}`),
    title: "Royals Run 2026 | Run for a Cause",
    description:
      "Join the 4th Annual Royals Run 10K, 5K, or 1K at Burke Lake Park on August 15, 2026.",
    openGraph: {
      title: "Royals Run 2026 | Run for a Cause",
      description:
        "10K, 5K, and 1K Run/Walk at Burke Lake Park on August 15, 2026.",
      type: "website",
      images: [
        {
          url: "/og.png",
          width: 1760,
          height: 920,
          alt: "Royals Run 2026 — Run for a Cause",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Royals Run 2026 | Run for a Cause",
      description: "10K, 5K, and 1K Run/Walk at Burke Lake Park on August 15, 2026.",
      images: ["/og.png"],
    },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
  };
}

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
