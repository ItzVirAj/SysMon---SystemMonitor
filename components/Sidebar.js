import { useState } from "react";
import {
  LayoutDashboard,
  Activity,
  Container,
  Network,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const navItems = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: Activity, label: "Metrics", id: "metrics" },
  { icon: Container, label: "Containers", id: "containers", badge: 10 },
  { icon: Network, label: "Network", id: "network" },
];

export default function Sidebar({ activeView, setActiveView }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative flex flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white transition-all duration-300 ease-in-out",
        collapsed ? "w-[68px]" : "w-[240px]"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/20">
          <Activity className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-sm font-bold tracking-wide text-white">SysMon</h1>
            <p className="text-[10px] font-medium text-slate-400">System Monitor v1.0</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex-1 space-y-1 px-3">
        {!collapsed && (
          <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            Navigation
          </p>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.label}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "group relative flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-emerald-500/20 to-cyan-500/10 text-emerald-400 shadow-sm"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-r-full bg-emerald-400" />
              )}

              <Icon className={cn("h-[18px] w-[18px] shrink-0", isActive && "text-emerald-400")} />

              {!collapsed && <span>{item.label}</span>}

              {!collapsed && item.badge && (
                <span
                  className={cn(
                    "ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold",
                    isActive
                      ? "bg-emerald-500/30 text-emerald-300"
                      : "bg-slate-700 text-slate-300"
                  )}
                >
                  {item.badge}
                </span>
              )}

              {collapsed && item.badge && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="border-t border-white/10 p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-500 transition-colors hover:bg-white/5 hover:text-white"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>

      {/* System Status */}
      {!collapsed && (
        <div className="border-t border-white/10 p-4">
          <div className="rounded-lg bg-slate-800/80 p-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
              <span className="text-[11px] font-medium text-slate-400">System Online</span>
            </div>
            <p className="mt-1 text-[10px] text-slate-600">All services operational</p>
          </div>
        </div>
      )}
    </aside>
  );
}
