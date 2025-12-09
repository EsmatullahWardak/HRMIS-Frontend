"use client";

import { useState } from "react";
import { DollarSign, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoanAdvancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("100");
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
          <div className='flex gap-2'>
            <Button variant='outline'>Loan Guarantees</Button>
            <Button onClick={() => setIsModalOpen(true)}>+ Request Loan</Button>
          </div>
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
      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-50'>
          <div className='bg-[#1a2332] rounded-lg w-full max-w-lg p-6 text-white shadow-2xl'>
            {/* Modal Header */}
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-semibold'>Request a Loan</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className='h-6 w-6 text-gray-400 hover:text-white' />
              </button>
            </div>

            {/* Loan Application */}
            <div className='mb-4'>
              <h3 className='text-lg font-semibold'>Loan Application</h3>
              <p className='text-gray-400 text-sm'>
                Select loan type and fill the details
              </p>
            </div>

            {/* Loan Type Buttons */}
            <div className='flex gap-2 mb-6'>
              <button
                onClick={() => setSelectedLoanType("100")}
                className={`px-4 py-2 rounded-full ${
                  selectedLoanType === "100" ? "bg-gray-700" : "bg-gray-800"
                }`}
              >
                $ 100$ Loan
              </button>
              <button
                onClick={() => setSelectedLoanType("1month")}
                className={`px-4 py-2 rounded-full ${
                  selectedLoanType === "1month" ? "bg-gray-700" : "bg-gray-800"
                }`}
              >
                📅 1 Month
              </button>
              <button
                onClick={() => setSelectedLoanType("3month")}
                className={`px-4 py-2 rounded-full ${
                  selectedLoanType === "3month" ? "bg-gray-700" : "bg-gray-800"
                }`}
              >
                📅 3 Month
              </button>
            </div>

            {/* Selected Loan Info */}
            <div className='bg-gray-800 rounded-lg p-4 mb-4'>
              <div className='flex items-center gap-2'>
                <DollarSign className='h-5 w-5' />
                <div>
                  <p className='font-semibold'>100$ Loan</p>
                  <p className='text-sm text-gray-400'>Full salary advance</p>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='text-sm text-gray-400'>Loan Amount</label>
                <div className='bg-gray-800 rounded-lg p-3 mt-1'>$ 100.00</div>
              </div>
              <div>
                <label className='text-sm text-gray-400'>
                  Monthly Deduction
                </label>
                <div className='bg-gray-800 rounded-lg p-3 mt-1'>$ 100.00</div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className='mb-6'>
              <label className='text-sm text-gray-400'>Additional Notes</label>
              <textarea
                placeholder='Any additional information...'
                className='w-full bg-gray-800 rounded-lg p-3 mt-1 text-white resize-none'
                rows={3}
              />
            </div>

            {/* Footer */}
            <div className='flex justify-between items-center'>
              <p className='text-sm'>
                Applying for:{" "}
                <span className='bg-gray-700 px-2 py-1 rounded'>100$ Loan</span>
              </p>
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
