"use client";

import { useState, useEffect } from "react";
import { DollarSign, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getActiveUsers } from "@/api/auth/users/getActiveUsers";
import { createLoan } from "@/api/loans/CreateLoan";
import { getLoans } from "@/api/loans/getloans";
import { EmptyState } from "./EmptyState";
import { LoanTypeButtons } from "./LoanTypeButton";
import { LoansTable } from "./LoansTable";
import { LoanForm100 } from "./LoanForm100";
import { LoanForm1Month } from "./LoanForm1Month";
import { LoanForm3Month } from "./LoanForm3Month";

export function LoanAdvanceContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("100");
  const [loans, setLoans] = useState<any[]>([]);
  const [notes, setNotes] = useState("");
  const [monthlyDeduction, setMonthlyDeduction] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [guarantor, setGuarantor] = useState("");
  const [showGuarantorDropdown, setShowGuarantorDropdown] = useState(false);
  const [guarantorSearch, setGuarantorSearch] = useState("");

  const [employees, setEmployees] = useState<
    { id: number; name: string | null }[]
  >([]);

  // Fetch employees and loans on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesData, loansData] = await Promise.all([
          getActiveUsers(),
          getLoans(),
        ]);
        setEmployees(employeesData);
        setLoans(loansData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const loanType =
      selectedLoanType === "100"
        ? "100$ Loan"
        : selectedLoanType === "1month"
        ? "1 Month"
        : "3 Month";

    const amount =
      selectedLoanType === "100" ? 100 : parseFloat(monthlyDeduction) || 0;

    const newLoanData = {
      type: loanType,
      amount: amount,
      remaining: amount,
      monthlyDeduction: amount,
      status: "Pending",
      guarantor: selectedLoanType === "3month" ? guarantor : undefined,
      notes: notes || undefined,
      progress: 0,
    };

    try {
      const savedLoan = await createLoan(newLoanData);
      setLoans([savedLoan, ...loans]);
      // Reset form
      setNotes("");
      setMonthlyDeduction("");
      setSelectedMonth("");
      setSelectedMonths([]);
      setGuarantor("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create loan:", error);
      alert("Failed to create loan. Please try again.");
    }
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
        <EmptyState onRequestLoan={() => setIsModalOpen(true)} />
      ) : (
        <LoansTable loans={loans} />
      )}
      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg w-full max-w-2xl p-6 shadow-2xl'>
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
            <LoanTypeButtons
              selectedLoanType={selectedLoanType}
              onSelectLoanType={setSelectedLoanType}
            />

            {/* Selected Loan Info */}
            <div className='bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4'>
              <div className='flex items-center gap-2'>
                <Calendar className='h-5 w-5 text-gray-700' />
                <div>
                  <p className='font-semibold text-gray-800'>
                    {selectedLoanType === "100"
                      ? "100$ Loan"
                      : selectedLoanType === "1month"
                      ? "1 Month"
                      : "3 Month"}
                  </p>
                  <p className='text-sm text-gray-500'>
                    {selectedLoanType === "100"
                      ? "Full salary advance"
                      : "Short-term loan"}
                  </p>
                </div>
              </div>
            </div>

            {/* Show different content based on loan type */}
            {selectedLoanType === "100" ? (
              <LoanForm100 />
            ) : selectedLoanType === "1month" ? (
              <LoanForm1Month
                monthlyDeduction={monthlyDeduction}
                onMonthlyDeductionChange={setMonthlyDeduction}
                selectedMonth={selectedMonth}
                onSelectedMonthChange={setSelectedMonth}
              />
            ) : (
              <LoanForm3Month
                guarantor={guarantor}
                onGuarantorChange={setGuarantor}
                showGuarantorDropdown={showGuarantorDropdown}
                onToggleDropdown={() =>
                  setShowGuarantorDropdown(!showGuarantorDropdown)
                }
                onCloseDropdown={() => setShowGuarantorDropdown(false)}
                guarantorSearch={guarantorSearch}
                onGuarantorSearchChange={setGuarantorSearch}
                employees={employees}
                monthlyDeduction={monthlyDeduction}
                onMonthlyDeductionChange={setMonthlyDeduction}
                selectedMonths={selectedMonths}
                onSelectedMonthsChange={setSelectedMonths}
              />
            )}

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
                  {selectedLoanType === "100"
                    ? "100$ Loan"
                    : selectedLoanType === "1month"
                    ? "1 Month"
                    : "3 Month"}
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
