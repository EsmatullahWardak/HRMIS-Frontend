import {
  CheckCircle2,
  Clock,
  XCircle,
  Calendar as CalendarIcon,
  Coffee,
  Gift,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIconIcon,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// 1. Define the Card Component
function SummaryCard({
  label,
  value,
  unit = "days",
  icon: Icon,
  variant,
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon: any;
  variant: "green" | "amber" | "rose" | "blue" | "orange" | "purple";
}) {
  const variants = {
    green:
      "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900/60",
    amber:
      "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900/60",
    rose:
      "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-900/60",
    blue:
      "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-900/60",
    orange:
      "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-950/40 dark:text-orange-200 dark:border-orange-900/60",
    purple:
      "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-900/60",
  };

  return (
    <div
      className={`p-4 rounded-xl border ${variants[variant]} flex flex-col gap-2 shadow-sm`}
    >
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-background/50 dark:bg-white/5">
          <Icon className="h-4 w-4" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-xs font-medium opacity-80">{unit}</span>
      </div>
    </div>
  );
}

export default function HomePage() {
  // 1. Attendance Data (Same as your screenshot pattern)
  const attendanceData = [
    { day: 28, status: "other" }, { day: 29, status: "other" }, { day: 30, status: "other" }, { day: 31, status: "other" },
    { day: 1, status: "present" }, { day: 2, status: "present" }, { day: 3, status: "present" },
    { day: 4, status: "no-record" }, { day: 5, status: "present" }, { day: 6, status: "no-record" }, { day: 7, status: "present" },
    { day: 8, status: "present" }, { day: 9, status: "present" }, { day: 10, status: "no-record" },
    { day: 11, status: "no-record" }, { day: 12, status: "present" }, { day: 13, status: "present" }, { day: 14, status: "present" },
    { day: 15, status: "present" }, { day: 16, status: "present" }, { day: 17, status: "present" },
    { day: 18, status: "no-record" }, { day: 19, status: "present" }, { day: 20, status: "present" }, { day: 21, status: "present" },
    { day: 22, status: "no-record" }, { day: 23, status: "present" }, { day: 24, status: "present" },
    { day: 25, status: "no-record" }, { day: 26, status: "incomplete" }, { day: 27, status: "no-record" }, { day: 28, status: "no-record" },
    { day: 29, status: "no-record" }, { day: 30, status: "no-record" }, { day: 31, status: "no-record" },
  ];

  // 2. Dynamic Counts
  const counts = {
    present: attendanceData.filter((d) => d.status === "present").length,
    noRecord: attendanceData.filter((d) => d.status === "no-record").length,
    incomplete: attendanceData.filter((d) => d.status === "incomplete").length,
  };

  const stats = [
    { label: "Present", value: counts.present, variant: "green", icon: CheckCircle2 },
    { label: "Incomplete", value: counts.incomplete, variant: "amber", icon: Clock },
    { label: "No Records", value: counts.noRecord, variant: "rose", icon: XCircle },
    { label: "Holidays", value: 0, variant: "blue", icon: CalendarIcon, unit: "" },
    { label: "Leaves", value: 0, variant: "orange", icon: Coffee, unit: "Days" },
    { label: "Extra Off", value: 0, variant: "purple", icon: Gift },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Attendance Calendar</h1>
          <p className="text-muted-foreground text-sm">Track your daily attendance records and patterns</p>
        </div>
      </div>

      {/* 2. Summary Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <SummaryCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* 3. Calendar Card Section */}
      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
        {/* Navigation Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <Button variant="outline" size="sm" className="rounded-xl border-border gap-2 px-4">
            <CalendarIconIcon className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold text-foreground">Today</span>
          </Button>

          <div className="flex items-center bg-muted rounded-xl p-1 border border-border">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-6 font-semibold text-foreground min-w-[150px] text-center">
              January 2026
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-4 mb-6">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <div key={day} className="text-center text-[11px] font-bold text-muted-foreground tracking-widest py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-4">
          {attendanceData.map((item, i) => (
            <div
              key={i}
              className={`h-24 rounded-2xl border relative flex items-center justify-center font-bold text-lg transition-all
                ${
                  item.status === "other"
                    ? "bg-muted/50 border-dashed border-border text-muted-foreground/60"
                    : item.status === "present"
                    ? "bg-emerald-50 border-emerald-100 text-emerald-700 shadow-sm dark:bg-emerald-950/40 dark:border-emerald-900/60 dark:text-emerald-200"
                    : item.status === "incomplete"
                    ? "bg-amber-50 border-amber-100 text-amber-700 shadow-sm dark:bg-amber-950/40 dark:border-amber-900/60 dark:text-amber-200"
                    : "bg-rose-50 border-dashed border-rose-100 text-rose-700 shadow-sm dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-200"
                }`}
            >
              {item.day}
              {item.status === "present" && (
                <CheckCircle2 className="absolute top-2 right-2 h-4 w-4" />
              )}
              {item.status === "no-record" && (
                <XCircle className="absolute top-2 right-2 h-4 w-4" />
              )}
              {item.status === "incomplete" && (
                <Clock className="absolute top-2 right-2 h-4 w-4" />
              )}
              {item.status === "no-record" && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Legend Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-muted-foreground font-semibold text-sm">
          <Sparkles className="h-4 w-4 text-purple-500" />
          Legend
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            {
              label: "Present",
              color:
                "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-200 dark:border-emerald-900/60",
              icon: CheckCircle2,
            },
            {
              label: "Incomplete",
              color:
                "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/40 dark:text-amber-200 dark:border-amber-900/60",
              icon: Clock,
            },
            {
              label: "No Records",
              color:
                "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-950/40 dark:text-rose-200 dark:border-rose-900/60",
              icon: XCircle,
            },
            {
              label: "Holiday",
              color:
                "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/40 dark:text-blue-200 dark:border-blue-900/60",
              icon: CalendarIcon,
            },
            {
              label: "Leave",
              color:
                "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-950/40 dark:text-orange-200 dark:border-orange-900/60",
              icon: Coffee,
            },
            {
              label: "Bonus Leave",
              color:
                "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/40 dark:text-purple-200 dark:border-purple-900/60",
              icon: Gift,
            },
          ].map((item) => (
            <div key={item.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${item.color}`}>
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </div>
          ))}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-bold text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Today
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border bg-muted text-xs font-bold text-muted-foreground">
            Other Month
          </div>
        </div>
      </div>
    </div>
  );
}
