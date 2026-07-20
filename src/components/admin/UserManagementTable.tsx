"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { ShieldOff, ShieldCheck, Trash2 } from "lucide-react";
import { api } from "@/lib/api";
import { getErrorMessage, cn } from "@/lib/utils";
import { useAdminUsers } from "@/hooks/useAdminUsers";
import { useDebounce } from "@/hooks/useDebounce";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/jobs/Pagination";
import { AdminUser, AdminUsersResponse } from "@/types/admin";

const roleStyles: Record<string, string> = {
  seeker: "bg-blue-100 text-blue-700",
  employer: "bg-purple-100 text-purple-700",
  admin: "bg-ink text-paper",
};

export function UserManagementTable() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const [searchInput, setSearchInput] = useState(
    searchParams.get("search") ?? "",
  );
  const debouncedSearch = useDebounce(searchInput, 400);
  const role = searchParams.get("role") ?? "";
  const page = Number(searchParams.get("page")) || 1;

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) params.set(key, value);
      else params.delete(key);
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (debouncedSearch !== (searchParams.get("search") ?? "")) {
      updateParam("search", debouncedSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const queryParams = {
    search: debouncedSearch || undefined,
    role: role || undefined,
    page,
  };
  const { data, isPending, isError } = useAdminUsers(queryParams);

  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const handleToggleActive = async (user: AdminUser) => {
    setBusyId(user._id);
    try {
      await api.patch(`/api/admin/users/${user._id}/status`, {
        isActive: !user.isActive,
      });
      queryClient.setQueryData<AdminUsersResponse | undefined>(
        ["admin-users", queryParams],
        (prev) =>
          prev
            ? {
                ...prev,
                users: prev.users.map((u) =>
                  u._id === user._id ? { ...u, isActive: !u.isActive } : u,
                ),
              }
            : prev,
      );
      toast.success(user.isActive ? "User deactivated" : "User activated");
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not update user"));
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (userId: string) => {
    if (confirmingId !== userId) {
      setConfirmingId(userId);
      setTimeout(
        () =>
          setConfirmingId((current) => (current === userId ? null : current)),
        3000,
      );
      return;
    }
    setBusyId(userId);
    try {
      await api.delete(`/api/admin/users/${userId}`);
      toast.success("User deleted");
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    } catch (err) {
      toast.error(getErrorMessage(err, "Could not delete user"));
    } finally {
      setBusyId(null);
      setConfirmingId(null);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search by name or email…"
          className="min-h-11 flex-1 rounded-lg border border-line bg-paper px-3.5 text-sm text-ink placeholder:text-slate/70 focus:border-signal focus:outline-none focus:ring-2 focus:ring-signal/20"
        />
        <Select
          value={role}
          onChange={(e) => updateParam("role", e.target.value)}
          className="sm:w-48"
        >
          <option value="">All roles</option>
          <option value="seeker">Job Seeker</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </Select>
      </div>

      {isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-line" />
          ))}
        </div>
      ) : isError || !data ? (
        <p className="py-16 text-center text-sm text-slate">
          Couldn&apos;t load users right now.
        </p>
      ) : data.users.length === 0 ? (
        <p className="py-16 text-center text-sm text-slate">
          No users match your search.
        </p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line">
          <div className="hidden bg-paper px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate sm:grid sm:grid-cols-[2fr_1fr_1fr_auto] sm:gap-4">
            <span>User</span>
            <span>Role</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="divide-y divide-line bg-white/60">
            {data.users.map((user) => (
              <div
                key={user._id}
                className="flex flex-col gap-3 px-5 py-4 sm:grid sm:grid-cols-[2fr_1fr_1fr_auto] sm:items-center sm:gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium text-ink">{user.name}</p>
                  <p className="truncate text-xs text-slate">{user.email}</p>
                </div>
                <div>
                  <span
                    className={cn(
                      "inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize",
                      roleStyles[user.role],
                    )}
                  >
                    {user.role}
                  </span>
                </div>
                <div>
                  <span
                    className={cn(
                      "inline-block rounded-full px-2.5 py-1 text-xs font-medium",
                      user.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-slate/10 text-slate",
                    )}
                  >
                    {user.isActive ? "Active" : "Deactivated"}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  {user.role === "admin" ? (
                    <span className="text-xs text-slate">Protected</span>
                  ) : (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        className="h-9 px-3 text-xs"
                        isLoading={
                          busyId === user._id && confirmingId !== user._id
                        }
                        onClick={() => handleToggleActive(user)}
                      >
                        {user.isActive ? (
                          <ShieldOff className="h-3.5 w-3.5" />
                        ) : (
                          <ShieldCheck className="h-3.5 w-3.5" />
                        )}
                        {user.isActive ? "Deactivate" : "Activate"}
                      </Button>
                      <Button
                        type="button"
                        variant={
                          confirmingId === user._id ? "primary" : "outline"
                        }
                        className={cn(
                          "h-9 px-3 text-xs",
                          confirmingId === user._id &&
                            "bg-red-500 hover:bg-red-600",
                        )}
                        isLoading={
                          busyId === user._id && confirmingId === user._id
                        }
                        onClick={() => handleDelete(user._id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {confirmingId === user._id ? "Confirm?" : "Delete"}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {data && data.pagination.totalPages > 1 && (
        <Pagination pagination={data.pagination} />
      )}
    </div>
  );
}
