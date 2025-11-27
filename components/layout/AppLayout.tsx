"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  UserCheck,
  Users,
  Settings,
  LogOut,
  ShoppingCart,
  Wallet,
  Calendar,
  Clock,
  FolderOpen,
  RefreshCw,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "active",
    url: "/active",
    icon: UserCheck,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Leave",
    url: "/Leave",
    icon: Calendar,
  },
  {
    title: "Overtime",
    url: "/overtime",
    icon: Clock,
  },
  {
    title: "Resources",
    url: "/resources:",
    icon: FolderOpen,
  },
  {
    title: "Change Shift",
    url: "/change-shift",
    icon: RefreshCw,
  },
  {
    title: "Loan & Advance",
    url: "/loan-advance",
    icon: DollarSign,
  },
  {
    title: "Products",
    url: "/products",
    icon: ShoppingCart,
  },
  {
    title: "Advance Salary",
    url: "/wallet",
    icon: Wallet,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

interface AppLayoutProps {
  children: React.ReactNode;
  currentUser?: any;
  onLogout?: () => void;
}

export function AppSidebar({
  currentUser,
  onLogout,
}: {
  currentUser?: any;
  onLogout?: () => void;
}) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className='flex items-center gap-2 px-4 py-2'>
          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
            <Home className='h-4 w-4' />
          </div>
          <div className='grid flex-1 text-left text-sm leading-tight'>
            <span className='truncate font-semibold'>Your App</span>
            <span className='truncate text-xs'>Enterprise</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className='p-4 border-t'>
          <div className='flex items-center gap-2 mb-2'>
            <div className='h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center'>
              {currentUser?.name?.[0] || "U"}
            </div>
            <div className='flex-1 text-left text-sm'>
              <div className='font-medium'>{currentUser?.name || "User"}</div>
              <div className='text-xs text-muted-foreground'>
                {currentUser?.email}
              </div>
            </div>
          </div>
          {onLogout && (
            <Button
              variant='outline'
              size='sm'
              onClick={onLogout}
              className='w-full'
            >
              <LogOut className='h-4 w-4 mr-2' />
              Logout
            </Button>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default function AppLayout({
  children,
  currentUser,
  onLogout,
}: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className='flex h-screen w-full'>
        <AppSidebar currentUser={currentUser} onLogout={onLogout} />
        <main className='flex-1 flex flex-col overflow-hidden'>
          <header className='border-b p-4'>
            <SidebarTrigger />
          </header>
          <div className='flex-1 overflow-auto p-6'>{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}
