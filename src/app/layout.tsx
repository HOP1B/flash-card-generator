"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import { SideBar } from "./components/Home-sideBar";
import { useParams, usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const {topicId} = useParams();
  const noLayoutPages = [`/topics/${topicId}/flashcard`, `/topics/${topicId}/questions`];
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className="flex">
            {!noLayoutPages.includes(pathname) && (
              <SignedIn>
                <SideBar />
              </SignedIn>
            )}
            {children}
          </div>
          <Toaster richColors />
          
        </body>
      </html>
    </ClerkProvider>
  );
}
