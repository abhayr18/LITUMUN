"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { EVENTS } from "@/lib/data";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    event: "all",
    search: "",
    page: 1,
  });

  const login = (e) => {
    e.preventDefault();
    setToken(passwordInput);
    setAuthenticated(true);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: filters.page.toString(),
        limit: "20",
      });
      if (filters.status !== "all") params.append("status", filters.status);
      if (filters.event !== "all") params.append("event", filters.event);
      if (filters.search) params.append("search", filters.search);

      const res = await fetch(`/api/admin/registrations?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }

      const result = await res.json();
      if (result.success) setData(result);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [token, filters]);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, fetchData]);

  const exportCSV = async () => {
    const params = new URLSearchParams();
    if (filters.status !== "all") params.append("status", filters.status);
    if (filters.event !== "all") params.append("event", filters.event);

    const res = await fetch(`/api/admin/export?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `litumun-registrations-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  if (!authenticated) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm px-4"
        >
          <div className="bg-gray-900/80 border border-white/5 rounded-2xl p-8">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h2 className="text-xl font-bold text-white">Admin Access</h2>
              <p className="text-gray-500 text-sm mt-1">Enter admin token to continue</p>
            </div>
            <form onSubmit={login} className="space-y-4">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Admin secret token"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-all"
              />
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-blue-600 rounded-xl text-sm font-bold text-white hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  const stats = data?.stats;

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Manage registrations and view analytics</p>
          </div>
          <button
            onClick={exportCSV}
            className="px-5 py-2.5 bg-emerald-600/20 border border-emerald-500/20 rounded-xl text-emerald-400 text-sm font-semibold hover:bg-emerald-600/30 transition-all flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export CSV
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Total", value: stats.total, color: "text-white" },
              { label: "Paid", value: stats.paid, color: "text-emerald-400" },
              { label: "Pending", value: stats.pending, color: "text-yellow-400" },
              { label: "Failed", value: stats.failed, color: "text-red-400" },
              { label: "Revenue", value: `₹${stats.revenue || 0}`, color: "text-violet-400" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-900/60 border border-white/5 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filters.status}
            onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value, page: 1 }))}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500"
          >
            <option value="all" className="bg-gray-900">All Status</option>
            <option value="paid" className="bg-gray-900">Paid</option>
            <option value="pending" className="bg-gray-900">Pending</option>
            <option value="failed" className="bg-gray-900">Failed</option>
          </select>

          <select
            value={filters.event}
            onChange={(e) => setFilters((p) => ({ ...p, event: e.target.value, page: 1 }))}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-violet-500"
          >
            <option value="all" className="bg-gray-900">All Events</option>
            {EVENTS.map((evt) => (
              <option key={evt.id} value={evt.id} className="bg-gray-900">{evt.shortName}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search by name, email, ID..."
            value={filters.search}
            onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value, page: 1 }))}
            className="flex-1 min-w-[200px] px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:border-violet-500"
          />

          <button
            onClick={fetchData}
            className="px-4 py-2 bg-violet-600/20 border border-violet-500/20 rounded-lg text-violet-400 text-sm font-medium hover:bg-violet-600/30 transition-all"
          >
            Search
          </button>
        </div>

        {/* Table */}
        <div className="bg-gray-900/60 border border-white/5 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-violet-200/20 border-t-violet-500 rounded-full animate-spin" />
            </div>
          ) : data?.registrations?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    {["Reg ID", "Name", "Email", "College", "Event", "Amount", "Status", "Date"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.registrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-violet-400 font-mono text-sm font-bold whitespace-nowrap">{reg.registration_id}</td>
                      <td className="px-4 py-3 text-white text-sm whitespace-nowrap">{reg.name}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">{reg.email}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap max-w-[150px] truncate">{reg.college}</td>
                      <td className="px-4 py-3 text-gray-300 text-sm whitespace-nowrap">{reg.event_name}</td>
                      <td className="px-4 py-3 text-white text-sm font-bold whitespace-nowrap">₹{reg.amount}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                          reg.payment_status === "paid" ? "bg-emerald-500/10 text-emerald-400" :
                          reg.payment_status === "pending" ? "bg-yellow-500/10 text-yellow-400" :
                          "bg-red-500/10 text-red-400"
                        }`}>
                          {reg.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-sm whitespace-nowrap">
                        {new Date(reg.created_at).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-500">No registrations found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilters((p) => ({ ...p, page: Math.max(1, p.page - 1) }))}
              disabled={filters.page === 1}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:bg-white/10 disabled:opacity-30 transition-all"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page {data.pagination.page} of {data.pagination.totalPages}
            </span>
            <button
              onClick={() => setFilters((p) => ({ ...p, page: Math.min(data.pagination.totalPages, p.page + 1) }))}
              disabled={filters.page >= data.pagination.totalPages}
              className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-400 hover:bg-white/10 disabled:opacity-30 transition-all"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
