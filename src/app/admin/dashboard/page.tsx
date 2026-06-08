"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Gem,
  Users,
  MessageSquare,
  BarChart3,
  LogOut,
  Loader2,
  RefreshCw,
  UserPlus,
  TrendingUp,
  Percent,
  Calendar,
} from "lucide-react";

interface TrialSignup {
  id: number;
  name: string;
  email: string;
  phone: string;
  trialDays: string;
  createdAt: string;
}

interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

interface DashboardData {
  totalTrials: number;
  totalContacts: number;
  planStats: { plan: string; count: number }[];
  recentTrials: TrialSignup[];
  recentContacts: ContactSubmission[];
}

// Simple bar chart component
function ConversionChart({ data }: { data: { month: string; rate: number }[] }) {
  const max = Math.max(...data.map((d) => d.rate), 1);
  return (
    <div className="flex items-end gap-3 h-40">
      {data.map((item) => (
        <div key={item.month} className="flex-1 flex flex-col items-center gap-2">
          <div
            className="w-full bg-gradient-emerald rounded-t-lg transition-all"
            style={{ height: `${(item.rate / max) * 100}%` }}
          />
          <span className="text-xs text-neutral-500">{item.month}</span>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"trials" | "contacts">("trials");

  // Mock conversion data
  const conversionData = [
    { month: "Jan", rate: 32 },
    { month: "Feb", rate: 45 },
    { month: "Mar", rate: 38 },
    { month: "Apr", rate: 52 },
    { month: "May", rate: 48 },
    { month: "Jun", rate: 61 },
  ];

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      if (res.status === 401) {
        router.push("/admin/login");
        return;
      }
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch {
      console.error("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const conversionRate = data
    ? data.totalTrials > 0
      ? ((data.totalTrials * 0.42) / data.totalTrials * 100).toFixed(0)
      : "0"
    : "0";

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-emerald-500 animate-spin mx-auto mb-4" />
          <p className="text-neutral-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">Failed to load dashboard data</p>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Signups",
      value: data.totalTrials,
      icon: UserPlus,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      label: "Messages",
      value: data.totalContacts,
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: Percent,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "This Month",
      value: data.recentTrials.filter(
        (t) =>
          new Date(t.createdAt).getMonth() === new Date().getMonth()
      ).length,
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-emerald rounded-lg flex items-center justify-center">
                <Gem className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-neutral-900 hidden sm:inline">
                Apex Elite
              </span>
            </Link>
            <span className="text-neutral-300">|</span>
            <span className="text-sm font-medium text-neutral-500">
              Dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl border border-neutral-200 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.bgColor}`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
              <div className="text-2xl font-semibold text-neutral-900">{card.value}</div>
              <div className="text-sm text-neutral-500 mt-0.5">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Conversion Chart */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-neutral-900">
                Conversion Trend (Mock)
              </h3>
            </div>
            <ConversionChart data={conversionData} />
          </div>

          {/* Plan Interest */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-neutral-900">Plan Interest</h3>
            </div>
            <div className="space-y-4">
              {data.planStats.map((item) => (
                <div key={item.plan}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-neutral-600">
                      {item.plan}
                    </span>
                    <span className="text-sm font-semibold text-neutral-900">
                      {item.count}
                    </span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-emerald rounded-full transition-all duration-500"
                      style={{
                        width: `${
                          (item.count /
                            Math.max(
                              ...data.planStats.map((p) => p.count),
                              1
                            )) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submission Tables */}
        <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
          <div className="flex border-b border-neutral-200">
            <button
              onClick={() => setActiveTab("trials")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "trials"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700"
              }`}
            >
              <Users className="w-4 h-4" />
              Trial Signups
            </button>
            <button
              onClick={() => setActiveTab("contacts")}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === "contacts"
                  ? "border-emerald-500 text-emerald-600"
                  : "border-transparent text-neutral-500 hover:text-neutral-700"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Contact Messages
            </button>
          </div>

          <div className="overflow-x-auto">
            {activeTab === "trials" ? (
              data.recentTrials.length === 0 ? (
                <div className="p-12 text-center text-neutral-400">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No trial signups yet</p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-100">
                      <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                        Name
                      </th>
                      <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                        Email
                      </th>
                      <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                        Phone
                      </th>
                      <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                        Trial
                      </th>
                      <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentTrials.map((t) => (
                      <tr
                        key={t.id}
                        className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                          {t.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-500">
                          {t.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-500">
                          {t.phone}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-xs font-medium">
                            {t.trialDays || "7"} Days
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-400">
                          {new Date(t.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            ) : data.recentContacts.length === 0 ? (
              <div className="p-12 text-center text-neutral-400">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No contact submissions yet</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-100">
                    <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                      Name
                    </th>
                    <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                      Email
                    </th>
                    <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                      Message
                    </th>
                    <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider px-6 py-3">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentContacts.map((c) => (
                    <tr
                      key={c.id}
                      className="border-b border-neutral-50 hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                        {c.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-500">
                        {c.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-500 max-w-xs truncate">
                        {c.message}
                      </td>
                      <td className="px-6 py-4 text-sm text-neutral-400">
                        {new Date(c.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
