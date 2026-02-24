import {
  Calendar,
  Clock,
  DollarSign,
  FolderOpen,
  Home,
  LayoutDashboard,
  RefreshCw,
  Settings,
  UserCheck,
  Users,
} from "lucide-react";

export type UserRole = "ADMIN" | "OFFICER" | "EMPLOYEE";

type BaseItem = {
  title?: string;
  url?: string;
  icon: any;
  roles?: UserRole[];
  type?: "dropdown";
  label?: string;
  items?: Array<{
    title: string;
    url: string;
    icon: any;
    roles?: UserRole[];
  }>;
};

const allRoles: UserRole[] = ["ADMIN", "OFFICER", "EMPLOYEE"];

const menuItems: BaseItem[] = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
    roles: allRoles,
  },
  {
    type: "dropdown",
    label: "Dashboards",
    icon: LayoutDashboard,
    roles: ["ADMIN", "OFFICER"],
    items: [
      {
        title: "users",
        url: "/users/active",
        icon: Users,
        // count: 4891,
      },
      {
        title: "Active Users",
        url: "/users/active",
        icon: UserCheck,
        // count: 3501,
      },
      {
        title: "Inactive Users",
        url: "/users/inactive",
        icon: UserCheck,
        // count: 0,
      },

      {
        title: "Overtime",
        url: "/dashboard/overtime",
        icon: Clock,
        // count: 7720,
      },
      {
        title: "Attendance",
        url: "/dashboard/attendance",
        icon: Calendar,
        // count: 48003,
      },
    ],
  },
  {
    type: "dropdown",
    label: "Services",
    icon: Settings,
    roles: allRoles,
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
        url: "/loan-advance",
        icon: DollarSign,
      },
    ],
  },
  {
    title: "My Dashboard",
    url: "/my-dashboard",
    icon: LayoutDashboard,
    roles: allRoles,
  },
  {
    title: "Feedbacks & Requests",
    url: "/feedbacks",
    icon: FolderOpen,
    roles: allRoles,
  },
  {
    title: "Change Password",
    url: "/change-password",
    icon: Settings,
    roles: allRoles,
  },
];

export function getMenuItemsByRole(role?: string) {
  const currentRole = (role as UserRole | undefined) || "OFFICER";

  return menuItems
    .filter((item) => !item.roles || item.roles.includes(currentRole))
    .map((item) => {
      if (item.type !== "dropdown" || !item.items) return item;

      const filteredChildren = item.items.filter(
        (child) => !child.roles || child.roles.includes(currentRole)
      );

      return {
        ...item,
        items: filteredChildren,
      };
    })
    .filter((item) => {
      if (item.type !== "dropdown") return true;
      return !!item.items && item.items.length > 0;
    });
}

export default menuItems;
