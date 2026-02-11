import { ArrowDownToLine, ArrowUpFromLine, Wifi, Server } from "lucide-react";

export default function NetworkPanel({
  networkIn = 0,
  networkOut = 0,
  loadAvg = [0, 0, 0],
  networkInterface = "N/A",
  ipAddress = "N/A",
  macAddress = "N/A",
  totalRxMB = 0,
  totalTxMB = 0,
    downloadMbps = 0,   // ✅ NEW
  uploadMbps = 0,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-400 to-pink-600 shadow-md shadow-rose-200">
            <Wifi className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Network & Load</h3>
            <p className="text-[11px] text-slate-500">Throughput & system load</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-4">

        {/* 🌐 INTERNET SPEED */}
<div className="grid grid-cols-2 gap-3">
  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
    <div className="flex items-center gap-2">
      <ArrowDownToLine className="h-4 w-4 text-emerald-600" />
      <span className="text-[11px] font-medium text-slate-600">Download Speed</span>
    </div>
    <p className="mt-1 text-xl font-bold text-emerald-700">{downloadMbps.toFixed(2)}</p>
    <p className="text-[10px] text-slate-500">Mbps</p>
  </div>

  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
    <div className="flex items-center gap-2">
      <ArrowUpFromLine className="h-4 w-4 text-blue-600" />
      <span className="text-[11px] font-medium text-slate-600">Upload Speed</span>
    </div>
    <p className="mt-1 text-xl font-bold text-blue-700">{uploadMbps.toFixed(2)}</p>
    <p className="text-[10px] text-slate-500">Mbps</p>
  </div>
</div>


        {/* LIVE TRAFFIC */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-emerald-100 bg-emerald-50/50 p-3">
            <div className="flex items-center gap-2">
              <ArrowDownToLine className="h-4 w-4 text-emerald-500" />
              <span className="text-[11px] font-medium text-slate-500">Inbound</span>
            </div>
            <p className="mt-1 text-xl font-bold text-slate-800">{networkIn.toFixed(2)}</p>
            <p className="text-[10px] text-slate-400">MB/s</p>
          </div>

          <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-3">
            <div className="flex items-center gap-2">
              <ArrowUpFromLine className="h-4 w-4 text-blue-500" />
              <span className="text-[11px] font-medium text-slate-500">Outbound</span>
            </div>
            <p className="mt-1 text-xl font-bold text-slate-800">{networkOut.toFixed(2)}</p>
            <p className="text-[10px] text-slate-400">MB/s</p>
          </div>
        </div>


        {/* NETWORK DETAILS */}
        <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Interface</span>
            <span className="font-semibold text-slate-700">{networkInterface}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">IP Address</span>
            <span className="font-semibold text-slate-700">{ipAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">MAC Address</span>
            <span className="font-semibold text-slate-700">{macAddress}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Total Downloaded</span>
            <span className="font-semibold text-emerald-600">{totalRxMB} MB</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Total Uploaded</span>
            <span className="font-semibold text-blue-600">{totalTxMB} MB</span>
          </div>
        </div>
      </div>
    </div>
  );
}
