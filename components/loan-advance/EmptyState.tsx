import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onRequestLoan: () => void;
}

export function EmptyState({ onRequestLoan }: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <div className='h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
        <DollarSign className='h-10 w-10 text-gray-400' />
      </div>
      <h2 className='text-xl font-semibold text-gray-700 mb-2'>
        No loans found
      </h2>
      <p className='text-gray-500 text-center mb-6'>
        You haven&apos;t applied for any loans yet. Request your
        <br />
        first loan to get started.
      </p>
      <Button variant='outline' onClick={onRequestLoan}>
        + Request Your First Loan
      </Button>
    </div>
  );
}
