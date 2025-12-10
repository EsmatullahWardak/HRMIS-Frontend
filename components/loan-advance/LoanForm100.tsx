export function LoanForm100() {
  return (
    <div className='grid grid-cols-2 gap-4 mb-4'>
      <div>
        <label className='text-sm text-gray-500'>Loan Amount</label>
        <div className='bg-gray-100 border border-gray-200 rounded-lg p-3 mt-1 text-gray-800'>
          $ 100.00
        </div>
      </div>
      <div>
        <label className='text-sm text-gray-500'>Monthly Deduction</label>
        <div className='bg-gray-100 border border-gray-200 rounded-lg p-3 mt-1 text-gray-800'>
          $ 100.00
        </div>
      </div>
    </div>
  );
}
