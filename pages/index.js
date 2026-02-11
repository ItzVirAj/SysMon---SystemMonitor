import { useEffect, useState } from "react";
import { Server, HardDrive, Clock, Cpu, Activity } from "lucide-react";
import { io } from "socket.io-client";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CpuChart from "../components/CpuChart";
import DockerPanel from "../components/DockerPanel";
import NetworkPanel from "../components/NetworkPanel";
import MetricCard from "../components/MetricCard";
import SystemInfo from "../components/SystemInfo";

export default function Dashboard() {
  const [data, setData] = useState({});
  const [cpuHistory, setCpuHistory] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [systemHealth, setSystemHealth] = useState(95);
  const [activeView, setActiveView] = useState("overview");
  const [loading, setLoading] = useState(false);

  const [networkStats, setNetworkStats] = useState({
    in: 0,
    out: 0,
    load: [0, 0, 0],
  });

  useEffect(() => {
    fetch("/api/socket"); // start socket server
    const socket = io();

    socket.on("stats", (liveData) => {
      setLoading(false);
      setData((prev) => ({ ...prev, ...liveData }));
      setLastUpdated(new Date());

      const cpuUsage = liveData.cpuUsage ?? 0;

      setCpuHistory((prev) => {
        const next = [
          ...prev,
          {
            time: new Date().toLocaleTimeString(),
            usage: cpuUsage,
            system: cpuUsage * 0.4,
            user: cpuUsage * 0.6,
          },
        ];
        return next.slice(-60);
      });

      const health = Math.max(0, Math.min(100, 100 - cpuUsage));
      setSystemHealth(Math.round(health));

      setNetworkStats({
        in: liveData.networkIn ?? 0,
        out: liveData.networkOut ?? 0,
        load: liveData.loadAvg ?? [0, 0, 0],
      });
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8F9FB]">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 flex flex-col">
        <Header
          lastUpdated={lastUpdated}
          systemHealth={systemHealth}
          loading={loading}
        />

        <div className="flex-1 p-6 space-y-6 overflow-y-auto">

          {activeView === "overview" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
                <MetricCard icon={Server} label="Hostname" value={data.hostname} color="blue" />
                <MetricCard icon={HardDrive} label="Disk Usage" value={data.disk} color="purple" />
                <MetricCard icon={Clock} label="Uptime" value={data.uptime} color="emerald" />

                <MetricCard
                  icon={Cpu}
                  label="CPU Load"
                  value={cpuHistory.length ? `${Math.round(cpuHistory.at(-1).usage)}%` : "—"}
                  color="amber"
                  progress={cpuHistory.length ? Math.round(cpuHistory.at(-1).usage) : 0}
                />

                <MetricCard icon={Cpu} label="CPU Cores" value={data.cpuCores ? `${data.cpuCores} Cores` : "—"} color="cyan" />

                <MetricCard
                  icon={HardDrive}
                  label="Memory Usage"
                  value={data.memoryUsed ? `${data.memoryUsed}%` : "—"}
                  subtitle={data.memoryTotal ? `of ${data.memoryTotal}` : ""}
                  color="blue"
                  progress={data.memoryUsed || 0}
                />

                
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <CpuChart data={cpuHistory} currentUsage={cpuHistory.at(-1)?.usage || 0} />

                  <NetworkPanel
  networkIn={networkStats.in}
  networkOut={networkStats.out}
  loadAvg={networkStats.load}
  networkInterface={data.networkInterface}
  ipAddress={data.ipAddress}
  macAddress={data.macAddress}
  totalRxMB={data.totalRxMB}
  totalTxMB={data.totalTxMB}
  downloadMbps={data.downloadMbps}   
  uploadMbps={data.uploadMbps}       
/>
                </div>

                <div className="space-y-6">
                  <DockerPanel containers={Array.isArray(data.containers) ? data.containers : []} />
                  <SystemInfo
                    hostname={data.hostname}
                    platform={data.platform}
                    uptime={data.uptime}
                    cpuModel={data.cpuModel || "Intel Xeon"}
                    cpuCores={data.cpuCores || 4}
                  />
                </div>
              </div>
            </>
          )}

          {activeView === "metrics" && (
            <CpuChart data={cpuHistory} currentUsage={cpuHistory.at(-1)?.usage || 0} />
          )}

          {activeView === "containers" && (
            <DockerPanel containers={Array.isArray(data.containers) ? data.containers : []} />
          )}

          {activeView === "network" && (
<NetworkPanel
  networkIn={networkStats.in}
  networkOut={networkStats.out}
  loadAvg={networkStats.load}
  networkInterface={data.networkInterface}
  ipAddress={data.ipAddress}
  macAddress={data.macAddress}
  totalRxMB={data.totalRxMB}
  totalTxMB={data.totalTxMB}
  downloadMbps={data.downloadMbps}   
  uploadMbps={data.uploadMbps}       
/>


          )}
        </div>
      </main>
    </div>
  );
}
