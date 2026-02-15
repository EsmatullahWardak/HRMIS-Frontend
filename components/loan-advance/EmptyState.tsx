import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onRequestLoan: () => void;
}

export function EmptyState({ onRequestLoan }: EmptyStateProps) {
  return (
    <div className='flex flex-col items-center justify-center py-20'>
      <div className='h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4'>
        <DollarSign className='h-10 w-10 text-muted-foreground' />
      </div>
      <h2 className='text-xl font-semibold text-foreground mb-2'>
        No loans found
      </h2>
      <p className='text-muted-foreground text-center mb-6'>
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
