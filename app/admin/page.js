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
      <div className="pt-24 min-h-screen flex items-center justify-center bg-transparent px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-sm"
        >
          <div className="luxury-card rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#b8975a] to-[#d5be8f] flex items-center justify-center mx-auto mb-4 text-black shadow-sm">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
              </div>
              <h2 className="text-xl font-serif-luxury font-bold text-[#fbf9f4]">Admin Access</h2>
              <p className="text-[#fbf9f4]/50 text-xs font-poppins-clean font-semibold uppercase tracking-widest mt-1">Enter credentials</p>
            </div>
            <form onSubmit={login} className="space-y-4">
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Secret access token"
                className="w-full px-4 py-3 bg-[#1c0e07]/60 border border-[#b8975a]/15 rounded-xl text-[#fbf9f4] placeholder-gray-500 focus:outline-none focus:border-[#b8975a] focus:ring-1 focus:ring-[#b8975a]/35 transition-all font-poppins-clean font-light"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#b8975a] hover:bg-[#d5be8f] text-black hover:text-black rounded-xl text-xs font-poppins-clean font-bold uppercase tracking-widest transition-all duration-300 border border-[#b8975a]/20 cursor-pointer"
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
    <div className="pt-24 bg-transparent min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif-luxury font-bold text-[#fbf9f4]">Admin Dashboard</h1>
            <p className="text-[#fbf9f4]/50 text-xs font-poppins-clean font-bold uppercase tracking-widest mt-0.5">Manage registrations and view analytics</p>
          </div>
          <button
            onClick={exportCSV}
            className="px-5 py-2.5 bg-[#b8975a]/10 border border-[#b8975a]/20 rounded-xl text-[#b8975a] text-xs font-poppins-clean font-bold uppercase tracking-widest hover:bg-[#b8975a]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Export CSV
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Total", value: stats.total, color: "text-[#fbf9f4]" },
              { label: "Paid", value: stats.paid, color: "text-emerald-400" },
              { label: "Pending", value: stats.pending, color: "text-amber-400" },
              { label: "Failed", value: stats.failed, color: "text-rose-400" },
              { label: "Revenue", value: `₹${stats.revenue || 0}`, color: "text-[#b8975a]" },
            ].map((stat) => (
              <div key={stat.label} className="luxury-card rounded-xl p-4 text-center shadow-md">
                <p className="text-[10px] text-[#fbf9f4]/50 font-poppins-clean font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <p className={`text-xl font-serif-luxury font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative">
            <select
              value={filters.status}
              onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value, page: 1 }))}
              className="px-4 py-2.5 bg-[#1c0e07]/60 border border-[#b8975a]/15 rounded-lg text-[#fbf9f4] text-xs font-poppins-clean font-bold uppercase tracking-wider focus:outline-none focus:border-[#b8975a] appearance-none pr-8 cursor-pointer"
            >
              <option value="all" className="bg-[#1c0e07]">All Status</option>
              <option value="paid" className="bg-[#1c0e07]">Paid</option>
              <option value="pending" className="bg-[#1c0e07]">Pending</option>
              <option value="failed" className="bg-[#1c0e07]">Failed</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#b8975a] text-[9px]">
              ▼
            </div>
          </div>

          <div className="relative">
            <select
              value={filters.event}
              onChange={(e) => setFilters((p) => ({ ...p, event: e.target.value, page: 1 }))}
              className="px-4 py-2.5 bg-[#1c0e07]/60 border border-[#b8975a]/15 rounded-lg text-[#fbf9f4] text-xs font-poppins-clean font-bold uppercase tracking-wider focus:outline-none focus:border-[#b8975a] appearance-none pr-8 cursor-pointer"
            >
              <option value="all" className="bg-[#1c0e07]">All Events</option>
              {EVENTS.map((evt) => (
                <option key={evt.id} value={evt.id} className="bg-[#1c0e07]">{evt.shortName}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[#b8975a] text-[9px]">
              ▼
            </div>
          </div>

          <input
            type="text"
            placeholder="Search by name, email, ID..."
            value={filters.search}
            onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value, page: 1 }))}
            className="flex-1 min-w-[200px] px-4 py-2.5 bg-[#1c0e07]/60 border border-[#b8975a]/15 rounded-lg text-[#fbf9f4] text-xs font-poppins-clean font-medium placeholder-gray-500 focus:outline-none focus:border-[#b8975a]"
          />

          <button
            onClick={fetchData}
            className="px-6 py-2.5 bg-[#b8975a] hover:bg-[#d5be8f] text-black hover:text-[#111111] rounded-lg text-xs font-poppins-clean font-bold uppercase tracking-widest transition-all duration-300 border border-[#b8975a]/20 cursor-pointer"
          >
            Search
          </button>
        </div>

        {/* Table */}
        <div className="luxury-card rounded-2xl overflow-hidden shadow-md">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="w-8 h-8 border-2 border-[#b8975a]/20 border-t-[#b8975a] rounded-full animate-spin" />
            </div>
          ) : data?.registrations?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#b8975a]/15 bg-[#2d170c]">
                    {["Reg ID", "Name", "Email", "College", "Event", "Amount", "Status", "Date"].map((h) => (
                      <th key={h} className="px-4 py-3.5 text-left text-[10px] font-poppins-clean font-bold text-[#d5be8f] uppercase tracking-widest whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.registrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-[#b8975a]/10 hover:bg-[#1c0e07]/30 transition-colors">
                      <td className="px-4 py-3.5 text-[#b8975a] font-mono text-xs font-bold whitespace-nowrap">{reg.registration_id}</td>
                      <td className="px-4 py-3.5 text-[#fbf9f4] font-poppins-clean font-semibold text-sm whitespace-nowrap">{reg.name}</td>
                      <td className="px-4 py-3.5 text-[#fbf9f4]/80 font-poppins-clean font-light text-xs whitespace-nowrap">{reg.email}</td>
                      <td className="px-4 py-3.5 text-[#fbf9f4]/80 font-poppins-clean font-medium text-xs whitespace-nowrap max-w-[150px] truncate">{reg.college}</td>
                      <td className="px-4 py-3.5 text-[#fbf9f4]/90 font-poppins-clean font-medium text-xs whitespace-nowrap">{reg.event_name}</td>
                      <td className="px-4 py-3.5 text-[#fbf9f4] font-serif-luxury font-bold text-sm whitespace-nowrap">₹{reg.amount}</td>
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-poppins-clean font-bold uppercase tracking-wider border ${
                          reg.payment_status === "paid" ? "bg-emerald-950/40 text-emerald-400 border-emerald-500/20" :
                          reg.payment_status === "pending" ? "bg-amber-950/40 text-amber-400 border-amber-500/20" :
                          "bg-rose-950/40 text-rose-400 border-rose-500/20"
                        }`}>
                          {reg.payment_status}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-[#fbf9f4]/60 font-poppins-clean font-medium text-xs whitespace-nowrap">
                        {new Date(reg.created_at).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#fbf9f4]/60 font-poppins-clean font-light">No registrations found</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data?.pagination && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setFilters((p) => ({ ...p, page: Math.max(1, p.page - 1) }))}
              disabled={filters.page === 1}
              className="px-3.5 py-2 bg-[#1c0e07]/60 border border-[#b8975a]/15 hover:border-[#b8975a]/30 rounded-lg text-xs font-poppins-clean font-bold uppercase tracking-wider text-[#fbf9f4] disabled:opacity-30 transition-all cursor-pointer"
            >
              Previous
            </button>
            <span className="text-xs font-poppins-clean font-bold text-[#fbf9f4]/50">
              Page {data.pagination.page} of {data.pagination.totalPages}
            </span>
            <button
              onClick={() => setFilters((p) => ({ ...p, page: Math.min(data.pagination.totalPages, p.page + 1) }))}
              disabled={filters.page >= data.pagination.totalPages}
              className="px-3.5 py-2 bg-[#1c0e07]/60 border border-[#b8975a]/15 hover:border-[#b8975a]/30 rounded-lg text-xs font-poppins-clean font-bold uppercase tracking-wider text-[#fbf9f4] disabled:opacity-30 transition-all cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
