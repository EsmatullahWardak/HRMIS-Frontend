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
      <label className='text-sm text-gray-500'>Monthly Deduction *</label>
      <div className='bg-white border border-gray-300 rounded-lg p-3 mt-1 flex items-center gap-2'>
        <span className='text-gray-500'>$</span>
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
          className='flex-1 bg-transparent text-gray-800 outline-none'
          autoComplete='off'
        />
      </div>

      <label className='text-sm text-gray-500 mt-4 block'>
        Repayment Month * <span className='text-gray-400'>(Select 1)</span>
      </label>
      <div className='flex flex-wrap gap-2 mt-2'>
        {months.map((month) => (
          <button
            key={month}
            onClick={() => onSelectedMonthChange(month)}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedMonth === month
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-600 border border-gray-300"
            }`}
          >
            {month}
          </button>
        ))}
      </div>
    </div>
  );
}
