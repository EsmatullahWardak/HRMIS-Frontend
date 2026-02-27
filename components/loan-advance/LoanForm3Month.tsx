interface Employee {
  id: number;
  name: string | null;
  email: string;
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
  const selectedGuarantor = employees.find((emp) => emp.email === guarantor);
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
      <label className='text-sm text-muted-foreground'>Guarantor *</label>
      <div className='relative mt-1'>
        <button
          onClick={onToggleDropdown}
          className='w-full bg-muted border border-border rounded-lg p-3 text-left text-foreground flex justify-between items-center'
        >
          {selectedGuarantor
            ? `${selectedGuarantor.name || "No Name"} (${selectedGuarantor.email})`
            : "Select guarantor (required)"}
          <span className='text-muted-foreground'>▼</span>
        </button>
        {showGuarantorDropdown && (
          <div className='absolute z-10 w-full bg-card border border-border rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto'>
            <div className='p-2 border-b'>
              <input
                type='text'
                placeholder='Search employees...'
                value={guarantorSearch}
                onChange={(e) => onGuarantorSearchChange(e.target.value)}
                className='w-full p-2 border border-border rounded-lg text-foreground outline-none'
              />
            </div>
            {employees
              .filter((emp) =>
                `${emp.name || ""} ${emp.email}`
                  .toLowerCase()
                  .includes(guarantorSearch.toLowerCase())
              )
              .map((emp) => (
                <button
                  key={emp.id}
                  onClick={() => {
                    onGuarantorChange(emp.email);
                    onCloseDropdown();
                    onGuarantorSearchChange("");
                  }}
                  className='w-full text-left px-4 py-2 hover:bg-muted text-foreground'
                >
                  {emp.name || "No Name"} ({emp.email})
                </button>
              ))}
          </div>
        )}
      </div>

      <label className='text-sm text-muted-foreground mt-4 block'>
        Monthly Deduction *
      </label>
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
        Repayment Months * <span className='text-muted-foreground'>(Select 3)</span>
      </label>
      <div className='flex flex-wrap gap-2 mt-2'>
        {months.map((month) => (
          <button
            key={month}
            onClick={() => {
              if (selectedMonths.includes(month)) {
                onSelectedMonthsChange(selectedMonths.filter((m) => m !== month));
              } else if (selectedMonths.length < 3) {
                onSelectedMonthsChange([...selectedMonths, month]);
              }
            }}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedMonths.includes(month)
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
