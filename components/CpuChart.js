import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend,
} from "recharts";
import { Activity } from "lucide-react";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-700 bg-slate-900/95 p-3 shadow-xl backdrop-blur-sm">
        <p className="mb-1.5 text-xs font-semibold text-slate-400">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-slate-300">{p.name}:</span>
            <span className="font-bold text-white">{p.value.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function CpuChart({ data = [], currentUsage = 0 }) {
  const displayData = data.map((d, i) => ({
    ...d,
    displayTime: i % 10 === 0 ? d.time : "",
  }));

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-lg shadow-slate-900/40">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-600 shadow-md shadow-emerald-500/30">
            <Activity className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">CPU Usage Trend</h3>
            <p className="text-[11px] text-slate-400">Real-time monitoring · 5s interval</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5">
          <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold text-emerald-400">
            {currentUsage.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="p-4">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={displayData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="systemGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

            <XAxis
              dataKey="displayTime"
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={{ stroke: "#1e293b" }}
              tickLine={false}
            />

            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 10, fill: "#64748b" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              verticalAlign="top"
              height={30}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "11px", color: "#94a3b8", paddingBottom: "8px" }}
            />

            <Area type="monotone" dataKey="usage" name="Total CPU" stroke="#10b981" strokeWidth={2.5} fill="url(#cpuGradient)" dot={false} />
            <Area type="monotone" dataKey="system" name="System" stroke="#6366f1" strokeWidth={1.5} fill="url(#systemGradient)" dot={false} />
            <Area type="monotone" dataKey="user" name="User" stroke="#f59e0b" strokeWidth={1.5} fill="url(#userGradient)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
