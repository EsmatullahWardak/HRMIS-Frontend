"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type LeaveStatus = "Pending" | "Approved" | "Rejected";

type Leave = {
  id: number;
  type: string;
  startDate: string;
  endDate: string;
  reason?: string | null;
  status: LeaveStatus;
  userId?: number | null;
  createdAt: string;
  updatedAt: string;
};

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function LeavePage() {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [reportMonth, setReportMonth] = useState(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const [form, setForm] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
    userId: "1",
  });

  const fetchLeaves = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API}/leave`, { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      setLeaves(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to fetch leaves");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const createLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        type: form.type,
        startDate: form.startDate,
        endDate: form.endDate,
        reason: form.reason || undefined,
        status: "Pending",
        userId: form.userId ? Number(form.userId) : undefined,
      };

      const res = await fetch(`${API}/leave`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      setForm({
        type: "",
        startDate: "",
        endDate: "",
        reason: "",
        userId: "1",
      });
      await fetchLeaves();
    } catch (e: any) {
      setError(e?.message ?? "Failed to create leave");
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = async (id: number, status: LeaveStatus) => {
    try {
      setError(null);

      const res = await fetch(`${API}/leave/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error(await res.text());
      await fetchLeaves();
    } catch (e: any) {
      setError(e?.message ?? "Failed to update status");
    }
  };

  const downloadCsv = async () => {
    try {
      setDownloading(true);
      setError(null);

      const userId = form.userId?.trim();
      if (!userId) throw new Error("Please enter User ID");
      if (!reportMonth) throw new Error("Please select report month");

      const url = `${API}/leave/report/monthly/export?month=${encodeURIComponent(
        reportMonth
      )}&userId=${encodeURIComponent(userId)}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error(await res.text());

      const blob = await res.blob();

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `leave-report-${reportMonth}-user-${userId}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(a.href);
    } catch (e: any) {
      setError(e?.message ?? "Download failed");
    } finally {
      setDownloading(false);
    }
  };

  const badgeClass = (status: LeaveStatus) => {
    if (status === "Approved") return "bg-emerald-100 text-emerald-700";
    if (status === "Rejected") return "bg-rose-100 text-rose-700";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold'>Leave</h1>
        <p className='text-sm text-muted-foreground'>
          Create and manage leave requests
        </p>
      </div>

      {error && (
        <div className='rounded-md bg-red-100 px-4 py-2 text-sm text-red-700'>
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Create Leave</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={createLeave}
            className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'
          >
            <div className='space-y-1'>
              <Label>Type</Label>
              <Input
                placeholder='Sick, Vacation...'
                value={form.type}
                onChange={(e) =>
                  setForm((f) => ({ ...f, type: e.target.value }))
                }
                required
              />
            </div>

            <div className='space-y-1'>
              <Label>Start Date</Label>
              <Input
                type='date'
                value={form.startDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, startDate: e.target.value }))
                }
                required
              />
            </div>

            <div className='space-y-1'>
              <Label>End Date</Label>
              <Input
                type='date'
                value={form.endDate}
                onChange={(e) =>
                  setForm((f) => ({ ...f, endDate: e.target.value }))
                }
                required
              />
            </div>

            <div className='space-y-1 md:col-span-2 lg:col-span-2'>
              <Label>Reason</Label>
              <Input
                placeholder='Optional'
                value={form.reason}
                onChange={(e) =>
                  setForm((f) => ({ ...f, reason: e.target.value }))
                }
              />
            </div>

            <div className='space-y-1'>
              <Label>User ID</Label>
              <Input
                type='number'
                min={1}
                value={form.userId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, userId: e.target.value }))
                }
              />
            </div>

            <div className='flex items-end'>
              <Button type='submit' disabled={submitting}>
                {submitting ? "Creating..." : "Create"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
          <CardTitle>All Leaves</CardTitle>

          <div className='flex flex-col gap-2 md:flex-row md:items-center'>
            <div className='flex items-center gap-2'>
              <Label className='text-xs'>Report Month</Label>
              <Input
                type='month'
                value={reportMonth}
                onChange={(e) => setReportMonth(e.target.value)}
                className='h-9 w-[160px]'
              />
            </div>

            <Button
              variant='outline'
              onClick={downloadCsv}
              disabled={downloading}
            >
              {downloading ? "Downloading..." : "Download Excel (CSV)"}
            </Button>

            {loading && (
              <span className='text-xs text-muted-foreground'>Loading...</span>
            )}
          </div>
        </CardHeader>

        <CardContent>
          {leaves.length === 0 ? (
            <p className='text-sm text-muted-foreground'>
              No leave records found.
            </p>
          ) : (
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Dates</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {leaves.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell>{l.id}</TableCell>
                      <TableCell>{l.type}</TableCell>
                      <TableCell className='text-xs text-muted-foreground'>
                        {l.startDate.slice(0, 10)} → {l.endDate.slice(0, 10)}
                      </TableCell>
                      <TableCell>{l.reason ?? "-"}</TableCell>
                      <TableCell>
                        <Badge className={badgeClass(l.status)}>
                          {l.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{l.userId ?? "-"}</TableCell>
                      <TableCell className='text-right space-x-2'>
                        <Button
                          size='sm'
                          variant='outline'
                          disabled={l.status !== "Pending"}
                          onClick={() => updateStatus(l.id, "Approved")}
                        >
                          Approve
                        </Button>
                        <Button
                          size='sm'
                          variant='outline'
                          className='border-rose-300 text-rose-700 hover:bg-rose-50'
                          disabled={l.status !== "Pending"}
                          onClick={() => updateStatus(l.id, "Rejected")}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
