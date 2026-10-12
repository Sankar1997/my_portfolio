/**
 * SANKAR SOLAIYAPPAN | DEVOPS & INFRASTRUCTURE PORTFOLIO
 * Interactive Architecture Showcase
 */

document.addEventListener('DOMContentLoaded', () => {
  initArchitecture();
});

const ARCHITECTURE_DATA = {
  infra: [
    {
      id: 'internet',
      icon: 'globe',
      title: 'Global Internet',
      sub: 'Public Clients',
      desc: 'External HTTPS requests incoming from worldwide clients, browsers, and API consumers.',
      protocol: 'HTTPS / TLS 1.3',
      ports: '443 / 80',
      security: 'DDoS mitigation, TLS SNI validation, GEO IP rate limiting.',
      tech: 'Public Web, Mobile Apps, REST APIs'
    },
    {
      id: 'dns',
      icon: 'network',
      title: 'DNS Resolution',
      sub: 'Domain Management',
      desc: 'Authoritative nameservers directing domain hostnames to public IP addresses with zero latency.',
      protocol: 'DNS over UDP/TCP',
      ports: 'Port 53',
      security: 'DNSSEC, CAA records, TTL caching, GoDaddy / Cloudflare management.',
      tech: 'GoDaddy, Cloudflare, Custom Bind9'
    },
    {
      id: 'firewall',
      icon: 'shield-alert',
      title: 'Perimeter Firewall',
      sub: 'UFW & Windows Defender',
      desc: 'Stateful packet filtering restricting incoming traffic strictly to audited ports 80, 443, and restricted SSH.',
      protocol: 'TCP / UDP Stateful Filter',
      ports: '22 (Restricted), 80, 443',
      security: 'Fail2ban brute-force banning, IP whitelisting, automated port-knock audit.',
      tech: 'Linux UFW, iptables, Windows Advanced Firewall'
    },
    {
      id: 'nginx',
      icon: 'server',
      title: 'Nginx Reverse Proxy',
      sub: 'SSL / SNI Gateway',
      desc: 'Central SSL termination gateway distributing traffic across multi-domain applications and balancing workloads.',
      protocol: 'HTTP/2, HTTPS, WebSocket',
      ports: '443 (SSL), Internal Reverse Proxy',
      security: 'Let\'s Encrypt (Certbot) auto-renewal, HSTS, secure cipher suites, Gzip compression.',
      tech: 'Nginx Reverse Proxy, Certbot, OpenSSL'
    },
    {
      id: 'apps',
      icon: 'cpu',
      title: 'App Servers',
      sub: 'Tomcat, IIS & Python',
      desc: 'Heterogeneous application cluster running Java Tomcat web apps, IIS .NET services, Python, PHP, and Dart backends.',
      protocol: 'AJP, HTTP, WSGI, FastCGI',
      ports: '8080 (Tomcat), 8000, 5000',
      security: 'Non-root user execution, systemd sandboxing, IIS Application Pool isolation.',
      tech: 'Apache Tomcat, Microsoft IIS, Python Flask/FastAPI, PHP, Dart'
    },
    {
      id: 'databases',
      icon: 'database',
      title: 'Database Cluster',
      sub: 'PostgreSQL, MySQL & MSSQL',
      desc: 'High-reliability relational data storage engines running on dedicated Linux & Windows Server hosts.',
      protocol: 'PostgreSQL, MySQL, MSSQL TDS',
      ports: '5432 (Pg), 3306 (MySQL), 1433 (MSSQL)',
      security: 'Encrypted connections, restricted localhost bindings, role-based database privileges, PgLoader migration.',
      tech: 'PostgreSQL, MySQL/MariaDB, Microsoft SQL Server, PgLoader'
    },
    {
      id: 'backup',
      icon: 'cloud',
      title: 'Cloud Backup Storage',
      sub: 'Automated Disaster Recovery',
      desc: 'Automated shell/batch scripts triggering scheduled dumps, archiving, encryption, and syncing to OneDrive cloud storage.',
      protocol: 'HTTPS / Microsoft Graph API / rclone',
      ports: 'Encrypted API Outbound',
      security: 'GPG/AES-256 encrypted archives, retention policy rotation, automated integrity validation.',
      tech: 'OneDrive Cloud, Shell Scripts, Batch Scripts, Linux Cron, Windows Task Scheduler'
    }
  ],
  cicd: [
    {
      id: 'dev',
      icon: 'code-2',
      title: 'Developer',
      sub: 'Local Workspace',
      desc: 'Engineers crafting application code, feature branches, unit tests, and Dockerfiles in local dev environments.',
      protocol: 'SSH / Git HTTPS',
      ports: 'Internal',
      security: 'SSH signing keys, pre-commit lint hooks, branch protection rules.',
      tech: 'VS Code, Git, Python, Java, PHP, Dart'
    },
    {
      id: 'git',
      icon: 'git-branch',
      title: 'Git Repository',
      sub: 'Version Control',
      desc: 'Centralized source control repository triggering automated webhooks upon code merge to main branch.',
      protocol: 'Git HTTPS / Webhooks',
      ports: '443 (Webhook Outbound)',
      security: 'Branch rules, pull request peer reviews, secret scanning.',
      tech: 'GitHub, Git'
    },
    {
      id: 'jenkins',
      icon: 'workflow',
      title: 'Jenkins CI Engine',
      sub: 'Automated Pipelines',
      desc: 'Continuous integration server pulling repository code, executing automated test suites, and orchestrating build artifacts.',
      protocol: 'Jenkins Pipeline DSL',
      ports: '8080 (CI Server)',
      security: 'Credential manager vault, isolated build agents, role-based authentication.',
      tech: 'Jenkins, Declarative Pipelines, Bash Scripts'
    },
    {
      id: 'docker',
      icon: 'box',
      title: 'Docker Image Build',
      sub: 'Containerization',
      desc: 'Multi-stage container builds generating lightweight, immutable images tagged with commit SHA hashes.',
      protocol: 'Docker Engine API',
      ports: 'Unix Socket / Container Port',
      security: 'Minimal Alpine/Distroless bases, vulnerability scanning, non-root users.',
      tech: 'Docker, Dockerfiles, Container Registry'
    },
    {
      id: 'deploy',
      icon: 'layers',
      title: 'Production Deploy',
      sub: 'Zero-Downtime Rollout',
      desc: 'Automated blue-green or rolling container deployment swapping live containers behind Nginx reverse proxy without downtime.',
      protocol: 'Container Orchestration',
      ports: 'Dynamic Container Ports',
      security: 'Healthcheck probes before cutover, instant rollback on failure.',
      tech: 'Docker Compose, Kubernetes (Basic), Nginx reload'
    },
    {
      id: 'monitor',
      icon: 'activity',
      title: 'Monitoring & Alerts',
      sub: 'Observability & Logging',
      desc: 'Continuous real-time observability tracking CPU, memory, request latency, SSL validity, and sending immediate notifications.',
      protocol: 'Metrics Exporters / Webhooks',
      ports: 'Metrics Scraping',
      security: 'Threshold alerts, automated incident logs, proactive resolution.',
      tech: 'Prometheus, Grafana, Zabbix, Telegram/Email Alerts'
    }
  ]
};

