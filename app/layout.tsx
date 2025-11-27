"use client"

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/layout/AppLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated, getUserFromToken, logout } from "@/lib/auth";

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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // Pages that should NOT show the sidebar
  const authPages = ['/auth/login', '/auth/register'];
  const showSidebar = !authPages.includes(pathname);

  useEffect(() => {
    if (showSidebar) {
      if (!isAuthenticated()) {
        router.push('/auth/login');
        return;
      }

      const userData = localStorage.getItem('user');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    }
    setLoading(false);
  }, [pathname, router, showSidebar]);

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    router.push('/auth/login');
  };

  if (loading && showSidebar) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div className="flex items-center justify-center min-h-screen">
            <p className="text-lg">Loading...</p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {showSidebar ? (
          <SidebarProvider>
            <div className="flex h-screen w-full">
              <AppSidebar currentUser={currentUser} onLogout={handleLogout} />
              <main className="flex-1 flex flex-col overflow-hidden">
                <header className="border-b p-4">
                  <SidebarTrigger />
                </header>
                <div className="flex-1 overflow-auto p-6">
                  {children}
                </div>
              </main>
            </div>
          </SidebarProvider>
        ) : (
          children
        )}
      </body>
    </html>
  );
}