import os from "os";
import { execSync } from "child_process";
import fs from "fs";

export default function handler(req, res) {
  let version = "Version info not available";
  try {
    version = fs.readFileSync("version.txt", "utf8");
  } catch {}

  let uptime = "Unavailable";

  try {
    if (process.platform === "win32") {
      uptime = "Windows system (uptime command not supported)";
    } else {
      uptime = execSync("uptime -p").toString();
    }
  } catch {
    uptime = "Could not determine uptime";
  }

  res.status(200).json({
    hostname: os.hostname(),
    platform: os.platform(),
    uptime: uptime,
    version: version,
  });
}
