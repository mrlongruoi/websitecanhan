import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Script from "next/script";
import { AppSidebar } from "@/components/app-sidebar";
import SidebarToggle from "@/components/SidebarToggle";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SanityLive } from "@/sanity/lib/live";
import { FloatingDock } from "@/components/FloatingDock";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mr Long",
  description: "Website cá nhân của mr Long",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Script
            src="https://cdn.platform.openai.com/deployments/chatkit/chatkit.js"
            strategy="afterInteractive"
          />
          <SidebarProvider defaultOpen={false}>
            <SidebarInset>
              {children}
            </SidebarInset>

            <AppSidebar side="right" />

            <FloatingDock />

            <SidebarToggle />
            
          </SidebarProvider>

          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
