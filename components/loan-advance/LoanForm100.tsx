interface LoanForm100Props {
  notes: string;
  onNotesChange: (value: string) => void;
}

export function LoanForm100({ notes, onNotesChange }: LoanForm100Props) {
  return (
    <>
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

      {/* Notes */}
      <div className='mb-4'>
        <label className='text-sm text-gray-500'>Notes</label>
        <textarea
          className='w-full border border-gray-200 rounded-lg p-3 mt-1 text-gray-800 bg-gray-50'
          rows={3}
          placeholder='Add any additional notes here...'
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
        />
      </div>
    </>
  );
}
