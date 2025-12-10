"use client";

import { useState, useEffect } from "react";
import { DollarSign, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getActiveUsers } from "@/api/auth/users/getActiveUsers";
import { EmptyState } from "./EmptyState";
import { LoanTypeButtons } from "./LoanTypeButton";
import { LoansTable } from "./LoansTable";
import { LoanForm100 } from "./LoanForm100";

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
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getActiveUsers();
        setEmployees(data);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
      }
    };
    fetchEmployees();
  }, []);
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
              /* 1 Month - Fields */
              <div className='mb-4'>
                <label className='text-sm text-gray-500'>
                  Monthly Deduction *
                </label>
                <div className='bg-white border border-gray-300 rounded-lg p-3 mt-1 flex items-center gap-2'>
                  <span className='text-gray-500'>$</span>
                  <input
                    type='text'
                    inputMode='decimal'
                    placeholder='0.00'
                    value={monthlyDeduction}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                        setMonthlyDeduction(value);
                      }
                    }}
                    className='flex-1 bg-transparent text-gray-800 outline-none'
                    autoComplete='off'
                  />
                </div>

                <label className='text-sm text-gray-500 mt-4 block'>
                  Repayment Month *{" "}
                  <span className='text-gray-400'>(Select 1)</span>
                </label>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((month) => (
                    <button
                      key={month}
                      onClick={() => setSelectedMonth(month)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedMonth === month
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-600 border border-gray-300"
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* 3 Month - Fields with Guarantor */
              <div className='mb-4'>
                {/* Guarantor Dropdown */}
                <label className='text-sm text-gray-500'>Guarantor *</label>
                <div className='relative mt-1'>
                  <button
                    onClick={() =>
                      setShowGuarantorDropdown(!showGuarantorDropdown)
                    }
                    className='w-full bg-gray-100 border border-gray-200 rounded-lg p-3 text-left text-gray-800 flex justify-between items-center'
                  >
                    {guarantor || "Select guarantor (required)"}
                    <span className='text-gray-400'>▼</span>
                  </button>
                  {showGuarantorDropdown && (
                    <div className='absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto'>
                      <div className='p-2 border-b'>
                        <input
                          type='text'
                          placeholder='Search employees...'
                          value={guarantorSearch}
                          onChange={(e) => setGuarantorSearch(e.target.value)}
                          className='w-full p-2 border border-gray-200 rounded-lg text-gray-800 outline-none'
                        />
                      </div>
                      {employees
                        .filter((emp) =>
                          (emp.name || "")
                            .toLowerCase()
                            .includes(guarantorSearch.toLowerCase())
                        )
                        .map((emp) => (
                          <button
                            key={emp.id}
                            onClick={() => {
                              setGuarantor(
                                `${emp.name || "No Name"} (${emp.id})`
                              );
                              setShowGuarantorDropdown(false);
                              setGuarantorSearch("");
                            }}
                            className='w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-800'
                          >
                            {emp.name || "No Name"} ({emp.id})
                          </button>
                        ))}
                    </div>
                  )}
                </div>

                {/* Monthly Deduction */}
                <label className='text-sm text-gray-500 mt-4 block'>
                  Monthly Deduction *
                </label>
                <div className='bg-white border border-gray-300 rounded-lg p-3 mt-1 flex items-center gap-2'>
                  <span className='text-gray-500'>$</span>
                  <input
                    type='text'
                    inputMode='decimal'
                    placeholder='0.00'
                    value={monthlyDeduction}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
                        setMonthlyDeduction(value);
                      }
                    }}
                    className='flex-1 bg-transparent text-gray-800 outline-none'
                    autoComplete='off'
                  />
                </div>

                {/* Repayment Months - Select 3 */}
                <label className='text-sm text-gray-500 mt-4 block'>
                  Repayment Months *{" "}
                  <span className='text-gray-400'>(Select 3)</span>
                </label>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {[
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ].map((month) => (
                    <button
                      key={month}
                      onClick={() => {
                        if (selectedMonths.includes(month)) {
                          setSelectedMonths(
                            selectedMonths.filter((m) => m !== month)
                          );
                        } else if (selectedMonths.length < 3) {
                          setSelectedMonths([...selectedMonths, month]);
                        }
                      }}
                      className={`px-3 py-1 rounded-full text-sm ${
                        selectedMonths.includes(month)
                          ? "bg-gray-800 text-white"
                          : "bg-white text-gray-600 border border-gray-300"
                      }`}
                    >
                      {month}
                    </button>
                  ))}
                </div>
              </div>
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
