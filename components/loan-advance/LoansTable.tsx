import { Calendar } from "lucide-react";

interface Loan {
  id: number;
  type: string;
  amount: number;
  remaining: number;
  progress: number;
  monthly: number;
  status: string;
  issuedDate: string;
  guarantor: string;
}

interface LoansTableProps {
  loans: Loan[];
}

export function LoansTable({ loans }: LoansTableProps) {
  return (
    <div className='mt-6'>
      {/* Table Header */}
      <div className='grid grid-cols-8 gap-4 text-sm text-gray-500 border-b pb-3'>
        <div>Loan Type</div>
        <div>Amount</div>
        <div>Progress</div>
        <div>Monthly</div>
        <div>Status</div>
        <div>Dates</div>
        <div>Guarantor</div>
        <div>Notes</div>
      </div>
      {/* Table Rows */}
      {loans.map((loan) => (
        <div
          key={loan.id}
          className='grid grid-cols-8 gap-4 py-4 border-b items-center'
        >
          <div>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-gray-500' />
              <span className='text-blue-600 underline'>{loan.type}</span>
            </div>
            <div className='text-xs text-gray-400'>ID: {loan.id}</div>
          </div>
          <div>
            <div className='font-semibold'>${loan.amount}.00</div>
            <div className='text-xs text-gray-400'>
              Remaining: ${loan.remaining}.00
            </div>
          </div>
          <div>
            <div className='text-sm'>Paid {loan.progress}%</div>
            <div className='w-full bg-gray-200 rounded-full h-1 mt-1'>
              <div
                className='bg-blue-500 h-1 rounded-full'
                style={{ width: `${loan.progress}%` }}
              ></div>
            </div>
          </div>
          <div className='font-semibold'>${loan.monthly}.00</div>
          <div>
            <span className='bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs'>
              ⏳ {loan.status}
            </span>
          </div>
          <div className='text-sm text-gray-600'>Issued: {loan.issuedDate}</div>
          <div className='text-sm text-gray-500'>{loan.guarantor}</div>
          <div className='text-blue-600 text-sm underline cursor-pointer'>
            View note
          </div>
        </div>
      ))}
    </div>
  );
}
