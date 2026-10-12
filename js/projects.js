/**
 * SANKAR SOLAIYAPPAN | DEVOPS & INFRASTRUCTURE PORTFOLIO
 * Projects Data, Category Filtering & Case Studies Modal
 */

const PROJECTS_DATA = [
  {
    id: 'hybrid-backup',
    title: 'Hybrid OS Backup & Cloud Disaster Recovery Automation',
    category: 'backup',
    categoryLabel: 'Cloud & Backup Automation',
    icon: 'cloud-lightning',
    shortDesc: 'Automated cross-platform backup workflow orchestrating PostgreSQL, MySQL, and MSSQL dumps on Linux & Windows servers with OneDrive cloud synchronization.',
    specs: [
      'Automated daily and weekly dumps for PostgreSQL, MySQL, and MSSQL',
      'Unified shell and Windows batch scripts with error-trap logging',
      'Automated OneDrive cloud sync via Microsoft Graph / rclone for offsite disaster recovery',
      'Zero data loss retention policy with automated MD5/SHA256 checksum verification'
    ],
    tech: ['PostgreSQL', 'MySQL', 'MSSQL', 'OneDrive Cloud', 'Bash', 'Batch Script', 'Cron', 'Task Scheduler'],
    challenges: 'Coordinating heterogeneous databases across disparate Linux (Ubuntu/CentOS) and Windows Server environments without causing database locking or disk exhaustion during peak production hours.',
    solution: 'Engineered non-blocking logical dumps using pg_dump with parallel jobs and mysqldump with single-transaction. Implemented automated Gzip compression and temporary staging directories before syncing to OneDrive. Task Scheduler and Cron jobs verify exit codes and send status reports.',
    results: 'Reduced daily backup window from 45 minutes of manual effort to completely zero human intervention. Reduced backup storage footprint by 64% using compression, with 100% verified recovery drills.'
  },
  {
    id: 'nginx-reverse-proxy',
    title: 'Multi-Domain Nginx Reverse Proxy & SSL Automation',
    category: 'web',
    categoryLabel: 'Web & Reverse Proxy',
    icon: 'shield-check',
    shortDesc: 'High-performance reverse proxy routing traffic across diverse upstream application servers (Tomcat, IIS, Python) with automated Let\'s Encrypt SSL lifecycle management.',
    specs: [
      'Single entry gateway handling multiple production domains and subdomains',
      'SSL/TLS certificate automation with Let\'s Encrypt Certbot & GoDaddy validation',
      'SSL termination, modern cipher suites (TLS 1.2 & 1.3), and HTTP to HTTPS redirection',
      'Reverse proxy pass-through to Apache Tomcat, Microsoft IIS, and Python WSGI backends'
    ],
    tech: ['Nginx', 'Let\'s Encrypt', 'Certbot', 'OpenSSL', 'Apache Tomcat', 'IIS', 'DNS'],
    challenges: 'Managing SSL certificate renewals across multiple domain names on different servers without downtime, and proxying incoming requests securely to internal backend ports running on different hosts.',
    solution: 'Designed an Nginx reverse proxy architecture using SNI virtual hosts. Configured automated Certbot renewal cron hooks with test dry-runs. Added upstream proxy buffering, rate-limiting, and hardened HTTP security headers (HSTS, X-Frame-Options, CSP).',
    results: 'Achieved an A+ SSL Labs rating across all production endpoints, eliminated certificate expiration incidents, and improved initial page delivery speed through Gzip and HTTP/2 multiplexing.'
  },
  {
    id: 'cicd-automation',
    title: 'Continuous Integration & Containerized Deployment (CI/CD)',
    category: 'devops',
    categoryLabel: 'DevOps & CI/CD',
    icon: 'workflow',
    shortDesc: 'End-to-end automated deployment pipeline integrating GitHub, Jenkins, and Docker to deliver software updates reliably with zero downtime.',
    specs: [
      'GitHub webhook triggers initiating automated Jenkins declarative pipelines',
      'Multi-stage Docker image builds producing lightweight, secure runtime containers',
      'Automated environment variable injection and pre-flight configuration checks',
      'Rollout verification and automatic rollback mechanism upon healthcheck failure'
    ],
    tech: ['Jenkins', 'Docker', 'GitHub', 'CI/CD Pipelines', 'Linux', 'Bash Scripting'],
    challenges: 'Manual deployments were error-prone, requiring developers to SSH into production servers, manually pull code, install runtime dependencies, and restart services with unpredictable downtimes.',
    solution: 'Architected a standardized Jenkins pipeline that checks out code, runs automated linter tests, builds versioned Docker containers, stops older containers gracefully, and brings up the new revision with instant health verification.',
    results: 'Cut release deployment time by 82% (from 35 minutes to under 5 minutes) and eliminated manual configuration drift across production servers.'
  },
  {
    id: 'app-hosting-suite',
    title: 'Heterogeneous Multi-Platform Application Hosting Suite',
    category: 'web',
    categoryLabel: 'Application Hosting',
    icon: 'server',
    shortDesc: 'Production environment provisioning and maintenance for hosting Python, PHP, Java (Apache Tomcat), and Dart applications on Linux and Windows Server platforms.',
    specs: [
      'Configured Apache Tomcat instances for enterprise Java web applications',
      'Configured Microsoft IIS for ASP.NET / PHP services and Windows Server 2019/2022 workloads',
      'Configured Python WSGI / systemd services and Dart runtime environments',
      'Tuned JVM heap memory parameters and IIS application pool recycling schedules'
    ],
    tech: ['Apache Tomcat', 'Microsoft IIS', 'Python', 'PHP', 'Dart', 'Ubuntu', 'Windows Server 2022'],
    challenges: 'Running varied runtimes on identical infrastructure nodes often caused memory contention and port conflicts.',
    solution: 'Isolated each application with dedicated systemd service units, system users, and IIS application pool sandboxes. Tailored JVM garbage collection flags and Tomcat thread pools according to available RAM.',
    results: 'Ensured 99.9% uptime across all co-hosted applications with clear resource isolation and streamlined service restart workflows.'
  },
  {
    id: 'db-migration',
    title: 'Cross-Engine Database Migration & Schema Sync with PgLoader',
    category: 'backup',
    categoryLabel: 'Database Management',
    icon: 'database',
    shortDesc: 'Seamless data migration and schema synchronization pipeline using PgLoader to migrate production MySQL/MariaDB datasets to PostgreSQL.',
    specs: [
      'Automated schema transformation and type casting from MySQL to PostgreSQL',
      'PgLoader command script optimization for high-throughput batch inserts',
      'Automated data validation scripts verifying row counts and checksum consistency',
      'Pre- and post-migration integrity audits with rollback contingencies'
    ],
    tech: ['PostgreSQL', 'MySQL', 'MariaDB', 'PgLoader', 'Python Scripts', 'SQL'],
    challenges: 'Data type incompatibilities, foreign key constraints, and character set mismatches during cross-engine database migration.',
    solution: 'Engineered custom PgLoader conversion files handling datetime and boolean mappings. Created Python verification scripts that executed comparative SELECT COUNT and SHA256 aggregate checksums before cutting over production traffic.',
    results: 'Successfully migrated enterprise databases with zero data loss and less than 15 minutes of scheduled maintenance window.'
  },
  {
    id: 'security-hardening',
    title: 'Linux & Windows Enterprise Server Security Hardening',
    category: 'security',
    categoryLabel: 'Security & Systems',
    icon: 'shield-alert',
    shortDesc: 'Comprehensive infrastructure hardening encompassing firewall rules, brute-force mitigation, SSH key-based access control, and audit logging.',
    specs: [
      'Configured Linux UFW and iptables stateful rules restricting internal ports',
      'Configured Windows Defender Advanced Firewall rules for Windows Server 2019/2022',
      'Deployed Fail2ban for automated IP banning on SSH and web brute-force attempts',
      'Hardened SSH configurations: disabled root login, enforced Ed25519 key authentication'
    ],
    tech: ['UFW', 'Fail2ban', 'Windows Advanced Firewall', 'SSH Key Auth', 'OpenSSL', 'CentOS / Ubuntu'],
    challenges: 'Unprotected endpoints facing the public internet experienced thousands of automated dictionary attacks and unauthorized connection probes daily.',
    solution: 'Implemented strict least-privilege firewall filters, moved administrative services behind VPN or whitelisted IPs, installed Fail2ban with aggressive jail rules, and automated security audit logs rotation.',
    results: 'Blocked 10,000+ unauthorized connection attempts monthly and achieved compliant server security baselines.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initProjects();
});

