interface Employee {
  id: number;
  name: string | null;
}

interface LoanForm3MonthProps {
  guarantor: string;
  onGuarantorChange: (value: string) => void;
  showGuarantorDropdown: boolean;
  onToggleDropdown: () => void;
  onCloseDropdown: () => void;
  guarantorSearch: string;
  onGuarantorSearchChange: (value: string) => void;
  employees: Employee[];
  monthlyDeduction: string;
  onMonthlyDeductionChange: (value: string) => void;
  selectedMonths: string[];
  onSelectedMonthsChange: (months: string[]) => void;
}

export function LoanForm3Month({
  guarantor,
  onGuarantorChange,
  showGuarantorDropdown,
  onToggleDropdown,
  onCloseDropdown,
  guarantorSearch,
  onGuarantorSearchChange,
  employees,
  monthlyDeduction,
  onMonthlyDeductionChange,
  selectedMonths,
  onSelectedMonthsChange,
}: LoanForm3MonthProps) {
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
      {/* Guarantor Dropdown */}
      <label className='text-sm text-gray-500'>Guarantor *</label>
      <div className='relative mt-1'>
        <button
          onClick={onToggleDropdown}
          className='w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-left text-gray-800 flex justify-between items-center'
        >
          {guarantor || "Select guarantor (required)"}
          <span className='text-gray-400'>▼</span>
        </button>
        {showGuarantorDropdown && (
          <div className='absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto'>
            <div className='p-2 border-b'>
              <input
                type='text'
                placeholder='Search employees...'
                value={guarantorSearch}
                onChange={(e) => onGuarantorSearchChange(e.target.value)}
                className='w-full p-2 border border-gray-200 rounded-lg text-gray-800 outline-none'
              />
            </div>
            {employees
              .filter((emp) =>
                (emp.name || "")
                  .toLowerCase()
                  .includes(guarantorSearch.toLowerCase())
              )
              .map((emp) => (
                <button
                  key={emp.id}
                  onClick={() => {
                    onGuarantorChange(`${emp.name || "No Name"} (${emp.id})`);
                    onCloseDropdown();
                    onGuarantorSearchChange("");
                  }}
                  className='w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800'
                >
                  {emp.name || "No Name"} ({emp.id})
                </button>
              ))}
          </div>
        )}
      </div>

      {/* Monthly Deduction */}
      <label className='text-sm text-gray-500 mt-4 block'>
        Monthly Deduction *
      </label>
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

      {/* Repayment Months - Select 3 */}
      <label className='text-sm text-gray-500 mt-4 block'>
        Repayment Months * <span className='text-gray-400'>(Select 3)</span>
      </label>
      <div className='flex flex-wrap gap-2 mt-2'>
        {months.map((month) => (
          <button
            key={month}
            onClick={() => {
              if (selectedMonths.includes(month)) {
                onSelectedMonthsChange(
                  selectedMonths.filter((m) => m !== month)
                );
              } else if (selectedMonths.length < 3) {
                onSelectedMonthsChange([...selectedMonths, month]);
              }
            }}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedMonths.includes(month)
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
