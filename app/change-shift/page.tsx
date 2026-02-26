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

type ShiftChangeStatus = "Pending" | "Approved" | "Rejected";
type UserRole = "ADMIN" | "OFFICER" | "EMPLOYEE";

type ShiftChange = {
  id: number;
  shiftDate: string;
  currentShift: string;
  requestedShift: string;
  reason?: string | null;
  status: ShiftChangeStatus;
  userId?: number | null;
  createdAt: string;
  updatedAt: string;
};

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export default function ChangeShiftPage() {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>("EMPLOYEE");
  const [requests, setRequests] = useState<ShiftChange[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    shiftDate: "",
    currentShift: "",
    requestedShift: "",
    reason: "",
  });

  const canReview = role === "ADMIN" || role === "OFFICER";
  const canSubmit = role !== "ADMIN";

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
      const res = await fetch(`${API}/shift-change`, {
        cache: "no-store",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setRequests(data);
    } catch (e: any) {
      setError(e?.message ?? "Failed to fetch shift change requests");
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingCount = async () => {
    if (!canReview) return;
    try {
      const res = await fetch(`${API}/shift-change/pending/count`, {
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

  const submitShiftChange = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      setError(null);

      const payload = {
        shiftDate: form.shiftDate,
        currentShift: form.currentShift,
        requestedShift: form.requestedShift,
        reason: form.reason || undefined,
      };

      const res = await fetch(`${API}/shift-change`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());

      setForm({
        shiftDate: "",
        currentShift: "",
        requestedShift: "",
        reason: "",
      });
      await fetchRequests();
      await fetchPendingCount();
    } catch (e: any) {
      setError(e?.message ?? "Failed to submit shift change request");
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = async (id: number, status: ShiftChangeStatus) => {
    try {
      setError(null);
      const res = await fetch(`${API}/shift-change/${id}/status`, {
        method: "PATCH",
        headers: authHeaders(),
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error(await res.text());
      await fetchRequests();
      await fetchPendingCount();
    } catch (e: any) {
      setError(e?.message ?? "Failed to update shift change status");
    }
  };

  const badgeClass = (status: ShiftChangeStatus) => {
    if (status === "Approved") return "bg-emerald-100 text-emerald-700";
    if (status === "Rejected") return "bg-rose-100 text-rose-700";
    return "bg-amber-100 text-amber-700";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Change Shift</h1>
        <p className="text-sm text-muted-foreground">
          {canReview
            ? "Review and approve shift change requests"
            : "Submit and track your shift change requests"}
        </p>
      </div>

      {canReview && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm">
              Pending shift change requests:{" "}
              <span className="font-semibold text-amber-600">{pendingCount}</span>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <div className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {canSubmit && (
        <Card>
          <CardHeader>
            <CardTitle>Request Shift Change</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={submitShiftChange}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              <div className="space-y-1">
                <Label>Shift Date</Label>
                <Input
                  type="date"
                  value={form.shiftDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, shiftDate: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>Current Shift</Label>
                <Input
                  placeholder="Morning, Evening..."
                  value={form.currentShift}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, currentShift: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-1">
                <Label>Requested Shift</Label>
                <Input
                  placeholder="Night, Day..."
                  value={form.requestedShift}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, requestedShift: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-1 lg:col-span-2">
                <Label>Reason</Label>
                <Input
                  placeholder="Optional"
                  value={form.reason}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, reason: e.target.value }))
                  }
                />
              </div>

              <div className="flex items-end">
                <Button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Submit Request"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {canReview ? "All Shift Change Requests" : "My Shift Change Requests"}
          </CardTitle>
          {loading && <span className="text-xs text-muted-foreground">Loading...</span>}
        </CardHeader>
        <CardContent>
          {requests.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No shift change records found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Shift Date</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.shiftDate.slice(0, 10)}</TableCell>
                      <TableCell>{item.currentShift}</TableCell>
                      <TableCell>{item.requestedShift}</TableCell>
                      <TableCell>{item.reason ?? "-"}</TableCell>
                      <TableCell>
                        <Badge className={badgeClass(item.status)}>{item.status}</Badge>
                      </TableCell>
                      <TableCell>{item.userId ?? "-"}</TableCell>
                      <TableCell className="text-right space-x-2">
                        {canReview ? (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={item.status !== "Pending"}
                              onClick={() => updateStatus(item.id, "Approved")}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-rose-300 text-rose-700 hover:bg-rose-50"
                              disabled={item.status !== "Pending"}
                              onClick={() => updateStatus(item.id, "Rejected")}
                            >
                              Reject
                            </Button>
                          </>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Awaiting officer action
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
