import { Calendar } from "lucide-react";

interface Loan {
  id: number;
  type: string;
  amount: number;
  remaining: number;
  progress: number;
  monthlyDeduction: number;
  status: string;
  issuedDate: string;
  guarantor: string | null;
  notes: string | null;
}

interface LoansTableProps {
  loans: Loan[];
}

export function LoansTable({ loans }: LoansTableProps) {
  return (
    <div className='mt-6'>
      <div className='grid grid-cols-8 gap-4 text-sm text-muted-foreground border-b pb-3'>
        <div>Loan Type</div>
        <div>Amount</div>
        <div>Progress</div>
        <div>Monthly</div>
        <div>Status</div>
        <div>Dates</div>
        <div>Guarantor</div>
        <div>Notes</div>
      </div>
      {loans.map((loan) => (
        <div key={loan.id} className='grid grid-cols-8 gap-4 py-4 border-b items-center'>
          <div>
            <div className='flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-muted-foreground' />
              <span className='text-blue-600 underline'>{loan.type}</span>
            </div>
            <div className='text-xs text-muted-foreground'>ID: {loan.id}</div>
          </div>
          <div>
            <div className='font-semibold'>${loan.amount}.00</div>
            <div className='text-xs text-muted-foreground'>
              Remaining: ${loan.remaining}.00
            </div>
          </div>
          <div>
            <div className='text-sm'>Paid {loan.progress}%</div>
            <div className='w-full bg-muted rounded-full h-1 mt-1'>
              <div
                className='bg-blue-500 h-1 rounded-full'
                style={{ width: `${loan.progress}%` }}
              ></div>
            </div>
          </div>
          <div className='font-semibold'>${loan.monthlyDeduction}.00</div>
          <div>
            <span className='bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs'>
              {loan.status}
            </span>
          </div>
          <div className='text-sm text-muted-foreground'>
            Issued: {new Date(loan.issuedDate).toLocaleDateString()}
          </div>
          <div className='text-sm text-muted-foreground'>{loan.guarantor || "-"}</div>
          <div className='text-sm text-foreground whitespace-pre-line'>
            {loan.notes || "-"}
          </div>
        </div>
      ))}
    </div>
  );
}