function initProjects() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectsGrid = document.getElementById('projectsGrid');
  const projectModal = document.getElementById('projectModal');
  const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
  const projectModalBody = document.getElementById('projectModalBody');

  // Render Project Cards
  function renderProjects(filter = 'all') {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = '';

    const filtered = filter === 'all' 
      ? PROJECTS_DATA 
      : PROJECTS_DATA.filter(p => p.category === filter);

    filtered.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-category', project.category);

      card.innerHTML = `
        <div class="project-card-top">
          <div class="project-header-meta">
            <span class="project-tag">${project.categoryLabel}</span>
            <div class="project-icon-box">
              <i data-lucide="${project.icon}"></i>
            </div>
          </div>
          <h3 class="project-title">${project.title}</h3>
          <p class="project-desc">${project.shortDesc}</p>
          <ul class="project-specs-list">
            ${project.specs.slice(0, 3).map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
        <div>
          <div class="project-tech-stack">
            ${project.tech.slice(0, 5).map(t => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="project-card-footer">
            <button class="btn btn-outline btn-sm view-project-btn" data-id="${project.id}">
              <span>View Case Study</span>
              <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i>
            </button>
            <span style="font-size: 0.78rem; font-weight: 600; color: var(--accent-emerald);">
              ● Production Verified
            </span>
          </div>
        </div>
      `;

      projectsGrid.appendChild(card);
    });

    // Re-attach modal trigger listeners
    document.querySelectorAll('.view-project-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const proj = PROJECTS_DATA.find(p => p.id === id);
        if (proj) openProjectModal(proj);
      });
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Filter Button Clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(filter);
    });
  });

  // Modal Functions
  function openProjectModal(project) {
    if (!projectModal || !projectModalBody) return;

    projectModalBody.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;">
          <span class="project-tag">${project.categoryLabel}</span>
          <span class="skill-pill" style="color: var(--accent-emerald); font-weight: 700;">● Production Ready</span>
        </div>
        <h2 style="font-size: 1.85rem; font-weight: 800; color: var(--text-primary); line-height: 1.25;">
          ${project.title}
        </h2>
        <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.7;">
          ${project.shortDesc}
        </p>
        
        <div style="background: var(--bg-tertiary); border: 1px solid var(--card-border); border-radius: var(--radius-md); padding: 1.25rem;">
          <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.75rem; text-transform: uppercase; color: var(--accent-primary);">
            Key Architecture Deliverables:
          </h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.92rem; color: var(--text-secondary);">
            ${project.specs.map(s => `<li style="display: flex; gap: 0.5rem;"><span style="color: var(--accent-primary);">✔</span> <span>${s}</span></li>`).join('')}
          </ul>
        </div>

        <div>
          <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            Challenges Encountered
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.65;">
            ${project.challenges}
          </p>
        </div>

        <div>
          <h4 style="font-size: 1.1rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.5rem;">
            Implementation & DevOps Solution
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.65;">
            ${project.solution}
          </p>
        </div>

        <div style="background: var(--badge-bg); border: 1px solid var(--badge-border); border-radius: var(--radius-md); padding: 1.25rem;">
          <h4 style="font-size: 1rem; font-weight: 700; color: var(--accent-primary); margin-bottom: 0.4rem;">
            Measurable Results & Impact
          </h4>
          <p style="font-size: 0.95rem; color: var(--text-primary); font-weight: 600; line-height: 1.6;">
            ${project.results}
          </p>
        </div>

        <div>
          <h4 style="font-size: 0.9rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.65rem;">
            Technologies & Tools Stack
          </h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${project.tech.map(t => `<span class="tech-tag" style="background: var(--bg-secondary); font-size: 0.85rem; padding: 0.35rem 0.8rem;">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    projectModal.classList.add('active');
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  closeProjectModalBtn?.addEventListener('click', () => {
    projectModal?.classList.remove('active');
  });

  projectModal?.addEventListener('click', (e) => {
    if (e.target === projectModal) {
      projectModal.classList.remove('active');
    }
  });

  // Initial render
  renderProjects('all');
}
