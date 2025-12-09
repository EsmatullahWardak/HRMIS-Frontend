"use client";

import { useState } from "react";
import { DollarSign, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LoanAdvancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("100");
  const [loans, setLoans] = useState<any[]>([]);
  const [notes, setNotes] = useState("");
  const handleSubmit = () => {
    const newLoan = {
      id: loans.length + 1,
      type:
        selectedLoanType === "100"
          ? "100$ Loan"
          : selectedLoanType === "1month"
          ? "1 Month"
          : "3 Month",
      amount: 100,
      remaining: 100,
      monthly: 100,
      status: "Pending",
      issuedDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      guarantor: "Not required",
      notes: notes,
      progress: 0,
    };
    setLoans([...loans, newLoan]);
    setNotes("");
    setIsModalOpen(false);
  };
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

      {/* Loans Table or Empty State */}
      {loans.length === 0 ? (
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
          <Button variant='outline' onClick={() => setIsModalOpen(true)}>
            + Request Your First Loan
          </Button>
        </div>
      ) : (
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
              <div className='text-sm text-gray-600'>
                Issued: {loan.issuedDate}
              </div>
              <div className='text-sm text-gray-500'>{loan.guarantor}</div>
              <div className='text-blue-600 text-sm underline cursor-pointer'>
                View note
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg w-full max-w-2xl p-6 text-white shadow-2xl'>
            {/* Modal Header */}
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl text-gray-800 font-semibold'>
                Request a Loan
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className='h-6 w-6 text-gray-500 hover:text-gray-800' />
              </button>
            </div>

            {/* Loan Application */}
            <div className='mb-4'>
              <h3 className='text-lg text-gray-800 font-semibold'>
                Loan Application
              </h3>
              <p className='text-gray-500 text-sm'>
                Select loan type and fill the details
              </p>
            </div>

            {/* Loan Type Buttons */}
            <div className='flex gap-2 mb-6'>
              <button
                onClick={() => setSelectedLoanType("100")}
                className={`px-4 py-2 rounded-full ${
                  selectedLoanType === "100"
                    ? "bg-gray-200 text-gray-800 border-2 border-gray-400"
                    : "bg-white text-gray-600 border border-gray-300"
                }`}
              >
                $ 100$ Loan
              </button>
              <button
                onClick={() => setSelectedLoanType("1month")}
                className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                  selectedLoanType === "1month"
                    ? "bg-gray-200 text-gray-800 border-2 border-gray-400"
                    : "bg-white text-gray-600 border border-gray-300"
                }`}
              >
                <Calendar className='h-4 w-4' /> 1 Month
              </button>
              <button
                onClick={() => setSelectedLoanType("3month")}
                className={`px-4 py-2 rounded-full flex items-center gap-2 ${
                  selectedLoanType === "3month"
                    ? "bg-gray-200 text-gray-800 border-2 border-gray-400"
                    : "bg-white text-gray-600 border border-gray-300"
                }`}
              >
                <Calendar className='h-4 w-4' /> 3 Month
              </button>
            </div>

            {/* Selected Loan Info */}
            <div className='bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4'>
              <div className='flex items-center gap-2'>
                <DollarSign className='h-5 w-5 text-gray-700' />
                <div>
                  <p className='font-semibold text-gray-800'>100$ Loan</p>
                  <p className='text-sm text-gray-500'>Full salary advance</p>
                </div>
              </div>
            </div>

            {/* Input Fields */}
            <div className='grid grid-cols-2 gap-4 mb-4'>
              <div>
                <label className='text-sm text-gray-500'>Loan Amount</label>
                <div className='bg-gray-100 border border-gray-200 rounded-lg p-3 mt-1 text-gray-800'>
                  $ 100.00
                </div>
              </div>
              <div>
                <label className='text-sm text-gray-500'>
                  Monthly Deduction
                </label>
                <div className='bg-gray-100 border border-gray-200 rounded-lg p-3 mt-1 text-gray-800'>
                  $ 100.00
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className='mb-6'>
              <label className='text-sm text-gray-500'>Additional Notes</label>
              <textarea
                placeholder='Any additional information...'
                className='w-full bg-gray-100 border border-gray-200 rounded-lg p-3 mt-1 text-gray-800 placeholder-gray-400 resize-none'
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Footer */}
            <div className='flex justify-between items-center'>
              <p className='text-sm text-gray-600'>
                Applying for:{" "}
                <span className='bg-gray-200 text-gray-800 px-2 py-1 rounded'>
                  100$ Loan
                </span>
              </p>
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
