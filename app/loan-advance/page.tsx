"use client";

import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoanAdvancePage() {
  return (
    <div className='min-h-screen bg-white p-6'>
      {/* Header */}
      <div className='flex justify-between items-start mb-8'>
        <div>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-6 w-6 text-gray-700' />
            <h1 className='text-2xl font-bold text-gray-800'>My Loans</h1>
          </div>
          <p className='text-gray-500 mt-1'>
            Manage and track your loan applications
          </p>
        </div>
        <div className='flex gap-2'>
          <Button variant='outline'>Loan Guarantees</Button>
          <Button>+ Request Loan</Button>
        </div>
      </div>

      {/* Empty State */}
      <div className='flex flex-col items-center justify-center py-20'>
        <div className='h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center mb-4'>
          <DollarSign className='h-10 w-10 text-gray-400' />
        </div>
        <h2 className='text-xl font-semibold text-gray-700 mb-2'>
          No loans found
        </h2>
        <p className='text-gray-500 text-center mb-6'>
          You haven't applied for any loans yet. Request your
          <br />
          first loan to get started.
        </p>
        <Button variant='outline'>+ Request Your First Loan</Button>
      </div>
    </div>
  );
}
