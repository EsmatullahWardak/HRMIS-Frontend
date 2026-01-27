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
      {
        title: "users",
        url: "/dashboard/users",
        icon: Users,
        // count: 4891,
      },
      {
        title: "Active Users",
        url: "/dashboard/active-users",
        icon: UserCheck,
        // count: 3501,
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

export default menuItems;
