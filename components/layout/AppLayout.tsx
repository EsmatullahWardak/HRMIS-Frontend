"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
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
  ChevronDown,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    type: "dropdown",
    label: "Dashboards",
    icon: LayoutDashboard,
    items: [
      // { title: "Leaves", url: "/dashboard/leaves", icon: Calendar, count: 4891 },
      // { title: "Overtime", url: "/dashboard/overtime", icon: Clock, count: 7720 },
      // { title: "Attendance", url: "/dashboard/attendance", icon: Calendar, count: 48003 },
    ],
  },
  {
    type: "dropdown",
    label: "Services",
    icon: Settings,
    items: [
      {
        title: "Request a Leave",
        url: "/services/request-leave",
        icon: Calendar,
      },
      {
        title: "Submit Overtime",
        url: "/services/submit-overtime",
        icon: Clock,
      },
      {
        title: "View Resources",
        url: "/services/view-resources",
        icon: FolderOpen,
      },
      { title: "Change Shift", url: "/services/change-shift", icon: RefreshCw },
      {
        title: "Loans & Advances",
        url: "/services/loans-advances",
        icon: DollarSign,
      },
    ],
  },
  {
    title: "My Dashboard",
    url: "/my-dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Feedbacks & Requests",
    url: "/feedbacks",
    icon: FolderOpen,
  },
  {
    title: "Change Password",
    url: "/change-password",
    icon: Settings,
  },
];

interface AppLayoutProps {
  children: React.ReactNode;
  currentUser?: any;
  onLogout?: () => void;
}

interface DropdownMenuItemProps {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  items: Array<{
    title: string;
    url: string;
    icon?: React.ComponentType<{ className?: string }>;
    count?: number;
  }>;
}

function DropdownMenuItem({ label, icon: Icon, items }: DropdownMenuItemProps) {
  const pathname = usePathname();
  const isChildActive = items.some((item) => pathname === item.url);
  const [isOpen, setIsOpen] = useState(isChildActive);

  useEffect(() => {
    if (isChildActive) {
      setIsOpen(true);
    }
  }, [pathname, isChildActive]);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={() => setIsOpen(!isOpen)}>
        {Icon && <Icon className='h-4 w-4' />}
        <span>{label}</span>
        <ChevronDown
          className={`ml-auto h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </SidebarMenuButton>
      {isOpen && (
        <SidebarMenuSub>
          {items.map((subItem) => (
            <SidebarMenuSubItem key={subItem.title}>
              <SidebarMenuSubButton asChild>
                <a href={subItem.url} className='flex items-center w-full'>
                  {subItem.icon && <subItem.icon className='h-4 w-4' />}
                  <span>{subItem.title}</span>
                  {subItem.count !== undefined && (
                    <span className='ml-auto text-xs font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded'>
                      {subItem.count}
                    </span>
                  )}
                </a>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      )}
    </SidebarMenuItem>
  );
}

export function AppSidebar({
  currentUser,
  onLogout,
}: {
  currentUser?: any;
  onLogout?: () => void;
}) {
  return (
    <Sidebar variant='floating'>
      <SidebarHeader>
        <div className='flex items-center gap-2 px-4 py-2 border-b border-slate-150'>
          <div className='flex items-center'>
            <img src='/logo.png' alt='HRMIS Logo' className='h-10' />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => {
                if (item.type === "dropdown") {
                  return (
                    <DropdownMenuItem
                      key={item.label}
                      label={item.label}
                      icon={item.icon}
                      items={item.items}
                    />
                  );
                }
                return (
                  <SidebarMenuItem key={item.title || index}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='mt-auto border-t border-slate-50 p-2'>
        {onLogout && (
          <Button
            variant='ghost'
            size='sm'
            onClick={onLogout}
            className='w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg'
          >
            <LogOut className='h-4 w-4 mr-2' />
            Logout
          </Button>
        )}
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
      <div className='flex h-screen w-full p-4 gap-4 bg-slate-50'>
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
