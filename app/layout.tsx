"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/layout/AppLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated, getUserFromToken, logout } from "@/lib/auth";
import { Bell, ChevronDown, Sun, Moon } from "lucide-react";


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
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");


  const pathname = usePathname();
  const router = useRouter();

  // Pages that should NOT show the sidebar
  const authPages = ["/auth/login", "/auth/register"];
  const showSidebar = !authPages.includes(pathname);

  useEffect(() => {
    if (showSidebar) {
      if (!isAuthenticated()) {
        router.push("/auth/login");
        return;
      }

      const userData = localStorage.getItem("user");
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    }
    setLoading(false);
  }, [pathname, router, showSidebar]);


  useEffect(() => {
    const saved = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    const initial = saved ?? "system";
    setTheme(initial);
    const isDark =
      initial === "dark" ||
      (initial === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      document.documentElement.classList.toggle("dark", media.matches);
    };
    handleChange();
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme]);

  const setThemeMode = (mode: "light" | "dark" | "system") => {
    setTheme(mode);
    localStorage.setItem("theme", mode);
    const isDark =
      mode === "dark" ||
      (mode === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", isDark);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    router.push("/auth/login");
  };

  if (loading && showSidebar) {
    return (
      <html lang='en'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div className='flex items-center justify-center min-h-screen'>
            <p className='text-lg'>Loading...</p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
      >
        {showSidebar ? (
          <SidebarProvider>
            <div className='flex h-screen w-full max-w-[1400px] mx-auto p-4 gap-4 overflow-hidden'>
              <AppSidebar currentUser={currentUser} onLogout={handleLogout} />
              <main className='flex-1 flex flex-col overflow-hidden bg-card border border-border rounded-2xl shadow-sm'>
                <header className='border-b border-border p-4 flex items-center justify-between'>
                  <SidebarTrigger />
                  <div className='flex items-center gap-4'>
                    <div className='relative group'>
                      <button
                        className='text-slate-400 hover:text-slate-600 transition-colors'
                        title='Theme'
                      >
                        {theme === "dark" ? (
                          <Moon className='h-5 w-5' />
                        ) : theme === "light" ? (
                          <Sun className='h-5 w-5' />
                        ) : (
                          <Sun className='h-5 w-5' />
                        )}
                      </button>
                      <div className='absolute right-0 mt-2 w-32 rounded-lg border border-border bg-card shadow-md opacity-0 group-hover:opacity-100 transition-opacity'>
                        <button
                          onClick={() => setThemeMode("light")}
                          className='w-full text-left px-3 py-2 text-sm hover:bg-muted'
                        >
                          Light
                        </button>
                        <button
                          onClick={() => setThemeMode("dark")}
                          className='w-full text-left px-3 py-2 text-sm hover:bg-muted'
                        >
                          Dark
                        </button>
                        <button
                          onClick={() => setThemeMode("system")}
                          className='w-full text-left px-3 py-2 text-sm hover:bg-muted'
                        >
                          System
                        </button>
                      </div>
                    </div>
                    {/* 1. Bell Icon */}
                    <button className='text-slate-400 hover:text-slate-600 transition-colors mr-2'>
                      <Bell className='h-5 w-5' />
                    </button>

                    {/* 2. Avatar Circle */}
                    <div className='h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm border-2 border-white'>
                      {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <div className='flex flex-col items-start max-w-[150px]'>
                      <span className='text-sm font-semibold truncate w-full'>
                        {" "}
                        {currentUser?.name || "Esmatullah Wardak"}
                      </span>
                      <span className='text-xs text-slate-500 truncate w-full'>
                        {" "}
                        {currentUser?.email ||
                          "esmatullah.wardak2020@gmail.com"}
                      </span>
                    </div>

                    <ChevronDown className='h-4 w-4 text-slate-400 ml-1' />
                  </div>
                </header>

                <div className='flex-1 overflow-auto p-6'>{children}</div>
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
