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
    type: "dropdown",
    label: "Users",
    items: [
      { title: "Active", url: "/users/active", icon: UserCheck },
      { title: "Inactive", url: "/users/inactive", icon: Users },
    ],
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  // {
  //   title: "active",
  //   url: "/active",
  //   icon: UserCheck,
  // },
  // {
  //   title: "Users",
  //   url: "/users",
  //   icon: Users,
  // },
  {
    title: "Products",
    url: "/products",
    icon: ShoppingCart,
  },
  {
    title: "Resources",
    // url: "/resources:",
    url: "/resources",
    icon: FolderOpen,
  },
  {
    title: "Loan & Advance",
    url: "/loan-advance",
    icon: DollarSign,
  },
  {
    title: "Leave",
    url: "/leave",
    icon: Calendar,
  },
  {
    title: "Overtime",
    url: "/overtime",
    icon: Clock,
  },

  {
    title: "Change Shift",
    url: "/change-shift",
    icon: RefreshCw,
  },

  {
    title: "Advance Salary",
    url: "/wallet",
    icon: Wallet,
  },
];

interface AppLayoutProps {
  children: React.ReactNode;
  currentUser?: any;
  onLogout?: () => void;
}

interface DropdownMenuItemProps {
  label: string;
  items: Array<{
    title: string;
    url: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
}

function DropdownMenuItem({ label, items }: DropdownMenuItemProps) {
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
        <Users className='h-4 w-4' />
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
                <a href={subItem.url}>
                  {subItem.icon && <subItem.icon className='h-4 w-4' />}
                  <span>{subItem.title}</span>
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
    <Sidebar>
      <SidebarHeader>
        <div className='flex items-center gap-2 px-4 py-2 border-b border-slate-150'>
          {/* <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
            <Home className='h-4 w-4' />
          </div> */}
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
            className='w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50'
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
