import { Container, Circle } from "lucide-react";
import { useState } from "react";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const statusConfig = {
  running: { color: "text-emerald-400", label: "Running" },
  paused: { color: "text-amber-400", label: "Paused" },
  stopped: { color: "text-red-400", label: "Stopped" },
};

export default function DockerPanel({ containers = [] }) {
  const safeContainers = Array.isArray(containers) ? containers : [];
  const [search, setSearch] = useState("");

  const filteredContainers = safeContainers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const runningCount = safeContainers.filter((c) => c.status === "running").length;
  const totalCount = safeContainers.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-lg shadow-black/40">

      {/* Header (Dark) */}
      <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5 bg-slate-950">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 shadow-md shadow-black/40">
            <Container className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Docker Containers</h3>
            <p className="text-xs text-slate-400">
              {runningCount}/{totalCount} running
            </p>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
          {runningCount} Active
        </span>
      </div>

      {/* Search (Dark) */}
      <div className="border-b border-slate-800 px-6 py-4 bg-slate-950">
        <input
          type="text"
          placeholder="Search container..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Terminal Body */}
      <div className="px-6 py-5">

        {/* Terminal Top Bar */}
        <div className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
          </div>
          <span className="ml-2 font-mono text-xs text-slate-500">docker stats</span>
        </div>

        {/* Column Headers */}
        <div className="mb-3 grid grid-cols-12 gap-3 text-xs font-semibold uppercase tracking-wider text-slate-500 font-mono">
          <div className="col-span-3">Container</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2 text-right">CPU</div>
          <div className="col-span-3 text-right">Memory</div>
          <div className="col-span-2 text-right">Uptime</div>
        </div>

        {/* Empty State */}
        {filteredContainers.length === 0 && (
          <div className="py-12 text-center text-slate-500 font-mono text-sm">
            No matching containers 🐳
          </div>
        )}

        {/* Rows */}
        <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
          {filteredContainers.map((container) => {
            const status = statusConfig[container.status] || statusConfig.stopped;
            const highCpu = container.cpu > 70;
            const highMem = container.memory > 500;

            return (
              <div
                key={container.id}
                className="grid grid-cols-12 gap-3 rounded-lg bg-slate-900/70 px-3 py-3 font-mono text-sm text-slate-200 hover:bg-slate-900"
              >
                {/* Name */}
                <div className="col-span-3 flex items-center gap-2">
                  <Circle className={cn("h-2.5 w-2.5 fill-current", status.color)} />
                  <span className="truncate font-semibold text-emerald-300">
                    {container.name}
                  </span>
                </div>

                {/* Status */}
                <div className={cn("col-span-2 text-xs font-semibold", status.color)}>
                  {status.label}
                </div>

                {/* CPU */}
                <div className="col-span-2 text-right">
                  <div className={cn("font-semibold", highCpu ? "text-red-400" : "text-cyan-400")}>
                    {container.cpu ? `${container.cpu.toFixed(1)}%` : "-"}
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded bg-slate-700">
                    <div
                      className={cn("h-1.5 rounded", highCpu ? "bg-red-500" : "bg-cyan-500")}
                      style={{ width: `${Math.min(container.cpu || 0, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Memory */}
                <div className="col-span-3 text-right">
                  <div className={cn("font-semibold", highMem ? "text-red-400" : "text-purple-400")}>
                    {container.memory ? `${container.memory.toFixed(0)} MB` : "-"}
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded bg-slate-700">
                    <div
                      className={cn("h-1.5 rounded", highMem ? "bg-red-500" : "bg-purple-500")}
                      style={{ width: `${Math.min((container.memory || 0) / 10, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Uptime */}
                <div className="col-span-2 text-right text-slate-400 text-xs">
                  {container.uptime}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center gap-2 border-t border-slate-800 pt-4">
          <span className="text-emerald-400 font-mono text-sm">$</span>
          <span className="animate-pulse text-slate-500 font-mono text-sm">monitoring...</span>
        </div>
      </div>
    </div>
  );
}
