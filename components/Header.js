import { useEffect, useState } from "react";
import { RefreshCw, Bell, Search, Clock } from "lucide-react";

export default function Header({ lastUpdated, onRefresh, systemHealth, loading }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const healthColor =
    systemHealth >= 90
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      : systemHealth >= 70
      ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
      : "text-red-400 bg-red-500/10 border-red-500/20";

  const healthDotColor =
    systemHealth >= 90
      ? "bg-emerald-400 shadow-emerald-400/40"
      : systemHealth >= 70
      ? "bg-amber-400 shadow-amber-400/40"
      : "bg-red-400 shadow-red-400/40";

  const healthLabel =
    systemHealth >= 90 ? "Healthy" : systemHealth >= 70 ? "Warning" : "Critical";

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6 shadow-lg shadow-black/30">
      {/* Left */}
      <div>
        <h1 className="text-lg font-bold text-white tracking-wide">
          DevOps System Dashboard
        </h1>
        <p className="flex items-center gap-1.5 text-xs text-slate-400">
          <Clock className="h-3 w-3" />
          Live Infrastructure Monitoring
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search metrics..."
            className="h-9 w-56 rounded-lg border border-slate-700 bg-slate-900 pl-9 pr-3 text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>

        {/* Last Updated */}
        <div className="hidden items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs text-slate-400 lg:flex border border-slate-800">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
          Updated {mounted ? lastUpdated?.toLocaleTimeString() : "--:--:--"}
        </div>

        {/* Health Indicator */}
        <div
          className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-semibold ${healthColor}`}
        >
          <div
            className={`h-2 w-2 animate-pulse rounded-full shadow-sm ${healthDotColor}`}
          />
          {healthLabel} ({systemHealth}%)
        </div>

        {/* Notifications */}
        <button className="relative rounded-lg border border-slate-800 bg-slate-900 p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-md shadow-red-500/40">
            3
          </span>
        </button>


      </div>
    </header>
  );
}
