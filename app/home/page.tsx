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
    green: "bg-[#ecfdf5] text-[#059669] border-[#d1fae5]",
    amber: "bg-[#fffbeb] text-[#d97706] border-[#fef3c7]",
    rose: "bg-[#fff1f2] text-[#e11d48] border-[#ffe4e6]",
    blue: "bg-[#eff6ff] text-[#2563eb] border-[#dbeafe]",
    orange: "bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]",
    purple: "bg-[#faf5ff] text-[#9333ea] border-[#f3e8ff]",
  };

  return (
    <div
      className={`p-4 rounded-xl border ${variants[variant]} flex flex-col gap-2 shadow-sm`}
    >
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-white/50">
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
          <h1 className="text-2xl font-bold text-slate-800">Attendance Calendar</h1>
          <p className="text-slate-500 text-sm">Track your daily attendance records and patterns</p>
        </div>
      </div>

      {/* 2. Summary Cards Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <SummaryCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* 3. Calendar Card Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        {/* Navigation Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <Button variant="outline" size="sm" className="rounded-xl border-slate-200 gap-2 px-4">
            <CalendarIconIcon className="h-4 w-4 text-slate-500" />
            <span className="font-semibold text-slate-700">Today</span>
          </Button>

          <div className="flex items-center bg-slate-50 rounded-xl p-1 border border-slate-100">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="px-6 font-semibold text-slate-700 min-w-[150px] text-center">
              January 2026
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-4 mb-6">
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <div key={day} className="text-center text-[11px] font-bold text-slate-400 tracking-widest py-2">
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
                    ? "bg-slate-50/50 border-dashed border-slate-200 text-slate-300"
                    : item.status === "present"
                    ? "bg-[#ecfdf5] border-[#d1fae5] text-[#059669] shadow-sm"
                    : item.status === "incomplete"
                    ? "bg-[#fffbeb] border-[#fef3c7] text-[#d97706] shadow-sm"
                    : "bg-[#fff1f2] border-dashed border-[#ffe4e6] text-[#e11d48] shadow-sm"
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
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-slate-400 rounded-full"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. Legend Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
          <Sparkles className="h-4 w-4 text-purple-500" />
          Legend
        </div>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Present", color: "bg-[#ecfdf5] text-[#059669] border-[#d1fae5]", icon: CheckCircle2 },
            { label: "Incomplete", color: "bg-[#fffbeb] text-[#d97706] border-[#fef3c7]", icon: Clock },
            { label: "No Records", color: "bg-[#fff1f2] text-[#e11d48] border-[#ffe4e6]", icon: XCircle },
            { label: "Holiday", color: "bg-[#eff6ff] text-[#2563eb] border-[#dbeafe]", icon: CalendarIcon },
            { label: "Leave", color: "bg-[#fff7ed] text-[#ea580c] border-[#ffedd5]", icon: Coffee },
            { label: "Bonus Leave", color: "bg-[#faf5ff] text-[#9333ea] border-[#f3e8ff]", icon: Gift },
          ].map((item) => (
            <div key={item.label} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold ${item.color}`}>
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </div>
          ))}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-500">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            Today
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-100 bg-slate-50 text-xs font-bold text-slate-400">
            Other Month
          </div>
        </div>
      </div>
    </div>
  );
}
