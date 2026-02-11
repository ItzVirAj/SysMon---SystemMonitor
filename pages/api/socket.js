import { Server } from "socket.io";
import os from "os";
import si from "systeminformation";
import { exec } from "child_process";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server); // ← keep default path
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("Client connected");

      const sendStats = async () => {
        try {
          const [cpuLoad, mem, disk, netStats, netIfs] = await Promise.all([
            si.currentLoad(),
            si.mem(),
            si.fsSize(),
            si.networkStats(),
            si.networkInterfaces(),
          ]);

          const mainNet = netStats[0] || {};
          const activeInterface = netIfs.find(i => !i.internal && i.ip4);

          // 🔹 KEEP OLD FIELDS (so your UI keeps working)
          const networkIn = mainNet.rx_sec || 0;
          const networkOut = mainNet.tx_sec || 0;

          // 🔹 ADD NEW FIELDS (extra features)
          const networkInMB = networkIn / 1024 / 1024;
          const networkOutMB = networkOut / 1024 / 1024;
          const downloadMbps = (networkIn * 8) / 1024 / 1024;
          const uploadMbps = (networkOut * 8) / 1024 / 1024;

const containers = await new Promise((resolve) => {
  exec(
    'docker stats --no-stream --format "{{.Name}}|{{.CPUPerc}}|{{.MemUsage}}"',
    (err, stdout) => {
      if (err) return resolve([]);

      const list = stdout
        .split("\n")
        .filter(Boolean)
        .map((line, i) => {
          const [name, cpu, mem] = line.split("|");

          const memUsed = mem?.split("/")[0]?.trim() || "0MiB";
          const memMB = memUsed.includes("GiB")
            ? parseFloat(memUsed) * 1024
            : parseFloat(memUsed);

          return {
            id: i,
            name,
            image: "docker",
            status: "running", // docker stats only shows running containers
            cpu: parseFloat(cpu.replace("%", "")) || 0,
            memory: memMB || 0,
            uptime: "Running",
          };
        });

      resolve(list);
    }
  );
});



          socket.emit("stats", {
            // ===== EXISTING (DO NOT BREAK) =====
            hostname: os.hostname(),
            cpuUsage: cpuLoad.currentLoad,
            memoryUsed: Math.round((mem.used / mem.total) * 100),
            diskUsed: disk[0]
              ? Math.round((disk[0].used / disk[0].size) * 100)
              : 0,
            networkIn,   // bytes/sec (old)
            networkOut,  // bytes/sec (old)

            // ===== NEW ADDITIONS =====
            cpuModel: os.cpus()[0].model,
            cpuCores: os.cpus().length,
            platform: os.platform(),
            uptime: Math.floor(os.uptime() / 60) + " mins",
            loadAvg: os.loadavg(),
            memoryTotal: Math.round(mem.total / 1024 / 1024 / 1024) + " GB",
            disk: disk[0]
              ? Math.round((disk[0].used / disk[0].size) * 100) + "% used"
              : "N/A",

            // Live speeds
            networkInMB,
            networkOutMB,
            downloadMbps,
            uploadMbps,

            // Network details
            networkInterface: activeInterface?.iface || "N/A",
            ipAddress: activeInterface?.ip4 || "N/A",
            macAddress: activeInterface?.mac || "N/A",
            totalRxMB: mainNet.rx_bytes
              ? (mainNet.rx_bytes / 1024 / 1024).toFixed(1)
              : 0,
            totalTxMB: mainNet.tx_bytes
              ? (mainNet.tx_bytes / 1024 / 1024).toFixed(1)
              : 0,
              containers,
          });

        } catch (err) {
          console.error(err);
        }
      };

      const interval = setInterval(sendStats, 2000);
      sendStats();

      socket.on("disconnect", () => {
        clearInterval(interval);
        console.log("Client disconnected");
      });
    });
  }

  res.end();
}
