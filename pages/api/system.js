import os from "os";
import si from "systeminformation";
import { exec } from "child_process";

export default async function handler(req, res) {
  try {
    const [cpuLoad, mem, disk, netStats, netIfs] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.networkStats(),
      si.networkInterfaces(),
    ]);

    // Docker containers (optional, safe fallback)
// Docker containers with real stats
const containers = await new Promise((resolve) => {
  exec(
    `docker stats --no-stream --format "{{.Name}}|{{.CPUPerc}}|{{.MemUsage}}"`,
    (err, stdout) => {
      if (err || !stdout) return resolve([]);

      const list = stdout
        .split("\n")
        .filter(Boolean)
        .map((line, i) => {
          const [name, cpu, mem] = line.split("|");

          const memUsed = mem?.split("/")[0]?.replace("MiB", "").trim() || "0";
          const memMB = parseFloat(memUsed);

          return {
            id: i,
            name,
            image: "running",
            status: "running",
            cpu: parseFloat(cpu.replace("%", "")) || 0,
            memory: memMB || 0,
            uptime: "—",
          };
        });

      resolve(list);
    }
  );
});
// Add stopped containers
exec(`docker ps -a --filter "status=exited" --format "{{.Names}}"`, (err, stdout) => {
  if (!err && stdout) {
    stdout.split("\n").filter(Boolean).forEach((name, i) => {
      containers.push({
        id: containers.length + i,
        name,
        image: "stopped",
        status: "stopped",
        cpu: 0,
        memory: 0,
        uptime: "—",
      });
    });
  }
});


    const mainNet = netStats
  .filter(n => n.rx_sec !== undefined)
  .sort((a, b) => (b.rx_bytes || 0) - (a.rx_bytes || 0))[0] || {};

    const activeInterface = netIfs.find(i => !i.internal && i.ip4);

    // 🔥 REAL INTERNET SPEED IN Mbps
    const downloadMbps = mainNet.rx_sec ? (mainNet.rx_sec * 8) / (1024 * 1024) : 0;
const uploadMbps   = mainNet.tx_sec ? (mainNet.tx_sec * 8) / (1024 * 1024) : 0;


    res.status(200).json({
      hostname: os.hostname(),
      platform: os.platform(),
      uptime: Math.floor(os.uptime() / 60) + " mins",

      // CPU
      cpuUsage: cpuLoad.currentLoad,
      cpuUser: cpuLoad.currentLoadUser,
      cpuSystem: cpuLoad.currentLoadSystem,
      cpuModel: os.cpus()[0].model,
      cpuCores: os.cpus().length,

      // Memory
      memoryUsed: Math.round((mem.used / mem.total) * 100),
      memoryTotal: Math.round(mem.total / 1024 / 1024 / 1024) + " GB",

      // Disk
      disk: disk[0]
        ? Math.round((disk[0].used / disk[0].size) * 100) + "% used"
        : "N/A",

      // Network Throughput (MB/s)
      networkIn: mainNet.rx_sec ? mainNet.rx_sec / 1024 / 1024 : 0,
      networkOut: mainNet.tx_sec ? mainNet.tx_sec / 1024 / 1024 : 0,

      // 🌐 Live Internet Speed (Mbps)
      downloadMbps: Number(downloadMbps.toFixed(2)),
      uploadMbps: Number(uploadMbps.toFixed(2)),

      // Load Average
      loadAvg: os.loadavg(),

      // Network Details
      networkInterface: activeInterface?.iface || "N/A",
      macAddress: activeInterface?.mac || "N/A",
      ipAddress: activeInterface?.ip4 || "N/A",

      // Total Traffic Since Boot
      totalRxMB: mainNet.rx_bytes ? (mainNet.rx_bytes / 1024 / 1024).toFixed(1) : 0,
      totalTxMB: mainNet.tx_bytes ? (mainNet.tx_bytes / 1024 / 1024).toFixed(1) : 0,

      containers,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch system data" });
  }
}
