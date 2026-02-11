# 🚀 SysMon — System Monitoring Dashboard

**SysMon** is a real-time **DevOps System Monitoring Dashboard** built with **Next.js, Docker, and WebSockets**.  
It tracks **CPU, Memory, Disk, Network, and Docker containers** with a sleek terminal-style UI.

This project is designed to be:

✅ Beginner-friendly  
✅ Resume-ready  
✅ DevOps-focused  
✅ Cloud-deployable  

---

## ✨ Features

### 📊 System Metrics
- Real-time CPU usage (Total, System, User)
- Memory utilization with progress bars
- Disk usage
- Load average (1m, 5m, 15m)

### 🌐 Network Monitoring
- Live upload/download speed (Mbps)
- Network throughput (MB/s)
- IP address, MAC address, active interface
- Total data transferred since boot

### 🐳 Docker Monitoring
- Running containers list
- Live CPU & Memory usage per container
- Container uptime & status
- Search & filter containers

### ⚡ Real-Time Updates
- WebSocket-based live updates (no page refresh)
- Data refresh every 2 seconds

### 🎨 UI
- Dark terminal-inspired panels
- Smooth charts & animations
- Responsive layout

---

## 📂 Project Structure

sysmon-dashboard/
│
├── components/ # UI components
│ ├── CpuChart.js
│ ├── DockerPanel.js
│ ├── NetworkPanel.js
│ └── ...
│
├── pages/
│ ├── index.js # Main dashboard
│ └── api/
│ ├── system.js # REST system metrics
│ └── socket.js # WebSocket live stats
│
├── Dockerfile
├── package.json
└── .github/workflows/ # CI/CD pipeline

Got it — you want a clean, proper README.md file content with correct Markdown formatting (no broken blocks).
Here it is ready to paste into README.md:

🚀 SysMon — System Monitoring Dashboard

SysMon is a real-time DevOps System Monitoring Dashboard built with Next.js, Docker, and WebSockets.
It tracks CPU, Memory, Disk, Network, and Docker containers with a sleek terminal-style UI.

This project is designed to be:

✅ Beginner-friendly
✅ Resume-ready
✅ DevOps-focused
✅ Cloud-deployable

✨ Features
📊 System Metrics

Real-time CPU usage (Total, System, User)

Memory utilization with progress bars

Disk usage

Load average (1m, 5m, 15m)

🌐 Network Monitoring

Live upload/download speed (Mbps)

Network throughput (MB/s)

IP address, MAC address, active interface

Total data transferred since boot

🐳 Docker Monitoring

Running containers list

Live CPU & Memory usage per container

Container uptime & status

Search & filter containers

⚡ Real-Time Updates

WebSocket-based live updates (no page refresh)

Data refresh every 2 seconds

🎨 UI

Dark terminal-inspired panels

Smooth charts & animations

Responsive layout

🛠 Local Development
1️⃣ Install dependencies
npm install

2️⃣ Run development server
npm run dev


Open in your browser:

http://localhost:3000

🐳 Run with Docker
Build Docker image
docker build -t sysmon-dashboard .

Run Docker container
docker run -p 3000:3000 sysmon-dashboard


App will be available at:

http://localhost:3000

🎯 Learning Goals Covered

✔ Fullstack monitoring dashboard
✔ Real-time WebSockets
✔ Docker containerization
✔ CI/CD basics
✔ DevOps system metrics
✔ Cloud-ready architecture

👨‍💻 Author

Built as a DevOps learning project to understand:

Monitoring • Containers • Realtime Systems • CI/CD • Cloud Deployment

⭐ Future Improvements (Optional)

Alert system for high CPU/Memory usage

Historical metrics storage

Multi-server monitoring

Automatic AWS deployment pipeline

SysMon = Your first real DevOps Monitoring System 🚀
