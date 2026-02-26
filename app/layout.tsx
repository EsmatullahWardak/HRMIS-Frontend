"use client";

import type { Metadata } from "next";
import "./globals.css";
import { AppSidebar } from "@/components/layout/AppLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isAuthenticated, getUserFromToken, logout } from "@/lib/auth";
import { Bell, ChevronDown, Sun, Moon } from "lucide-react";

const canAccessRoute = (role: string | undefined, path: string) => {
  if (!role || role === "ADMIN" || role === "OFFICER") return true;

  if (role === "EMPLOYEE") {
    const allowedPrefixes = [
      "/home",
      "/services",
      "/leave",
      "/resources",
      "/dashboard/overtime",
      "/dashboard/attendance",
      "/change-shift",
      "/loan-advance",
      "/my-dashboard",
      "/feedbacks",
      "/change-password",
    ];
    return allowedPrefixes.some((prefix) => path.startsWith(prefix));
  }

  return false;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [pendingLeaveCount, setPendingLeaveCount] = useState(0);
  const [pendingOvertimeCount, setPendingOvertimeCount] = useState(0);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);


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
      const tokenUser = getUserFromToken();

      if (userData) {
        const parsedUser = JSON.parse(userData);
        const mergedUser = {
          ...parsedUser,
          role: parsedUser.role || tokenUser?.role,
        };
        setCurrentUser(mergedUser);

        if (!canAccessRoute(mergedUser.role, pathname)) {
          router.push("/my-dashboard");
          return;
        }
      } else if (tokenUser) {
        setCurrentUser(tokenUser);
        if (!canAccessRoute(tokenUser.role, pathname)) {
          router.push("/my-dashboard");
          return;
        }
      }
    }
    setLoading(false);
  }, [pathname, router, showSidebar]);


  const applyTheme = (mode: "light" | "dark") => {
    setTheme(mode);
    setResolvedTheme(mode);
    document.documentElement.classList.toggle("dark", mode === "dark");
  };

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    applyTheme(saved ?? "light");
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    applyTheme(saved ?? theme);
  }, [pathname]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== "theme") return;
      const value = (event.newValue as "light" | "dark" | null) ?? "light";
      applyTheme(value);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    if (!showSidebar || currentUser?.role !== "ADMIN") {
      setPendingLeaveCount(0);
      setPendingOvertimeCount(0);
      return;
    }

    const fetchPendingCount = async () => {
      try {
        const token = localStorage.getItem("auth_token");
        if (!token) return;

        const [leaveRes, overtimeRes] = await Promise.all([
          fetch("http://localhost:3001/leave/pending/count", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:3001/overtime/pending/count", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (leaveRes.ok) {
          const leaveData = await leaveRes.json();
          setPendingLeaveCount(Number(leaveData?.count || 0));
        }
        if (overtimeRes.ok) {
          const overtimeData = await overtimeRes.json();
          setPendingOvertimeCount(Number(overtimeData?.count || 0));
        }
      } catch {
        // Keep UI stable if API is temporarily unavailable
      }
    };

    fetchPendingCount();
    const intervalId = setInterval(fetchPendingCount, 10000);
    return () => clearInterval(intervalId);
  }, [showSidebar, currentUser?.role, pathname]);

  useEffect(() => {
    if (!isNotificationOpen) return;

    const handleOutsideClick = () => setIsNotificationOpen(false);
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isNotificationOpen]);

  const setThemeMode = (mode: "light" | "dark") => {
    localStorage.setItem("theme", mode);
    applyTheme(mode);
  };

  const handleLogout = () => {
    logout();
    setCurrentUser(null);
    router.push("/auth/login");
  };

  if (loading && showSidebar) {
    return (
      <html
        lang='en'
        suppressHydrationWarning
        className={resolvedTheme === "dark" ? "dark" : ""}
      >
        <body
          className='antialiased bg-background font-sans'
        >
          <div className='flex items-center justify-center min-h-screen'>
            <p className='text-lg'>Loading...</p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={resolvedTheme === "dark" ? "dark" : ""}
    >
      <body
        className='antialiased bg-background font-sans'
      >
        {showSidebar ? (
          <SidebarProvider>
            <div
              className='flex h-screen w-full max-w-[1400px] min-w-0 mx-auto p-4 gap-4 overflow-hidden'
            >
              <AppSidebar currentUser={currentUser} onLogout={handleLogout} />
              <main className='flex-1 min-w-0 flex flex-col overflow-hidden bg-card border border-border rounded-2xl shadow-sm'>
                <header className='border-b border-border p-4 flex items-center justify-between'>
                  <SidebarTrigger />
                  <div className='flex items-center gap-4'>
                    <div className='relative group'>
                      <button
                        className='text-muted-foreground hover:text-foreground transition-colors'
                        title='Theme'
                      >
                        {theme === "dark" ? (
                          <Moon className='h-5 w-5' />
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
                      </div>
                    </div>
                    {/* 1. Bell Icon */}
                    <div className='relative'>
                      <button
                        className='relative text-muted-foreground hover:text-foreground transition-colors mr-2'
                      title={
                        currentUser?.role === "ADMIN"
                          ? `${pendingLeaveCount + pendingOvertimeCount} pending request(s)`
                          : "Notifications"
                      }
                        onClick={(event) => {
                          event.stopPropagation();
                          setIsNotificationOpen((prev) => !prev);
                        }}
                      >
                        <Bell className='h-5 w-5' />
                        {currentUser?.role === "ADMIN" &&
                          pendingLeaveCount + pendingOvertimeCount > 0 && (
                          <span className='absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-600 text-white text-[11px] leading-5 text-center font-semibold'>
                            {pendingLeaveCount + pendingOvertimeCount > 99
                              ? "99+"
                              : pendingLeaveCount + pendingOvertimeCount}
                          </span>
                        )}
                      </button>

                      {isNotificationOpen && (
                        <div
                          className='absolute right-0 mt-2 w-72 rounded-lg border border-border bg-card shadow-md z-50 p-3'
                          onClick={(event) => event.stopPropagation()}
                        >
                          <p className='text-sm font-semibold mb-2'>Notifications</p>

                          {currentUser?.role === "ADMIN" ? (
                            pendingLeaveCount + pendingOvertimeCount > 0 ? (
                              <div className='space-y-3'>
                                <p className='text-sm text-muted-foreground'>
                                  Leave pending:{" "}
                                  <span className='font-semibold text-foreground'>
                                    {pendingLeaveCount}
                                  </span>
                                </p>
                                <p className='text-sm text-muted-foreground'>
                                  Overtime pending:{" "}
                                  <span className='font-semibold text-foreground'>
                                    {pendingOvertimeCount}
                                  </span>
                                </p>
                                <button
                                  className='w-full rounded-md bg-primary text-primary-foreground text-sm py-2 hover:opacity-90'
                                  onClick={() => {
                                    setIsNotificationOpen(false);
                                    router.push("/leave");
                                  }}
                                >
                                  Open Leave Requests
                                </button>
                                <button
                                  className='w-full rounded-md border border-border bg-card text-foreground text-sm py-2 hover:bg-muted'
                                  onClick={() => {
                                    setIsNotificationOpen(false);
                                    router.push("/dashboard/overtime");
                                  }}
                                >
                                  Open Overtime Requests
                                </button>
                              </div>
                            ) : (
                              <p className='text-sm text-muted-foreground'>
                                No pending requests.
                              </p>
                            )
                          ) : (
                            <p className='text-sm text-muted-foreground'>
                              No new notifications.
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 2. Avatar Circle */}
                    <div className='h-10 w-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shadow-sm border-2 border-white'>
                      {currentUser?.name?.charAt(0).toUpperCase() || "U"}
                    </div>

                    <div className='flex flex-col items-start max-w-[150px]'>
                      <span className='text-sm font-semibold truncate w-full'>
                        {" "}
                        {currentUser?.name || "Esmatullah Wardak"}
                      </span>
                      <span className='text-xs text-muted-foreground truncate w-full'>
                        {" "}
                        {currentUser?.email ||
                          "esmatullah.wardak2020@gmail.com"}
                      </span>
                    </div>

                    <ChevronDown className='h-4 w-4 text-muted-foreground ml-1' />
                  </div>
                </header>

                <div className='app-shell-content flex-1 overflow-auto p-6'>{children}</div>
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
