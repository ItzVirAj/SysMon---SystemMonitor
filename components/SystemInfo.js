import { Server, Monitor, Clock, Cpu } from "lucide-react";

export default function SystemInfo({
  hostname,
  platform,
  uptime,
  cpuModel,
  cpuCores,
}) {
  const items = [
    {
      icon: Server,
      label: "Hostname",
      value: hostname,
      color: "from-violet-400 to-violet-600 shadow-violet-200",
    },
    {
      icon: Monitor,
      label: "Platform",
      value: platform,
      color: "from-sky-400 to-sky-600 shadow-sky-200",
    },
    {
      icon: Clock,
      label: "Uptime",
      value: uptime,
      color: "from-amber-400 to-amber-600 shadow-amber-200",
    },
    {
      icon: Cpu,
      label: "Processor",
      value: `${cpuModel} (${cpuCores} cores)`,
      color: "from-pink-400 to-pink-600 shadow-pink-200",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <h3 className="text-sm font-bold text-slate-800">System Information</h3>
        <p className="text-[11px] text-slate-500">
          Server details & configuration
        </p>
      </div>

      <div className="divide-y divide-slate-50">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-slate-50/50"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br shadow-md ${item.color}`}
              >
                <Icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  {item.label}
                </p>
                <p className="truncate text-sm font-medium text-slate-700">
                  {item.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
``
