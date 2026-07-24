import type { Metadata } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";

const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "1184245643739344";

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
      <body>
        <Script id="meta-pixel" strategy="beforeInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
        </Script>
        {children}
      </body>
    </html>
  );
}
