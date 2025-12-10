import { DollarSign, Calendar } from "lucide-react";

interface LoanTypeButtonsProps {
  selectedLoanType: string;
  onSelectLoanType: (type: string) => void;
}

export function LoanTypeButtons({
  selectedLoanType,
  onSelectLoanType,
}: LoanTypeButtonsProps) {
  return (
    <div className='flex gap-6 mb-6'>
      <button
        onClick={() => onSelectLoanType("100")}
        className={`px-6 py-2 rounded-full flex items-center gap-2 ${
          selectedLoanType === "100"
            ? "border-2 border-gray-400 text-gray-800"
            : "text-gray-500"
        }`}
      >
        <DollarSign className='h-4 w-4' /> 100$ Loan
      </button>
      <button
        onClick={() => onSelectLoanType("1month")}
        className={`px-6 py-2 rounded-full flex items-center gap-2 ${
          selectedLoanType === "1month"
            ? "border-2 border-gray-400 text-gray-800"
            : "text-gray-500"
        }`}
      >
        <Calendar className='h-4 w-4' /> 1 Month
      </button>
      <button
        onClick={() => onSelectLoanType("3month")}
        className={`px-6 py-2 rounded-full flex items-center gap-2 ${
          selectedLoanType === "3month"
            ? "border-2 border-gray-400 text-gray-800"
            : "text-gray-500"
        }`}
      >
        <Calendar className='h-4 w-4' /> 3 Month
      </button>
    </div>
  );
}
