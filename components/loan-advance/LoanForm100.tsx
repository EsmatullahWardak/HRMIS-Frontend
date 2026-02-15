export function LoanForm100() {
  return (
    <div className='grid grid-cols-2 gap-4 mb-4'>
      <div>
        <label className='text-sm text-muted-foreground'>Loan Amount</label>
        <div className='bg-muted border border-border rounded-lg p-3 mt-1 text-foreground'>
          $ 100.00
        </div>
      </div>
      <div>
        <label className='text-sm text-muted-foreground'>Monthly Deduction</label>
        <div className='bg-muted border border-border rounded-lg p-3 mt-1 text-foreground'>
          $ 100.00
        </div>
      </div>
    </div>
  );
}