function initArchitecture() {
  const tabInfra = document.getElementById('tabArchInfra');
  const tabCicd = document.getElementById('tabArchCicd');
  const diagramContainer = document.getElementById('archFlowDiagram');
  const inspectorPanel = document.getElementById('archInspector');

  let currentTab = 'infra';

  function renderArchitecture(type) {
    currentTab = type;
    const nodes = ARCHITECTURE_DATA[type];
    if (!diagramContainer) return;

    diagramContainer.innerHTML = '';

    nodes.forEach((node, index) => {
      // Create Node Card
      const nodeEl = document.createElement('div');
      nodeEl.className = `arch-node ${index === 0 ? 'selected' : ''}`;
      nodeEl.setAttribute('data-id', node.id);
      nodeEl.innerHTML = `
        <div class="arch-node-icon">
          <i data-lucide="${node.icon}"></i>
        </div>
        <div class="arch-node-title">${node.title}</div>
        <div class="arch-node-sub">${node.sub}</div>
      `;

      nodeEl.addEventListener('click', () => {
        document.querySelectorAll('.arch-node').forEach(n => n.classList.remove('selected'));
        nodeEl.classList.add('selected');
        updateInspector(node);
      });

      diagramContainer.appendChild(nodeEl);

      // Create connector pipe if not the last node
      if (index < nodes.length - 1) {
        const connector = document.createElement('div');
        connector.className = 'arch-connector';
        diagramContainer.appendChild(connector);
      }
    });

    // Initialize first node inspector
    if (nodes.length > 0) {
      updateInspector(nodes[0]);
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function updateInspector(node) {
    if (!inspectorPanel) return;
    inspectorPanel.innerHTML = `
      <div class="inspector-header">
        <div class="inspector-title">
          <i data-lucide="${node.icon}" style="color: var(--accent-primary);"></i>
          <span>${node.title}</span>
          <span style="font-size: 0.85rem; font-weight: 500; color: var(--text-muted); margin-left: 0.5rem;">[${node.sub}]</span>
        </div>
        <div class="inspector-tags">
          <span class="skill-pill">${node.protocol}</span>
        </div>
      </div>
      <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; margin-top: 0.5rem;">
        ${node.desc}
      </p>
      <div class="inspector-grid">
        <div class="inspector-field">
          <span class="inspector-field-label">Active Ports & Protocols</span>
          <span class="inspector-field-value">${node.ports}</span>
        </div>
        <div class="inspector-field">
          <span class="inspector-field-label">Security & Hardening</span>
          <span class="inspector-field-value" style="font-family: var(--font-body); font-weight: 500; font-size: 0.88rem;">
            ${node.security}
          </span>
        </div>
        <div class="inspector-field">
          <span class="inspector-field-label">Integrated Technologies</span>
          <span class="inspector-field-value" style="color: var(--accent-primary);">
            ${node.tech}
          </span>
        </div>
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  if (tabInfra) {
    tabInfra.addEventListener('click', () => {
      tabInfra.classList.add('active');
      tabCicd?.classList.remove('active');
      renderArchitecture('infra');
    });
  }

  if (tabCicd) {
    tabCicd.addEventListener('click', () => {
      tabCicd.classList.add('active');
      tabInfra?.classList.remove('active');
      renderArchitecture('cicd');
    });
  }

  // Initial render
  renderArchitecture('infra');
}
