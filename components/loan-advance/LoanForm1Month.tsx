interface LoanForm1MonthProps {
  monthlyDeduction: string;
  onMonthlyDeductionChange: (value: string) => void;
  selectedMonth: string;
  onSelectedMonthChange: (month: string) => void;
}

export function LoanForm1Month({
  monthlyDeduction,
  onMonthlyDeductionChange,
  selectedMonth,
  onSelectedMonthChange,
}: LoanForm1MonthProps) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className='mb-4'>
      <label className='text-sm text-muted-foreground'>Monthly Deduction *</label>
      <div className='bg-card border border-border rounded-lg p-3 mt-1 flex items-center gap-2'>
        <span className='text-muted-foreground'>$</span>
        <input
          type='text'
          inputMode='decimal'
          placeholder='0.00'
          value={monthlyDeduction}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
              onMonthlyDeductionChange(value);
            }
          }}
          className='flex-1 bg-transparent text-foreground outline-none'
          autoComplete='off'
        />
      </div>

      <label className='text-sm text-muted-foreground mt-4 block'>
        Repayment Month * <span className='text-muted-foreground'>(Select 1)</span>
      </label>
      <div className='flex flex-wrap gap-2 mt-2'>
        {months.map((month) => (
          <button
            key={month}
            onClick={() => onSelectedMonthChange(month)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedMonth === month
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground border border-border"
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
}
