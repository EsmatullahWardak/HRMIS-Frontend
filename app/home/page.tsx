import {
  CheckCircle2,
  Clock,
  XCircle,
  Calendar as CalendarIcon,
  Coffee,
  Gift,
} from "lucide-react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIconIcon,
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
  label: any;
  value: any;
  unit?: any;
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
      <div className='flex items-center gap-2'>
        <div className='p-1.5 rounded-lg bg-white/50'>
          <Icon className='h-4 w-4' />
        </div>
        <span className='text-[10px] font-bold uppercase tracking-wider'>
          {label}
        </span>
      </div>
      <div className='flex items-baseline gap-1'>
        <span className='text-2xl font-bold'>{value}</span>
        <span className='text-xs font-medium opacity-80'>{unit}</span>
      </div>
    </div>
  );
}

// 2. Add this inside your HomePage function's Summary Cards Section:
const stats = [
  { label: "Present", value: 18, variant: "green", icon: CheckCircle2 },
  { label: "Incomplete", value: 1, variant: "amber", icon: Clock },
  { label: "No Records", value: 8, variant: "rose", icon: XCircle },
  {
    label: "Holidays",
    value: 0,
    variant: "blue",
    icon: CalendarIcon,
    unit: "",
  },
  { label: "Leaves", value: 0, variant: "orange", icon: Coffee, unit: "Days" },
  { label: "Extra Off", value: 0, variant: "purple", icon: Gift },
];

// Then map them:
// <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//   {stats.map((stat) => (
//     <SummaryCard key={stat.label} {...stat} />
//   ))}
// </div>

export default function HomePage() {
  return (
    <div className='space-y-6'>
      {/* 1. Header Section */}
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-bold text-slate-800'>
            Attendance Calendar
          </h1>
          <p className='text-slate-500'>
            Track your daily attendance records and patterns
          </p>
        </div>
        <div className='flex flex-col md:flex-row items-center justify-between mb-8 gap-4 justify-end'>
          <div className='flex items-center gap-2 text-slate-400'>
            <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-2 text-slate-1000 rounded-xl px-4 border-slate-200'
            >
              <CalendarIconIcon className='h-4 w-4' />
              <span className='font-semibold'>Today</span>
            </Button>
          </div>

          <div className='flex items-center bg-slate-100 rounded-xl p-1'>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-slate-500 hover:bg-white rounded-lg transition-all'
            >
              <ChevronLeft className='h-4 w-4' />
            </Button>
            <div className='px-4 font-semibold text-slate-700 min-w-[140px] text-center'>
              January 2026
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='h-8 w-8 text-slate-500 hover:bg-white rounded-lg transition-all'
            >
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Summary Cards Section - UPDATED */}
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
        {stats.map((stat) => (
          <SummaryCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* 3. Calendar Card Section - PASTE HERE */}
      <div className='bg-white p-6 rounded-2xl border border-slate-100 shadow-sm'>
        {/* Calendar Header */}

        {/* Days Header */}
        <div className='grid grid-cols-7 gap-4 mb-4'>
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <div
              key={day}
              className='text-center text-[11px] font-bold text-slate-400 tracking-widest py-2'
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className='grid grid-cols-7 gap-4'>
          {/* Days from previous month */}
          <div className='h-24 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-semibold'>
            28
          </div>
          <div className='h-24 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-semibold'>
            29
          </div>
          <div className='h-24 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-semibold'>
            30
          </div>
          <div className='h-24 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center text-slate-300 font-semibold'>
            31
          </div>

          {/* Active Days Example */}
          <div className='h-24 bg-[#ecfdf5] rounded-2xl border border-[#d1fae5] relative flex items-center justify-center text-[#059669] font-bold shadow-sm'>
            1
            <CheckCircle2 className='absolute top-2 right-2 h-3.5 w-3.5' />
          </div>
          <div className='h-24 bg-[#ecfdf5] rounded-2xl border border-[#d1fae5] relative flex items-center justify-center text-[#059669] font-bold shadow-sm'>
            2
            <CheckCircle2 className='absolute top-2 right-2 h-3.5 w-3.5' />
          </div>
          <div className='h-24 bg-[#ecfdf5] rounded-2xl border border-[#d1fae5] relative flex items-center justify-center text-[#059669] font-bold shadow-sm'>
            3
            <CheckCircle2 className='absolute top-2 right-2 h-3.5 w-3.5' />
          </div>

          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            4
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            5
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            6
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            7
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            8
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            9
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            10
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            11
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            12
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            13
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            14
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            15
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            16
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            17
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            18
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            19
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            20
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            21
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            22
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            23
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            24
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            25
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            26
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            27
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            28
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            29
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
          <div className='h-24 bg-[#fff1f2] rounded-2xl border border-dashed border-[#ffe4e6] relative flex items-center justify-center text-[#e11d48] font-bold'>
            30
            <XCircle className='absolute top-2 right-2 h-3.5 w-3.5' />
            <div className='absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-slate-400 rounded-full'></div>
          </div>
        </div>
      </div>

      {/* 4. Legend Section */}
      <div className='flex flex-wrap gap-4 items-center pt-4'>
        {/* We'll do this in the next step! */}
      </div>
    </div>
  );
}
