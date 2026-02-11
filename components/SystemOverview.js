import CpuChart from "./CpuChart";

const cpuHistory = Array.from({ length: 50 }, (_, i) => ({
  time: `${i}s`,
  usage: 30 + Math.random() * 40,
  system: 10 + Math.random() * 20,
  user: 15 + Math.random() * 20,
}));
