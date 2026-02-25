"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getToken, getUserFromToken, isAuthenticated } from "@/lib/auth";

type OvertimeStatus = "Pending" | "Approved" | "Rejected";
type UserRole = "ADMIN" | "OFFICER" | "EMPLOYEE";

type Overtime = {
  id: number;
  workDate: string;
  hours: number;
  reason?: string | null;
  status: OvertimeStatus;
  userId?: number | null;
  createdAt: string;
  updatedAt: string;
};

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function OvertimePage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("EMPLOYEE");
  const [requests, setRequests] = useState<Overtime[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    workDate: "",
    hours: "",
    reason: "",
  });

  const authHeaders = () => {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API}/overtime`, {
        cache: "no-store",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setRequests(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to fetch overtime requests");
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingCount = async () => {
    if (role !== "ADMIN") return;
    try {
      const res = await fetch(`${API}/overtime/pending/count`, {
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setPendingCount(data.count ?? 0);
    } catch {
      setPendingCount(0);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/auth/login");
      return;
    }
    const user = getUserFromToken();
    if (user?.role) setRole(user.role);
  }, [router]);

  useEffect(() => {
    void fetchRequests();
    void fetchPendingCount();
  }, [role]);

  const submitOvertime = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        workDate: form.workDate,
        hours: Number(form.hours),
        reason: form.reason || undefined,
      };

      const res = await fetch(`${API}/overtime`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());

      setForm({ workDate: "", hours: "", reason: "" });
      await fetchRequests();
      await fetchPendingCount();
    } catch (e: any) {
      setError(e?.message ?? "Failed to submit overtime");
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = async (id: number, status: OvertimeStatus) => {
    try {
      setError(null);
      const res = await fetch(`${API}/overtime/${id}/status`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchRequests();
      await fetchPendingCount();
    } catch (e: any) {
      setError(e?.message ?? "Failed to update overtime status");
    }
  };

  const badgeClass = (status: OvertimeStatus) => {
    if (status === "Approved") return "bg-emerald-100 text-emerald-700";
    if (status === "Rejected") return "bg-rose-100 text-rose-700";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold'>Overtime</h1>
        <p className='text-sm text-muted-foreground'>
          {role === "ADMIN"
            ? "Review and approve overtime requests"
            : "Submit and track your overtime requests"}
        </p>
      </div>

      {role === "ADMIN" && (
        <Card>
          <CardContent className='pt-6'>
            <div className='text-sm'>
              Pending overtime requests:{" "}
              <span className='font-semibold text-amber-600'>{pendingCount}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className='rounded-md bg-red-100 px-4 py-2 text-sm text-red-700'>
          {error}
        </div>
      )}

      {role !== "ADMIN" && (
        <Card>
          <CardHeader>
            <CardTitle>Submit Overtime</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={submitOvertime}
              className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'
            >
              <div className='space-y-1'>
                <Label>Work Date</Label>
                <Input
                  type='date'
                  value={form.workDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, workDate: e.target.value }))
                  }
                  required
                />
              </div>

              <div className='space-y-1'>
                <Label>Hours</Label>
                <Input
                  type='number'
                  min='0.5'
                  step='0.5'
                  value={form.hours}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, hours: e.target.value }))
                  }
                  required
                />
              </div>

              <div className='space-y-1 md:col-span-2'>
                <Label>Reason</Label>
                <Input
                  placeholder='Optional'
                  value={form.reason}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, reason: e.target.value }))
                  }
                />
              </div>

              <div className='flex items-end'>
                <Button type='submit' disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Overtime"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>
            {role === "ADMIN" ? "All Overtime Requests" : "My Overtime Requests"}
          </CardTitle>
          {loading && <span className='text-xs text-muted-foreground'>Loading...</span>}
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className='text-sm text-muted-foreground'>No overtime records found.</p>
          ) : (
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Work Date</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.workDate.slice(0, 10)}</TableCell>
                      <TableCell>{item.hours}</TableCell>
                      <TableCell>{item.reason ?? "-"}</TableCell>
                      <TableCell>
                        <Badge className={badgeClass(item.status)}>{item.status}</Badge>
                      </TableCell>
                      <TableCell>{item.userId ?? "-"}</TableCell>
                      <TableCell className='text-right space-x-2'>
                        {role === "ADMIN" ? (
                          <>
                            <Button
                              size='sm'
                              variant='outline'
                              disabled={item.status !== "Pending"}
                              onClick={() => updateStatus(item.id, "Approved")}
                            >
                              Approve
                            </Button>
                            <Button
                              size='sm'
                              variant='outline'
                              className='border-rose-300 text-rose-700 hover:bg-rose-50'
                              disabled={item.status !== "Pending"}
                              onClick={() => updateStatus(item.id, "Rejected")}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <span className='text-xs text-muted-foreground'>
                            Awaiting admin action
                          </span>
                        )}
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
