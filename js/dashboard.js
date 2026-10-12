/**
 * SANKAR SOLAIYAPPAN | DEVOPS & INFRASTRUCTURE PORTFOLIO
 * Interactive Infrastructure Dashboard Simulator
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboard();
});

function initDashboard() {
  const cpuVal = document.getElementById('dashCpuVal');
  const ramVal = document.getElementById('dashRamVal');
  const netInVal = document.getElementById('dashNetInVal');
  const netOutVal = document.getElementById('dashNetOutVal');
  const reqsVal = document.getElementById('dashReqsVal');
  const logsStream = document.getElementById('dashLogsStream');

  const spikeBtn = document.getElementById('btnSimulateSpike');
  const backupBtn = document.getElementById('btnTriggerBackup');
  const clearLogsBtn = document.getElementById('btnClearLogs');

  // Canvas Sparklines
  const cpuCanvas = document.getElementById('cpuCanvas');
  const ramCanvas = document.getElementById('ramCanvas');

  let cpuHistory = Array(20).fill(12);
  let ramHistory = Array(20).fill(34);
  let isSpike = false;

  // Render Canvas Sparkline
  function drawSparkline(canvas, data, strokeColor, fillColor) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, width, height);
    if (data.length < 2) return;

    const max = 100;
    const min = 0;
    const step = width / (data.length - 1);

    ctx.beginPath();
    ctx.moveTo(0, height - ((data[0] - min) / (max - min)) * height);

    for (let i = 1; i < data.length; i++) {
      const x = i * step;
      const y = height - ((data[i] - min) / (max - min)) * height;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Fill area under line
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = fillColor;
    ctx.fill();
  }

  // Periodic Telemetry Update
  setInterval(() => {
    let currentCpu = isSpike 
      ? Math.floor(75 + Math.random() * 18) 
      : Math.floor(12 + Math.random() * 7);
    
    let currentRam = isSpike 
      ? Math.floor(58 + Math.random() * 10) 
      : Math.floor(34 + Math.random() * 3);

    cpuHistory.push(currentCpu);
    cpuHistory.shift();

    ramHistory.push(currentRam);
    ramHistory.shift();

    if (cpuVal) cpuVal.textContent = `${currentCpu}%`;
    if (ramVal) ramVal.textContent = `${currentRam}%`;

    const netIn = (isSpike ? 142.8 : 34.2 + Math.random() * 4).toFixed(1);
    const netOut = (isSpike ? 284.1 : 78.4 + Math.random() * 8).toFixed(1);
    const reqs = Math.floor(isSpike ? 1240 + Math.random() * 300 : 380 + Math.random() * 40);

    if (netInVal) netInVal.textContent = `${netIn} MB/s`;
    if (netOutVal) netOutVal.textContent = `${netOut} MB/s`;
    if (reqsVal) reqsVal.textContent = `${reqs} req/s`;

    drawSparkline(cpuCanvas, cpuHistory, '#38bdf8', 'rgba(56, 189, 248, 0.15)');
    drawSparkline(ramCanvas, ramHistory, '#a855f7', 'rgba(168, 85, 247, 0.15)');
  }, 1800);

  // Automated Logging Events
  const sampleLogs = [
    { level: 'info', msg: 'Cron job initiated: PostgreSQL incremental backup routine.' },
    { level: 'success', msg: 'OneDrive sync verified: dump_pg_20261012.tar.gz uploaded (AES-256).' },
    { level: 'success', msg: 'SSL Certificate check: Let\'s Encrypt auto-renewal active (68 days remaining).' },
    { level: 'info', msg: 'Nginx upstream health check: 3/3 Tomcat backend workers operational.' },
    { level: 'info', msg: 'Docker Daemon: 14 containers running, 0 failed, 0 restarts.' },
    { level: 'success', msg: 'Windows Server 2022: Task Scheduler completed IIS log rotation.' },
    { level: 'info', msg: 'Jenkins CI: Poll SCM completed. Branch main is up-to-date.' },
    { level: 'info', msg: 'DNS resolve check: All records propagating via Cloudflare 1.1.1.1.' }
  ];

  let logIndex = 0;
  setInterval(() => {
    if (!isSpike && logsStream) {
      const item = sampleLogs[logIndex % sampleLogs.length];
      appendLog(item.level, item.msg);
      logIndex++;
    }
  }, 4500);

  function appendLog(level, msg) {
    if (!logsStream) return;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];

    const logDiv = document.createElement('div');
    logDiv.className = 'log-entry';
    logDiv.innerHTML = `
      <span class="log-timestamp">[${timeStr}]</span>
      <span class="log-level ${level}">[${level.toUpperCase()}]</span>
      <span class="log-msg">${msg}</span>
    `;

    logsStream.appendChild(logDiv);
    logsStream.scrollTop = logsStream.scrollHeight;

    // Keep max 40 entries
    if (logsStream.children.length > 40) {
      logsStream.removeChild(logsStream.children[0]);
    }
  }

  // Interactive Button: Simulate Traffic Spike
  if (spikeBtn) {
    spikeBtn.addEventListener('click', () => {
      if (isSpike) return;
      isSpike = true;
      spikeBtn.disabled = true;
      spikeBtn.textContent = 'Simulating High Traffic...';
      appendLog('warn', 'Simulated benchmark initiated: High concurrent traffic load test (1,500 req/s).');

      setTimeout(() => {
        appendLog('info', 'Load balancing across multiple Nginx proxy instances.');
      }, 1500);

      setTimeout(() => {
        isSpike = false;
        spikeBtn.disabled = false;
        spikeBtn.textContent = 'Simulate Traffic Spike';
        appendLog('success', 'Traffic stabilized: Auto-scaling and caching normalized server resources.');
      }, 5500);
    });
  }

  // Interactive Button: Trigger Backup
  if (backupBtn) {
    backupBtn.addEventListener('click', () => {
      appendLog('info', 'Manual backup triggered by operator.');
      appendLog('info', 'Running pg_dump & mysqldump multi-db synchronization.');
      setTimeout(() => {
        appendLog('success', 'Manual backup completed: Saved locally and synced to OneDrive.');
        if (window.showToast) {
          window.showToast('Backup completed and encrypted successfully!', 'success');
        }
      }, 1200);
    });
  }

  // Interactive Button: Clear Logs
  if (clearLogsBtn && logsStream) {
    clearLogsBtn.addEventListener('click', () => {
      logsStream.innerHTML = '';
      appendLog('info', 'Console logs cleared by user.');
    });
  }

  // Initial render
  setTimeout(() => {
    drawSparkline(cpuCanvas, cpuHistory, '#38bdf8', 'rgba(56, 189, 248, 0.15)');
    drawSparkline(ramCanvas, ramHistory, '#a855f7', 'rgba(168, 85, 247, 0.15)');
  }, 300);
}
