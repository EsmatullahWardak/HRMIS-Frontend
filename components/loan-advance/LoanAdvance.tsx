"use client";

import { useEffect, useState } from "react";
import { Calendar, DollarSign, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getActiveUsers } from "@/api/auth/users/getActiveUsers";
import { createLoan } from "@/api/loans/CreateLoan";
import { getLoans } from "@/api/loans/getloans";
import { getGuarantorRequests } from "@/api/loans/getGuarantorRequests";
import { respondToGuarantorRequest } from "@/api/loans/respondToGuarantorRequest";
import { EmptyState } from "./EmptyState";
import { LoanTypeButtons } from "./LoanTypeButton";
import { LoansTable } from "./LoansTable";
import { LoanForm100 } from "./LoanForm100";
import { LoanForm1Month } from "./LoanForm1Month";
import { LoanForm3Month } from "./LoanForm3Month";

interface Employee {
  id: number;
  name: string | null;
  email: string;
}

interface Loan {
  id: number;
  type: string;
  amount: number;
  remaining: number;
  monthlyDeduction: number;
  status: string;
  guarantor: string | null;
  notes: string | null;
  progress: number;
  issuedDate: string;
}

export function LoanAdvanceContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGuaranteeModalOpen, setIsGuaranteeModalOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState("100");
  const [loans, setLoans] = useState<Loan[]>([]);
  const [guarantorRequests, setGuarantorRequests] = useState<Loan[]>([]);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [monthlyDeduction, setMonthlyDeduction] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);
  const [guarantor, setGuarantor] = useState("");
  const [showGuarantorDropdown, setShowGuarantorDropdown] = useState(false);
  const [guarantorSearch, setGuarantorSearch] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);

  const loadLoans = async () => {
    const loansData = await getLoans();
    setLoans(loansData);
  };

  const loadGuarantorRequests = async () => {
    const requests = await getGuarantorRequests();
    setGuarantorRequests(requests);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesData] = await Promise.all([getActiveUsers(), loadLoans()]);
        setEmployees(employeesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (selectedLoanType === "3month" && !guarantor) {
      alert("Please select a guarantor for 3-month loans.");
      return;
    }

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
      amount,
      remaining: amount,
      monthlyDeduction: amount,
      status: selectedLoanType === "3month" ? "Pending Guarantor" : "Pending",
      guarantor: selectedLoanType === "3month" ? guarantor : undefined,
      notes: notes || undefined,
      progress: 0,
    };

    try {
      const savedLoan = await createLoan(newLoanData);
      setLoans([savedLoan, ...loans]);
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

  const openGuaranteeModal = async () => {
    try {
      await loadGuarantorRequests();
      setIsGuaranteeModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch guarantor requests:", error);
      alert("Failed to load guarantor requests.");
    }
  };

  const handleGuarantorAction = async (
    loanId: number,
    action: "ACCEPT" | "REJECT"
  ) => {
    try {
      setActionLoadingId(loanId);
      await respondToGuarantorRequest(loanId, action);
      await Promise.all([loadGuarantorRequests(), loadLoans()]);
    } catch (error) {
      console.error("Failed to respond to guarantor request:", error);
      alert("Failed to update guarantor response.");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className='min-h-screen bg-card p-6'>
      <div className='flex justify-between items-start mb-8'>
        <div>
          <div className='flex items-center gap-2'>
            <DollarSign className='h-6 w-6 text-foreground' />
            <h1 className='text-2xl font-bold text-foreground'>My Loans</h1>
          </div>
          <p className='text-muted-foreground mt-1'>
            Manage and track your loan applications
          </p>
        </div>

        <div className='flex gap-2'>
          <Button variant='outline' onClick={openGuaranteeModal}>
            Loan Guarantees
          </Button>
          <Button onClick={() => setIsModalOpen(true)}>+ Request Loan</Button>
        </div>
      </div>

      {loans.length === 0 ? (
        <EmptyState onRequestLoan={() => setIsModalOpen(true)} />
      ) : (
        <LoansTable loans={loans} />
      )}

      {isModalOpen && (
        <div className='fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-50'>
          <div className='bg-card rounded-lg w-full max-w-2xl p-6 shadow-2xl'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl text-foreground font-semibold'>Request a Loan</h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className='h-6 w-6 text-muted-foreground hover:text-foreground' />
              </button>
            </div>

            <div className='mb-4'>
              <h3 className='text-lg text-foreground font-semibold'>Loan Application</h3>
              <p className='text-muted-foreground text-sm'>
                Select loan type and fill the details
              </p>
            </div>

            <LoanTypeButtons
              selectedLoanType={selectedLoanType}
              onSelectLoanType={setSelectedLoanType}
            />

            <div className='bg-muted border border-border rounded-lg p-4 mb-4'>
              <div className='flex items-center gap-2'>
                <Calendar className='h-5 w-5 text-foreground' />
                <div>
                  <p className='font-semibold text-foreground'>
                    {selectedLoanType === "100"
                      ? "100$ Loan"
                      : selectedLoanType === "1month"
                        ? "1 Month"
                        : "3 Month"}
                  </p>
                  <p className='text-sm text-muted-foreground'>
                    {selectedLoanType === "100" ? "Full salary advance" : "Short-term loan"}
                  </p>
                </div>
              </div>
            </div>

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
                onToggleDropdown={() => setShowGuarantorDropdown(!showGuarantorDropdown)}
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

            <div className='mb-6'>
              <label className='text-sm text-muted-foreground'>Additional Notes</label>
              <textarea
                placeholder='Any additional information...'
                className='w-full bg-muted border border-border rounded-lg p-3 mt-1 text-foreground placeholder:text-muted-foreground resize-none'
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className='flex justify-between items-center'>
              <p className='text-sm text-muted-foreground'>
                Applying for:{" "}
                <span className='bg-muted text-foreground px-2 py-1 rounded'>
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

      {isGuaranteeModalOpen && (
        <div className='fixed inset-0 bg-black/20 backdrop-blur-[2px] flex items-center justify-center z-50'>
          <div className='bg-card rounded-lg w-full max-w-2xl p-6 shadow-2xl'>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl text-foreground font-semibold'>Loan Guarantees</h2>
              <button onClick={() => setIsGuaranteeModalOpen(false)}>
                <X className='h-6 w-6 text-muted-foreground hover:text-foreground' />
              </button>
            </div>

            {guarantorRequests.length === 0 ? (
              <p className='text-sm text-muted-foreground'>
                No pending guarantor requests.
              </p>
            ) : (
              <div className='space-y-3 max-h-[60vh] overflow-y-auto pr-1'>
                {guarantorRequests.map((loan) => (
                  <div
                    key={loan.id}
                    className='border border-border rounded-lg p-4 flex items-start justify-between gap-4'
                  >
                    <div>
                      <p className='font-semibold text-foreground'>
                        Loan #{loan.id} - {loan.type}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        Amount: ${loan.amount}
                      </p>
                      <p className='text-sm text-muted-foreground'>Status: {loan.status}</p>
                    </div>

                    <div className='flex gap-2'>
                      <Button
                        onClick={() => handleGuarantorAction(loan.id, "ACCEPT")}
                        disabled={actionLoadingId === loan.id}
                      >
                        Accept
                      </Button>
                      <Button
                        variant='outline'
                        onClick={() => handleGuarantorAction(loan.id, "REJECT")}
                        disabled={actionLoadingId === loan.id}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
